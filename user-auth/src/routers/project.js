const express = require('express')
const Project = require('../models/Project')
const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, async (req, res) => {
    // Create a new project
    try {
        const project = new Project(req.body)
        res.status(201).send({ project })
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/edit/:id', async (req, res) => {
    // Edit existing project
    try {
        const project = new Project(req.body)
        res.status(201).send({ project })
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router