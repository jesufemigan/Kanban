import { Router } from 'express'
import { addNewBoard, deleteBoard, getAllBoards, getOneBoard } from '../controller/boardController.js'

const boardRoutes = Router()

boardRoutes.route('/boards').get(getAllBoards)
boardRoutes.route('/boards/:board_id').get(getOneBoard).delete(deleteBoard)
boardRoutes.route('/boards').post(addNewBoard)

export default boardRoutes