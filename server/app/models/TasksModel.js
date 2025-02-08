import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        status: { type: String, required: true, default: 'new' },
        createdAt: { type: Date, default: Date.now() },
    },
    {
        versionKey: false
    }
);

const TaskModel = mongoose.model('tasks', DataSchema);

export default TaskModel;