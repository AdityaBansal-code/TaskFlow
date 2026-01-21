const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Task must belong to a user']
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    status: {
        type: String,
        enum: {
            values: ['pending', 'in-progress', 'completed'],
            message: '{VALUE} is not a valid status'
        },
        default: 'pending'
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', TaskSchema);

