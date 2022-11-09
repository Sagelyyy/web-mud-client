const express = require('express')
const fs = require('fs')
Tail = require('tail').Tail

const app = express()

app.listen(3000)

app.set('view engine', 'ejs')
app.use(express.static('public'))


const mudData = fs.watchFile("output.txt", (curr, prev) => {
        console.log("File edited")
        fs.readFile("output.txt", (err, data) => {
            if(err){
                console.log(err)
            }
            return data
        })
    })

    console.log(mudData)


app.get('/', (req, res) => {
    res.render('index', {output: mudData})
})