const express = require('express');
const app = express();
const PORT = 3000;

// Hard-coded data
const projects = [
  { id: 1, name: "Portfolio Website", description: "A personal website showcasing my work." },
  { id: 2, name: "E-Commerce App", description: "An online store with cart and checkout features." },
  { id: 3, name: "Chat App", description: "A real-time chat app built with Socket.io." }
];

const workExperience = [
  { id: 1, role: "Frontend Developer", company: "TechCorp", duration: "Jan 2024 - Present" },
  { id: 2, role: "Web Developer Intern", company: "StartupX", duration: "Jun 2023 - Dec 2023" }
];

// Routes

// GET all projects
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

// GET single project by ID
app.get('/api/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const project = projects.find(p => p.id === projectId);
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// GET work experience
app.get('/api/work-experience', (req, res) => {
  res.json(workExperience);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
