import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Code2, FileCode, Coffee, Server, Database, Blocks } from 'lucide-react';
import { developers } from '../data/developers';
import ProjectCard from '../components/ProjectCard';
import './DeveloperPage.css'; // Import the CSS file

const categoryIcons = {
  'HTML/CSS': <FileCode className="w-8 h-8" />,
  'JavaScript': <Code2 className="w-8 h-8" />,
  'React': <Blocks className="w-8 h-8" />,
  'Node.js': <Server className="w-8 h-8" />,
  'PHP': <Database className="w-8 h-8" />,
  'Java': <Coffee className="w-8 h-8" />
};

const categoryColors = {
  'HTML/CSS': 'from-orange-500 to-red-500',
  'JavaScript': 'from-yellow-500 to-amber-500',
  'React': 'from-blue-500 to-cyan-500',
  'Node.js': 'from-green-500 to-emerald-500',
  'PHP': 'from-purple-500 to-indigo-500',
  'Java': 'from-red-500 to-pink-500'
};

const DeveloperPage = () => {
  const { name } = useParams();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const developer = developers.find(dev => dev.name === decodeURIComponent(name || ''));

  if (!developer) {
    return <div>Developer not found</div>;
  }

  const categories = ['HTML/CSS', 'JavaScript', 'React', 'Node.js', 'PHP', 'Java'];
  const availableCategories = categories.filter(category => 
    developer.projects.some(project => project.category === category)
  );

  return (
    <div>
      <div className="developer-header">
        <div className="flex items-center space-x-6">
          <img
            src={developer.image}
            alt={developer.name}
            className="developer-image"
          />
          <div>
            <h1 className="developer-name">{developer.name}</h1>
            <p className="developer-role">{developer.role}</p>
            <p className="developer-projects-info">
              {developer.projects.length} Projects across {availableCategories.length} technologies
            </p>
          </div>
        </div>
      </div>

      {!selectedCategory ? (
        <div className="category-grid">
          {availableCategories.map(category => {
            const projectCount = developer.projects.filter(
              project => project.category === category
            ).length;

            return (
              <div
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`category-card bg-gradient-to-r ${categoryColors[category]}`}
              >
                <div className="flex items-center space-x-4">
                  {categoryIcons[category]}
                  <div>
                    <h3 className="category-name">{category}</h3>
                    <p className="category-projects">{projectCount} Projects</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div>
          <button
            onClick={() => setSelectedCategory(null)}
            className="back-button"
          >
            ← Back to Categories
          </button>

          <div className="projects-section">
            <h2 className="projects-title">
              <span>{categoryIcons[selectedCategory]}</span>
              <span>{selectedCategory} Projects</span>
            </h2>

            <div className="project-grid">
              {developer.projects
                .filter(project => project.category === selectedCategory)
                .map(project => (
                  <ProjectCard key={project.title} project={project} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperPage;
