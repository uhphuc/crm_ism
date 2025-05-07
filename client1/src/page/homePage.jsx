import React from 'react'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const HomePage = () => {

    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if ( !user ) {
            navigate('/login')
        } else if (user.role === 'admin' || user.role === 'manager') {
            navigate('/admin')
        }
    }, [ user, navigate])

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-blue-500'>
      <h1>
        Welcome to the Customer Relationship Management System
      </h1>
    </div>
  )
}

export default HomePage