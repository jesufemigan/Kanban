const Router = require('express')
const getAllBoards = require('../controller/boardController')

const boardRoutes = Router()

boardRoutes.route('/').get(getAllBoards)

export default boardRoutes