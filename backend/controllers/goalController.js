const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')



// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id })

    res.send(goals)
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field!')
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })
    res.send(goal)
})

// @desc    Update goal
// @route   PUT /api/goals
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check if user exists
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // make sure logged in user owns goal 
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true },)
    res.send(updatedGoal)
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)
    if (!goal) {
        res.status(400)
        throw new Error('Goal not found')
    }

    const user = await User.findById(req.user.id)

    // check if user exists
    if (!user) {
        res.status(401)
        throw new Error('User not found')
    }
    // make sure logged in user owns goal 
    if (goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.remove()

    res.send({ id: req.params.id, message: 'Goal deleted' })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}