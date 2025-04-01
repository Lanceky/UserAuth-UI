import React, {useState} from 'react'

const Login = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail]  = useState('')
  const handleSubmit = (e: React.FormEvent)=>{
    e.preventDefault();
    console.log({email, password})//to be replaced by api
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