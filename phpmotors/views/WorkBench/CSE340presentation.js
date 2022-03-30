const button = document.getElementById("submitBtn");
const subArray = document.getElementById("subArray");
const subIndex = document.getElementById("subIndex");
myParty = makeMDA();


function makeMDA () {
  const subParty1 = ["Rotom", "Flygon", "Greninja", "Scizor", "Magcargo", "Breloom"];
  const subParty2 = ["Manaphy", "Mega Lopunny", "Vespiquen", "Empoleon", "Roserade", "Driblim"];
  const subParty3 = ["Mimikyu", "Gourgeist", "Golurk", "Mega Banette", "Chandelure", "Zoroark (Hisuian)"];
  const subParty4 = ["Naganadel", "Toxtricity", "Toxapex", "Toxicroak", "Swalot", "Ariados"];
  const subParty5 = ["Flapple", "Lilligant", "Serperior", "Exeggutor (Alolan)", "Leavanny", "Whimsicott"];
  let myParty = [subParty1,subParty2,subParty3,subParty4,subParty5]
  
  return myParty;
}


button.addEventListener('click',() => {
  myParty = makeMDA();
  let yValue = Number(subArray.value);
  let xValue = Number(subIndex.value);
  let pokemon = myParty[yValue][xValue];
  document.getElementById("answer") .innerHTML= pokemon
})
