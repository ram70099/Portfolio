import { useState, useEffect } from 'react';
export const teamMembers = () => {
  // Fetch the team data from the backend API
  fetch('http://localhost:2000/api/team')
    .then(response => response.json())  // Convert the response to JSON
    .then(data => {
      console.log('Fetched team members:', data); // Log the fetched team members
    })
};

export function useTeamMembers() {
  const [teamMembers, setTeamMembers] = useState([]); // Initialize as empty array

  useEffect(() => {
    fetch('http://localhost:2000/api/team')
      .then(response => response.json())
      .then(data => setTeamMembers(data))  // Always set teamMembers as an array
      .catch(error => console.error('Error fetching team members:', error));
  }, []);

  return teamMembers;  // Make sure it's always an array
}

