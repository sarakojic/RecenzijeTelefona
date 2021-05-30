var mongoose = require("mongoose")

var telefonSchema = new mongoose.Schema({
 
    Naziv:String,
    PrvastranicaOpis:String,
    Opis:String,
    Slika:String,
    Ekran:String,
    Kapacitet:String,
    Otpornost_na_vodu_i_prasinu:String,
    Kamera:String,
    Prednja_kamera:String,
    Napajanje_i_baterija:String,
    Sadrzaj_u_pakovanju:String,
    Visina:String,
    Sirina:String,
    Dubina:String,
    Tezina:String,
    Datum_proizvodnje:String,
    Video:String,
    Ocena:Number,
    Komentari: [{
        Ime:String,
        Naslov:String,
        Ocena:Number,
        sadrzaj:String,
        likes:Number,
        dislikes:Number,
        Komentari:[{
            Ime:String,
            Naslov:String,
            sadrzaj:String,
            likes:Number,
            dislikes:Number
        }]
    }],
    created: Date,
    updated: Date
}, { collection: "telefoni" })

telefonSchema.pre("save", function (next) {
    const currentDate = new Date()
    this.updated = currentDate
    if (!this.created)
        this.created= currentDate
    next()
})

module.exports = mongoose.model("telefon", telefonSchema)



