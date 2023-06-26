var playerTotal = 0
var dealerTotal = 0
var cardsimage = [];
var cards = {};
var playerHand = []
var dealerHand = []
var gameState = 0
var dealBtn, hitBtn, standBtn
var dealt = false
var backImg = "./cards/BACK.png"
var winner 



let types = ["C", "D", "H", "S"];
let values = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "A", "J", "K", "Q"];

var spimage;

function preload() {
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      cardsimage.push("./cards/" + values[j] + "-" + types[i] + ".png");
    }
  }
}


function setup() {

  createCanvas(windowWidth, windowHeight);

  for (let i = 0; i < cardsimage.length; i++) {
    if (parseInt(cardsimage[i][9]) === 0 || (cardsimage[i][8]) == "J" || (cardsimage[i][8]) == "K" || (cardsimage[i][8]) == "Q") {
      cards[cardsimage[i]] = 10
    }
    else if ((cardsimage[i][8]) == "A") {
      cards[cardsimage[i]] = 11
    }
    else {
      cards[cardsimage[i]] = parseInt(cardsimage[i][8])
    }
  }

  dealBtn = createButton("Deal");
  dealBtn.position(width / 2, 600);
  dealBtn.size(100, 50);
  dealBtn.mousePressed(dealCards)
  dealBtn.style("display", "none");

  hitBtn = createButton("Hit");
  hitBtn.position(width / 2 - 200, 600);
  hitBtn.size(100, 50);
  hitBtn.mousePressed(()=>{
    giveCards(playerHand)
  })
  hitBtn.style("display", "none");

  standBtn = createButton("stand");
  standBtn.position(width / 2 + 50, 600);
  standBtn.size(100, 50);
  standBtn.mousePressed(()=>{
    gameState = 2;
    dealerTotal += cards[dealerHand[0]]

  })
  standBtn.style("display", "none");




}

function draw() {
  background(0);

  if (gameState === 0) {
    textSize(60)
    text("Blackjack", width / 2 - 100, height / 2)
    textSize(40)
    text("Press Enter to start", width / 2 - 140, height / 2 + height / 10)
    if (keyDown("enter")) {
      gameState = 1
    }
  }

  if (gameState === 1) {
    dealerTotal = getTotal(dealerHand);
    if (dealt){
      dealerTotal -= cards[dealerHand[0]]

    }
    playerTotal = getTotal(playerHand)
    drawDealerHand(dealerHand);
    drawPlayerHand(playerHand);
    if (!(dealt)) {
      dealBtn.style("display", "block")
    }
    else{
      hitBtn.style("display", "block")
      standBtn.style("display","block")
    }
    drawSprites();
    textSize(50)
    fill("White")
    text(dealerTotal, width * 3 / 4, height / 4)
    textSize(50)
    fill("White")
    text(playerTotal, width * 3 / 4, height * 3 / 4)
  }

  if (gameState === 2){
    hitBtn.style("display", "none")
    standBtn.style("display","none")
    if (dealerTotal < 16 ){
      giveCards(dealerHand)
      dealerTotal = getTotal(dealerHand)
      console.log(dealerTotal)
    }
    drawDealerHand(dealerHand)
    
    if (dealerTotal > 21 && playerTotal <= 21){
      winner = "Player Wins"
    }
    if (dealerTotal <= 21 && playerTotal > 21){
      winner = "Dealer Wins"
    }
    if (dealerTotal > 21 && playerTotal > 21){
      winner = "Tie"
    }
    if (dealerTotal <= 21 && playerTotal <= 21){
      if (dealerTotal < playerTotal){
        winner = "Player Wins"
      }
      if (dealerTotal > playerTotal){
        winner = "Dealer Wins"
      }
      if (dealerTotal == playerTotal){
        winner = "Tie"
      }
    }





    drawSprites();
    textSize(50)
    fill("White")
    text(dealerTotal, width * 3 / 4, height / 4)
    textSize(50)
    fill("White")
    text(playerTotal, width * 3 / 4, height * 3 / 4)
    textSize(80)
    fill("White")
    text(winner, width/2 - 250, height / 2)
  }



}


function getTotal(hand) {
  total = 0
  aces = 0
  for (var i = 0; i < hand.length; i++) {
    total += cards[hand[i]];
    if (cards[hand[i]] == 11) {
      aces += 1
    }
    while (aces > 0 && total > 21) {
      total -= 10
      aces -= 1
    }

  }
  return total

}

function drawDealerHand(dealerHand) {
  offset = 200
  for (var i = 0; i < dealerHand.length; i++) {
    card = createSprite(400 - offset, 200, 50, 300)
    if (dealt) {
      if (i == 0) {
        if (gameState === 1) {
          card.addImage(loadImage(backImg));
        }
        else {
          card.addImage(loadImage(dealerHand[i]));
        }
      }
      if (i > 0){
        card.addImage(loadImage(dealerHand[i]));
      }
    }


    card.scale = 0.35;
    offset -= 35

  }

}

function drawPlayerHand(playerHand) {
  offset = 200
  for (var i = 0; i < playerHand.length; i++) {
    card = createSprite(400 - offset, 500, 50, 300)
    card.addImage(loadImage(playerHand[i]));
    card.scale = 0.35;
    offset -= 35

  }

}

function giveCards(hand) {
  c = Math.round(Math.random() * 52)
  hand.push(cardsimage[c])
  cardsimage.splice(c, 1)
}


function dealCards() {
  dealt = true;
  dealBtn.style("display", "none")
  giveCards(playerHand)
  giveCards(playerHand)
  giveCards(dealerHand)
  giveCards(dealerHand)
}

