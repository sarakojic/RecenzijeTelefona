
const urlId = getUrlId()

function getUrlId() {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get("id")
    if (id == null) {
        window.location.href = ""
    }

    return id
}
loadPage()
loadData()
async function loadPage() {
    try {
        let telefonBody = await axios.get(`/api/telefoni/${urlId}`)
        const telefoniBody= await axios.get(`api/telefoni`)
        const telefoni=telefoniBody.data.telefoni
        renderNav(telefoni)
        let telefon=telefonBody.data.telefon
        ocena(telefon)
        const ocenaHTML=document.querySelector("#ocena")
        ocenaHTML.innerHTML='<strong>' + telefon.Ocena + ' od 5</strong>'
        renderCards(telefon.Komentari)
        addEventListeners()
    } catch (err) {
        console.log(err)
    }
}
async function loadData(){
  let telefonBody = await axios.get(`/api/telefoni/${urlId}`)
  let telefon=telefonBody.data.telefon
  const h1=document.querySelector("h1")
  h1.innerHTML=telefon.Naziv
  $("#opis").html(telefon.Opis);
  $("#slika").attr("src", telefon.Slika);
  $("#slika").attr("alt", telefon.Naziv);
  $("#teh-karakteristike").html('<h2>Tehničke karakteristike</h2><h3>'+ telefon.Naziv+'</h3>');

  $("#ekran").html(telefon.Ekran);
  $("#kapacitet").html(telefon.Kapacitet);
  $("#otpornost").html(telefon.Otpornost_na_vodu_i_prasinu);
  $("#kamera").html(telefon.Kamera);
  $("#prednja_kamera").html(telefon.Prednja_kamera);
  $("#baterija").html(telefon.Napajanje_i_baterija);
  $("#sadrzaj").html(telefon.Sadrzaj_u_pakovanju);
  $("#visina").html(telefon.Visina);
  $("#sirina").html(telefon.Sirina);
  $("#dubina").html(telefon.Dubina);
  $("#tezina").html(telefon.Tezina);
  $("#datum_proizvodnje").html(telefon.Datum_proizvodnje);
  $("#naziv_telefona").html(telefon.Naziv);
  $("iframe").attr("src", telefon.Video);
}
function Zvezdice_za_ocenu(x){
  var zvezda;

  switch(x) {
    case 0:
      zvezda = 'img/star_0.png';
      break;
    case 0.5:
      zvezda = 'img/star_0_5.png';
      break;
    case 1:
      zvezda = 'img/star_1.png';
      break;
    case 1.5:
      zvezda = 'img/star_1_5.png';
      break;
    case 2:
      zvezda = 'img/star_2.png';
      break;
    case 2.5:
      zvezda = 'img/star_2_5.png';
      break;
    case 3:
      zvezda = 'img/star_3.png';
      break;
    case 3.5:
      zvezda = 'img/star_3_5.png';
      break;
    case 4:
      zvezda = 'img/star_4.png';
      break;
    case 4.5:
      zvezda = 'img/star_4_5.png';
      break;
    case 5:
      zvezda = 'img/star_5.png';
      break;
      
   }
  return zvezda}
function ocena(telefon){
  var ocena=0;
      var brojac=0;
      telefon.Komentari.forEach((kom )=> {
        ocena+=kom.Ocena
        brojac++
      });
      
      ocena=ocena/brojac;
      telefon.Ocena=ocena
      ocena = Math.round(ocena*2)/2;
      var zvezdice;
      
      zvezdice = Zvezdice_za_ocenu(ocena);
      $("#zvezdice").attr("src", zvezdice);
        return zvezdice;
}

function addEventListeners() {
  
  const likeBtn = [...document.querySelectorAll("#likeKomentar")]
  likeBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
          likeComment(btn)
      })
  )
  const dislikeBtn = [...document.querySelectorAll("#dislikeKomentar")]
  dislikeBtn.forEach((btn) =>
      btn.addEventListener("click", () => {
        dislikeComment(btn)
      })
  )
  const comment2Btn = [...document.querySelectorAll("#postKomentar2")]
    comment2Btn.forEach((btn) =>
        btn.addEventListener("click", () => getInput2(btn))
    )
}
async function likeComment(btn){
  try{
  const komentarId=getId(btn)
  await axios.put(`/api/telefoni/${urlId}/komentari/${komentarId}/like`)
  loadPage()
  }
  catch(err){
    console.log(err)
  }
}
async function dislikeComment(btn){
  try{
  const komentarId=getId(btn)
  await axios.put(`/api/telefoni/${urlId}/komentari/${komentarId}/dislike`)
  loadPage()
  }
  catch(err){
    console.log(err)
  }
}
function sortByPopularity() {
  return function(a,b) {
     if(a.likes+a.dislikes < b.likes+b.dislikes)
        return 1
     else if(a.likes+a.dislikes > b.likes+b.dislikes)
        return -1
     return 0
  }
}

