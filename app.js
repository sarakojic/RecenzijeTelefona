const express = require("express")
const app = express()

const connectDB = require("./back/baza")

connectDB()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("./front"))

app.set("view-engine", "ejs")
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("./front/static"))


app.get("/", (req, res) => {
    res.render("../front/index.ejs")
})
//telefon
const telefonViewRoute = require("./back/views/telefon")
app.use("/", telefonViewRoute)
const telefonRoute = require("./back/controller/telefon")
app.use("/api", telefonRoute)


const port = 3000
app.listen(port, () => {
    console.log("Listening on port: " + port)
})