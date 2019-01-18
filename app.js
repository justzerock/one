const express = require('express')
const app = express()

app.get('/', (req, res)=>{
    res.send('(๑• . •๑)')
})

app.listen(3000)