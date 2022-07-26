const mongoose = require('mongoose');

var studentsSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This field is required.'
    },
    id: {
        type: String
    },
    mobile: {
        type: String
    },
    city: {
        type: String
    }
});


mongoose.model('Student', studentsSchema);