const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(cors());
const port = 4000
let db = require('./pokemon_db.json')
db=db.map(pokemon=>({...pokemon,img:`https://img.pokemondb.net/sprites/silver/normal/${pokemon.name.toLowerCase()}.png`}))


app.get('/pokemon', (req, res) => {
    const limit=req.query.limit || 5
    const offset=req.query.offset || 0
    const response = db.slice(offset,limit+1)
    res.send(response)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
