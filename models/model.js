const mongoose = require('mongoose');

const deliSchema = mongoose.Schema({
    name: String

}, {collection: 'delis'});

module.exports = mongoose.model('Deli', deliSchema);
