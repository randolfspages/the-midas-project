import React from 'react'
import Dashboard from '@/components/dashboard/Dashboard'




export default function page() {

  
  return (
   <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 pt-20">
      <div className="px-4 py-6 sm:px-0">
        <div className="mb-8 text-center ">
          <span className="text-lg font-bold text-gray-900">
            AI Political Spending Transparency
          </span>
          <p className="mt-2 text-gray-600">
            Tracking Super PAC ads funded by OpenAI+a16z and Meta across multiple platforms
          </p>
        </div>
        <Dashboard />
      </div>
    </div>
  )
}
