import { Router } from 'express'
import { getAllBoards } from '../controller/boardController.js'

const boardRoutes = Router()

boardRoutes.route('/boards').get(getAllBoards)

export default boardRoutes