import '../styles/globals.scss'
import '../components/loginForm/loginForm.scss'
import '../components/navbar/navBar.scss'
import React from 'react'
import MyImage from '../components/image'






import type { AppProps } from 'next/app';
import Navbar from '../components/navbar/navBar';
import Footer from '../components/footer/fooTer';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
 
  <Navbar/>

  <Component {...pageProps} />
  
  <Footer/>
  </>
}

export default MyApp;