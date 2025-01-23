import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [teamMembers, setTeamMembers] = useState([]); // Set initial state as an empty array

  useEffect(() => {
    // Fetch data from backend API
    fetch('https://portfolio-j1vk.onrender.com/api/team')
      .then(response => response.json())  // Convert the response to JSON
      .then(data => {
        console.log('Fetched team members:', data); // Log the fetched team members
        setTeamMembers(data);  // Set the fetched data into state
      })
      .catch(error => console.error('Error fetching team data:', error)); // Handle any errors
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <>
      <header>
        <nav>
          <div className="logo">
            <span className="code-tag">{'</'}</span> CodeStudio
          </div>
          <div className="nav-links">
            <a href="#projects">Projects</a>
            <a href="#team">Team</a>
            <a href="#contact">Contact</a>
            <div className="social-icons">
              <a href="https://github.com" className="github-icon">GH</a>
              <a href="https://linkedin.com" className="linkedin-icon">IN</a>
            </div>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <h1>Welcome to Our Studio</h1>
          <p>Creating innovative solutions through modern technology</p>
        </section>

        <section className="team" id="team">
          <h2>Our Team</h2>
          <div className="team-grid">
            {/* Check if teamMembers is an array */}
            {Array.isArray(teamMembers) && teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <Link to={`/profile/${member.name}`} key={member.name} className="team-member">
                  {/* Reference images from the public folder */}
                  <img 
                    src={`./${member.image}`}  // Assuming images are in the public/images folder
                    alt={member.name} className="team-member-image"
                  />
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <p>{member.projects.length} Projects</p>
                </Link>
              ))
            ) : (
              <p>Loading team members...</p>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
