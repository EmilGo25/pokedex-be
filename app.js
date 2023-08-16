const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json());
app.use(cors());
const port = 4000
let db = require('./pokemon_db.json')
db=db.filter(pokemon=>/^[a-zA-Z]+$/.test(pokemon.name)).map(pokemon=>({...pokemon,img:`https://img.pokemondb.net/sprites/silver/normal/${pokemon.name.toLowerCase()}.png`}))


app.get('/pokemon', (req, res) => {
    const limit=Number(req.query.limit) || 5
    const offset=Number(req.query.offset) || 0
    const sort= req.query.sort || 'asc'
    const response = {data:db.sort((a,b)=>sort==='asc'?a.number-b.number:b.number-a.number).slice(offset,offset+ limit),total:db.length}
    res.send(response)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
