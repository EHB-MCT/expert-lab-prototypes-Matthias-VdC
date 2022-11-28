import express from 'express';
import checkSongcollectionField from '../helpers/checkSongsField.js';
import * as SongsController from '../controllers/songs.controller.js';
import songsMiddleWare from '../middleware/songs.middleware.js';
const router = express.Router();



// middleware for the songCollection routes
router.use(songsMiddleWare);

router.get('/all', SongsController.getAll);
router.post('/create', SongsController.createSong);

export default router;
