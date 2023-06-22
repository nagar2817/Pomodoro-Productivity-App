import {React,memo} from 'react'
import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'

const Header = () => {
  const { user } = useUser()
  return (
    <header className="text-gray-600 body-font">
      <div className="mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <Link href="/" className="flex title-font font-medium items-center mb-4 md:mb-0">
                 <div className="flex items-center flex-shrink-0 text-white mr-6">
            
                 <span class="font-semibold text-xl tracking-tight">Pomodoro App</span>
               </div>
              </Link>
        <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
          {user ? 
            (
            <div className="flex items-center space-x-5">
            <div className="text-sm lg:flex-grow">
         <Link href="/matrix" class="block mt-4 lg:inline-block lg:mt-0 tracking-light hover:text-white mr-4 font-semibold">
           Dashboard
         </Link>
      
       </div>
              <Link href="/api/auth/logout" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
                Logout
              </Link>
            </div>
          ) : (
            <Link href="/api/auth/login" className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}

export default memo(Header);