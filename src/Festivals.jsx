import './Festivals.css'

function Festivals({ festivals }) {
  return (
    <section className="festivals-page">

      <div className="festivals-header">

        <p>CELEBRATE INDIA'S TRADITIONS</p>

        <h1>Festivals of India</h1>

        <span>
          Discover the traditions, cultural significance and celebrations
          connected with India's famous temple festivals.
        </span>

      </div>

      <div className="festivals-grid">

        {festivals.map((festival) => (

          <div
            className="festival-detail-card"
            key={festival.name}
          >

            <div className="festival-detail-icon">
              {festival.icon}
            </div>

            <span className="festival-place">
              📍 {festival.place}
            </span>

            <h2>
              {festival.name}
            </h2>

            <div className="festival-detail-info">

              <div>

                <h3>
                  📖 About the Festival
                </h3>

                <p>
                  {festival.description}
                </p>

              </div>

              <div>

                <h3>
                  🙏 Traditions
                </h3>

                <p>
                  {festival.traditions}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>

      <div className="festival-note">

        <h2>
          🌺 Experience India's Heritage
        </h2>

        <p>
          Temple festivals bring together spirituality, culture, art,
          traditions and local communities. Festival dates and temple
          programmes may vary each year, so visitors should check the
          latest information before planning a visit.
        </p>

      </div>

    </section>
  )
}

export default Festivals