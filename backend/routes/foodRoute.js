import express from "express";
import multer from "multer";
import { addFood,listFood,removeFood } from "../controllers/foodController.js";
import authMiddleware from "../middleware/auth.js";

const foodRouter = express.Router();

// Image Storage local

const storage= multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload= multer({storage:storage})

foodRouter.post("/add",authMiddleware,upload.single("image"),addFood);
foodRouter.get("/list",listFood);
foodRouter.delete("/remove/:id",authMiddleware, removeFood);


export default foodRouter;