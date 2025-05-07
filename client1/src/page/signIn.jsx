import React from 'react'
import { useAuth } from '../hook/useAuth'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'

const SignIn = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const { user, login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      if (user.role === 'admin' || user.role === 'manager') {
        navigate('/admin')
      }
      if (user.role === 'sales' || user.role === 'support') {
        navigate('/')
      }
    }
  }, [user, navigate])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = formData
    const success = await login(email, password)
    if (success) {
      navigate('/')
    } else {
      alert('Login failed')
    }
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          required
          className='p-2 rounded outline-1 border border-gray-950'
        />
        <input
          type='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
          className='p-2 rounded outline-1 border border-gray-950'
        />
        <button type="submit"
        className='bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300'
        >Sign In</button>
      </form>
    </div>
  )
}

export default SignIn