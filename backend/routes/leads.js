const express = require('express');
const router = express.Router();
const Lead = require('../models/Lead');
const auth = require('../middleware/auth');

// GET /api/leads — Fetch all saved client leads (Requires Login)
router.get('/', auth, async (req, res) => {
    try {
        const leads = await Lead.find().sort({ createdAt: -1 }); // Newest leads first
        res.json(leads);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /api/leads — Save a brand new lead (Requires Login)
router.post('/', auth, async (req, res) => {
    try {
        const lead = new Lead(req.body);
        await lead.save();
        res.status(201).json(lead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /api/leads/:id — Edit status or notes updates (Requires Login)
router.put('/:id', auth, async (req, res) => {
    try {
        const lead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(lead);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /api/leads/:id — Erase a lead from existence (Requires Login)
router.delete('/:id', auth, async (req, res) => {
    try {
        await Lead.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lead successfully deleted.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;