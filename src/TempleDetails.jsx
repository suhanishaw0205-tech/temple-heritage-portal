import './TempleDetails.css'

function TempleDetails({ temple, onBack }) {
  return (
    <section className="details-page">

      <button className="back-button" onClick={onBack}>
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

          {temple.darshanTimings.split('\n').map((timing) => (
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
            <li>🏨 Hotels and guest houses</li>
            <li>🍽️ Restaurants and food facilities</li>
            <li>🚕 Local taxi and transport services</li>
            <li>🏥 Medical facilities</li>
            <li>🛍️ Local shops and essential services</li>
          </ul>

          <small>
            Visitors should check current local availability before travelling.
          </small>
        </div>

      </div>

    </section>
  )
}

export default TempleDetails