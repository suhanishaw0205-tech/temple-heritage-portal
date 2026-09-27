import express from 'express'
import cors from 'cors'
import { MongoClient, ObjectId } from 'mongodb'

const app = express()

const PORT = Number(process.env.PORT) || 5000

const MONGODB_URI =
  process.env.MONGODB_URI ||
  'mongodb://127.0.0.1:27017'

const DATABASE_NAME =
  process.env.DATABASE_NAME ||
  'temple_heritage_portal'

const CORS_ORIGIN =
  process.env.CORS_ORIGIN ||
  'http://localhost:5173'

app.use(
  cors({
    origin: CORS_ORIGIN
  })
)

app.use(express.json())

const client = new MongoClient(MONGODB_URI)

let db

app.get('/', (req, res) => {
  res.json({
    message: 'Temple Heritage Portal Backend is running'
  })
})

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Backend API is working'
  })
})

// ==============================
// TEMPLE APIs
// ==============================

// GET all temples
app.get('/api/temples', async (req, res) => {
  try {
    const temples = await db
      .collection('temples')
      .find({})
      .toArray()

    res.json({
      success: true,
      temples
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch temples'
    })
  }
})

// POST a new temple
app.post('/api/temples', async (req, res) => {
  try {
    const newTemple = req.body

    const result = await db
      .collection('temples')
      .insertOne(newTemple)

    res.status(201).json({
      success: true,
      message: 'Temple added successfully',
      temple: {
        ...newTemple,
        _id: result.insertedId
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to add temple'
    })
  }
})

// PUT update a temple
app.put('/api/temples/:id', async (req, res) => {
  try {
    const templeId = req.params.id

    const updatedTemple = {
      ...req.body
    }

    delete updatedTemple._id

    const result = await db
      .collection('temples')
      .updateOne(
        {
          _id: new ObjectId(templeId)
        },
        {
          $set: updatedTemple
        }
      )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      })
    }

    res.json({
      success: true,
      message: 'Temple updated successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to update temple'
    })
  }
})

// DELETE a temple
app.delete('/api/temples/:id', async (req, res) => {
  try {
    const templeId = req.params.id

    const result = await db
      .collection('temples')
      .deleteOne({
        _id: new ObjectId(templeId)
      })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Temple not found'
      })
    }

    res.json({
      success: true,
      message: 'Temple deleted successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete temple'
    })
  }
})

