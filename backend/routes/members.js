const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const Member = require('../models/Member');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up Multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Create unique filename
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Images only!'));
    }
  }
});

// @route   POST /members
// @desc    Add a new member
router.post('/', upload.single('image'), async (req, res) => {
  try {
    console.log('--- Debug: req.body ---', req.body);
    console.log('--- Debug: req.file ---', req.file);

    const { name, roll, year, degree, role, email, project, hobbies, certificate, internship } = req.body;
    
    // Validate required core inputs
    if (!name || !role || !email) {
      return res.status(400).json({ message: 'Name, role, and email are required.' });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Profile image is required.' });
    }

    // Create new member
    const newMember = new Member({
      name,
      roll,
      year,
      degree,
      role,
      email,
      project,
      hobbies,
      certificate,
      internship,
      image: req.file.filename // Save just the filename
    });

    const savedMember = await newMember.save();
    console.log('Member successfully saved to DB:', savedMember);
    res.status(201).json(savedMember);
  } catch (err) {
    console.error('Error adding member:', err);
    res.status(500).json({ message: err.message || 'Server Error' });
  }
});

// @route   GET /members
// @desc    Get all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    console.error('Error fetching members:', err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /members/:id
// @desc    Get single member by ID
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.json(member);
  } catch (err) {
    console.error('Error fetching member:', err);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Member not found' });
    }
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
