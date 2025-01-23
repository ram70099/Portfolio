const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');  // Import the CORS package

// MongoDB URI (replace with your MongoDB URI)
const uri = "mongodb+srv://Ram:ramshah@cluster0.5ngbg.mongodb.net/";  // Local MongoDB URI or use your MongoDB Atlas URI
const dbName = "teamDatabase";  // Your database name
const collectionName = "teamMembers";  // Collection name

const app = express();
const port = 2000;

// Use CORS middleware to allow cross-origin requests
app.use(cors());  // This will allow requests from all origins by default

// Middleware to parse JSON bodies
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from the server!');
});
// Route to fetch team members from MongoDB
app.get('/api/team', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Fetch all team members
    const teamMembers = await collection.find({}).toArray();

    // Return the team members as a JSON response
    res.json(teamMembers);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching team members');
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
