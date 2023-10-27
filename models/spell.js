const mongoose = require('mongoose');

const SpellSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

const SpellModel = mongoose.model('spell', SpellSchema);

module.exports = SpellModel;
