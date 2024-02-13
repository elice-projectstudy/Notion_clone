const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const { getDB } = require('../database/db');
const Note = require('../models/noteModel');

router.post('/', async (req, res) => {
  try {
    const db = getDB();
    const newNote = req.body;
    await db.collection('notes').insertOne(newNote);
    res.redirect('/');
    res.render('index');
  } catch (err) {
    console.error(`Error updatings:`, err);
  }
});

// GET all notes with their children
router.get('/', async (req, res) => {
  const db = getDB();
  const notes = await db
    .collection('notes')
    .find({ parentId: { $exists: false } })
    .toArray();
  const notesWithChildren = await Promise.all(
    notes.map(async (note) => {
      const children = await db
        .collection('notes')
        .find({ parentId: note._id })
        .toArray();
      note.children = children;
      return note;
    })
  );
  res.render('index', { notes: notesWithChildren });
});

// GET a note and its children by ID
router.get('/:id', async (req, res) => {
  const noteId = ObjectId(req.params.id);
  const note = await db.collection('notes').findOne({ _id: noteId });
  const children = await db
    .collection('notes')
    .find({ parentId: noteId })
    .toArray();
  note.children = children;
  res.json(note);
});

// POST request to create a new sub note
router.post('/:parentId/note', async (req, res) => {
  try {
    const parentNoteId = ObjectId(req.params.parentId);
    const newSubNote = new Note({
      title: req.body.title,
      content: req.body.content,
      parentId: parentNoteId, // 부모 노트의 ID를 저장
    });
    await newSubNote.save();
    res.redirect('/');
  } catch (err) {
    console.error('Error creating a new sub note:', err);
    res
      .status(500)
      .json({ error: 'An error occurred while creating a new sub note.' });
  }
});

router.post('/', async (req, res) => {
  const newNote = new Note({
    title: '제목',
    content: '내용',
    author: '최세영',
  });
  await newNote.save();
  res.redirect('/');
});

module.exports = router;
