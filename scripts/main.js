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
async function getApi(type = "") {
    try {
      const url = type
      ? `https://db.ygoprodeck.com/api/v7/cardinfo.php?type=${type}`
      : `https://db.ygoprodeck.com/api/v7/cardinfo.php`;
        const response = await fetch(url);
        const data = await response.json();
        
        // console.log(data.data[0].desc);
        // console.log(data.data[0].name);
        console.log(data.data[0].type);
        console.log(data.data[0].archetype);
        console.log(data.data[0].race);
        // console.log(data.data[0]);
        // console.log(data.data);
        
    
    return data;
} catch (error) {
    // console.error(error);
}
}
getApi();

// Afficher Les cartes
function displayCartes(cards) {
  displayCards.innerHTML = "";

  // Limiter à 40 cartes maximum(Slice)
  cards.slice(0, 40).forEach((card) => {
    const div = createElement("div","card",
      `<h3>${card.name}</h3>
        <img src="${card.card_images[0].image_url}" alt="${card.name}" />
      `
    );

    

    appendElement(displayCards, div);
  });
}


function afficherDeck() {
// capture de le div qui va stocker + afficher le deck
  const deckZone = document.querySelector('.selection-carte');
  deckZone.innerHTML = ""; // on vide avant de réafficher

  monDeck.forEach((card,index) => {
    const div = createElement("div","card",
    `<h3>${card.name}</h3>
    <img src="${card.card_images[0].image_url}" alt="${card.name}" />
    <button class="retirer" data-index="${index}">Retirer</button>`);

    deckZone.appendChild(div)
  });

}

// ==================
//  🧲 Événements 🧲 
// ==================
//cette ligne doit etre revue MO!! 
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

// Les Boutons pour les diff categories de cartes YGO
formBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  if (e.target.matches('button')) {
    const category = e.target.dataset.type;

    // 🛠️ Pour les monstres, on appelle l'API sans paramètre et on filtre localement
    const data = await getApi(category === "Monster" ? "" : category);
    if (!data || !data.data) return;

    let filteredCards = [];

    if (category === "Monster") {
      filteredCards = data.data.filter(card => card.type.includes("Monster"));
    } else {
      filteredCards = data.data.filter(card => card.type === category);
    }

    if (filteredCards.length) {
      displayCartes(filteredCards);
    }
  }
});



dragula([document.querySelector(".display-carte"), document.querySelector(".selection-carte")], {
  copy: true
});