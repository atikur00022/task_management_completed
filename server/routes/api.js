import express from 'express';
const router = express.Router();

import AuthMiddleware from '../app/middlewares/AuthMiddleware.js';
import * as UsersController from '../app/controllers/UsersController.js';
import * as TasksController from '../app/controllers/TasksController.js';


// Users Routes
router.post('/Registration', UsersController.Registration);
router.post('/Login', UsersController.Login);
router.post('/ProfileUpdate/:id', AuthMiddleware, UsersController.ProfileUpdate);
router.get('/ProfileDetails', AuthMiddleware, UsersController.ProfileDetails);
router.post('/SendOtp/:email', UsersController.SendOtp);
router.post('/VerifyOtp', UsersController.VerifyOtp);
router.post('/ResetPassword', UsersController.ResetPassword);

// Task Routes
router.post('/CreateTask', AuthMiddleware, TasksController.CreateTask);
router.get('/UpdateTaskStatus/:id/:status', AuthMiddleware, TasksController.UpdateTaskStatus);
router.get('/ViewTask/:status', AuthMiddleware, TasksController.ViewTask);
router.get('/DeleteTask/:id', AuthMiddleware, TasksController.DeleteTask);
router.get('/CountTask', AuthMiddleware, TasksController.CountTask);
router.get('/SearchTask/:keyword', AuthMiddleware, TasksController.SearchTask);


export default router;