
loadPage()
async function loadPage() {
    try {
        let telefoni = await axios.get("/api/telefoni")
        addEventListeners()
        renderCards(telefoni.data.telefoni)
        
    } catch (err) {
        console.log(err)
    }
}

function addEventListeners(){
  const deleteBtns = [...document.querySelectorAll(".delete-button")]
    //dodajemo da na klik svakog dugmeta brisemo specifican telefon koristeci njegov ID
    deleteBtns.forEach((btn) =>{
        btn.addEventListener("click", () => deleteData(btn))
      }
    ) 
}
async function deleteData(btn) {
  //uzimamo ID telefona
  const id = getId(btn)
  try {
      //brisemo telefon po ID-u
      await axios.delete(`/api/telefoni${id}`)
      //vracamo se na pocetnu stranicu
      window.location.href = "/"
  } catch (err) {
      console.log(err)
  }
}

function renderCards(telefoni) {
    const  telefoniStranica= document.querySelector("#telefoni_prva_stranica")
    const footer = document.querySelector(".footer-nav")
    const header = document.querySelector(".navbar-nav")
    let cards = ""
    telefoni.forEach((telefon) => {
        cards += createCard(telefon)
        footer.innerHTML+=`<a href="telefon.html?id=${telefon._id}">${telefon.Naziv}</a> | `
        header.innerHTML+=`<a class="nav-item nav-link" href="telefon.html?id=${telefon._id}">${telefon.Naziv}</a>`
    })
    header.innerHTML+=`<a class="nav-item nav-link" href="mailto:kojic.sara@jjzmaj.edu.rs">Kontakt</a>`
    telefoniStranica.innerHTML = cards
}

function createCard(telefon) {
    let card = `
    <section class="telefon-tekst">
          <article>
            <div class="row">
              <div class="col-sm-12 col-lg-4">
                <figure class="telefon-foto">
                  <a href="telefon.html?id=${telefon._id}">
                    <img src="${telefon.Slika}" alt="${telefon.Naziv}" class="image-telefon" />
                  </a>
                </figure>
              </div>
              <div class="col-sm-12 col-lg-8" telefon-id="${telefon._id}">
                <h3>${telefon.Naziv}</h3>
                <p id="prva-stranica-p">${telefon.PrvastranicaOpis}</p>
                <p id="prva-stranica-p"><a href="telefon.html?id=${telefon._id}">Pročitaj više...</a></p>
              </div>
            </div>
          </article>
        </section>
    `

    return card
}

function createFooter(telefon){
  document.querySelector(".footer-nav")
}

/*
function getId(btn) {
    const parent = btn.parentElement
    const id = parent.getAttribute("phone-id")
    return id
}*/

const postButton = document.querySelector("#postTelefon")
postButton.addEventListener("click", getInput)

async function getInput() {
    try {
      const noviTelefon= {
            naziv: document.querySelector("#naziv").value,
            slika: document.querySelector("#slika").value,
            ekran: document.querySelector("#ekran").value,
            kapacitet: document.querySelector("#kapacitet").value,
            kamera: document.querySelector("#kamera").value,
            prednjak: document.querySelector("#pkamera").value,
            napibat: document.querySelector("#napajanje").value,
            sadrzaj: document.querySelector("#sadrzaj").value,
            visina: document.querySelector("#visina").value,
            sirina: document.querySelector("#sirina").value,
            dubina: document.querySelector("#dubina").value,
            tezina: document.querySelector("#tezina").value,
            datum: document.querySelector("#datum").value,
            video: document.querySelector("#video").value,
            popis: document.querySelector("#popis").value,
            opis: document.querySelector("#opis").value,
            otpornost: document.querySelector("#otpornost").value
            
      }
        await axios.post("/api/telefoni", noviTelefon)
        loadPage()
    } catch (err) {
        console.log(err)
    }
}
function getId(btn) {
  //uzimamo parent element tj. div u kojem se nalazi ovaj button
  const parent = btn.parentElement
  //uzimamo vrednost atributa phone-id tj. ID specificnog telefona
  const id = parent.getAttribute("telefon-id")
  return id
}


