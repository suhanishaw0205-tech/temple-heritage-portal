import { useState } from 'react'
import './Admin.css'

function Admin({
  temples,
  onAddTemple,
  onUpdateTemple,
  onDeleteTemple,
  templeApprovalStatus,
  onTempleApprovalChange,

  festivals,
  onAddFestival,
  onUpdateFestival,
  onDeleteFestival,

  pilgrimagePlaces,
  onAddPilgrimage,
  onUpdatePilgrimage,
  onDeletePilgrimage
}) {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Recent temple records
  const [showAllTemples, setShowAllTemples] = useState(false)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [loginError, setLoginError] = useState('')

  // Temple forms
  const [showAddTemple, setShowAddTemple] = useState(false)
  const [showEditTemple, setShowEditTemple] = useState(false)
  const [showDeleteTemple, setShowDeleteTemple] = useState(false)

  // Festival forms
  const [showAddFestival, setShowAddFestival] = useState(false)
  const [showEditFestival, setShowEditFestival] = useState(false)
  const [showDeleteFestival, setShowDeleteFestival] = useState(false)

  // Pilgrimage forms
  const [showAddPilgrimage, setShowAddPilgrimage] = useState(false)
  const [showEditPilgrimage, setShowEditPilgrimage] = useState(false)
  const [showDeletePilgrimage, setShowDeletePilgrimage] = useState(false)

  // ================================
  // NEW TEMPLE
  // ================================

  const [newTemple, setNewTemple] = useState({
    name: '',
    city: '',
    state: '',
    deity: '',
    description: '',
    history: '',
    darshanTimings: '',
    rituals: '',
    templeFestivals: '',
    guidelines: '',
    pilgrimageInfo: ''
  })

  // ================================
  // EDIT TEMPLE
  // ================================

  const [oldTempleName, setOldTempleName] = useState('')

  const [editTemple, setEditTemple] = useState({
    name: '',
    city: '',
    state: '',
    deity: '',
    description: '',
    history: '',
    darshanTimings: '',
    rituals: '',
    templeFestivals: '',
    guidelines: '',
    pilgrimageInfo: ''
  })

  // ================================
  // DELETE TEMPLE
  // ================================

  const [deleteTempleName, setDeleteTempleName] = useState('')

  // ================================
  // NEW FESTIVAL
  // ================================

  const [newFestival, setNewFestival] = useState({
    name: '',
    place: '',
    icon: '🎉',
    description: '',
    traditions: ''
  })

  // ================================
  // EDIT FESTIVAL
  // ================================

  const [oldFestivalName, setOldFestivalName] = useState('')

  const [editFestival, setEditFestival] = useState({
    name: '',
    place: '',
    icon: '🎉',
    description: '',
    traditions: ''
  })

  // ================================
  // DELETE FESTIVAL
  // ================================

  const [deleteFestivalName, setDeleteFestivalName] = useState('')

  // ================================
  // NEW PILGRIMAGE
  // ================================

  const [newPilgrimage, setNewPilgrimage] = useState({
    name: '',
    location: '',
    icon: '🛕',
    route: '',
    transport: '',
    stay: ''
  })

  // ================================
  // EDIT PILGRIMAGE
  // ================================

  const [oldPilgrimageName, setOldPilgrimageName] = useState('')

  const [editPilgrimage, setEditPilgrimage] = useState({
    name: '',
    location: '',
    icon: '🛕',
    route: '',
    transport: '',
    stay: ''
  })

  // ================================
  // DELETE PILGRIMAGE
  // ================================

  const [deletePilgrimageName, setDeletePilgrimageName] = useState('')

  // ================================
  // LOGIN
  // ================================

  const handleLogin = (e) => {

    e.preventDefault()

    if (username === 'admin' && password === 'admin123') {

      setIsLoggedIn(true)
      setLoginError('')

    } else {

      setLoginError(
        'Invalid username or password. Please try again.'
      )

    }
  }

  // ================================
  // LOGOUT
  // ================================

  const handleLogout = () => {

    setIsLoggedIn(false)
    setUsername('')
    setPassword('')
    setLoginError('')
  }

  // ================================
  // ADD TEMPLE INPUT
  // ================================

  const handleTempleChange = (e) => {

    const { name, value } = e.target

    setNewTemple({
      ...newTemple,
      [name]: value
    })
  }

  // ================================
  // ADD TEMPLE
  // ================================

  const handleAddTemple = (e) => {

    e.preventDefault()

    if (
      !newTemple.name ||
      !newTemple.city ||
      !newTemple.state ||
      !newTemple.deity ||
      !newTemple.description
    ) {

      alert('Please fill all temple details.')

      return
    }

    onAddTemple(newTemple)

    alert(
      `${newTemple.name} added successfully! It is now pending approval.`
    )

    setNewTemple({
    name: '',
    city: '',
    state: '',
    deity: '',
    description: '',
    history: '',
    darshanTimings: '',
    rituals: '',
    templeFestivals: '',
    guidelines: '',
    pilgrimageInfo: ''
  })

    setShowAddTemple(false)
  }

  // ================================
  // OPEN EDIT TEMPLE
  // ================================

  const openEditTemple = () => {

    setShowAddTemple(false)
    setShowDeleteTemple(false)

    setShowAddFestival(false)
    setShowEditFestival(false)
    setShowDeleteFestival(false)

    setShowAddPilgrimage(false)
    setShowEditPilgrimage(false)
    setShowDeletePilgrimage(false)

    setShowEditTemple(true)

    if (temples.length > 0) {

      const firstTemple = temples[0]

      setOldTempleName(firstTemple.name)

      setEditTemple({
        name: firstTemple.name,
        city: firstTemple.city,
        state: firstTemple.state,
        deity: firstTemple.deity,
        description: firstTemple.description || '',
        history: firstTemple.history || '',
        darshanTimings: firstTemple.darshanTimings || '',
        rituals: firstTemple.rituals || '',
        templeFestivals: firstTemple.templeFestivals || '',
        guidelines: firstTemple.guidelines || '',
        pilgrimageInfo: firstTemple.pilgrimageInfo || ''
      })
    }
  }

  // ================================
  // SELECT TEMPLE FOR EDIT
  // ================================

  const handleSelectTemple = (e) => {

    const selectedName = e.target.value

    const selectedTemple = temples.find(
      (temple) => temple.name === selectedName
    )

    if (!selectedTemple) {
      return
    }

    setOldTempleName(selectedTemple.name)

    setEditTemple({
      name: selectedTemple.name,
      city: selectedTemple.city,
      state: selectedTemple.state,
      deity: selectedTemple.deity,
      description: selectedTemple.description || '',
      history: selectedTemple.history || '',
      darshanTimings: selectedTemple.darshanTimings || '',
      rituals: selectedTemple.rituals || '',
      templeFestivals: selectedTemple.templeFestivals || '',
      guidelines: selectedTemple.guidelines || '',
      pilgrimageInfo: selectedTemple.pilgrimageInfo || ''
    })
  }

  // ================================
  // EDIT TEMPLE INPUT
  // ================================

  const handleEditTempleChange = (e) => {

    const { name, value } = e.target

    setEditTemple({
      ...editTemple,
      [name]: value
    })
  }

  // ================================
  // UPDATE TEMPLE
  // ================================

  const handleUpdateTemple = (e) => {

    e.preventDefault()

    if (
      !editTemple.name ||
      !editTemple.city ||
      !editTemple.state ||
      !editTemple.deity ||
      !editTemple.description
    ) {

      alert('Please fill all temple details.')

      return
    }

    onUpdateTemple(
      editTemple,
      oldTempleName
    )

    alert(
      `${editTemple.name} updated successfully!`
    )

    setShowEditTemple(false)

    setOldTempleName('')

    setEditTemple({
    name: '',
    city: '',
    state: '',
    deity: '',
    description: '',
    history: '',
    darshanTimings: '',
    rituals: '',
    templeFestivals: '',
    guidelines: '',
    pilgrimageInfo: ''
  })
  }

  // ================================
  // OPEN DELETE TEMPLE
  // ================================

  const openDeleteTemple = () => {

    setShowAddTemple(false)
    setShowEditTemple(false)

    setShowAddFestival(false)
    setShowEditFestival(false)
    setShowDeleteFestival(false)

    setShowAddPilgrimage(false)
    setShowEditPilgrimage(false)
    setShowDeletePilgrimage(false)

    setShowDeleteTemple(true)

    if (temples.length > 0) {

      setDeleteTempleName(
        temples[0].name
      )

    } else {

      setDeleteTempleName('')
    }
  }

  // ================================
  // DELETE TEMPLE
  // ================================

  const handleDeleteTemple = (e) => {

    e.preventDefault()

    if (!deleteTempleName) {

      alert('Please select a temple to delete.')

      return
    }

    const selectedTemple = temples.find(
      (temple) => temple.name === deleteTempleName
    )

    if (!selectedTemple) {

      alert('Temple not found.')

      return
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${selectedTemple.name}"?`
    )

    if (!confirmDelete) {
      return
    }

    onDeleteTemple(
      selectedTemple.name
    )

    alert(
      `${selectedTemple.name} deleted successfully!`
    )

    setDeleteTempleName('')

    setShowDeleteTemple(false)
  }

  // ================================
  // OPEN ADD FESTIVAL
  // ================================

  const openAddFestival = () => {

    setShowAddTemple(false)
    setShowEditTemple(false)
    setShowDeleteTemple(false)

    setShowEditFestival(false)
    setShowDeleteFestival(false)

    setShowAddPilgrimage(false)
    setShowEditPilgrimage(false)
    setShowDeletePilgrimage(false)

    setNewFestival({
      name: '',
      place: '',
      icon: '🎉',
      description: '',
      traditions: ''
    })

    setShowAddFestival(true)
  }

  // ================================
  // ADD FESTIVAL INPUT
  // ================================

  const handleFestivalChange = (e) => {

    const { name, value } = e.target

    setNewFestival({
      ...newFestival,
      [name]: value
    })
  }

  // ================================
  // ADD FESTIVAL
  // ================================

  const handleAddFestival = (e) => {

    e.preventDefault()

    if (
      !newFestival.name ||
      !newFestival.place ||
      !newFestival.icon ||
      !newFestival.description ||
      !newFestival.traditions
    ) {

      alert('Please fill all festival details.')

      return
    }

    onAddFestival(newFestival)

    alert(
      `${newFestival.name} added successfully!`
    )

    setNewFestival({
      name: '',
      place: '',
      icon: '🎉',
      description: '',
      traditions: ''
    })

    setShowAddFestival(false)
  }

  // ================================
  // OPEN EDIT FESTIVAL
  // ================================

  const openEditFestival = () => {

    setShowAddTemple(false)
    setShowEditTemple(false)
    setShowDeleteTemple(false)

    setShowAddFestival(false)
    setShowDeleteFestival(false)

    setShowAddPilgrimage(false)
    setShowEditPilgrimage(false)
    setShowDeletePilgrimage(false)

    setShowEditFestival(true)

    if (festivals.length > 0) {

      const firstFestival = festivals[0]

      setOldFestivalName(
        firstFestival.name
      )

      setEditFestival({
        name: firstFestival.name,
        place: firstFestival.place,
        icon: firstFestival.icon,
        description: firstFestival.description,
        traditions: firstFestival.traditions
      })
    }
  }

  // ================================
  // SELECT FESTIVAL FOR EDIT
  // ================================

  const handleSelectFestival = (e) => {

    const selectedName = e.target.value

    const selectedFestival = festivals.find(
      (festival) => festival.name === selectedName
    )

    if (!selectedFestival) {
      return
    }

    setOldFestivalName(
      selectedFestival.name
    )

    setEditFestival({
      name: selectedFestival.name,
      place: selectedFestival.place,
      icon: selectedFestival.icon,
      description: selectedFestival.description,
      traditions: selectedFestival.traditions
    })
  }

  // ================================
  // EDIT FESTIVAL INPUT
  // ================================

  const handleEditFestivalChange = (e) => {

    const { name, value } = e.target

    setEditFestival({
      ...editFestival,
      [name]: value
    })
  }

  // ================================
  // UPDATE FESTIVAL
  // ================================

  const handleUpdateFestival = (e) => {

    e.preventDefault()

    if (
      !editFestival.name ||
      !editFestival.place ||
      !editFestival.icon ||
      !editFestival.description ||
      !editFestival.traditions
    ) {

      alert('Please fill all festival details.')

      return
    }

    onUpdateFestival(
      editFestival,
      oldFestivalName
    )

    alert(
      `${editFestival.name} updated successfully!`
    )

    setShowEditFestival(false)

    setOldFestivalName('')

    setEditFestival({
      name: '',
      place: '',
      icon: '🎉',
      description: '',
      traditions: ''
    })
  }

  // ================================
  // OPEN DELETE FESTIVAL
  // ================================

  const openDeleteFestival = () => {

    setShowAddTemple(false)
    setShowEditTemple(false)
    setShowDeleteTemple(false)

    setShowAddFestival(false)
    setShowEditFestival(false)

    setShowAddPilgrimage(false)
    setShowEditPilgrimage(false)
    setShowDeletePilgrimage(false)

    setShowDeleteFestival(true)

    if (festivals.length > 0) {

      setDeleteFestivalName(
        festivals[0].name
      )

    } else {

      setDeleteFestivalName('')
    }
  }

  // ================================
  // DELETE FESTIVAL
  // ================================

  const handleDeleteFestival = (e) => {

    e.preventDefault()

    if (!deleteFestivalName) {

      alert('Please select a festival to delete.')

      return
    }

    const selectedFestival = festivals.find(
      (festival) =>
        festival.name === deleteFestivalName
    )

    if (!selectedFestival) {

      alert('Festival not found.')

      return
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${selectedFestival.name}"?`
    )

    if (!confirmDelete) {
      return
    }

    onDeleteFestival(
      selectedFestival.name
    )

    alert(
      `${selectedFestival.name} deleted successfully!`
    )

    setDeleteFestivalName('')

    setShowDeleteFestival(false)
  }

  // ================================
  // OPEN ADD PILGRIMAGE
  // ================================

  const openAddPilgrimage = () => {

    setShowAddTemple(false)
    setShowEditTemple(false)
    setShowDeleteTemple(false)

    setShowAddFestival(false)
    setShowEditFestival(false)
    setShowDeleteFestival(false)

    setShowEditPilgrimage(false)
    setShowDeletePilgrimage(false)

    setNewPilgrimage({
      name: '',
      location: '',
      icon: '🛕',
      route: '',
      transport: '',
      stay: ''
    })

    setShowAddPilgrimage(true)
  }

  // ================================
  // ADD PILGRIMAGE INPUT
  // ================================

  const handlePilgrimageChange = (e) => {

    const { name, value } = e.target

    setNewPilgrimage({
      ...newPilgrimage,
      [name]: value
    })
  }

  // ================================
  // ADD PILGRIMAGE
  // ================================

  const handleAddPilgrimage = (e) => {

    e.preventDefault()

    if (
      !newPilgrimage.name ||
      !newPilgrimage.location ||
      !newPilgrimage.icon ||
      !newPilgrimage.route ||
      !newPilgrimage.transport ||
      !newPilgrimage.stay
    ) {

      alert('Please fill all pilgrimage details.')

      return
    }

    onAddPilgrimage(newPilgrimage)

    alert(
      `${newPilgrimage.name} added successfully!`
    )

    setNewPilgrimage({
      name: '',
      location: '',
      icon: '🛕',
      route: '',
      transport: '',
      stay: ''
    })

    setShowAddPilgrimage(false)
  }

  // ================================
  // OPEN EDIT PILGRIMAGE
  // ================================

  const openEditPilgrimage = () => {

    setShowAddTemple(false)
    setShowEditTemple(false)
    setShowDeleteTemple(false)

    setShowAddFestival(false)
    setShowEditFestival(false)
    setShowDeleteFestival(false)

    setShowAddPilgrimage(false)
    setShowDeletePilgrimage(false)

    setShowEditPilgrimage(true)

    if (pilgrimagePlaces.length > 0) {

      const firstPilgrimage = pilgrimagePlaces[0]

      setOldPilgrimageName(
        firstPilgrimage.name
      )

      setEditPilgrimage({
        name: firstPilgrimage.name,
        location: firstPilgrimage.location,
        icon: firstPilgrimage.icon,
        route: firstPilgrimage.route,
        transport: firstPilgrimage.transport,
        stay: firstPilgrimage.stay
      })
    }
  }

  // ================================
  // SELECT PILGRIMAGE FOR EDIT
  // ================================

  const handleSelectPilgrimage = (e) => {

    const selectedName = e.target.value

    const selectedPilgrimage = pilgrimagePlaces.find(
      (place) => place.name === selectedName
    )

    if (!selectedPilgrimage) {
      return
    }

    setOldPilgrimageName(
      selectedPilgrimage.name
    )

    setEditPilgrimage({
      name: selectedPilgrimage.name,
      location: selectedPilgrimage.location,
      icon: selectedPilgrimage.icon,
      route: selectedPilgrimage.route,
      transport: selectedPilgrimage.transport,
      stay: selectedPilgrimage.stay
    })
  }

  // ================================
  // EDIT PILGRIMAGE INPUT
  // ================================

  const handleEditPilgrimageChange = (e) => {

    const { name, value } = e.target

    setEditPilgrimage({
      ...editPilgrimage,
      [name]: value
    })
  }

  // ================================
  // UPDATE PILGRIMAGE
  // ================================

  const handleUpdatePilgrimage = (e) => {

    e.preventDefault()

    if (
      !editPilgrimage.name ||
      !editPilgrimage.location ||
      !editPilgrimage.icon ||
      !editPilgrimage.route ||
      !editPilgrimage.transport ||
      !editPilgrimage.stay
    ) {

      alert('Please fill all pilgrimage details.')

      return
    }

    onUpdatePilgrimage(
      editPilgrimage,
      oldPilgrimageName
    )

    alert(
      `${editPilgrimage.name} updated successfully!`
    )

    setShowEditPilgrimage(false)

    setOldPilgrimageName('')

    setEditPilgrimage({
      name: '',
      location: '',
      icon: '🛕',
      route: '',
      transport: '',
      stay: ''
    })
  }

  // ================================
  // OPEN DELETE PILGRIMAGE
  // ================================

  const openDeletePilgrimage = () => {

    setShowAddTemple(false)
    setShowEditTemple(false)
    setShowDeleteTemple(false)

    setShowAddFestival(false)
    setShowEditFestival(false)
    setShowDeleteFestival(false)

    setShowAddPilgrimage(false)
    setShowEditPilgrimage(false)

    setShowDeletePilgrimage(true)

    if (pilgrimagePlaces.length > 0) {

      setDeletePilgrimageName(
        pilgrimagePlaces[0].name
      )

    } else {

      setDeletePilgrimageName('')
    }
  }

  // ================================
  // DELETE PILGRIMAGE
  // ================================

  const handleDeletePilgrimage = (e) => {

    e.preventDefault()

    if (!deletePilgrimageName) {

      alert('Please select a pilgrimage to delete.')

      return
    }

    const selectedPilgrimage = pilgrimagePlaces.find(
      (place) =>
        place.name === deletePilgrimageName
    )

    if (!selectedPilgrimage) {

      alert('Pilgrimage not found.')

      return
    }

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${selectedPilgrimage.name}"?`
    )

    if (!confirmDelete) {
      return
    }

    onDeletePilgrimage(
      selectedPilgrimage.name
    )

    alert(
      `${selectedPilgrimage.name} deleted successfully!`
    )

    setDeletePilgrimageName('')

    setShowDeletePilgrimage(false)
  }

  // ================================
  // LOGIN SCREEN
  // ================================

  if (!isLoggedIn) {

    return (
      <section className="admin-login-page">

        <div className="admin-login-card">

          <div className="admin-login-icon">
            🛕
          </div>

          <p className="admin-login-label">
            TEMPLE YATRA
          </p>

          <h1>
            Admin Login
          </h1>

          <p className="admin-login-description">
            Login to access the Temple Yatra administration dashboard.
          </p>

          <form onSubmit={handleLogin}>

            <div className="admin-form-group">

              <label>
                Username
              </label>

              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />

            </div>

            <div className="admin-form-group">

              <label>
                Password
              </label>

              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </div>

            {loginError && (
              <div className="login-error">
                ⚠️ {loginError}
              </div>
            )}

            <button
              type="submit"
              className="admin-login-button"
            >
              Login to Dashboard →
            </button>

          </form>

          <div className="demo-login-info">

            <strong>
              Demo Login
            </strong>

            <p>
              Username: <b>admin</b>
            </p>

            <p>
              Password: <b>admin123</b>
            </p>

          </div>

        </div>

      </section>
    )
  }

  // ================================
  // ADMIN DASHBOARD
  // ================================

  return (
    <section className="admin-page">

      {/* ADMIN HEADER */}

      <div className="admin-header">

        <div>

          <p>
            ADMIN PANEL
          </p>

          <h1>
            Temple Yatra Dashboard
          </h1>

          <span>
            Manage temple information, festivals, pilgrimage content
            and visitor guidelines.
          </span>

        </div>

        <button
          className="admin-logout"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* DASHBOARD CARDS */}

      <div className="admin-stats">

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            🛕
          </div>

          <div>

            <span>
              Total Temples
            </span>

            <h2>
              {temples.length}
            </h2>

          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            🎉
          </div>

          <div>

            <span>
              Festivals
            </span>

            <h2>
              {festivals.length}
            </h2>

          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            🗺️
          </div>

          <div>

            <span>
              Pilgrimage Routes
            </span>

            <h2>
              {pilgrimagePlaces.length}
            </h2>

          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            ⏳
          </div>

          <div>

            <span>
              Pending Approval
            </span>

            <h2>
              {
                temples.filter(
                  (temple) =>
                    (templeApprovalStatus[temple.name] || 'Approved') ===
                    'Pending'
                ).length
              }
            </h2>

          </div>

        </div>

        <div className="admin-stat-card">

          <div className="admin-stat-icon">
            📋
          </div>

          <div>

            <span>
              Guidelines
            </span>

            <h2>
              6
            </h2>

          </div>

        </div>

      </div>

      {/* ================================
          ADD TEMPLE
          ================================ */}

      {showAddTemple && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                TEMPLE MANAGEMENT
              </p>

              <h2>
                Add New Temple
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowAddTemple(false)}
            >
              Cancel
            </button>

          </div>

          <form
            className="admin-temple-form"
            onSubmit={handleAddTemple}
          >

            <div className="admin-form-group">

              <label>
                Temple Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter temple name"
                value={newTemple.name}
                onChange={handleTempleChange}
              />

            </div>

            <div className="admin-form-row">

              <div className="admin-form-group">

                <label>
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  placeholder="Enter city"
                  value={newTemple.city}
                  onChange={handleTempleChange}
                />

              </div>

              <div className="admin-form-group">

                <label>
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  placeholder="Enter state"
                  value={newTemple.state}
                  onChange={handleTempleChange}
                />

              </div>

            </div>

            <div className="admin-form-group">

              <label>
                Deity
              </label>

              <input
                type="text"
                name="deity"
                placeholder="Enter deity"
                value={newTemple.deity}
                onChange={handleTempleChange}
              />

            </div>

            <div className="admin-form-group">

              <label>
                Description
              </label>

              <textarea
                name="description"
                placeholder="Enter temple description"
                value={newTemple.description}
                onChange={handleTempleChange}
                rows="5"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Historical Significance
              </label>

              <textarea
                name="history"
                placeholder="Enter historical significance"
                value={newTemple.history}
                onChange={handleTempleChange}
                rows="5"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Darshan Timings
              </label>

              <textarea
                name="darshanTimings"
                placeholder="Enter darshan timings"
                value={newTemple.darshanTimings}
                onChange={handleTempleChange}
                rows="5"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Rituals & Traditions
              </label>

              <textarea
                name="rituals"
                placeholder="Enter rituals and traditions"
                value={newTemple.rituals}
                onChange={handleTempleChange}
                rows="5"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Temple Festivals
              </label>

              <textarea
                name="templeFestivals"
                placeholder="Enter temple festivals"
                value={newTemple.templeFestivals}
                onChange={handleTempleChange}
                rows="5"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Visitor Guidelines
              </label>

              <textarea
                name="guidelines"
                placeholder="Enter visitor guidelines"
                value={newTemple.guidelines}
                onChange={handleTempleChange}
                rows="5"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Pilgrimage Information
              </label>

              <textarea
                name="pilgrimageInfo"
                placeholder="Enter pilgrimage information"
                value={newTemple.pilgrimageInfo}
                onChange={handleTempleChange}
                rows="5"
              />

            </div>

            <button
              type="submit"
              className="admin-login-button"
            >
              ➕ Add Temple
            </button>

          </form>

        </div>

      )}

      {/* ================================
          EDIT TEMPLE
          ================================ */}

      {showEditTemple && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                TEMPLE MANAGEMENT
              </p>

              <h2>
                Edit Temple
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowEditTemple(false)}
            >
              Cancel
            </button>

          </div>

          {temples.length === 0 ? (

            <div className="admin-note">

              <div className="admin-note-icon">
                ⚠️
              </div>

              <div>

                <h3>
                  No Temples Available
                </h3>

                <p>
                  Please add a temple first before editing.
                </p>

              </div>

            </div>

          ) : (

            <form
              className="admin-temple-form"
              onSubmit={handleUpdateTemple}
            >

              <div className="admin-form-group">

                <label>
                  Select Temple
                </label>

                <select
                  value={oldTempleName}
                  onChange={handleSelectTemple}
                >

                  {temples.map((temple) => (

                    <option
                      key={temple.name}
                      value={temple.name}
                    >
                      {temple.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="admin-form-group">

                <label>
                  Temple Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter temple name"
                  value={editTemple.name}
                  onChange={handleEditTempleChange}
                />

              </div>

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    placeholder="Enter city"
                    value={editTemple.city}
                    onChange={handleEditTempleChange}
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    State
                  </label>

                  <input
                    type="text"
                    name="state"
                    placeholder="Enter state"
                    value={editTemple.state}
                    onChange={handleEditTempleChange}
                  />

                </div>

              </div>

              <div className="admin-form-group">

                <label>
                  Deity
                </label>

                <input
                  type="text"
                  name="deity"
                  placeholder="Enter deity"
                  value={editTemple.deity}
                  onChange={handleEditTempleChange}
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Description
                </label>

                <textarea
                  name="description"
                  placeholder="Enter temple description"
                  value={editTemple.description}
                  onChange={handleEditTempleChange}
                  rows="5"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Historical Significance
                </label>

                <textarea
                  name="history"
                  placeholder="Enter historical significance"
                  value={editTemple.history}
                  onChange={handleEditTempleChange}
                  rows="5"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Darshan Timings
                </label>

                <textarea
                  name="darshanTimings"
                  placeholder="Enter darshan timings"
                  value={editTemple.darshanTimings}
                  onChange={handleEditTempleChange}
                  rows="5"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Rituals & Traditions
                </label>

                <textarea
                  name="rituals"
                  placeholder="Enter rituals and traditions"
                  value={editTemple.rituals}
                  onChange={handleEditTempleChange}
                  rows="5"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Temple Festivals
                </label>

                <textarea
                  name="templeFestivals"
                  placeholder="Enter temple festivals"
                  value={editTemple.templeFestivals}
                  onChange={handleEditTempleChange}
                  rows="5"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Visitor Guidelines
                </label>

                <textarea
                  name="guidelines"
                  placeholder="Enter visitor guidelines"
                  value={editTemple.guidelines}
                  onChange={handleEditTempleChange}
                  rows="5"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Pilgrimage Information
                </label>

                <textarea
                  name="pilgrimageInfo"
                  placeholder="Enter pilgrimage information"
                  value={editTemple.pilgrimageInfo}
                  onChange={handleEditTempleChange}
                  rows="5"
                />

              </div>

              <button
                type="submit"
                className="admin-login-button"
              >
                ✏️ Update Temple
              </button>

            </form>

          )}

        </div>

      )}

      {/* ================================
          DELETE TEMPLE
          ================================ */}

      {showDeleteTemple && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                TEMPLE MANAGEMENT
              </p>

              <h2>
                Delete Temple
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowDeleteTemple(false)}
            >
              Cancel
            </button>

          </div>

          {temples.length === 0 ? (

            <div className="admin-note">

              <div className="admin-note-icon">
                ⚠️
              </div>

              <div>

                <h3>
                  No Temples Available
                </h3>

                <p>
                  There are no temples available to delete.
                </p>

              </div>

            </div>

          ) : (

            <form
              className="admin-temple-form"
              onSubmit={handleDeleteTemple}
            >

              <div className="admin-form-group">

                <label>
                  Select Temple to Delete
                </label>

                <select
                  value={deleteTempleName}
                  onChange={(e) =>
                    setDeleteTempleName(e.target.value)
                  }
                >

                  {temples.map((temple) => (

                    <option
                      key={temple.name}
                      value={temple.name}
                    >
                      {temple.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="admin-note">

                <div className="admin-note-icon">
                  ⚠️
                </div>

                <div>

                  <h3>
                    Warning
                  </h3>

                  <p>
                    Deleting a temple will remove it from the
                    Temples section and Saved Temples section.
                  </p>

                </div>

              </div>

              <button
                type="submit"
                className="admin-delete-button"
              >
                🗑️ Delete Temple
              </button>

            </form>

          )}

        </div>

      )}

      {/* ================================
          ADD FESTIVAL
          ================================ */}

      {showAddFestival && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                FESTIVAL MANAGEMENT
              </p>

              <h2>
                Add New Festival
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowAddFestival(false)}
            >
              Cancel
            </button>

          </div>

          <form
            className="admin-temple-form"
            onSubmit={handleAddFestival}
          >

            <div className="admin-form-group">

              <label>
                Festival Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter festival name"
                value={newFestival.name}
                onChange={handleFestivalChange}
              />

            </div>

            <div className="admin-form-row">

              <div className="admin-form-group">

                <label>
                  Place
                </label>

                <input
                  type="text"
                  name="place"
                  placeholder="Enter place"
                  value={newFestival.place}
                  onChange={handleFestivalChange}
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Icon
                </label>

                <input
                  type="text"
                  name="icon"
                  placeholder="Example: 🎉"
                  value={newFestival.icon}
                  onChange={handleFestivalChange}
                />

              </div>

            </div>

            <div className="admin-form-group">

              <label>
                About the Festival
              </label>

              <textarea
                name="description"
                placeholder="Enter festival description"
                value={newFestival.description}
                onChange={handleFestivalChange}
                rows="5"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Traditions
              </label>

              <textarea
                name="traditions"
                placeholder="Enter festival traditions"
                value={newFestival.traditions}
                onChange={handleFestivalChange}
                rows="5"
              />

            </div>

            <button
              type="submit"
              className="admin-login-button"
            >
              ➕ Add Festival
            </button>

          </form>

        </div>

      )}

      {/* ================================
          EDIT FESTIVAL
          ================================ */}

      {showEditFestival && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                FESTIVAL MANAGEMENT
              </p>

              <h2>
                Edit Festival
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowEditFestival(false)}
            >
              Cancel
            </button>

          </div>

          {festivals.length === 0 ? (

            <div className="admin-note">

              <div className="admin-note-icon">
                ⚠️
              </div>

              <div>

                <h3>
                  No Festivals Available
                </h3>

                <p>
                  Please add a festival first before editing.
                </p>

              </div>

            </div>

          ) : (

            <form
              className="admin-temple-form"
              onSubmit={handleUpdateFestival}
            >

              <div className="admin-form-group">

                <label>
                  Select Festival
                </label>

                <select
                  value={oldFestivalName}
                  onChange={handleSelectFestival}
                >

                  {festivals.map((festival) => (

                    <option
                      key={festival.name}
                      value={festival.name}
                    >
                      {festival.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="admin-form-group">

                <label>
                  Festival Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter festival name"
                  value={editFestival.name}
                  onChange={handleEditFestivalChange}
                />

              </div>

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Place
                  </label>

                  <input
                    type="text"
                    name="place"
                    placeholder="Enter place"
                    value={editFestival.place}
                    onChange={handleEditFestivalChange}
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Icon
                  </label>

                  <input
                    type="text"
                    name="icon"
                    placeholder="Example: 🎉"
                    value={editFestival.icon}
                    onChange={handleEditFestivalChange}
                  />

                </div>

              </div>

              <div className="admin-form-group">

                <label>
                  About the Festival
                </label>

                <textarea
                  name="description"
                  placeholder="Enter festival description"
                  value={editFestival.description}
                  onChange={handleEditFestivalChange}
                  rows="5"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Traditions
                </label>

                <textarea
                  name="traditions"
                  placeholder="Enter festival traditions"
                  value={editFestival.traditions}
                  onChange={handleEditFestivalChange}
                  rows="5"
                />

              </div>

              <button
                type="submit"
                className="admin-login-button"
              >
                ✏️ Update Festival
              </button>

            </form>

          )}

        </div>

      )}

      {/* ================================
          DELETE FESTIVAL
          ================================ */}

      {showDeleteFestival && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                FESTIVAL MANAGEMENT
              </p>

              <h2>
                Delete Festival
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowDeleteFestival(false)}
            >
              Cancel
            </button>

          </div>

          {festivals.length === 0 ? (

            <div className="admin-note">

              <div className="admin-note-icon">
                ⚠️
              </div>

              <div>

                <h3>
                  No Festivals Available
                </h3>

                <p>
                  There are no festivals available to delete.
                </p>

              </div>

            </div>

          ) : (

            <form
              className="admin-temple-form"
              onSubmit={handleDeleteFestival}
            >

              <div className="admin-form-group">

                <label>
                  Select Festival to Delete
                </label>

                <select
                  value={deleteFestivalName}
                  onChange={(e) =>
                    setDeleteFestivalName(e.target.value)
                  }
                >

                  {festivals.map((festival) => (

                    <option
                      key={festival.name}
                      value={festival.name}
                    >
                      {festival.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="admin-note">

                <div className="admin-note-icon">
                  ⚠️
                </div>

                <div>

                  <h3>
                    Warning
                  </h3>

                  <p>
                    Deleting a festival will permanently remove
                    it from the Festivals section.
                  </p>

                </div>

              </div>

              <button
                type="submit"
                className="admin-delete-button"
              >
                🗑️ Delete Festival
              </button>

            </form>

          )}

        </div>

      )}

      {/* ================================
          ADD PILGRIMAGE
          ================================ */}

      {showAddPilgrimage && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                PILGRIMAGE MANAGEMENT
              </p>

              <h2>
                Add New Pilgrimage
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowAddPilgrimage(false)}
            >
              Cancel
            </button>

          </div>

          <form
            className="admin-temple-form"
            onSubmit={handleAddPilgrimage}
          >

            <div className="admin-form-group">

              <label>
                Pilgrimage Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter pilgrimage name"
                value={newPilgrimage.name}
                onChange={handlePilgrimageChange}
              />

            </div>

            <div className="admin-form-row">

              <div className="admin-form-group">

                <label>
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  placeholder="Enter location"
                  value={newPilgrimage.location}
                  onChange={handlePilgrimageChange}
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Icon
                </label>

                <input
                  type="text"
                  name="icon"
                  placeholder="Example: 🛕"
                  value={newPilgrimage.icon}
                  onChange={handlePilgrimageChange}
                />

              </div>

            </div>

            <div className="admin-form-group">

              <label>
                Route
              </label>

              <textarea
                name="route"
                placeholder="Enter pilgrimage route"
                value={newPilgrimage.route}
                onChange={handlePilgrimageChange}
                rows="4"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Transportation
              </label>

              <textarea
                name="transport"
                placeholder="Enter transportation information"
                value={newPilgrimage.transport}
                onChange={handlePilgrimageChange}
                rows="4"
              />

            </div>

            <div className="admin-form-group">

              <label>
                Accommodation
              </label>

              <textarea
                name="stay"
                placeholder="Enter accommodation information"
                value={newPilgrimage.stay}
                onChange={handlePilgrimageChange}
                rows="4"
              />

            </div>

            <button
              type="submit"
              className="admin-login-button"
            >
              ➕ Add Pilgrimage
            </button>

          </form>

        </div>

      )}

      {/* ================================
          EDIT PILGRIMAGE
          ================================ */}

      {showEditPilgrimage && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                PILGRIMAGE MANAGEMENT
              </p>

              <h2>
                Edit Pilgrimage
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowEditPilgrimage(false)}
            >
              Cancel
            </button>

          </div>

          {pilgrimagePlaces.length === 0 ? (

            <div className="admin-note">

              <div className="admin-note-icon">
                ⚠️
              </div>

              <div>

                <h3>
                  No Pilgrimage Routes Available
                </h3>

                <p>
                  Please add a pilgrimage route first before editing.
                </p>

              </div>

            </div>

          ) : (

            <form
              className="admin-temple-form"
              onSubmit={handleUpdatePilgrimage}
            >

              <div className="admin-form-group">

                <label>
                  Select Pilgrimage
                </label>

                <select
                  value={oldPilgrimageName}
                  onChange={handleSelectPilgrimage}
                >

                  {pilgrimagePlaces.map((place) => (

                    <option
                      key={place.name}
                      value={place.name}
                    >
                      {place.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="admin-form-group">

                <label>
                  Pilgrimage Name
                </label>

                <input
                  type="text"
                  name="name"
                  placeholder="Enter pilgrimage name"
                  value={editPilgrimage.name}
                  onChange={handleEditPilgrimageChange}
                />

              </div>

              <div className="admin-form-row">

                <div className="admin-form-group">

                  <label>
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    placeholder="Enter location"
                    value={editPilgrimage.location}
                    onChange={handleEditPilgrimageChange}
                  />

                </div>

                <div className="admin-form-group">

                  <label>
                    Icon
                  </label>

                  <input
                    type="text"
                    name="icon"
                    placeholder="Example: 🛕"
                    value={editPilgrimage.icon}
                    onChange={handleEditPilgrimageChange}
                  />

                </div>

              </div>

              <div className="admin-form-group">

                <label>
                  Route
                </label>

                <textarea
                  name="route"
                  placeholder="Enter pilgrimage route"
                  value={editPilgrimage.route}
                  onChange={handleEditPilgrimageChange}
                  rows="4"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Transportation
                </label>

                <textarea
                  name="transport"
                  placeholder="Enter transportation information"
                  value={editPilgrimage.transport}
                  onChange={handleEditPilgrimageChange}
                  rows="4"
                />

              </div>

              <div className="admin-form-group">

                <label>
                  Accommodation
                </label>

                <textarea
                  name="stay"
                  placeholder="Enter accommodation information"
                  value={editPilgrimage.stay}
                  onChange={handleEditPilgrimageChange}
                  rows="4"
                />

              </div>

              <button
                type="submit"
                className="admin-login-button"
              >
                ✏️ Update Pilgrimage
              </button>

            </form>

          )}

        </div>

      )}

      {/* ================================
          DELETE PILGRIMAGE
          ================================ */}

      {showDeletePilgrimage && (

        <div className="admin-section">

          <div className="admin-section-header">

            <div>

              <p>
                PILGRIMAGE MANAGEMENT
              </p>

              <h2>
                Delete Pilgrimage
              </h2>

            </div>

            <button
              className="view-all-button"
              onClick={() => setShowDeletePilgrimage(false)}
            >
              Cancel
            </button>

          </div>

          {pilgrimagePlaces.length === 0 ? (

            <div className="admin-note">

              <div className="admin-note-icon">
                ⚠️
              </div>

              <div>

                <h3>
                  No Pilgrimage Routes Available
                </h3>

                <p>
                  There are no pilgrimage routes available to delete.
                </p>

              </div>

            </div>

          ) : (

            <form
              className="admin-temple-form"
              onSubmit={handleDeletePilgrimage}
            >

              <div className="admin-form-group">

                <label>
                  Select Pilgrimage to Delete
                </label>

                <select
                  value={deletePilgrimageName}
                  onChange={(e) =>
                    setDeletePilgrimageName(e.target.value)
                  }
                >

                  {pilgrimagePlaces.map((place) => (

                    <option
                      key={place.name}
                      value={place.name}
                    >
                      {place.name}
                    </option>

                  ))}

                </select>

              </div>

              <div className="admin-note">

                <div className="admin-note-icon">
                  ⚠️
                </div>

                <div>

                  <h3>
                    Warning
                  </h3>

                  <p>
                    Deleting a pilgrimage route will permanently
                    remove it from the Pilgrimage section.
                  </p>

                </div>

              </div>

              <button
                type="submit"
                className="admin-delete-button"
              >
                🗑️ Delete Pilgrimage
              </button>

            </form>

          )}

        </div>

      )}

      {/* ================================
          QUICK ACTIONS
          ================================ */}

      {!showAddTemple &&
        !showEditTemple &&
        !showDeleteTemple &&
        !showAddFestival &&
        !showEditFestival &&
        !showDeleteFestival &&
        !showAddPilgrimage &&
        !showEditPilgrimage &&
        !showDeletePilgrimage && (

          <div className="admin-section">

            <div className="admin-section-header">

              <div>

                <p>
                  CONTENT MANAGEMENT
                </p>

                <h2>
                  Quick Actions
                </h2>

              </div>

            </div>

            <div className="admin-actions-grid">

              {/* ADD TEMPLE */}

              <button
                className="admin-action-card"
                onClick={() => setShowAddTemple(true)}
              >

                <span>
                  ➕
                </span>

                <div>

                  <h3>
                    Add Temple
                  </h3>

                  <p>
                    Add a new temple and its information.
                  </p>

                </div>

              </button>

              {/* EDIT TEMPLE */}

              <button
                className="admin-action-card"
                onClick={openEditTemple}
              >

                <span>
                  ✏️
                </span>

                <div>

                  <h3>
                    Edit Temple
                  </h3>

                  <p>
                    Update existing temple information.
                  </p>

                </div>

              </button>

              {/* DELETE TEMPLE */}

              <button
                className="admin-action-card"
                onClick={openDeleteTemple}
              >

                <span>
                  🗑️
                </span>

                <div>

                  <h3>
                    Delete Temple
                  </h3>

                  <p>
                    Remove a temple from the portal.
                  </p>

                </div>

              </button>

              {/* ADD FESTIVAL */}

              <button
                className="admin-action-card"
                onClick={openAddFestival}
              >

                <span>
                  ➕
                </span>

                <div>

                  <h3>
                    Add Festival
                  </h3>

                  <p>
                    Add a new festival and its information.
                  </p>

                </div>

              </button>

              {/* EDIT FESTIVAL */}

              <button
                className="admin-action-card"
                onClick={openEditFestival}
              >

                <span>
                  ✏️
                </span>

                <div>

                  <h3>
                    Edit Festival
                  </h3>

                  <p>
                    Update existing festival information.
                  </p>

                </div>

              </button>

              {/* DELETE FESTIVAL */}

              <button
                className="admin-action-card"
                onClick={openDeleteFestival}
              >

                <span>
                  🗑️
                </span>

                <div>

                  <h3>
                    Delete Festival
                  </h3>

                  <p>
                    Remove a festival from the portal.
                  </p>

                </div>

              </button>

              {/* ADD PILGRIMAGE */}

              <button
                className="admin-action-card"
                onClick={openAddPilgrimage}
              >

                <span>
                  ➕
                </span>

                <div>

                  <h3>
                    Add Pilgrimage
                  </h3>

                  <p>
                    Add a new pilgrimage route and travel information.
                  </p>

                </div>

              </button>

              {/* EDIT PILGRIMAGE */}

              <button
                className="admin-action-card"
                onClick={openEditPilgrimage}
              >

                <span>
                  ✏️
                </span>

                <div>

                  <h3>
                    Edit Pilgrimage
                  </h3>

                  <p>
                    Update existing pilgrimage information.
                  </p>

                </div>

              </button>

              {/* DELETE PILGRIMAGE */}

              <button
                className="admin-action-card"
                onClick={openDeletePilgrimage}
              >

                <span>
                  🗑️
                </span>

                <div>

                  <h3>
                    Delete Pilgrimage
                  </h3>

                  <p>
                    Remove a pilgrimage route from the portal.
                  </p>

                </div>

              </button>

            </div>

          </div>

        )}

      {/* ================================
          RECENT CONTENT
          ================================ */}

      <div className="admin-section">

        <div className="admin-section-header">

          <div>

            <p>
              RECENT CONTENT
            </p>

            <h2>
              Temple Records
            </h2>

          </div>

          <button
            className="view-all-button"
            onClick={() =>
              setShowAllTemples((previous) => !previous)
            }
          >
            {showAllTemples ? 'Show Recent' : 'View All'}
          </button>

        </div>

        <div className="admin-table-wrapper">

          <table className="admin-table">

            <thead>

              <tr>

                <th>
                  Temple
                </th>

                <th>
                  City
                </th>

                <th>
                  State
                </th>

                <th>
                  Deity
                </th>

                <th>
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {(showAllTemples
                ? temples
                : temples.slice(0, 5)
              ).map((temple) => (

                <tr key={temple.name}>

                  <td>
                    {temple.name}
                  </td>

                  <td>
                    {temple.city}
                  </td>

                  <td>
                    {temple.state}
                  </td>

                  <td>
                    {temple.deity}
                  </td>

                  <td>

                    <select
                      value={
                        templeApprovalStatus[temple.name] ||
                        'Approved'
                      }
                      onChange={(e) =>
                        onTempleApprovalChange(
                          temple.name,
                          e.target.value
                        )
                      }
                      style={{
                        padding: '7px 10px',
                        borderRadius: '7px',
                        border: '1px solid #dfc9b8',
                        background: '#ffffff',
                        color: '#4b2415',
                        fontWeight: '600',
                        cursor: 'pointer'
                      }}
                    >

                      <option value="Pending">
                        Pending
                      </option>

                      <option value="Approved">
                        Approved
                      </option>

                      <option value="Rejected">
                        Rejected
                      </option>

                    </select>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* ================================
          APPROVAL WORKFLOW NOTE
          ================================ */}

      <div className="admin-note">

        <div className="admin-note-icon">
          🔄
        </div>

        <div>

          <h3>
            Content Approval Workflow
          </h3>

          <p>
            New temple records start with Pending status.
            Admin can review each temple record and change its
            status to Approved or Rejected from the Temple Records table.
          </p>

        </div>

      </div>

      {/* ================================
          ADMIN NOTE
          ================================ */}


      <div className="admin-note">

        <div className="admin-note-icon">
          💡
        </div>

        <div>

          <h3>
            Admin Dashboard
          </h3>

          <p>
            <p>
            This dashboard is connected to the project backend.
            Temple records are stored and managed through the MongoDB database.
            </p>
          </p>

        </div>

      </div>

    </section>
  )
}

export default Admin