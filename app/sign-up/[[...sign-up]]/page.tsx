import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function Page() {
  return (
    <div className='min-h-screen flex items-center justify-center pt-20'> 
        <SignUp />
    </div>
  )
}