import { useEffect, useState } from 'react'
import './App.css'
import API_BASE_URL from './config'
import Temples from './Temples'
import Guidelines from './Guidelines'
import Pilgrimage from './Pilgrimage'
import Festivals from './Festivals'
import SavedTemples from './SavedTemples'
import Admin from './Admin'
import Auth from './Auth'
import LearningHub from './LearningHub'

function App() {
  const [activeSection, setActiveSection] =
    useState('home')

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser =
      localStorage.getItem('heritageCurrentUser')

    return savedUser
      ? JSON.parse(savedUser)
      : null
  })

  const [temples, setTemples] = useState([])
  const [isLoadingTemples, setIsLoadingTemples] =
    useState(true)

  const [savedTemples, setSavedTemples] =
    useState([])

  const [templeApprovalStatus, setTempleApprovalStatus] =
    useState({})

  const [festivals, setFestivals] =
    useState([])

  const [isLoadingFestivals, setIsLoadingFestivals] =
    useState(true)

  const [pilgrimagePlaces, setPilgrimagePlaces] =
    useState([])

  const [isLoadingPilgrimage, setIsLoadingPilgrimage] =
    useState(true)

  // =========================================
  // SAVED TEMPLES STORAGE HELPERS
  // =========================================

  function getSavedTemplesStorageKey(
    user = currentUser
  ) {
    if (!user?.email) {
      return null
    }

    return `heritageSavedTemples_${user.email}`
  }

  function loadSavedTemplesFromStorage(
    user = currentUser
  ) {
    const storageKey =
      getSavedTemplesStorageKey(user)

    if (!storageKey) {
      return []
    }

    try {
      const storedSavedTemples =
        localStorage.getItem(storageKey)

      if (!storedSavedTemples) {
        return []
      }

      const parsedSavedTemples =
        JSON.parse(storedSavedTemples)

      return Array.isArray(parsedSavedTemples)
        ? parsedSavedTemples
        : []
    } catch (error) {
      console.error(
        'Failed to load saved temples from browser storage:',
        error
      )

      return []
    }
  }

  function saveSavedTemplesToStorage(
    nextSavedTemples,
    user = currentUser
  ) {
    const storageKey =
      getSavedTemplesStorageKey(user)

    if (!storageKey) {
      return
    }

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(nextSavedTemples)
      )
    } catch (error) {
      console.error(
        'Failed to save saved temples to browser storage:',
        error
      )
    }
  }

  // =========================================
  // LOAD SAVED TEMPLES FOR CURRENT USER
  // =========================================

  useEffect(() => {
    if (!currentUser?.email) {
      setSavedTemples([])
      return
    }

    const loadedSavedTemples =
      loadSavedTemplesFromStorage(
        currentUser
      )

    setSavedTemples(
      loadedSavedTemples
    )
  }, [currentUser?.email])

  // =========================================
  // SYNC SAVED TEMPLES WITH APPROVED TEMPLES
  // =========================================

  useEffect(() => {
    if (
      !currentUser?.email ||
      temples.length === 0
    ) {
      return
    }

    setSavedTemples((previous) => {
      const validSavedTemples =
        previous.filter((savedTemple) => {
          const matchingTemple =
            temples.find(
              (temple) =>
                temple.name ===
                savedTemple.name
            )

          if (!matchingTemple) {
            return false
          }

          const status =
            templeApprovalStatus[
              matchingTemple.name
            ] ||
            matchingTemple.approvalStatus ||
            'Approved'

          return status === 'Approved'
        })

      if (
        validSavedTemples.length !==
        previous.length
      ) {
        saveSavedTemplesToStorage(
          validSavedTemples
        )
      }

      return validSavedTemples
    })
  }, [
    temples,
    templeApprovalStatus,
    currentUser?.email
  ])

  // =========================================
  // LOGIN
  // =========================================

  function handleLogin(user) {
    setSavedTemples([])
    setCurrentUser(user)
    setActiveSection('home')
  }

  // =========================================
  // LOGOUT
  // =========================================

  function handleLogout() {
    localStorage.removeItem(
      'heritageCurrentUser'
    )

    setSavedTemples([])
    setCurrentUser(null)
    setActiveSection('home')

    alert(
      'You have been logged out successfully.'
    )
  }

  // =========================================
  // LOAD TEMPLES FROM MONGODB
  // =========================================

  useEffect(() => {
    async function loadTemples() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/temples`
        )

        const data =
          await response.json()

        if (data.success) {
          const loadedTemples =
            data.temples.map(
              (temple) => ({
                ...temple,
                approvalStatus:
                  temple.approvalStatus ||
                  'Approved'
              })
            )

          setTemples(
            loadedTemples
          )

          const approvalMap = {}

          loadedTemples.forEach(
            (temple) => {
              approvalMap[
                temple.name
              ] =
                temple.approvalStatus
            }
          )

          setTempleApprovalStatus(
            approvalMap
          )
        }
      } catch (error) {
        console.error(
          'Failed to load temples:',
          error
        )
      } finally {
        setIsLoadingTemples(false)
      }
    }

    loadTemples()
  }, [])

  // =========================================
  // LOAD FESTIVALS FROM MONGODB
  // =========================================

  useEffect(() => {
    async function loadFestivals() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/festivals`
        )

        const data =
          await response.json()

        if (data.success) {
          setFestivals(
            data.festivals
          )
        }
      } catch (error) {
        console.error(
          'Failed to load festivals:',
          error
        )
      } finally {
        setIsLoadingFestivals(false)
      }
    }

    loadFestivals()
  }, [])

  // =========================================
  // LOAD PILGRIMAGE FROM MONGODB
  // =========================================

  useEffect(() => {
    async function loadPilgrimage() {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/pilgrimage`
        )

        const data =
          await response.json()

        if (data.success) {
          setPilgrimagePlaces(
            data.pilgrimagePlaces
          )
        }
      } catch (error) {
        console.error(
          'Failed to load pilgrimage places:',
          error
        )
      } finally {
        setIsLoadingPilgrimage(false)
      }
    }

    loadPilgrimage()
  }, [])

  // =========================================
  // TEMPLE APPROVAL WORKFLOW
  // =========================================

  async function handleTempleApprovalChange(
    templeName,
    newStatus
  ) {
    const temple =
      temples.find(
        (item) =>
          item.name ===
          templeName
      )

    if (!temple) {
      alert('Temple not found.')
      return
    }

    if (!temple._id) {
      alert(
        'Temple ID is missing. The approval status cannot be updated.'
      )
      return
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/temples/${temple._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify({
            ...temple,
            approvalStatus:
              newStatus
          })
        }
      )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Approval status update failed.'
        )
        return
      }

      setTempleApprovalStatus(
        (previous) => ({
          ...previous,
          [templeName]:
            newStatus
        })
      )

      setTemples((previous) =>
        previous.map(
          (item) =>
            item.name === templeName
              ? {
                  ...item,
                  approvalStatus:
                    newStatus
                }
              : item
        )
      )

      if (newStatus !== 'Approved') {
        setSavedTemples(
          (previous) => {
            const updatedSavedTemples =
              previous.filter(
                (item) =>
                  item.name !==
                  templeName
              )

            saveSavedTemplesToStorage(
              updatedSavedTemples
            )

            return updatedSavedTemples
          }
        )
      }

      alert(
        `Temple approval status changed to ${newStatus}.`
      )
    } catch (error) {
      console.error(
        'Failed to update approval status:',
        error
      )

      alert(
        'Could not update the approval status. Please check the backend server.'
      )
    }
  }

  // =========================================
  // SAVE / UNSAVE TEMPLE
  // =========================================

  function toggleSave(temple) {
    const approvalStatus =
      templeApprovalStatus[
        temple.name
      ] ||
      temple.approvalStatus ||
      'Approved'

    if (
      approvalStatus !==
      'Approved'
    ) {
      alert(
        'Only approved temples can be saved.'
      )
      return
    }

    setSavedTemples((previous) => {
      const alreadySaved =
        previous.some(
          (item) =>
            item.name ===
            temple.name
        )

      let updatedSavedTemples

      if (alreadySaved) {
        updatedSavedTemples =
          previous.filter(
            (item) =>
              item.name !==
              temple.name
          )
      } else {
        updatedSavedTemples = [
          ...previous,
          temple
        ]
      }

      saveSavedTemplesToStorage(
        updatedSavedTemples
      )

      return updatedSavedTemples
    })
  }

  // =========================================
  // ADD TEMPLE TO MONGODB
  // =========================================

  async function addTemple(
    newTemple
  ) {
    try {
      const templeToSave = {
        ...newTemple,
        approvalStatus:
          'Pending'
      }

      const response = await fetch(
        `${API_BASE_URL}/api/temples`,
        {
          method: 'POST',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify(
            templeToSave
          )
        }
      )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to add temple.'
        )
        return
      }

      const savedTemple = {
        ...data.temple,
        approvalStatus:
          'Pending'
      }

      setTemples((previous) => [
        ...previous,
        savedTemple
      ])

      setTempleApprovalStatus(
        (previous) => ({
          ...previous,
          [savedTemple.name]:
            'Pending'
        })
      )

      alert(
        'Temple has been successfully saved to MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to add temple:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // UPDATE TEMPLE IN MONGODB
  // =========================================

  async function updateTemple(
    firstArgument,
    secondArgument
  ) {
    let oldTempleName
    let updatedTemple

    if (
      firstArgument &&
      typeof firstArgument ===
        'object'
    ) {
      updatedTemple =
        firstArgument

      oldTempleName =
        secondArgument
    } else {
      oldTempleName =
        firstArgument

      updatedTemple =
        secondArgument
    }

    if (
      !oldTempleName ||
      !updatedTemple ||
      typeof updatedTemple !==
        'object'
    ) {
      alert(
        'Invalid temple update data.'
      )
      return
    }

    const existingTemple =
      temples.find(
        (item) =>
          item.name ===
          oldTempleName
      )

    if (!existingTemple) {
      alert('Temple not found.')
      return
    }

    if (!existingTemple._id) {
      alert(
        'Temple ID is missing. The temple cannot be updated.'
      )
      return
    }

    try {
      const approvalStatus =
        templeApprovalStatus[
          oldTempleName
        ] ||
        existingTemple.approvalStatus ||
        'Approved'

      const templeToUpdate = {
        ...updatedTemple,
        _id:
          existingTemple._id,
        approvalStatus
      }

      const response = await fetch(
        `${API_BASE_URL}/api/temples/${existingTemple._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type':
              'application/json'
          },
          body: JSON.stringify(
            templeToUpdate
          )
        }
      )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to update temple.'
        )
        return
      }

      const finalTemple = {
        ...templeToUpdate
      }

      setTemples((previous) =>
        previous.map(
          (item) =>
            item.name ===
            oldTempleName
              ? finalTemple
              : item
        )
      )

      setSavedTemples(
        (previous) => {
          const updatedSavedTemples =
            previous.map(
              (item) =>
                item.name ===
                oldTempleName
                  ? finalTemple
                  : item
            )

          saveSavedTemplesToStorage(
            updatedSavedTemples
          )

          return updatedSavedTemples
        }
      )

      setTempleApprovalStatus(
        (previous) => {
          const updated = {
            ...previous
          }

          delete updated[
            oldTempleName
          ]

          updated[
            finalTemple.name
          ] =
            approvalStatus

          return updated
        }
      )

      alert(
        'Temple has been successfully updated in MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to update temple:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // DELETE TEMPLE FROM MONGODB
  // =========================================

  async function deleteTemple(
    templeName
  ) {
    const temple =
      temples.find(
        (item) =>
          item.name === templeName
      )

    if (!temple) {
      alert('Temple not found.')
      return
    }

    if (!temple._id) {
      alert(
        'Temple ID is missing. The temple cannot be deleted.'
      )
      return
    }

    const shouldDelete =
      window.confirm(
        `Are you sure you want to delete "${templeName}"?`
      )

    if (!shouldDelete) {
      return
    }

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/api/temples/${temple._id}`,
          {
            method: 'DELETE'
          }
        )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to delete temple.'
        )
        return
      }

      setTemples((previous) =>
        previous.filter(
          (item) =>
            item.name !==
            templeName
        )
      )

      setSavedTemples(
        (previous) => {
          const updatedSavedTemples =
            previous.filter(
              (item) =>
                item.name !==
                templeName
            )

          saveSavedTemplesToStorage(
            updatedSavedTemples
          )

          return updatedSavedTemples
        }
      )

      setTempleApprovalStatus(
        (previous) => {
          const updated = {
            ...previous
          }

          delete updated[
            templeName
          ]

          return updated
        }
      )

      alert(
        'Temple has been successfully deleted from MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to delete temple:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // ADD FESTIVAL TO MONGODB
  // =========================================

  async function addFestival(
    newFestival
  ) {
    try {
      const response =
        await fetch(
          `${API_BASE_URL}/api/festivals`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify(
              newFestival
            )
          }
        )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to add festival.'
        )
        return
      }

      setFestivals((previous) => [
        ...previous,
        data.festival
      ])

      alert(
        'Festival has been successfully saved to MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to add festival:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // UPDATE FESTIVAL IN MONGODB
  // =========================================

  async function updateFestival(
    firstArgument,
    secondArgument
  ) {
    let oldFestivalName
    let updatedFestival

    if (
      firstArgument &&
      typeof firstArgument ===
        'object'
    ) {
      updatedFestival =
        firstArgument

      oldFestivalName =
        secondArgument
    } else {
      oldFestivalName =
        firstArgument

      updatedFestival =
        secondArgument
    }

    if (
      !oldFestivalName ||
      !updatedFestival ||
      typeof updatedFestival !==
        'object'
    ) {
      alert(
        'Invalid festival update data.'
      )
      return
    }

    const existingFestival =
      festivals.find(
        (festival) =>
          festival.name ===
          oldFestivalName
      )

    if (!existingFestival) {
      alert(
        'Festival not found.'
      )
      return
    }

    if (!existingFestival._id) {
      alert(
        'Festival ID is missing. The festival cannot be updated.'
      )
      return
    }

    try {
      const festivalToUpdate = {
        ...updatedFestival,
        _id:
          existingFestival._id
      }

      const response =
        await fetch(
          `${API_BASE_URL}/api/festivals/${existingFestival._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify(
              festivalToUpdate
            )
          }
        )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to update festival.'
        )
        return
      }

      setFestivals((previous) =>
        previous.map(
          (festival) =>
            festival.name ===
            oldFestivalName
              ? festivalToUpdate
              : festival
        )
      )

      alert(
        'Festival has been successfully updated in MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to update festival:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // DELETE FESTIVAL FROM MONGODB
  // =========================================

  async function deleteFestival(
    festivalName
  ) {
    const festival =
      festivals.find(
        (item) =>
          item.name ===
          festivalName
      )

    if (!festival) {
      alert(
        'Festival not found.'
      )
      return
    }

    if (!festival._id) {
      alert(
        'Festival ID is missing. The festival cannot be deleted.'
      )
      return
    }

    const shouldDelete =
      window.confirm(
        `Are you sure you want to delete "${festivalName}"?`
      )

    if (!shouldDelete) {
      return
    }

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/api/festivals/${festival._id}`,
          {
            method: 'DELETE'
          }
        )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to delete festival.'
        )
        return
      }

      setFestivals((previous) =>
        previous.filter(
          (item) =>
            item.name !==
            festivalName
        )
      )

      alert(
        'Festival has been successfully deleted from MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to delete festival:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // ADD PILGRIMAGE TO MONGODB
  // =========================================

  async function addPilgrimage(
    newPilgrimage
  ) {
    try {
      const response =
        await fetch(
          `${API_BASE_URL}/api/pilgrimage`,
          {
            method: 'POST',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify(
              newPilgrimage
            )
          }
        )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to add pilgrimage place.'
        )
        return
      }

      setPilgrimagePlaces(
        (previous) => [
          ...previous,
          data.pilgrimage
        ]
      )

      alert(
        'Pilgrimage place has been successfully saved to MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to add pilgrimage place:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // UPDATE PILGRIMAGE IN MONGODB
  // =========================================

  async function updatePilgrimage(
    firstArgument,
    secondArgument
  ) {
    let oldPilgrimageName
    let updatedPilgrimage

    if (
      firstArgument &&
      typeof firstArgument ===
        'object'
    ) {
      updatedPilgrimage =
        firstArgument

      oldPilgrimageName =
        secondArgument
    } else {
      oldPilgrimageName =
        firstArgument

      updatedPilgrimage =
        secondArgument
    }

    if (
      !oldPilgrimageName ||
      !updatedPilgrimage ||
      typeof updatedPilgrimage !==
        'object'
    ) {
      alert(
        'Invalid pilgrimage update data.'
      )
      return
    }

    const existingPilgrimage =
      pilgrimagePlaces.find(
        (place) =>
          place.name ===
          oldPilgrimageName
      )

    if (!existingPilgrimage) {
      alert(
        'Pilgrimage place not found.'
      )
      return
    }

    if (!existingPilgrimage._id) {
      alert(
        'Pilgrimage place ID is missing. The pilgrimage place cannot be updated.'
      )
      return
    }

    try {
      const pilgrimageToUpdate = {
        ...updatedPilgrimage,
        _id:
          existingPilgrimage._id
      }

      const response =
        await fetch(
          `${API_BASE_URL}/api/pilgrimage/${existingPilgrimage._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type':
                'application/json'
            },
            body: JSON.stringify(
              pilgrimageToUpdate
            )
          }
        )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to update pilgrimage place.'
        )
        return
      }

      setPilgrimagePlaces(
        (previous) =>
          previous.map(
            (place) =>
              place.name ===
              oldPilgrimageName
                ? pilgrimageToUpdate
                : place
          )
      )

      alert(
        'Pilgrimage place has been successfully updated in MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to update pilgrimage place:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // DELETE PILGRIMAGE FROM MONGODB
  // =========================================

  async function deletePilgrimage(
    pilgrimageName
  ) {
    const pilgrimage =
      pilgrimagePlaces.find(
        (place) =>
          place.name ===
          pilgrimageName
      )

    if (!pilgrimage) {
      alert(
        'Pilgrimage place not found.'
      )
      return
    }

    if (!pilgrimage._id) {
      alert(
        'Pilgrimage place ID is missing. The pilgrimage place cannot be deleted.'
      )
      return
    }

    const shouldDelete =
      window.confirm(
        `Are you sure you want to delete "${pilgrimageName}"?`
      )

    if (!shouldDelete) {
      return
    }

    try {
      const response =
        await fetch(
          `${API_BASE_URL}/api/pilgrimage/${pilgrimage._id}`,
          {
            method: 'DELETE'
          }
        )

      const data =
        await response.json()

      if (!data.success) {
        alert(
          'Failed to delete pilgrimage place.'
        )
        return
      }

      setPilgrimagePlaces(
        (previous) =>
          previous.filter(
            (place) =>
              place.name !==
              pilgrimageName
          )
      )

      alert(
        'Pilgrimage place has been successfully deleted from MongoDB.'
      )
    } catch (error) {
      console.error(
        'Failed to delete pilgrimage place:',
        error
      )

      alert(
        'Could not connect to the backend server. Please check that the server is running.'
      )
    }
  }

  // =========================================
  // REMOVE SAVED TEMPLE
  // =========================================

  function removeSavedTemple(
    templeName
  ) {
    setSavedTemples((previous) => {
      const updatedSavedTemples =
        previous.filter(
          (item) =>
            item.name !==
            templeName
        )

      saveSavedTemplesToStorage(
        updatedSavedTemples
      )

      return updatedSavedTemples
    })
  }

  // =========================================
  // ONLY APPROVED TEMPLES ARE PUBLIC
  // =========================================

  const approvedTemples =
    temples.filter(
      (temple) => {
        const status =
          templeApprovalStatus[
            temple.name
          ] ||
          temple.approvalStatus ||
          'Approved'

        return status ===
          'Approved'
      }
    )

  // =========================================
  // SHOW LOGIN / REGISTER PAGE
  // =========================================

  if (!currentUser) {
    return (
      <Auth
        onLogin={handleLogin}
      />
    )
  }

  return (
    <div className="app">

      {/* =========================================
          NAVBAR
          ========================================= */}

      <header className="navbar">

        <div
          className="logo"
          onClick={() =>
            setActiveSection('home')
          }
        >

          <span className="logo-icon">
            🏛️
          </span>

          <div>

            <strong>
              Heritage Learning Hub
            </strong>

            <small>
              India's Cultural Heritage
            </small>

          </div>

        </div>

        <nav>

          <button
            className={
              activeSection ===
              'home'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActiveSection(
                'home'
              )
            }
          >
            Home
          </button>

          <button
            className={
              activeSection ===
              'learning'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActiveSection(
                'learning'
              )
            }
          >
            Learning
          </button>

          <button
            className={
              activeSection ===
              'temples'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActiveSection(
                'temples'
              )
            }
          >
            Temples
          </button>

          <button
            className={
              activeSection ===
              'pilgrimage'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActiveSection(
                'pilgrimage'
              )
            }
          >
            Pilgrimage
          </button>

          <button
            className={
              activeSection ===
              'festivals'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActiveSection(
                'festivals'
              )
            }
          >
            Festivals
          </button>

          <button
            className={
              activeSection ===
              'guidelines'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActiveSection(
                'guidelines'
              )
            }
          >
            Guidelines
          </button>

          <button
            className={
              activeSection ===
              'saved'
                ? 'active'
                : ''
            }
            onClick={() =>
              setActiveSection(
                'saved'
              )
            }
          >
            Saved
          </button>

          {currentUser.role ===
            'Admin' && (
            <button
              className={
                activeSection ===
                'admin'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setActiveSection(
                  'admin'
                )
              }
            >
              Admin
            </button>
          )}

        </nav>

        <div
          style={{
            display: 'flex',
            alignItems:
              'center',
            gap: '10px',
            marginLeft:
              '15px'
          }}
        >

          <div
            style={{
              display:
                'flex',
              flexDirection:
                'column',
              alignItems:
                'flex-end'
            }}
          >

            <strong
              style={{
                color:
                  '#4b2415',
                fontSize:
                  '14px'
              }}
            >
              {currentUser.name}
            </strong>

            <span
              style={{
                color:
                  '#8d3f22',
                fontSize:
                  '12px'
              }}
            >
              {currentUser.role}
            </span>

          </div>

          <button
            type="button"
            onClick={
              handleLogout
            }
            style={{
              border:
                '1px solid #dfc9b8',
              background:
                '#ffffff',
              color:
                '#8d3f22',
              padding:
                '8px 12px',
              borderRadius:
                '7px',
              fontWeight:
                '600',
              cursor:
                'pointer'
            }}
          >
            Logout
          </button>

        </div>

      </header>

      {/* =========================================
          MAIN CONTENT
          ========================================= */}

      <main>

        {/* =========================================
            HOME
            ========================================= */}

        {activeSection ===
          'home' && (
          <section className="hero-section">

            <div className="hero-content">

              <p className="hero-label">
                DISCOVER INDIA'S CULTURAL HERITAGE
              </p>

              <h1>
                Explore India's
                <br />
                <span>
                  Cultural Heritage
                </span>
              </h1>

              <p className="hero-description">
                Learn about India's
                temples,
                traditions,
                festivals,
                pilgrimage
                routes and
                cultural heritage
                through
                a structured
                digital learning
                platform.
              </p>

              <div className="hero-buttons">

                <button
                  className="primary-button"
                  onClick={() =>
                    setActiveSection(
                      'temples'
                    )
                  }
                >
                  Explore Heritage
                </button>

                <button
                  className="secondary-button"
                  onClick={() =>
                    setActiveSection(
                      'pilgrimage'
                    )
                  }
                >
                  Explore Pilgrimage
                </button>

              </div>

            </div>

            <div className="hero-visual">

              <div className="hero-temple-icon">
                🏛️
              </div>

            </div>

          </section>
        )}

        {/* =========================================
            LEARNING HUB
            ========================================= */}

        {activeSection ===
          'learning' && (
          <LearningHub />
        )}

        {/* =========================================
            TEMPLES
            ========================================= */}

        {activeSection ===
          'temples' && (
          <>
            {isLoadingTemples ? (
              <div
                style={{
                  padding:
                    '40px',
                  textAlign:
                    'center'
                }}
              >

                <h2>
                  Loading Temples...
                </h2>

                <p>
                  Temple data is loading from MongoDB.
                </p>

              </div>
            ) : (
              <Temples
                temples={
                  approvedTemples
                }
                savedTemples={
                  savedTemples
                }
                onToggleSave={
                  toggleSave
                }
              />
            )}
          </>
        )}

        {/* =========================================
            PILGRIMAGE
            ========================================= */}

        {activeSection ===
          'pilgrimage' && (
          <>
            {isLoadingPilgrimage ? (
              <div
                style={{
                  padding:
                    '40px',
                  textAlign:
                    'center'
                }}
              >

                <h2>
                  Loading Pilgrimage...
                </h2>

                <p>
                  Pilgrimage data is loading from MongoDB.
                </p>

              </div>
            ) : (
              <Pilgrimage
                pilgrimagePlaces={
                  pilgrimagePlaces
                }
              />
            )}
          </>
        )}

        {/* =========================================
            FESTIVALS
            ========================================= */}

        {activeSection ===
          'festivals' && (
          <>
            {isLoadingFestivals ? (
              <div
                style={{
                  padding:
                    '40px',
                  textAlign:
                    'center'
                }}
              >

                <h2>
                  Loading Festivals...
                </h2>

                <p>
                  Festival data is loading from MongoDB.
                </p>

              </div>
            ) : (
              <Festivals
                festivals={
                  festivals
                }
              />
            )}
          </>
        )}

        {/* =========================================
            GUIDELINES
            ========================================= */}

        {activeSection ===
          'guidelines' && (
          <Guidelines />
        )}

        {/* =========================================
            SAVED TEMPLES
            ========================================= */}

        {activeSection ===
          'saved' && (
          <SavedTemples
            savedTemples={
              savedTemples
            }
            onRemove={
              removeSavedTemple
            }
          />
        )}

        {/* =========================================
            ADMIN
            ========================================= */}

        {activeSection ===
          'admin' &&
          currentUser.role ===
            'Admin' && (
            <Admin
              temples={
                temples
              }

              onAddTemple={
                addTemple
              }

              onUpdateTemple={
                updateTemple
              }

              onDeleteTemple={
                deleteTemple
              }

              templeApprovalStatus={
                templeApprovalStatus
              }

              onTempleApprovalChange={
                handleTempleApprovalChange
              }

              festivals={
                festivals
              }

              onAddFestival={
                addFestival
              }

              onUpdateFestival={
                updateFestival
              }

              onDeleteFestival={
                deleteFestival
              }

              pilgrimagePlaces={
                pilgrimagePlaces
              }

              onAddPilgrimage={
                addPilgrimage
              }

              onUpdatePilgrimage={
                updatePilgrimage
              }

              onDeletePilgrimage={
                deletePilgrimage
              }
            />
          )}

      </main>

      {/* =========================================
          FOOTER
          ========================================= */}

      <footer className="footer">

        <div>

          <strong>
            Heritage Learning Hub
          </strong>

          <p>
            India's Cultural Heritage
            Learning Platform
          </p>

        </div>

        <div>

          <p>
            © 2026 Heritage Learning Hub
          </p>

        </div>

      </footer>

    </div>
  )
}

export default App