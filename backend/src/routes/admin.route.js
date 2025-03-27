import { Router } from "express";
import { checkAdmin, createAlbum, createSong, deleteAlbum, deleteSong } from "../controller/admin.controller.js";
import { protectRoute, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute, requireAdmin); // the below routes will be protected by the middleware

router.get("/check", checkAdmin); // to check if the current user is an admin

router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);

router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;