// SEED INITIAL TEMPLES
app.get('/api/temples/seed', async (req, res) => {
  try {
    const temples = [
      {
        name: 'Kashi Vishwanath Temple',
        city: 'Varanasi',
        state: 'Uttar Pradesh',
        deity: 'Lord Shiva',
        description:
          'One of the most revered Shiva temples, located on the banks of the sacred Ganga.',
        history:
          'A major pilgrimage temple dedicated to Lord Shiva in Varanasi and an important part of the city’s spiritual and cultural heritage.',
        darshanTimings:
          'Morning: 6:00 AM – 12:00 PM\nEvening: 4:00 PM – 9:00 PM',
        rituals:
          'Daily prayers, traditional offerings and special worship ceremonies are performed according to temple traditions.',
        templeFestivals:
          'Maha Shivaratri and other important Hindu festivals are observed with special prayers and ceremonies.',
        guidelines:
          'Dress respectfully, follow temple instructions, maintain cleanliness and observe photography restrictions where applicable.',
        pilgrimageInfo:
          'The temple is part of the Varanasi pilgrimage experience. Visitors can use rail, road and local transport and find accommodation around the city.'
      },
      {
        name: 'Jagannath Temple',
        city: 'Puri',
        state: 'Odisha',
        deity: 'Lord Jagannath',
        description:
          'A famous pilgrimage destination known for its rich traditions and Rath Yatra.',
        history:
          'A historic pilgrimage temple in Puri dedicated to Lord Jagannath and known for important religious traditions and the annual Rath Yatra.',
        darshanTimings:
          'Morning: 6:00 AM – 12:00 PM\nEvening: 4:00 PM – 9:00 PM',
        rituals:
          'Daily worship, traditional offerings and ceremonial activities form an important part of the temple’s religious practices.',
        templeFestivals:
          'Rath Yatra is the major festival associated with the temple, along with other religious celebrations.',
        guidelines:
          'Follow temple rules, dress respectfully, maintain cleanliness and follow restrictions applicable to visitors.',
        pilgrimageInfo:
          'Puri is connected by rail and road with major cities. Hotels, lodges and guest houses are available around the pilgrimage area.'
      },
      {
        name: 'Meenakshi Amman Temple',
        city: 'Madurai',
        state: 'Tamil Nadu',
        deity: 'Goddess Meenakshi',
        description:
          'A magnificent historic temple famous for its colourful architecture and towers.',
        history:
          'A renowned historic temple in Madurai dedicated to Goddess Meenakshi and associated with the city’s rich cultural and architectural heritage.',
        darshanTimings:
          'Morning: 6:00 AM – 12:00 PM\nEvening: 4:00 PM – 9:00 PM',
        rituals:
          'Daily prayers, traditional offerings and temple ceremonies are performed as part of regular worship.',
        templeFestivals:
          'Major Hindu festivals and temple celebrations are observed with special rituals and cultural activities.',
        guidelines:
          'Dress respectfully, follow temple instructions, maintain cleanliness and observe photography restrictions where applicable.',
        pilgrimageInfo:
          'Madurai is well connected by rail, road and air. Visitors can find hotels and other accommodation facilities around the city.'
      },
      {
        name: 'Tirumala Venkateswara Temple',
        city: 'Tirupati',
        state: 'Andhra Pradesh',
        deity: 'Lord Venkateswara',
        description:
          'A major pilgrimage centre visited by millions of devotees every year.',
        history:
          'A major pilgrimage centre dedicated to Lord Venkateswara and located in the Tirumala hills near Tirupati.',
        darshanTimings:
          'Timings vary according to the temple schedule and type of darshan. Visitors should verify the current schedule before travel.',
        rituals:
          'Daily worship, traditional offerings and special ceremonies are conducted according to temple traditions.',
        templeFestivals:
          'Important religious festivals and special temple celebrations are observed throughout the year.',
        guidelines:
          'Follow the temple dress code and visitor instructions, maintain cleanliness and follow queue and entry procedures.',
        pilgrimageInfo:
          'Tirupati is connected by rail, road and air. Accommodation and local transport facilities are available for pilgrims.'
      },
      {
        name: 'Somnath Temple',
        city: 'Somnath',
        state: 'Gujarat',
        deity: 'Lord Shiva',
        description:
          'An important Jyotirlinga temple situated on the Arabian Sea coast.',
        history:
          'An important Shiva pilgrimage temple on the Arabian Sea coast and one of the traditionally recognised Jyotirlinga sites.',
        darshanTimings:
          'Morning: 6:00 AM – 12:00 PM\nEvening: 4:00 PM – 9:00 PM',
        rituals:
          'Daily Shiva worship, prayers and traditional offerings are performed at the temple.',
        templeFestivals:
          'Maha Shivaratri and other Hindu festivals are celebrated with special prayers and temple ceremonies.',
        guidelines:
          'Dress respectfully, follow temple instructions, maintain cleanliness and observe restrictions on photography or belongings where applicable.',
        pilgrimageInfo:
          'Somnath can be reached by road and rail through nearby transport connections. Hotels and guest houses are available in the area.'
      },
      {
        name: 'Kedarnath Temple',
        city: 'Kedarnath',
        state: 'Uttarakhand',
        deity: 'Lord Shiva',
        description:
          'A Himalayan pilgrimage destination and one of the important Char Dham sites.',
        history:
          'A Himalayan pilgrimage temple dedicated to Lord Shiva and an important destination in the Char Dham pilgrimage tradition.',
        darshanTimings:
          'Timings vary according to the seasonal temple schedule and pilgrimage conditions. Visitors should verify current timings before travelling.',
        rituals:
          'Daily prayers, traditional offerings and special Shiva worship are performed according to temple traditions.',
        templeFestivals:
          'Maha Shivaratri and other religious observances are associated with the temple and pilgrimage season.',
        guidelines:
          'Follow local and temple instructions, dress appropriately for the conditions, maintain cleanliness and follow safety guidance.',
        pilgrimageInfo:
          'The route includes Haridwar, Rishikesh, Guptkashi, Gaurikund and Kedarnath. Road transport and seasonal helicopter services may be available.'
      }
    ]

    const collection = db.collection('temples')

    const existingTemples = await collection.countDocuments()

    if (existingTemples > 0) {
      return res.json({
        success: true,
        message: 'Temples already exist. Seed was not repeated.',
        count: existingTemples
      })
    }

    const result = await collection.insertMany(temples)

    res.status(201).json({
      success: true,
      message: 'Initial temples added successfully',
      count: result.insertedCount
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to seed temples'
    })
  }
})

// ==============================
// FESTIVAL APIs
// ==============================

// GET all festivals
app.get('/api/festivals', async (req, res) => {
  try {
    const festivals = await db
      .collection('festivals')
      .find({})
      .toArray()

    res.json({
      success: true,
      festivals
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch festivals'
    })
  }
})

// POST a new festival
app.post('/api/festivals', async (req, res) => {
  try {
    const newFestival = req.body

    const result = await db
      .collection('festivals')
      .insertOne(newFestival)

    res.status(201).json({
      success: true,
      message: 'Festival added successfully',
      festival: {
        ...newFestival,
        _id: result.insertedId
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to add festival'
    })
  }
})

// PUT update a festival
app.put('/api/festivals/:id', async (req, res) => {
  try {
    const festivalId = req.params.id

    const updatedFestival = {
      ...req.body
    }

    delete updatedFestival._id

    const result = await db
      .collection('festivals')
      .updateOne(
        {
          _id: new ObjectId(festivalId)
        },
        {
          $set: updatedFestival
        }
      )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Festival not found'
      })
    }

    res.json({
      success: true,
      message: 'Festival updated successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to update festival'
    })
  }
})

