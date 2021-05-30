
const { Router } = require("express")
const router = Router()


router.get("/telefoni", (req, res) => {
    res.render("../front/views/telefoni.ejs")
})
router.get("/telefon", (req, res) => {
    res.render("../front/views/telefon.ejs")
})


module.exports = router