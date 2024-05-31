import expressAsyncHandler from 'express-async-handler'
const Board = {
    'id': 1,
    'name': "Design"
}

export const getAllBoards = expressAsyncHandler(async (req, res) => {
  res.status(200).json(Board)  
})