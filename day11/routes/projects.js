const express = require('express');
const { ObjectId } = require('mongodb');

const router = express.Router();

// GET all projects
router.get('/', async (req, res) => {
  const db = req.app.locals.db;
  const projects = await db.collection('projects').find().toArray();
  res.status(200).json(projects);
});

// CREATE a project
router.post('/', async (req, res) => {
  const db = req.app.locals.db;
  const project = req.body;
  project.createdAt = new Date();
  const result = await db.collection('projects').insertOne(project);
  res.status(201).json(result);
});

// UPDATE a project by ID
router.put('/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;
  const updates = req.body;

  try {
    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(200).json({ message: 'Project updated successfully' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
});

// DELETE a project by ID
router.delete('/:id', async (req, res) => {
  const db = req.app.locals.db;
  const { id } = req.params;

  try {
    const result = await db.collection('projects').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: 'Invalid ID format' });
  }
});

module.exports = router;
