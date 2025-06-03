
 
let playButton = document.querySelector('.button-form'); 

if (playButton) {
  playButton.addEventListener('click', (e) => {
      const selectedRadio = document.querySelector('input[name="choice"]:checked');
      const nickName = document.getElementById('nickName').value; 

      if (!nickName) {
          alert("Prosím zadejte jméno hrdiny");
          return;
      }

      if (selectedRadio) {
          let health, gold;
          switch (selectedRadio.value) {
              case "easy":
                  health = 200;
                  gold = 200;
                  level = 1;
                  break;
              case "normal":
                  health = 100;
                  gold = 100;
                  level = 1;
                  break;
              case "hard":
                  health = 100;
                  gold = 50;
                  level = 1;
                  break;
          }

          // Uložení dat do localStorage
          localStorage.setItem("nickName", nickName);
          localStorage.setItem("health", health);
          localStorage.setItem("gold", gold);
          localStorage.setItem("currentlevel", level);

          window.location.href = "dungen.html";
      } else {
          alert("Prosím vyber si obtížnost!");
      }
  });
}

// definování promněných

let xp = 0;
let health = Number(localStorage.getItem("health"));
let gold = Number(localStorage.getItem("gold"));
let nickName = localStorage.getItem("nickName");
let level = Number(localStorage.getItem("currentlevel"));
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["hůl"];

console.log(health);

// DOM
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText")
const goldText = document.querySelector("#goldText")
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");
const nickNameText = document.querySelector("#nameText");

xpText.innerText = xp;
healthText.innerText = health;
goldText.innerText = gold;
nickNameText.innerText = nickName;


const weapons = [
  { name: 'hůl', power: 5 },
  { name: 'dýka', power: 30 },
  { name: 'kladivo', power: 50 },
  { name: 'meč', power: 100 }
];
const monsters = [
  {
    name: "Slimák",
    level: level,
    health: 15 
  },
  {
    name: "Tesákovitá bestie",
    level: level + 4, 
    health: 60
  },
  {
    name: "Drak",
    level: level + 15,  
    health: 300
  }
]

//lokace herních režimů

const locations = [
  {
    name: "town square",
    "button text": ["Jít do obchodu", "Jít do jeskyně", "Bojovat s drakem"],
    "button functions": [goStore, goCave, fightDragon],
    text: "Jsi na náměstí. Vidíš ceduli, na které je napsáno \"Obchod\"."
  },
  {
    name: "store",
    "button text": ["Koupit 10 zdraví (10 zlata)", "Koupit zbraň (30 zlata)", "Vrátit se na náměstí"],
    "button functions": [buyHealth,buyWeapon, goTown],
    text: "Vstupuješ do obchodu"
  },
  {
    name: "cave",
    "button text": ["Bojovat se slimákem", "Bojuješ s Tesákovitou bestií!", "Vrátit se na náměstí"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "Vstupuješ do jeskyně"
  },
  {
    name: "fight",
    "button text": ["Útok", "Uhnout", "Taktický ústup!"],
    "button functions": [attack, dodge, goTown],
    text: "Bojuješ s monstrem!"
  },
  {
    name: "kill monster",
    "button text": ["Jít na náměstí", "Jít na náměstí", "Jít na náměstí"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'Monstrum vykřikne "Arg!" když umírá.Získáváš zkušenostní body a nacházíš zlato!'
  },
  {
    name: "lose",
    "button text": ["Začít znovu", "Začít znovu", "Začít znovu"],
    "button functions": [restart, restart, restart],
    text:`${nickName} Zemřel si. &#x2620;`
  },
  { 
    name: "win", 
    "button text": ["Začít znovu", "Začít znovu", "Začít znovu"], 
    "button functions": [restart, restart, restart], 
    text: "Porazil jsi draka a osvobodil město,lidé oslavují tvé vítězství &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Vracíš se na náměstí?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "Našel jsi tajnou hru! Vyber si číslo nahoře. Deset náhodných čísel bude vybráno mezi 0 a 10. Pokud se tvé číslo shoduje s jedním z těchto náhodných čísel—vyhráváš!"
  }
];

// initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "Nemáš dostatek zlata na koupi zdraví!";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "Teď máš " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " Ve tvém inventáři máš " + inventory;
    } else {
      text.innerText = "Nemáš dostatek zlata na koupi zbraně!";
    }
  } else {
    text.innerText = "Máš nejmocnější zbraň v celé říši!";
    button2.innerText = "Prodat zbraň za 15 zlatých";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "Prodal si " + currentWeapon + ".";
    text.innerText += " Ve vašem inventáři máš " + inventory;
  } else {
    text.innerText = "Nikdy neprodávej svou jedinou zbraň!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = " Ten " + monsters[fighting].name + " útočí.";
  text.innerText += " Útočíte se svou " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
    console.log(weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1);
  } else {
    text.innerText += " Minul si.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Tvoje " + inventory.pop() + " je rozbytá.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;

}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "Úžasné! Uskočili jste před útokem!" + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = Number(localStorage.getItem("health"));
  gold = Number(localStorage.getItem("gold"));;
  currentWeapon = 0;
  inventory = ["Hůl"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "Vybral jsi" + guess + ". Zde jsou náhodná čísla:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Skvělé! Právě jste získali 20 zlatých!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Ach ne! Právě jste ztratili 10 bodů zdraví";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}