import { useState } from 'react'
import './TempleDetails.css'
import API_BASE_URL from './config'

function TempleDetails({ temple, onBack }) {

  const [feedback, setFeedback] = useState('')
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false)

  const currentUser = JSON.parse(
    localStorage.getItem('heritageCurrentUser') || 'null'
  )

  const handleFeedbackSubmit = async (event) => {
    event.preventDefault()

    if (!currentUser) {
      alert('Please login before submitting content accuracy feedback.')
      return
    }

    if (!feedback.trim()) {
      alert('Please enter your feedback message.')
      return
    }

    try {
      setFeedbackSubmitting(true)

      const response = await fetch(
        `${API_BASE_URL}/api/feedback`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            templeId: temple._id || null,
            templeName: temple.name,
            city: temple.city,
            state: temple.state,
            userName: currentUser.name,
            userEmail: currentUser.email,
            message: feedback.trim()
          })
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to submit feedback'
        )
      }

      alert(
        'Thank you! Your content accuracy feedback has been submitted successfully.'
      )

      setFeedback('')
    } catch (error) {
      console.error('Feedback submission error:', error)

      alert(
        'Unable to submit feedback. Please try again.'
      )
    } finally {
      setFeedbackSubmitting(false)
    }
  }

  return (
    <section className="details-page">

      <button
        className="back-button"
        onClick={onBack}
      >
        ← Back to Temples
      </button>

      <div className="details-hero">

        <div className="details-icon">
          🛕
        </div>

        <div>

          <span className="details-state">
            {temple.state}
          </span>

          <h1>{temple.name}</h1>

          <p>
            📍 {temple.city} • 🙏 {temple.deity}
          </p>

        </div>

      </div>

      <div className="details-grid">

        {/* HISTORICAL SIGNIFICANCE */}

        <div className="details-card">

          <h2>📖 Historical Significance</h2>

          <p>
            {temple.history}
          </p>

        </div>

        {/* DARSHAN TIMINGS */}

        <div className="details-card">

          <h2>🕐 Darshan Timings</h2>

          {temple.darshanTimings
            .split('\n')
            .map((timing) => (
              <p key={timing}>
                {timing}
              </p>
            ))}

          <small>
            Visitors should verify current temple timings before travelling.
          </small>

        </div>

        {/* RITUALS */}

        <div className="details-card">

          <h2>🪔 Rituals & Traditions</h2>

          <p>
            {temple.rituals}
          </p>

        </div>

        {/* FESTIVALS */}

        <div className="details-card">

          <h2>🎉 Festivals</h2>

          <p>
            {temple.templeFestivals}
          </p>

        </div>

        {/* VISITOR GUIDELINES */}

        <div className="details-card">

          <h2>📋 Visitor Guidelines</h2>

          <p>
            {temple.guidelines}
          </p>

        </div>

        {/* PILGRIMAGE */}

        <div className="details-card">

          <h2>🗺️ Pilgrimage Information</h2>

          <p>
            {temple.pilgrimageInfo}
          </p>

        </div>

        {/* ACCOMMODATION */}

        <div className="details-card">

          <h2>🏨 Accommodation</h2>

          <p>
            Visitors can look for hotels, guest houses, lodges and other
            accommodation options in and around {temple.city}.
          </p>

          <small>
            Accommodation availability and prices may vary by season.
          </small>

        </div>

        {/* TRANSPORTATION */}

        <div className="details-card">

          <h2>🚆 Transportation</h2>

          <p>
            Visitors can use available railway, road, bus, taxi and local
            transport services depending on the location of the temple.
          </p>

        </div>

        {/* NEARBY FACILITIES */}

        <div className="details-card">

          <h2>🏥 Nearby Facilities</h2>

          <ul>

            <li>
              🏨 Hotels and guest houses
            </li>

            <li>
              🍽️ Restaurants and food facilities
            </li>

            <li>
              🚕 Local taxi and transport services
            </li>

            <li>
              🏥 Medical facilities
            </li>

            <li>
              🛍️ Local shops and essential services
            </li>

          </ul>

          <small>
            Visitors should check current local availability before travelling.
          </small>

        </div>

        {/* CONTENT ACCURACY FEEDBACK */}

        <div className="details-card">

          <h2>📝 Content Accuracy Feedback</h2>

          <p>
            Help us keep our heritage information accurate.
            If you notice incorrect, outdated or incomplete information,
            please tell us below.
          </p>

          {currentUser ? (

            <form onSubmit={handleFeedbackSubmit}>

              <p>
                <strong>
                  Logged in as:
                </strong>{' '}
                {currentUser.name} ({currentUser.role})
              </p>

              <textarea
                value={feedback}
                onChange={(event) =>
                  setFeedback(event.target.value)
                }
                placeholder="Enter your feedback about the accuracy of this temple information..."
                rows="5"
                style={{
                  width: '100%',
                  padding: '12px',
                  marginTop: '10px',
                  marginBottom: '12px',
                  border: '1px solid #ccc',
                  borderRadius: '8px',
                  resize: 'vertical',
                  fontFamily: 'inherit',
                  boxSizing: 'border-box'
                }}
              />

              <button
                type="submit"
                disabled={feedbackSubmitting}
                style={{
                  padding: '10px 18px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: feedbackSubmitting
                    ? 'not-allowed'
                    : 'pointer',
                  opacity: feedbackSubmitting
                    ? 0.7
                    : 1
                }}
              >
                {feedbackSubmitting
                  ? 'Submitting...'
                  : 'Submit Accuracy Feedback'}
              </button>

            </form>

          ) : (

            <p>
              Please login to submit content accuracy feedback.
            </p>

          )}

        </div>

      </div>

    </section>
  )
}

export default TempleDetails