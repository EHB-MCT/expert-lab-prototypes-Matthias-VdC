import express from 'express';
import usersMiddleWare from '../middleware/users.middleware.js';
import * as UsersController from '../controllers/users.controller.js';
const router = express.Router();

// middleware for the sonCollection routes
router.use(usersMiddleWare);

// GET
router.get('/all', UsersController.getAll);
router.get('/specific/:id', UsersController.getSpecific);

// POST
router.post('/login', UsersController.login);
router.post('/register', UsersController.register);


export default router;
