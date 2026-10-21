// src/routes/users.js
const express = require('express');
const router = express.Router();

// In-memory users data store
let users = [
  { id: 1, name: 'Alice Johnson', role: 'Student' },
  { id: 2, name: 'Bob Smith', role: 'Teacher' },
  { id: 3, name: 'Dr. Emily Davis', role: 'Administrator' },
];

// 1. GET /v1/users - Browse all users (with optional query filtering)
router.get('/', (req, res) => {
  let results = [...users];
  const { search, role } = req.query;

  if (role) {
    results = results.filter((u) => u.role.toLowerCase() === role.toLowerCase());
  }
  if (search) {
    results = results.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));
  }

  res.json({
    success: true,
    method: req.method,
    message: 'Users retrieved successfully.',
    data: results,
  });
});

// 2. GET /v1/users/:id - Get a single user by ID
router.get('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  res.json({
    success: true,
    method: req.method,
    message: 'User found.',
    data: user,
  });
});

// 3. POST /v1/users - Create a new user
router.post('/', (req, res) => {
  const { name, role } = req.body;

  if (!name) {
    return res.status(400).json({ success: false, message: 'Name is required.' });
  }

  const newId = users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
  const newUser = {
    id: newId,
    name,
    role: role || 'Student',
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    method: req.method,
    message: 'User created successfully.',
    data: newUser,
  });
});

// 4. PUT /v1/users/:id - Replace an entire user record
router.put('/:id', (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  const { name, role } = req.body;
  if (!name || !role) {
    return res
      .status(400)
      .json({ success: false, message: 'Name and role are required.' });
  }

  users[index] = {
    ...users[index],
    name,
    role,
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    method: req.method,
    message: 'User replaced successfully.',
    data: users[index],
  });
});

// 5. PATCH /v1/users/:id & /v1/users/:id/update - Partially update a user record
const handleUpdate = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  users[index] = {
    ...users[index],
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  res.json({
    success: true,
    method: req.method,
    message: 'Profile updated successfully.',
    data: users[index],
  });
};

router.patch('/:id', handleUpdate);
router.patch('/:id/update', handleUpdate);

// 6. DELETE /v1/users/:id & /v1/users/:id/delete - Delete a user record
const handleDelete = (req, res) => {
  const userId = parseInt(req.params.id, 10);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found.' });
  }

  users.splice(index, 1);

  res.json({
    success: true,
    method: req.method,
    message: 'User profile deleted permanently.',
    data: null,
  });
};

router.delete('/:id', handleDelete);
router.delete('/:id/delete', handleDelete);

module.exports = router;
