const { model, Schema } = require('mongoose')

const subTaskSchema = new Schema({
    title: String,
    isCompleted: {
        type: Boolean,
        default: false
    }
})

const taskSchema = new Schema({
    title: String,
    description: String,
    subtasks: [subTaskSchema],
    status: {
        type: String,
        required: true
    }
})

const columnSchema = new Schema({
    title: String,
    tasks: {
        type: [taskSchema],
        default: []
    },
})

const boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    columns: {
        type: [columnSchema],
        default: []
    }
}, {
    timestamps: true
})

export default model('Board', boardSchema)
