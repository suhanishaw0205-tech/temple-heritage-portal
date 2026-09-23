import { useState } from 'react'
import './Temples.css'
import TempleDetails from './TempleDetails'

function Temples({ temples, savedTemples, onToggleSave }) {

  const [search, setSearch] = useState('')
  const [state, setState] = useState('All States')
  const [deity, setDeity] = useState('All Deities')
  const [selectedTemple, setSelectedTemple] = useState(null)

  // Share temple function
  const shareTemple = async (temple) => {

    const shareText =
      `${temple.name} - ${temple.city}, ${temple.state}. ` +
      `Explore this sacred temple on Temple Yatra.`

    if (navigator.share) {

      try {
        await navigator.share({
          title: temple.name,
          text: shareText,
        })
      } catch (error) {
        console.log('Share cancelled')
      }

    } else {

      try {

        await navigator.clipboard.writeText(shareText)

        alert('Temple information copied to clipboard!')

      } catch (error) {

        alert('Unable to share temple information.')

      }
    }
  }

  const filteredTemples = temples.filter((temple) => {

    const searchText = search.toLowerCase().trim()

    const matchesSearch =
      temple.name.toLowerCase().includes(searchText) ||
      temple.city.toLowerCase().includes(searchText) ||
      temple.state.toLowerCase().includes(searchText) ||
      temple.deity.toLowerCase().includes(searchText)

    const matchesState =
      state === 'All States' || state === temple.state

    const matchesDeity =
      deity === 'All Deities' || deity === temple.deity

    return matchesSearch && matchesState && matchesDeity
  })

  const clearFilters = () => {
    setSearch('')
    setState('All States')
    setDeity('All Deities')
  }

  const hasActiveFilters =
    search !== '' ||
    state !== 'All States' ||
    deity !== 'All Deities'

  if (selectedTemple) {
    return (
      <TempleDetails
        temple={selectedTemple}
        onBack={() => setSelectedTemple(null)}
      />
    )
  }

  return (
    <section className="temples-page">

      <div className="temples-header">

        <p>EXPLORE SACRED PLACES</p>

        <h1>Temples of India</h1>

        <span>
          Discover sacred temples, their history, traditions and spiritual
          significance.
        </span>

      </div>

      <div className="temple-filters">

        <input
          type="text"
          placeholder="Search temple, city or deity..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option>All States</option>
          <option>Uttar Pradesh</option>
          <option>Odisha</option>
          <option>Tamil Nadu</option>
          <option>Andhra Pradesh</option>
          <option>Gujarat</option>
          <option>Uttarakhand</option>
        </select>

        <select
          value={deity}
          onChange={(e) => setDeity(e.target.value)}
        >
          <option>All Deities</option>
          <option>Lord Shiva</option>
          <option>Lord Jagannath</option>
          <option>Goddess Meenakshi</option>
          <option>Lord Venkateswara</option>
        </select>

        <button
          type="button"
          onClick={clearFilters}
          disabled={!hasActiveFilters}
          style={{
            height: '48px',
            padding: '0 18px',
            border: '1px solid #dfc9b8',
            borderRadius: '10px',
            background: hasActiveFilters ? '#8d3f22' : '#eee5df',
            color: hasActiveFilters ? '#ffffff' : '#9a8b83',
            fontSize: '15px',
            fontWeight: '600',
            cursor: hasActiveFilters ? 'pointer' : 'not-allowed',
          }}
        >
          Clear Filters
        </button>

      </div>

      <div className="temples-result">

        <span>
          Showing {filteredTemples.length} temples
        </span>

        <span>
          🔖 Saved: {savedTemples.length}
        </span>

      </div>

      <div className="all-temples-grid">

        {filteredTemples.map((temple) => {

          const isSaved = savedTemples.some(
            (savedTemple) => savedTemple.name === temple.name
          )

          return (
            <div
              className="temple-list-card"
              key={temple.name}
            >

              <div className="temple-list-image">
                🛕
              </div>

              <div className="temple-list-content">

                <span className="state-tag">
                  {temple.state}
                </span>

                <h2>{temple.name}</h2>

                <p className="temple-location">
                  📍 {temple.city} • {temple.deity}
                </p>

                <p className="temple-description">
                  {temple.description}
                </p>

                <div className="temple-card-buttons">

                  <button
                    onClick={() => setSelectedTemple(temple)}
                  >
                    View Details →
                  </button>

                  <button
                    className="save-button"
                    onClick={() => onToggleSave(temple)}
                  >
                    {isSaved ? '🔖 Saved' : '🔖 Save Temple'}
                  </button>

                  <button
                    className="share-button"
                    onClick={() => shareTemple(temple)}
                  >
                    📤 Share
                  </button>

                </div>

              </div>

            </div>
          )
        })}

      </div>

      {filteredTemples.length === 0 && (
        <div className="no-results">

          <h2>No temples found</h2>

          <p>
            Try changing your search or filters.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            style={{
              marginTop: '15px',
              padding: '11px 18px',
              border: 'none',
              borderRadius: '7px',
              background: '#8d3f22',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Clear Filters
          </button>

        </div>
      )}

    </section>
  )
}

export default Temples
