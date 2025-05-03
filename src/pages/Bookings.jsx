import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { spacesService } from '../services/spacesService'
import './Bookings.css'

function Bookings() {
  const { user } = useAuth()
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true)
        
        // Note: In a real app, you would fetch from a user-specific endpoint
        // For this demo, we're just fetching spaces and using them as "bookings"
        const spaces = await spacesService.getSpaces(1, 10)
        
        // Create mock bookings from spaces data for demonstration
        const mockBookings = spaces.map((space, index) => {
          // Create different statuses for demo purposes
          let status = 'confirmed'
          if (index % 3 === 1) status = 'pending'
          if (index % 3 === 2) status = 'completed'
          
          // Calculate random start and end times
          const now = new Date()
          const randomDayOffset = Math.floor(Math.random() * 14) - 7 // -7 to +7 days
          const startTime = new Date(now)
          startTime.setDate(now.getDate() + randomDayOffset)
          startTime.setHours(10 + Math.floor(Math.random() * 8))
          startTime.setMinutes(0)
          
          const endTime = new Date(startTime)
          endTime.setHours(startTime.getHours() + 2 + Math.floor(Math.random() * 3))
          
          return {
            id: space.id + 100,
            space_id: space.id,
            space_name: space.name,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            total_cost: space.price_per_hour * ((endTime - startTime) / (1000 * 60 * 60)),
            status
          }
        })
        
        setBookings(mockBookings)
      } catch (err) {
        setError('Failed to load bookings')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBookings()
  }, [])
  
  // Filter bookings based on status
  const filteredBookings = bookings.filter(booking => {
    if (filter === 'all') return true
    return booking.status === filter
  })
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }
  
  return (
    <div className="bookings-page">
      <div className="container">
        <div className="bookings-header">
          <h1 className="bookings-title">My Bookings</h1>
          <p className="bookings-subtitle">Manage your space bookings</p>
        </div>
        
        <div className="bookings-filter">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'confirmed' ? 'active' : ''}`}
            onClick={() => setFilter('confirmed')}
          >
            Confirmed
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
        
        {loading ? (
          <div className="loading">
            <div className="loading-spinner"></div>
          </div>
        ) : error ? (
          <div className="error-message">
            {error}
          </div>
        ) : (
          <div className="bookings-list">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="booking-item">
                  <div className="booking-item-header">
                    <h3 className="booking-space-name">{booking.space_name}</h3>
                    <div className={`booking-status ${booking.status}`}>{booking.status}</div>
                  </div>
                  
                  <div className="booking-details">
                    <div className="booking-detail-group">
                      <div className="booking-detail">
                        <span className="detail-label">Start Time:</span>
                        <span className="detail-value">{formatDate(booking.start_time)}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="detail-label">End Time:</span>
                        <span className="detail-value">{formatDate(booking.end_time)}</span>
                      </div>
                    </div>
                    
                    <div className="booking-detail-group">
                      <div className="booking-detail">
                        <span className="detail-label">Total Cost:</span>
                        <span className="detail-value">${booking.total_cost.toFixed(2)}</span>
                      </div>
                      <div className="booking-detail">
                        <span className="detail-label">Booking ID:</span>
                        <span className="detail-value">#{booking.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="booking-actions">
                    <Link to={`/spaces/${booking.space_id}`} className="btn btn-secondary btn-small">
                      View Space
                    </Link>
                    
                    {booking.status !== 'completed' && (
                      <button className="btn btn-outline btn-small">
                        {booking.status === 'pending' ? 'Cancel Booking' : 'Reschedule'}
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-bookings">
                <p>No {filter !== 'all' ? filter : ''} bookings found.</p>
                {filter !== 'all' ? (
                  <button 
                    className="btn btn-primary"
                    onClick={() => setFilter('all')}
                  >
                    View All Bookings
                  </button>
                ) : (
                  <Link to="/spaces" className="btn btn-primary">
                    Browse Spaces
                  </Link>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Bookings