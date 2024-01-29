// models/PullRequest.js
const mongoose = require('mongoose');

const pullRequestSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    // other fields
}, { timestamps: true });

module.exports = mongoose.model('PullRequest', pullRequestSchema);