require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { getJobs, getFilteredJobs } = require('./jobs')

const port = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(cors())

app.get('/jobs', getJobs)
app.post('/jobs/filtered', getFilteredJobs)

app.listen(port, () => {
    console.log(`Listening on ${port}`)
})