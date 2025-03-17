import express from 'express'
import * as conRequests from "../controllers/controller.js";

const router1 = express.Router()
const router2 = express.Router()
const router3= express.Router()

router1.route('/').get(conRequests.getAllContainer).post(conRequests.addNewContainer)
router1.route('/:id').get(conRequests.getContainerById)
router2.route('/:id').get(conRequests.getContainerComponent)
router2.route('/').post(conRequests.addNewComponent)
router3.route('/:name').get(conRequests.searchContainer)

export {router1, router2, router3}