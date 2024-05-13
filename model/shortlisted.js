// Ensure that you define your model correctly
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const provSkillSchema = new mongoose.Schema({
  prov_mail: String,
  skill: String,
});

const shortlistSchema = new mongoose.Schema({
  shortlisted_by: String,
  shortlisted: [provSkillSchema],
});

module.exports = mongoose.model('Shortlist', shortlistSchema);

// Now you can use ShortlistModel.findOne
