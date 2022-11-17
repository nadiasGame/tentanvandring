const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const db = require('./database');
const cookieParser = require('cookie-parser')
const { initRoles, assignRoleToUser } = require('./database');
const jwt = require('jsonwebtoken');


require('dotenv').config();

const {
  authorization,
  adminAuthorization,
} = require('./middleware/authorization');
const { validateSession } = require('./middleware/validateSession');
const addMinutes = require('./helpers/addMinuts');


const app = express();

const port = process.env.PORT;

const whitelist = ['http://localhost:3000'];

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ credentials: true, origin: whitelist }));


// Uncomment to init defaultRoles
/*  db.initRoles(); */

app.get('/api/users',adminAuthorization ,async (req, res) => {
  try {
    const users = await db.getUsers();
    console.log(users);
    return res.status(200).json(users);
  } catch (err) {
    console.log('Error in getting users: ', err);
    return res.sendStatus(400);
  }
});

app.get('/api/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    if (isNaN(Number(id))) {
      return res.status(400).json({ message: 'ID need to be integer' });
    }
    const user = await db.getUserById(id);
    console.log(user);
    return res.status(200).json(user);
  } catch (err) {
    console.log('Error in getting users: ', err);
    return res.sendStatus(400);
  }
});




app.post('/api/login', async (req, res) => {
  try {
 
    const email = req.body.email;
    let password = req.body.password;
    // 1. Check if user already exists
    const user = await db.getUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }
        // 2. Compare password
        if (!(await bcrypt.compare(password, user.password))) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }

    // 3. Get User Roles
    const roles = await db.getRolesForUser(user.userId);

     // 5. Create refresh & accessTokens
     const accessToken = jwt.sign(
      {
        email: email,
        id: user.userId,
        roles: roles.map((val) => val.roleName),
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        audience: 'admin',
        expiresIn: '1m',
        issuer: user.username,
      }
    );

    // 6. Set accessToken cookie and return data
    return res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: addMinutes(1),
        maxAge: addMinutes(1),
      }).status(200)
      .json({
        userId: user.userId,
        email: email,
        username: user.username,
        roles: roles.map((val) => val.roleName),
      });
  } catch (err) {
    console.log('Error in login route: ', err);
    return res.sendStatus(400);
  }
});

app.post('/api/register', async (req, res) => {
  try {
    
    // 0. Get data from body
    const username = req.body.username;
    const email = req.body.email;
    let password = req.body.password;
    // 1. Check for empty data
    if (!username || !email || !password) {
      return res.sendStatus(400);
    }
    // 2. Check if user already exists in DB
    const user = await db.getUserByEmail(email);
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // 3. Hash password & Register USER
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await db.createUser(username, email, hashedPassword);
    // // 4. Assign ROLE to USER
    await db.assignRoleToUser(userId, 1000);
    // await db.assignRoleToUser(userId, 2000); 
   
    // 5. Get ROLES for USER
    const roles = await db.getRolesForUser(userId);
    // 6. Create a session
    // 7. Create refresh & accessTokens
    const accessToken = jwt.sign(
      { email: email, id: userId, roles: roles.map((val) => val.roleName) },
      process.env.ACCESS_TOKEN_SECRET,
      {
        audience: 'http://localhost:3000',
        expiresIn: '1m',
        issuer: username,
      }
    );
  console.log(accessToken)
    return res
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        expires: addMinutes(1),
        maxAge: addMinutes(1),
      }).status(201)
      .json({
        userId: userId,
        email: email,
        username: username,
        roles: roles.map((val) => val.roleName),
        accessToken: accessToken,
      });
  } catch (err) {
    console.log('Error in register route: ', err);
    res.sendStatus(400);
  }
});


app.get('/api/users', adminAuthorization, async (req, res) => {
  try {
    const result = await db.getUsers();
    let duplicateList = result.filter((val) => val.rolename === 'NORMAL_USER');
    for (const index in result) {
      const user = result[index];
      let userMatch = duplicateList.find(
        (val) => val.userId === user.userId && val.rolename !== user.rolename
      );
      if (userMatch !== undefined) {
        userMatch.rolename += `,${user.rolename}`;
      }
    }
    // Removing roleId & password
    duplicateList.forEach((obj) => {
      obj.roles = obj.rolename.split(',');
      delete obj['roleId'];
      delete obj['password'];
      delete obj['rolename'];
    });

    res.status(200).json(duplicateList);
  } catch (err) {
    res.sendStatus(400);
  }
});
app.get('/api/user', authorization, async (req, res) => {
  const userId = req.query.id;
  const user = await db.getUserById(userId);
  const roles = await db.getRolesForUser(userId);
  return res.status(200).json({
    userId: user.userId,
    email: user.email,
    username: user.username,
    roles: roles.map((val) => val.rolename),
  });
});

app.get('/api/logout',async (req, res) => {

  return res
    .clearCookie('accessToken')
    
    .status(200)
    .json({ message: 'Successfully logged out!!' });
});





app.listen(port, (err) => {
  if (err) {
    console.log(`Error listening on port: ${port}`, err);
  } else {
    console.log(`Succesfully listening on port: ${port}!`);
  }
});