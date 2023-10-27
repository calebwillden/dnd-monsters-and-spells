const mongoose = require('mongoose');

const MonsterSchema = new mongoose.Schema({
    name: { type: String, required: true },
    str: { type: Number, required: true },
    dex: { type: Number, required: true },
    con: { type: Number, required: true },
    int: { type: Number, required: true },
    wis: { type: Number, required: true },
    cha: { type: Number, required: true }
});

const MonsterModel = mongoose.model('monster', MonsterSchema);

module.exports = MonsterModel;
