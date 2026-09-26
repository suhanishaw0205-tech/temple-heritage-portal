import { useState } from 'react'
import './Auth.css'

function Auth({ onLogin }) {
  const [mode, setMode] = useState('login')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('Student')

  function handleSubmit(event) {
    event.preventDefault()

    if (!email || !password) {
      alert('Please enter your email and password.')
      return
    }

    if (mode === 'register' && !name) {
      alert('Please enter your name.')
      return
    }

    const users = JSON.parse(
      localStorage.getItem('heritageUsers') || '[]'
    )

    if (mode === 'register') {
      const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
      )

      if (existingUser) {
        alert('An account with this email already exists.')
        return
      }

      const newUser = {
        name,
        email,
        password,
        role
      }

      users.push(newUser)

      localStorage.setItem(
        'heritageUsers',
        JSON.stringify(users)
      )

      localStorage.setItem(
        'heritageCurrentUser',
        JSON.stringify(newUser)
      )

      alert('Registration successful.')

      onLogin(newUser)

      return
    }

    const user = users.find(
      (item) =>
        item.email.toLowerCase() === email.toLowerCase() &&
        item.password === password
    )

    if (!user) {
      alert(
        'Invalid email or password. Please register first.'
      )
      return
    }

    localStorage.setItem(
      'heritageCurrentUser',
      JSON.stringify(user)
    )

    alert('Login successful.')

    onLogin(user)
  }

  return (
    <section className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <div className="auth-icon">
            🏛️
          </div>

          <p>
            HERITAGE LEARNING HUB
          </p>

          <h1>
            {mode === 'login'
              ? 'Welcome Back'
              : 'Create Your Account'}
          </h1>

          <span>
            Learn, explore and discover India's
            cultural heritage.
          </span>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {mode === 'register' && (
            <div className="auth-form-group">

              <label>
                Full Name
              </label>

              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>
          )}

          <div className="auth-form-group">

            <label>
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

          </div>

          <div className="auth-form-group">

            <label>
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

          </div>

          {mode === 'register' && (
            <div className="auth-form-group">

              <label>
                Select Role
              </label>

              <select
                value={role}
                onChange={(event) =>
                  setRole(event.target.value)
                }
              >
                <option value="Student">
                  Student
                </option>

                <option value="Teacher">
                  Teacher
                </option>

                <option value="Admin">
                  Admin
                </option>
              </select>

            </div>
          )}

          <button
            type="submit"
            className="auth-submit-button"
          >
            {mode === 'login'
              ? 'Login'
              : 'Create Account'}
          </button>

        </form>

        <div className="auth-switch">

          {mode === 'login' ? (
            <p>
              New to Heritage Learning Hub?
              <button
                type="button"
                onClick={() => setMode('register')}
              >
                Create Account
              </button>
            </p>
          ) : (
            <p>
              Already have an account?
              <button
                type="button"
                onClick={() => setMode('login')}
              >
                Login
              </button>
            </p>
          )}

        </div>

        <div className="auth-note">
          <strong>
            Learning Roles
          </strong>

          <span>
            Student: Learn and complete quizzes
          </span>

          <span>
            Teacher: Access learning resources
          </span>

          <span>
            Admin: Manage heritage content
          </span>
        </div>

      </div>

    </section>
  )
}

export default Auth