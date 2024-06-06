import { Router } from 'express'
import { getAllBoards, getOneBoard } from '../controller/boardController.js'

const boardRoutes = Router()

boardRoutes.route('/boards').get(getAllBoards)
boardRoutes.route('/boards/:board_id').get(getOneBoard)

export default boardRoutes