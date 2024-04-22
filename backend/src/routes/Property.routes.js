import express from 'express'
import { 
    createProperty,
    getAllProperties,
    getProppertyById
} from '../controller/Property.controller.js'
import {verifyJWT} from '../middlewares/verifyJWT.js'
import { upload } from '../middlewares/multer.middleware.js'

const router = express.Router()

router.route("/add-property").post(upload.fields([{name : 'PropertyImage', maxCount: 1}]), createProperty)

router.route("/get-properties").get(getAllProperties)

router.route("/get-property/:id").get(getProppertyById)

export default router