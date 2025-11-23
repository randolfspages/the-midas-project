import React from 'react'
import Link from 'next/link'
import { SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton, UserButton } from '@clerk/nextjs'

export default function Navigation() {
  return (
          <nav className="bg-white shadow-sm border-b border-gray-200 fixed w-full z-10 top-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Link href={'/'}>
                    <span className="text-lg font-bold text-gray-900">&#923;SP&#923;CT<span className='text-xs font-light italic'>AI Super PAC Ads Tracking Project</span></span>
                  </Link>
                </div>
                <div className="flex items-center space-x-4">
                  {/* <SignedOut>
                    <SignInButton mode='modal'>
                      <button className="bg-white text-black hover:text-gray-600 rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                        Sign In
                      </button>
                    </SignInButton>
                    <SignUpButton mode='modal'>
                      <button className="bg-blue-500 text-white rounded font-medium text-sm sm:text-base h-8 px-4 cursor-pointer hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                        Sign Up
                      </button>
                    </SignUpButton>
                  </SignedOut> */}
                  <SignedIn>
                      <UserButton  />
                    <SignOutButton>
                      <button className="bg-red-500 text-white rounded font-medium text-sm sm:text-base h-8 px-4 cursor-pointer hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors">
                        Sign Out
                      </button>
                    </SignOutButton>
                  </SignedIn>
                </div>
              </div>
            </div>
          </nav>
     
  )
}
