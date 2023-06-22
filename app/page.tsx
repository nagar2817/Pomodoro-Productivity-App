"use client"
import { useUser } from '@auth0/nextjs-auth0/client';
import App from './App';
import Link from 'next/link';
import { ThemeProvider } from "@material-tailwind/react";

const Home = ()=>{
  const user = useUser()
  return(
    <>
    <ThemeProvider>
      <App/>
    </ThemeProvider>
    </>
  )
}

export default Home;
