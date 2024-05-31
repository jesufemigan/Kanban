import { Router } from 'express'
import { getAllBoards } from '../controller/boardController.js'

const boardRoutes = Router()

boardRoutes.route('/').get(getAllBoards)

export default boardRoutes