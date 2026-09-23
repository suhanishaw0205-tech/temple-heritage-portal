import './Guidelines.css'

function Guidelines() {
  return (
    <section className="guidelines-page">

      <div className="guidelines-header">
        <p>PLAN YOUR TEMPLE VISIT</p>

        <h1>Visitor Guidelines</h1>

        <span>
          Follow these simple guidelines for a respectful, safe and
          meaningful temple visit.
        </span>
      </div>

      <div className="guidelines-grid">

        <div className="guideline-card">
          <div className="guideline-icon">👗</div>
          <h2>Dress Respectfully</h2>
          <p>
            Wear clean and respectful clothing suitable for the temple
            and follow any specific dress code.
          </p>
        </div>

        <div className="guideline-card">
          <div className="guideline-icon">📸</div>
          <h2>Photography Rules</h2>
          <p>
            Check the temple's photography rules before taking photographs.
            Some areas may have restrictions.
          </p>
        </div>

        <div className="guideline-card">
          <div className="guideline-icon">🧹</div>
          <h2>Keep Clean</h2>
          <p>
            Do not litter. Use designated bins and help keep the temple
            premises clean.
          </p>
        </div>

        <div className="guideline-card">
          <div className="guideline-icon">🙏</div>
          <h2>Temple Etiquette</h2>
          <p>
            Maintain peace and follow the instructions given by temple
            staff and authorities.
          </p>
        </div>

        <div className="guideline-card">
          <div className="guideline-icon">🚫</div>
          <h2>Restricted Areas</h2>
          <p>
            Do not enter restricted areas. Follow signs and instructions
            regarding access.
          </p>
        </div>

        <div className="guideline-card">
          <div className="guideline-icon">⏰</div>
          <h2>Follow Timings</h2>
          <p>
            Check the latest darshan and temple timings before planning
            your visit.
          </p>
        </div>

      </div>

      <div className="guidelines-note">
        <h2>Important Note</h2>

        <p>
          Temple rules and timings can vary by location and may change
          during festivals or special occasions. Visitors should always
          follow the latest instructions provided by the temple authorities.
        </p>
      </div>

    </section>
  )
}

export default Guidelines