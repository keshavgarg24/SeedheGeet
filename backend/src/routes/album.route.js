import { Router } from "express";
import { getAlbumById, getAllAlbums } from "../controller/album.controller.js";

const router = Router();

router.get("/", getAllAlbums); // not protected so that user can see and listen to albums even if they are not autheneticated 
router.get("/:albumId", getAlbumById);

export default router;