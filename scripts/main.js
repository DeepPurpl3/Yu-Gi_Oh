// =======================================
//  == 👼 Selections des élements 👼 ==
// =======================================
const displayCards = document.querySelector(".display-carte");
const formBtn      = document.querySelector(".btn-group");
const btnMonster   = document.querySelector(".monster");
const btnMagic     = document.querySelector(".magic");
const btnTrap      = document.querySelector(".trap");
const btnDeck      = document.querySelector(".deck");
// ======= Variable ======
let monDeck = [];
// ===================================
//   ==== Fonction utilitaires =====
// ===================================
//je crée la balise , je lui ajoutes une classe ainsi que son contenu
function createElement(tag, className, content) {
  const element = document.createElement(tag);

  if (className) {
    element.className = className;
  }
  if (content) {
    element.innerHTML = content;
  }
  return element;
}
// j'insère ma balise et son contenu dans un parent
function appendElement(parent, child) {
  parent.append(child);
}
// =======================
//   ==== CALL API =====
// =======================
async function getApi() {
    try {
        const response = await fetch(
            `https://db.ygoprodeck.com/api/v7/cardinfo.php`
            );
            const data = await response.json();
            
            console.log(data.data[0].desc);
            console.log(data.data[0].name);
            console.log(data.data[0].type);
            console.log(data.data[0].archetype);
            console.log(data.data[0].race);
            console.log(data.data[0]);
            console.log(data.data);
    
    return data;
} catch (error) {
    console.error(error);
}
}
getApi();


async function getApiFiltered(type) {
    try {
      const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${type}`);
      const data = await response.json();
      console.log(data.data);
      return(data.data)
    //   displayCartes(data.data); // j utilise la fonction d'affichage ici
    } catch (error) {
      console.error(error);
    }
  }
  // getApiFiltered();







// Afficher Les cartes
function displayCartes(cards) {
  // ici cards est un tableau d’objets (chaque objet = 1 carte)
  displayCards.innerHTML = "";

  cards.forEach((card) => {
    // ici, card représente 1 seule carte
    const div = createElement(
      "div",
      "card",
      `
    <h3>${card.name}</h3>
    <img src="${card.card_images[0].image_url}" alt="${card.name}" />
  `
    );
    appendElement(displayCards, div);
  });
}
// ==================
//  🧲 Événements 🧲 
// ==================
document.querySelector(".dataSearch").addEventListener("submit", (e) => {
  e.preventDefault();
  const searchValue = e.target.querySelector("input").value.trim();
  if (searchValue) {
    fetch(
      `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${encodeURIComponent(
        searchValue
      )}`
    )
      .then((res) => res.json())
      .then((data) => displayCartes(data.data))
      .catch((err) => console.error(err));
    }
});


formBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (e.target.matches('button')) {
    const category = e.target.dataset
  }
})