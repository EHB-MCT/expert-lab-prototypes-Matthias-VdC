import express from 'express';
import * as SongsController from '../controllers/songs.controller.js';
import songsMiddleWare from '../middleware/songs.middleware.js';
const router = express.Router();



// middleware for the songCollection routes
router.use(songsMiddleWare);

// GET
router.get('/all', SongsController.getAll);

// POST
router.post('/create', SongsController.createSong);

export default router;