// DELETE a festival
app.delete('/api/festivals/:id', async (req, res) => {
  try {
    const festivalId = req.params.id

    const result = await db
      .collection('festivals')
      .deleteOne({
        _id: new ObjectId(festivalId)
      })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Festival not found'
      })
    }

    res.json({
      success: true,
      message: 'Festival deleted successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete festival'
    })
  }
})

// ==============================
// PILGRIMAGE APIs
// ==============================

// GET all pilgrimage places
app.get('/api/pilgrimage', async (req, res) => {
  try {
    const pilgrimagePlaces = await db
      .collection('pilgrimage')
      .find({})
      .toArray()

    res.json({
      success: true,
      pilgrimagePlaces
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch pilgrimage places'
    })
  }
})

// POST a new pilgrimage place
app.post('/api/pilgrimage', async (req, res) => {
  try {
    const newPilgrimage = req.body

    const result = await db
      .collection('pilgrimage')
      .insertOne(newPilgrimage)

    res.status(201).json({
      success: true,
      message: 'Pilgrimage place added successfully',
      pilgrimage: {
        ...newPilgrimage,
        _id: result.insertedId
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to add pilgrimage place'
    })
  }
})

// PUT update a pilgrimage place
app.put('/api/pilgrimage/:id', async (req, res) => {
  try {
    const pilgrimageId = req.params.id

    const updatedPilgrimage = {
      ...req.body
    }

    delete updatedPilgrimage._id

    const result = await db
      .collection('pilgrimage')
      .updateOne(
        {
          _id: new ObjectId(pilgrimageId)
        },
        {
          $set: updatedPilgrimage
        }
      )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pilgrimage place not found'
      })
    }

    res.json({
      success: true,
      message: 'Pilgrimage place updated successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to update pilgrimage place'
    })
  }
})

// DELETE a pilgrimage place
app.delete('/api/pilgrimage/:id', async (req, res) => {
  try {
    const pilgrimageId = req.params.id

    const result = await db
      .collection('pilgrimage')
      .deleteOne({
        _id: new ObjectId(pilgrimageId)
      })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pilgrimage place not found'
      })
    }

    res.json({
      success: true,
      message: 'Pilgrimage place deleted successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete pilgrimage place'
    })
  }
})

// ==============================
// CONTENT ACCURACY FEEDBACK APIs
// ==============================

// GET all content accuracy feedback
app.get('/api/feedback', async (req, res) => {
  try {
    const feedback = await db
      .collection('feedback')
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    res.json({
      success: true,
      feedback
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to fetch feedback'
    })
  }
})

// POST new content accuracy feedback
app.post('/api/feedback', async (req, res) => {
  try {
    const {
      templeId,
      templeName,
      city,
      state,
      userName,
      userEmail,
      message
    } = req.body

    if (
      !templeName ||
      !userName ||
      !userEmail ||
      !message
    ) {
      return res.status(400).json({
        success: false,
        message: 'Temple, user and feedback details are required'
      })
    }

    const newFeedback = {
      templeId: templeId || null,
      templeName,
      city: city || '',
      state: state || '',
      userName,
      userEmail,
      message,
      status: 'Pending',
      createdAt: new Date()
    }

    const result = await db
      .collection('feedback')
      .insertOne(newFeedback)

    res.status(201).json({
      success: true,
      message: 'Content accuracy feedback submitted successfully',
      feedback: {
        ...newFeedback,
        _id: result.insertedId
      }
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to submit feedback'
    })
  }
})

// PUT feedback status
app.put('/api/feedback/:id', async (req, res) => {
  try {
    const feedbackId = req.params.id
    const { status } = req.body

    const allowedStatuses = [
      'Pending',
      'Reviewed',
      'Resolved'
    ]

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid feedback status'
      })
    }

    const result = await db
      .collection('feedback')
      .updateOne(
        {
          _id: new ObjectId(feedbackId)
        },
        {
          $set: {
            status,
            updatedAt: new Date()
          }
        }
      )

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      })
    }

    res.json({
      success: true,
      message: 'Feedback status updated successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to update feedback status'
    })
  }
})

// DELETE feedback
app.delete('/api/feedback/:id', async (req, res) => {
  try {
    const feedbackId = req.params.id

    const result = await db
      .collection('feedback')
      .deleteOne({
        _id: new ObjectId(feedbackId)
      })

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found'
      })
    }

    res.json({
      success: true,
      message: 'Feedback deleted successfully'
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({
      success: false,
      message: 'Failed to delete feedback'
    })
  }
})

// ==============================
// START SERVER
// ==============================

async function startServer() {
  try {
    await client.connect()

    db = client.db(DATABASE_NAME)

    console.log('MongoDB connected successfully')
    console.log(`Database: ${DATABASE_NAME}`)
    console.log(`Server running on port ${PORT}`)
  } catch (error) {
    console.error('MongoDB connection failed')
    console.error(error)

    process.exit(1)
  }

  app.listen(PORT, () => {
    console.log('Express server started successfully')
  })
}

startServer()
