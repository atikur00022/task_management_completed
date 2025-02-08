import {
    CountTaskService,
    CreateTaskService,
    DeleteTaskService, SearchTaskService,
    UpdateTaskStatusService,
    ViewTaskByStatusService
} from "../services/TasksServices.js";

// Create Task
export const CreateTask = async (req, res) => {
    const result = await CreateTaskService(req, res);
    res.json(result);
}

// Update Task Status
export const UpdateTaskStatus = async (req, res) => {
    const result = await UpdateTaskStatusService(req, res);
    res.json(result);
}

// View Task By Status
export const ViewTask = async (req, res) => {
    const result = await ViewTaskByStatusService(req, res);
    res.json(result);
}

// Delete Task
export const DeleteTask = async (req, res) => {
    const result = await DeleteTaskService(req, res);
    res.json(result);
}

// Count Task
export const CountTask = async (req, res) => {
    const result = await CountTaskService(req, res);
    res.json(result);
}

// Search Task By Keyword
export const SearchTask = async (req, res) => {
    const result = await SearchTaskService(req, res);
    res.json(result);
}








































