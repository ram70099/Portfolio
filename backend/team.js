const { MongoClient } = require('mongodb');
const database = require('./Connection/connection');

// MongoDB connection URI (replace with your own connection string)
const uri = "mongodb+srv://Ram:ramshah@cluster0.5ngbg.mongodb.net/";  // Local MongoDB URI or use your MongoDB Atlas URI

// Database and collection names
const dbName = "teamDatabase";  // Replace with your database name
const collectionName = "teamMembers";  // Collection name

const teamMembers = [
  {
    id: 'alex-turner',
    name: 'Alex Turner',
    role: 'Frontend Developer',
    image: 'https://randomuser.me/api/portraits/men/75.jpg',
    experience: 4,
    technologies: [
      { name: 'HTML/CSS', projects: 8, color: '#FF5733' },
      { name: 'React', projects: 6, color: '#61DAFB' },
      { name: 'JavaScript', projects: 4, color: '#F7DF1E' }
    ],
    projects: [
      {
        name: 'E-commerce Dashboard',
        description: 'Modern dashboard for managing online store operations',
        image: 'https://picsum.photos/400/300?random=1',
        technologies: ['React', 'Redux', 'Material UI']
      },
      {
        name: 'Social Media App',
        description: 'Real-time social networking platform',
        image: 'https://picsum.photos/400/300?random=2',
        technologies: ['React', 'Firebase', 'CSS']
      }
    ]
  },
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    role: 'Backend Developer',
    image: 'https://randomuser.me/api/portraits/women/65.jpg',
    experience: 3,
    technologies: [
      { name: 'Node.js', projects: 5, color: '#68A063' },
      { name: 'Python', projects: 4, color: '#3776AB' },
      { name: 'MongoDB', projects: 3, color: '#47A248' }
    ],
    projects: [
      {
        name: 'API Gateway Service',
        description: 'Microservices API gateway with authentication',
        image: 'https://picsum.photos/400/300?random=3',
        technologies: ['Node.js', 'Express', 'JWT']
      },
      {
        name: 'Data Analytics Platform',
        description: 'Real-time data processing and visualization',
        image: 'https://picsum.photos/400/300?random=4',
        technologies: ['Python', 'PostgreSQL', 'Redis']
      }
    ]
  },
  {
    id: 'marcus-rodriguez',
    name: 'Marcus Rodriguez',
    role: 'Full Stack Developer',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    experience: 5,
    technologies: [
      { name: 'React', projects: 7, color: '#61DAFB' },
      { name: 'Node.js', projects: 6, color: '#68A063' },
      { name: 'AWS', projects: 4, color: '#FF9900' }
    ],
    projects: [
      {
        name: 'Project Management Tool',
        description: 'Collaborative project management platform',
        image: 'https://picsum.photos/400/300?random=5',
        technologies: ['React', 'Node.js', 'MongoDB']
      },
      {
        name: 'Video Streaming Platform',
        description: 'Live video streaming service with chat',
        image: 'https://picsum.photos/400/300?random=6',
        technologies: ['React', 'WebRTC', 'Socket.io']
      }
    ]
  }
];

async function insertTeamMembers() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection(collectionName);

    // Insert the data into the MongoDB collection
    const result = await collection.insertMany(teamMembers);
    console.log(`${result.insertedCount} team members inserted successfully!`);
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await client.close();
  }
}

insertTeamMembers();
