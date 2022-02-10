const asyncHandler = require('express-async-handler')

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = asnycHandler(async (req, res) => {
    res.send({ message: 'Get goals' })
})

// @desc    Set goals
// @route   POST /api/goals
// @access  Private
const setGoal = asnycHandler(async(req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add a text field!')
    }
    res.send({ message: 'Set goals' })
})

// @desc    Update goal
// @route   PUT /api/goals
// @access  Private
const updateGoal = asnycHandler(async(req, res) => {
    res.send({ message: `Update goal ${req.params.id}` })
})

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asnycHandler(async(req, res) => {
    res.send({ message: `Delete goal ${req.params.id}` })
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}