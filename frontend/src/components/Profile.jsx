import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function Profile() {
  const { id } = useParams();
  const [teamMembers, setTeamMembers] = useState([]); // State to store team members
  const [selectedTech, setSelectedTech] = useState(''); // Track selected technology
  const [loading, setLoading] = useState(true); // Loading state for the API call

  useEffect(() => {
    // Fetch team members from the backend
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch('https://portfolio-j1vk.onrender.com/api/team',);
        const data = await response.json();
        setTeamMembers(data);  // Store the team members data in state
        setLoading(false);      // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching team members:', error);
        setLoading(false);      // Set loading to false in case of error
      }
    };

    fetchTeamMembers();  // Call the function to fetch team members
  }, []);

  if (loading) {
    return <div>Loading...</div>;  // Show loading if data is being fetched
  }

  const member = teamMembers.find(m => m.name === id); // Use `id` from URL params

  if (!member) {
    return <div>Member not found</div>;
  }

  // Filter projects based on selected technology
  const filteredProjects = selectedTech
  ? member.projects.filter(project =>
      project.technologies.some(tech => 
        tech.toLowerCase() === selectedTech.toLowerCase() // Case-insensitive comparison
      )
    )
  : member.projects;


  return (
    <div className="profile-page">
      <nav className="profile-nav">
        <Link to="/" className="back-button">← Back to Home</Link>
      </nav>

      <div className="profile-header">
        <img
          src={`/${member.image}`} // Path starts from the public directory
          alt={member.name}
          className="profile-image"
        />
        <div className="profile-info">
          <h1>{member.name}</h1>
          <p className="role">{member.role}</p>
          <div className="stats">
            <div className="stat">
              <span className="stat-number">{member.projects.length}</span>
              <span className="stat-label">Projects</span>
            </div>
            <div className="stat">
              <span className="stat-number">{member.technologies.length}</span>
              <span className="stat-label">Technologies</span>
            </div>
            <div className="stat">
              <span className="stat-number">{member.experience}</span>
              <span className="stat-label">Internship Months</span>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-content">
        <section className="technologies">
          <h2>Technologies</h2>
          <div className="tech-grid">
            {member.technologies.map((tech, index) => (
              <div
                key={index}
                className="tech-card"
                style={{ backgroundColor: tech.color }}
                onClick={() => setSelectedTech(tech.name)} // Set selected tech on click
              >
                <h3>{tech.name}</h3>
                <p>{tech.projects} Projects</p>
              </div>
            ))}
          </div>
        </section>

        <section className="projects">
          <h2>Recent Projects</h2>
          <div className="projects-grid">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <div key={index} className="project-card">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <img
                      src={`/${project.image}`} // Path starts from the public directory
                      alt={project.name}
                    />
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-tech">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </a>
                </div>
              ))
            ) : (
              <p>No projects found for this technology</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Profile;
