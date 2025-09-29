let express = require('express');
let app = express();
require('dotenv').config()

let bodyParser = require('body-parser')

// 1
// console.log("Hello World")

// keep middle ware together!

// 4 (middleware: app.use)
app.use("/public", express.static(__dirname + "/public"))

// 7 impl middelware func, log request func
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next()
})

// 11 parsing
app.use(bodyParser.urlencoded({ extended: false }))

// rest of method below middleware

// 3
// format:
/*
app.get(PATH, METHOD)
*/
app.get("/", (req, res) => {
    // 2
    // res.send("Hello Express")
    absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath)
})

// 5
// app.get("/json", (req,res)=>{
//     res.json(
//         {
//             "message": "Hello json"
//         }
//     )
// })

// 6

app.get("/json", (req, res) => {
    if (process.env["MESSAGE_STYLE"] == "uppercase") {
        res.json({ "message": "HELLO JSON" })
    } else {
        res.json({ "message": "Hello json" })
    }
})

// 8 chain
app.get('/now', (req, res, next) => {
    req.time = new Date().toString()
    next()
}, (req, res) => {
    res.json({
        time: req.time
    })
})

// 9 route param from client
app.get('/:word/echo', (req, res) => {
    res.json({ echo: req.params.word })
})

// 10 getting query param from client
app.get('/name', (req, res) => {
    res.json({ name: req.query.first + " " + req.query.last })
})

//12 get data from post req

app.post('/name', (req, res) => {
    res.json({ name: `${req.body.first} ${req.body.last}` })
})
































module.exports = app;
