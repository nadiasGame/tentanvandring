import Image from 'next/image'
import mypic from '../public/Asset/frontfoto.jpeg'
const imageFront = (props) => {
  return (
    <Image
      src={mypic}
      alt="Picture of the author"
     /*  width="350px"
      height="300px" */
    />
  )}
  export default imageFront;