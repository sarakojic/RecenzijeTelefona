
const express = require("express")
const router = express()
const telefon = require("../model/telefon")

router.get("/telefoni", async (req, res) => {
  try {
      const sviTelefoni = await telefon.find()
      res.status(200).json({
          success: true,
          telefoni: sviTelefoni
      })
  } catch (err) {
      res.status(404).json({
          success: false,
          message: err.message
      })
  }
})
router.get("/telefoni/:id", async (req, res) => {
  try {
      const id = req.params.id
      const jedanTelefon = await telefon.findById(id)
      res.status(200).json({
          success: true,
          telefon: jedanTelefon
      })
  } catch (err) {
      res.status(404).json({
          success: false,
          message: err.message
      })
  }
})
router.get("/telefoni/:id/small", async (req, res) => {
  try {
      const id = req.params.id
      const jedanTelefon= await telefon.findById(id)

      res.status(200).json({
          success: true,
          telefon: {
              _id: jedanTelefon._id,
              Naziv:jedanTelefon.Naziv,
              PrvastranicaOpis:jedanTelefon.PrvastranicaOpis,
              Slika:jedanTelefon.Slika
          }
      })
  } catch (err) {
      res.status(404).json({
          success: false,
          message: err.message
      })
  }
})
router.put("/telefoni/:id", async (req, res) => {
  try {
      const telefonID = req.params.id
      const jedanTelefon = await telefon.findById(telefonID)
      telefon.findByIdAndUpdate(req.body._id, req.body, (err, doc) => {
          if (err) {
              console.log("Error during record updates: " + err)
          }
      })
      res.status(200).json({
          success: true
      })}
    catch (err) {
      res.status(404).json({
          success: false,
          message: err.message
      })
  }
})

router.delete("/telefoni/:id", async (request, response) => {
    try {
      const jedanTelefon = await telefon.findByIdAndDelete(request.params.id);
  
      if (jedanTelefon==NULL) response.status(404).send("No item found");
      response.status(200).send();
    } catch (error) {
      response.status(500).send(error);
    }
  });
router.put("/telefoni/:id/komentari", async (req, res) => {
    try {
        const telefonID = req.params.id
        const noviKomentarBody = {
          Ime: req.body.ime,
          Naslov: req.body.naslov,
          sadrzaj: req.body.sadrzaj,
          Ocena:req.body.ocena,
          likes: 0,
          dislikes: 0
      }
        const jedanTelefon = await telefon.findById(telefonID)
        jedanTelefon.Komentari.push(noviKomentarBody)
        await jedanTelefon.save()
        res.status(200).json({
            success: true
        })}
      catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
  })
router.put("/telefoni/:idTel/komentari/:idKom", async (req, res) => {
    try {
        const telefonID = req.params.idTel
        const komentarID = req.params.idKom
        jedanTelefon=await telefon.findById(telefonID)
        let komentar
        jedanTelefon.Komentari.forEach(comment => {
          if (comment._id==komentarID){
            found=true
            komentar=comment
          }
        });
        if (found==true){
          const noviKomentarBody = {
            Ime: req.body.ime,
            Naslov: req.body.naslov,
            sadrzaj: req.body.sadrzaj,
            Ocena:req.body.ocena,
            likes: 0,
            dislikes: 0,
        }
          komentar.Komentari.push(noviKomentarBody)
          await jedanTelefon.save()
        
        res.status(200).json({
            success: true
        })}}
      catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
  })
  router.put("/telefoni/:idTel/komentari/:idKom/like", async (req, res) => {
    try {
      const telefonID = req.params.idTel
      const komentarID = req.params.idKom
        const jedanTelefon = await telefon.findById(telefonID)
        let found=false
        let komentar
        jedanTelefon.Komentari.forEach(comment => {
          if (comment._id==komentarID){
            found=true
            komentar=comment
          }
        });
        if (found==true){
          komentar.likes++;
          await jedanTelefon.save()
        res.status(200).json({
            success: true
        })}
        else{
          res.status(404).json({
            success: false,
            message: "comment not found"
        })
        }
        
      }
      catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
  })
  router.put("/telefoni/:idTel/komentari/:idKom/dislike", async (req, res) => {
    try {
      const telefonID = req.params.idTel
      const komentarID = req.params.idKom
        const jedanTelefon = await telefon.findById(telefonID)
        let found=false
        let komentar
        jedanTelefon.Komentari.forEach(comment => {
          if (comment._id==komentarID){
            found=true
            komentar=comment
          }
        });
        if (found==true){
          komentar.dislikes++;
          await jedanTelefon.save()
        res.status(200).json({
            success: true
        })}
        else{
          res.status(404).json({
            success: false,
            message: "comment not found"
        })
        }
        
      }
      catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
  })
    

  router.post("/telefoni", async (req, res) => {
    try {
        const noviTelefonBody = {
            Naziv: req.body.naziv,
            PrvastranicaOpis: req.body.popis,
            Opis: req.body.opis,
            Slika: req.body.slika,
            Ekran: req.body.ekran,
            Kapacitet: req.body.kapacitet,
            Prednja_kamera: req.body.prednjak,
            Napajanje_i_baterija: req.body.napibat,
            Visina: req.body.visina,
            Sirina: req.body.sirina,
            Dubina: req.body.dubina,
            Tezina: req.body.tezina,
            Datum_proizvodnje:req.body.datum,
            Video: req.body.video,
            Sadrzaj_u_pakovanju:req.body.sadrzaj,
            Kamera:req.body.kamera,
            Otpornost_na_vodu_i_prasinu:req.body.otpornost,
            Ocena:0
        }
        console.log(noviTelefonBody)
        const noviTelefon= new telefon(noviTelefonBody)
        const sacuvanTelefon = await noviTelefon.save()
        res.status(200).json({
            success: true
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: err.message
        })
    }
})
module.exports = router