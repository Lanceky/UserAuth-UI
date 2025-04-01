import React, {useState} from 'react'
import {z} from 'zod';

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail]  = useState('')
  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault();
    console.log({email, password})//to be replaced by api

    //login schema validation
    const loginSchema = z.object({
      email: z.string().email('Invalid Email'),
      password: z.string().min(4, 'Password must be at least 4 characters')
    })
    type LoginFormData = z.infer<typeof loginSchema>
    
  }
  return (
    <form onSubmit={handleSubmit}>
      <input 
      type="email" 
      value={email}
      onChange={(e)=>{setEmail(e.target.value)}}
      placeholder='Email'
      />

      <input 
      type="password"
      value={password}
      onChange={(e)=>{setPassword(e.target.value)}}
      placeholder='Password'
       />

      <button type='submit'>
        Submit
      </button>
    </form>
    
  )
}

export default Login