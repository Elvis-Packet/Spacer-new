import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formErrors, setFormErrors] = useState({})
  const { register, loading, error, isAuthenticated, clearError } = useAuth()
  
  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  const validateForm = () => {
    const errors = {}
    
    if (!email.trim()) {
      errors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid'
    }
    
    if (!password) {
      errors.password = 'Password is required'
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters'
    }
    
    if (!confirmPassword) {
      errors.confirmPassword = 'Please confirm your password'
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match'
    }
    
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    clearError()
    
    if (validateForm()) {
      await register(email, password)
    }
  }
  
  return (
    <div className="auth-page">
      <div className="auth-container">
        <motion.div 
          className="auth-form-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join Spacer and start booking spaces</p>
          
          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className={`form-input ${formErrors.email ? 'error' : ''}`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
              {formErrors.email && (
                <span className="form-error">{formErrors.email}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className={`form-input ${formErrors.password ? 'error' : ''}`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
              {formErrors.password && (
                <span className="form-error">{formErrors.password}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                className={`form-input ${formErrors.confirmPassword ? 'error' : ''}`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
              />
              {formErrors.confirmPassword && (
                <span className="form-error">{formErrors.confirmPassword}</span>
              )}
            </div>
            
            <button 
              type="submit" 
              className={`btn btn-primary btn-block ${loading ? 'btn-disabled' : ''}`}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
          
          <div className="auth-links">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          className="auth-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="auth-overlay"></div>
        </motion.div>
      </div>
    </div>
  )
}

export default Register