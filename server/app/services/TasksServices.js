import TasksModel from "../models/TasksModel.js";
import {ObjectId} from "mongodb";

// Create Task
export const CreateTaskService = async (req, res) => {
    try{

        const userId = new ObjectId(req.headers['userId']);
        const reqBody = req.body;
        reqBody.userId = userId;

        await TasksModel.create(reqBody);

        return{ status: 'success', message: 'Task created successfully!' };
    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// Update Task Status
export const UpdateTaskStatusService = async (req, res) => {
    try{

        const userId = new ObjectId(req.headers['userId']);
        const id = new ObjectId(req.params['id']);
        const status = req.params['status'];

        await TasksModel.updateOne({_id: id, userId: userId}, {$set: {status: status}} );

        return{ status: 'success', message: 'Task status updated successfully!' };
    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// View Task By Status
export const ViewTaskByStatusService = async (req, res) => {
    try{

        const userId = new ObjectId(req.headers['userId']);
        const status = req.params['status'];

        const data = await TasksModel.aggregate([
            { $match: { status: status, userId: userId } },
            { $project: { _id:1, title: 1, description: 1, status: 1,
                createdAt: {
                    $dateToString: {
                        date: "$createdAt", // Correct field reference
                        format: "%d-%m-%Y" // Fixed format
                    }
                }
            } },
        ]);

        return{ status: 'success', message: 'Task viewed successfully!', data: data };
    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// Delete Task
export const DeleteTaskService = async (req, res) => {
    try{

        const id = new ObjectId(req.params['id']);
        const userId = new ObjectId(req.headers['userId']);

        await TasksModel.deleteOne({_id: id, userId: userId});

        return{ status: 'success', message: 'Task deleted successfully!' };
    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// Count Task
export const CountTaskService = async (req, res) => {
    try{

        const userId = new ObjectId(req.headers['userId']);

        const data = await TasksModel.aggregate([
            { $match: { userId: userId } },
            {$group: {_id: "$status", total:{$count:{}}}}
        ]);

        return{ status: 'success', message: 'Task counted successfully!', data: data };
    }catch (e) {
        return { status: 'error', message: e.toString() };
    }
}

// Search Task By Keyword
export const SearchTaskService = async (req, res) => {
    try {
        const userId = new ObjectId(req.headers['userId']);
        const keyword = req.params['keyword'];
        const regex = { $regex: keyword, $options: "i" };
        const SearchParams = [{ title: regex }, { description: regex }];
        const SearchQuery = { $or: SearchParams };
        const MatchingStage = { $match: { userId: userId, ...SearchQuery } };

        const Projection = {
            $project: {
                _id: 1,
                title: 1,
                description: 1,
                status: 1,
                createdAt: {
                    $dateToString: {
                        date: "$createdAt",
                        format: "%d-%m-%Y" // ✅ Format: DD-MM-YYYY HH:MM:SS
                    }
                }
            }
        };

        const data = await TasksModel.aggregate([
            MatchingStage,
            Projection,
        ]);

        return { status: 'success', message: 'Task found successfully!', data: data };
    } catch (e) {
        return { status: 'error', message: e.toString() };
    }
};
























