import './Pilgrimage.css'

function Pilgrimage({ pilgrimagePlaces }) {

  return (
    <section className="pilgrimage-page">

      <div className="pilgrimage-header">

        <p>
          PLAN YOUR SPIRITUAL JOURNEY
        </p>

        <h1>
          Pilgrimage Information
        </h1>

        <span>
          Plan your temple journey with route information, transportation,
          accommodation and useful travel guidance.
        </span>

      </div>


      <div className="pilgrimage-grid">

        {pilgrimagePlaces.map((place) => (

          <div
            className="pilgrimage-card"
            key={place.name}
          >

            <div className="pilgrimage-icon">
              {place.icon}
            </div>

            <span className="pilgrimage-location">
              📍 {place.location}
            </span>

            <h2>
              {place.name}
            </h2>

            <div className="pilgrimage-info">

              <div>

                <h3>
                  🗺️ Route
                </h3>

                <p>
                  {place.route}
                </p>

              </div>


              <div>

                <h3>
                  🚆 Transportation
                </h3>

                <p>
                  {place.transport}
                </p>

              </div>


              <div>

                <h3>
                  🏨 Accommodation
                </h3>

                <p>
                  {place.stay}
                </p>

              </div>

            </div>

          </div>

        ))}

      </div>


      <div className="travel-tips">

        <h2>
          🙏 Pilgrimage Travel Tips
        </h2>

        <div className="tips-grid">

          <div>

            <span>
              01
            </span>

            <p>
              Check temple timings before starting your journey.
            </p>

          </div>


          <div>

            <span>
              02
            </span>

            <p>
              Carry essential documents, medicines and personal items.
            </p>

          </div>


          <div>

            <span>
              03
            </span>

            <p>
              Book accommodation and transportation in advance during peak seasons.
            </p>

          </div>


          <div>

            <span>
              04
            </span>

            <p>
              Follow local temple rules and respect the surrounding environment.
            </p>

          </div>

        </div>


        <small>
          Travel information shown here is for project demonstration.
          Visitors should verify current routes, timings and availability
          before travelling.
        </small>

      </div>

    </section>
  )
}

export default Pilgrimage