function renderNav(telefoni){
  const footer = document.querySelector(".footer-nav")
    const header = document.querySelector(".navbar-nav")
    let cards = ""
    telefoni.forEach((telefon) => {
        cards += createCard(telefon)
        footer.innerHTML+=`<a href="telefon.html?id=${telefon._id}">${telefon.Naziv}</a> | `
        header.innerHTML+=`<a class="nav-item nav-link" href="telefon.html?id=${telefon._id}">${telefon.Naziv}</a>`
    })
    header.innerHTML+=`<a class="nav-item nav-link" href="mailto:kojic.sara@jjzmaj.edu.rs">Kontakt</a>`
}
function renderCards(komentari) {
    const  komentariHTML= document.querySelector("#recenzije_korisnika")
    let cards = ""
    komentari.sort(sortByPopularity())
    komentari.forEach((komentar) => {
        cards+= createCard(komentar)
        komentar.Komentari.forEach((komentar2) => {
          cards += createComment(komentar2)
        
      })

    })

    komentariHTML.innerHTML = cards
}

function createCard(komentar) {
    let card = `
    <article>
    <div class="row">
    <div class="col-xs-2 col-lg-4>
    </div>
      <div class="col-xs-10 col-lg-8">
        <div class="recenzija-korisnika" komentar-id=${komentar._id}>
          <img src="img/user.png" class="user-icon" />
          <span class="user-info">${komentar.Ime}</span>
          <br />
          <img src="${Zvezdice_za_ocenu(komentar.Ocena)}" class="rating" />
          <span class="user-info"><b>${komentar.Naslov}</b></span>
          <br />
          <br />
          ${komentar.sadrzaj}
          
          <button id="likeKomentar" class="vote-btn"><img src="img/like.jpg" class="like user-icon" /></button>
          <span class="like">${komentar.likes}</span>
          <button id="dislikeKomentar" class="vote-btn"><img src="img/dislike.jpg" class="dislike user-icon" /></button>
          <span class="dislike">${komentar.dislikes}</span>
          <br />
          <br />
          <div class="inputi">
            <h3>Pošaljite komentar</h3>
            <div name="komentar" action="" method="GET" komentar-id=${komentar._id}>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Ime</span>
                </div>
                <input type="text" class="form-control" id="ime-${komentar._id}" />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Naslov</span>
                </div>
                <input type="text" class="form-control" id="naslov-${komentar._id}" />
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">Unesite komentar</span>
                </div>
                <textarea class="form-control" id="sadrzaj-${komentar._id}"></textarea>
              </div>

              <button class="btn btn-secondary" id="postKomentar2" type="button">Posalji</button>

            </div>
          </div>
        </div>
      </div>
    </div>
    <br />
    <br />
  </article>`
    

    return card
}
function createComment(komentar) {
  let card = `
  <article>
  <div class="row">
    <div class="col-xs-12 col-lg-8">
      <div class="recenzija-korisnika" komentar-id=${komentar._id}>
        <img src="img/user.png" class="user-icon" />
        <span class="user-info">${komentar.Ime}</span>
        <br />
        <span><b>${komentar.Naslov}</b></span>
        <br />
        <br />
        ${komentar.sadrzaj}
        <br />
        <br />
      </div>
    </div>
  </div>
  <br />
  <br />
</article>`
  

  return card
}


/*
function getId(btn) {
    const parent = btn.parentElement
    const id = parent.getAttribute("phone-id")
    return id
}*/

const postButton = document.querySelector("#postKomentar")
postButton.addEventListener("click", getInput)


async function getInput() {
    try {
      let ocena=document.querySelector("#unetaOcena")
      let unetaOcena=ocena.options[ocena.selectedIndex].value
      const noviKomentar= {
        ime: document.querySelector("#ime").value,
        naslov: document.querySelector("#naslov").value,
        ocena: unetaOcena,
        sadrzaj: document.querySelector("#sadrzajKomentara").value,
        
  }
        await axios.put(`/api/telefoni/${urlId}/komentari`, noviKomentar)
        loadPage()
    } catch (err) {
        console.log(err)
    }
}
async function getInput2(btn) {
  try {
    console.log("input 2")
    
      const idKom=getId(btn)
      const noviKomentar= {
        ime: document.querySelector(`#ime-${idKom}`).value,
        naslov: document.querySelector(`#naslov-${idKom}`).value,
        sadrzaj: document.querySelector(`#sadrzaj-${idKom}`).value,
        
  }
      await axios.put(`/api/telefoni/${urlId}/komentari/${idKom}`, noviKomentar)
      loadPage()
  } catch (err) {
      console.log(err)
  }
}

function getId(btn) {
  const parent = btn.parentElement
  const id = parent.getAttribute("komentar-id")
  return id
}

