import { useState } from 'react'
import './App.css'
import supabase from './utils/supabase'

function App() {
const [newUser, setNewUser] = useState({
  username: '',
  email: '',
  password: ''
})

async function handleAddNewUser() {
  event.preventDefault()

  const {data, error} = await supabase.auth.signUp({
    email: newUser.email,
    password: newUser.password,
    options: {
      data: {
        username: newUser.username
      }
    }
  })
  if (error) {
    console.log(error)
  } else {
    console.log('New User Added', data)
  }
}

  return (
    <form onSubmit={handleAddNewUser}>
      <label>Name</label>
        <input type="text" placeholder='name' value={newUser.username} onChange={(event) => setNewUser({...newUser, username: event.target.value})}/>
      <label>Email</label>
        <input type="text" placeholder='email' value={newUser.email} onChange={(event) => setNewUser({...newUser, email: event.target.value})}/>
      <label>Password</label>
        <input type="text" placeholder='password' value={newUser.password} onChange={(event) => setNewUser({...newUser, password: event.target.value})}/>
      <button>Submit</button>
    </form>
  )
}

export default App
