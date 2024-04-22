import express from "express"
import {
    loginUser,
    registerUser,
    logoutUser
} from "../controller/User.controller.js"
import { upload } from "../middlewares/multer.middleware.js";

import { verifyJWT } from "../middlewares/verifyJWT.js";

const router = express.Router();

router.route("/login").post(loginUser);

router.route("/signup").post(upload.fields([{name: "avatar", maxCount: 1}]) ,registerUser);

router.route("/logout").get(verifyJWT, logoutUser)

export default router;