const mongoose = require('mongoose');

const BoissonsSchema = mongoose.Schema({
    nom: String,
    description: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Boissons', BoissonsSchema);