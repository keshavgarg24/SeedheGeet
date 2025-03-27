import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs); // all the songs to add and subtract are available only to admin
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/trending", getTrendingSongs);

export default router;