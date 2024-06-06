import expressAsyncHandler from 'express-async-handler'
import Board from '../model/boardModel.js'

export const getAllBoards = expressAsyncHandler(async (req, res) => {
    const boards = await Board.find()
    res.status(200).json(boards)
})

export const getOneBoard = expressAsyncHandler(async (req, res) => {
    const { board_id } = req.params
    const board = await Board.findById(board_id)
    res.json(board)
})

export const addNewBoard = expressAsyncHandler(async (req, res) => {
    const { title, columns } = req.body
    const newBoard = new Board({
        title,
        columns
    })
    await newBoard.save()
    res.json(newBoard)
})

export const editBoard = expressAsyncHandler(async (req, res) => {
    const { board_id } = req.params
    const { title, columns } = req.body

    await Board.findByIdAndUpdate(board_id, { title, columns }, { new: true })
    const allBoard = await Board.find()
    res.status(200).json(allBoard)
})

export const deleteBoard = expressAsyncHandler(async (req, res) => {
    const { board_id } = req.params
    await Board.findByIdAndDelete(board_id)
    const allBoard = await Board.find()
    res.status(200).json(allBoard)
})