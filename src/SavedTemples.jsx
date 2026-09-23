import './SavedTemples.css'

function SavedTemples({ savedTemples, onRemove }) {
  return (
    <section className="saved-temples-page">

      <div className="saved-temples-header">
        <p>YOUR SAVED PLACES</p>

        <h1>Saved Temples</h1>

        <span>
          Keep your favourite temples saved for your pilgrimage planning.
        </span>
      </div>

      {savedTemples.length === 0 ? (
        <div className="empty-saved-temples">
          <div className="empty-icon">🔖</div>

          <h2>No Saved Temples Yet</h2>

          <p>
            Go to the Temples section and click "Save Temple"
            to add your favourite temples here.
          </p>
        </div>
      ) : (
        <div className="saved-temples-grid">

          {savedTemples.map((temple) => (
            <div className="saved-temple-card" key={temple.name}>

              <div className="saved-temple-image">
                🛕
              </div>

              <div className="saved-temple-content">

                <span className="saved-state-tag">
                  {temple.state}
                </span>

                <h2>{temple.name}</h2>

                <p className="saved-location">
                  📍 {temple.city} • 🙏 {temple.deity}
                </p>

                <p className="saved-description">
                  {temple.description}
                </p>

                <button
                  className="remove-save-button"
                  onClick={() => onRemove(temple.name)}
                >
                  🗑️ Remove from Saved
                </button>

              </div>

            </div>
          ))}

        </div>
      )}

    </section>
  )
}

export default SavedTemples