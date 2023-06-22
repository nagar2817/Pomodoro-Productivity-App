"use client"
import './globals.css';
import {UserProvider} from '@auth0/nextjs-auth0/client'
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import PomodoroProvider from '../context/PomodoroContext';

export const metadata = {
    title: 'Pomodoro App',
    description: 'Welcome to Next.js',
  }

export default function Layout({ children }) {
    return (
        <html lang="en">
          <body>
            <div>
            <UserProvider>
              <ApolloProvider client={apolloClient} >
                <PomodoroProvider >
                  {children}            
                </PomodoroProvider>
              </ApolloProvider >
            </UserProvider>
            </div>
          </body>
        </html>)
}


