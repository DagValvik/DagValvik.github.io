var CardTypes = [
  "/images/adidas.png",
  "/images/apple.png",
  "/images/ea.png",
  "/images/mcdonald.png",
  "/images/nike.png",
  "/images/google.png",
  "/images/starbucks.png",
  "/images/converse.png",
  "/images/adidas.png",
  "/images/apple.png",
  "/images/ea.png",
  "/images/mcdonald.png",
  "/images/nike.png",
  "/images/google.png",
  "/images/starbucks.png",
  "/images/converse.png"
];

var CardTypes2 = [
  "/images/poke1.png",
  "/images/poke2.png",
  "/images/poke3.png",
  "/images/poke4.png",
  "/images/poke5.png",
  "/images/poke6.jfif",
  "/images/poke7.png",
  "/images/poke8.png",
  "/images/poke1.png",
  "/images/poke2.png",
  "/images/poke3.png",
  "/images/poke4.png",
  "/images/poke5.png",
  "/images/poke6.jfif",
  "/images/poke7.png",
  "/images/poke8.png"
];

var CardTypes3 = [
  "/images/sex1.png",
  "/images/sex2.jpg",
  "/images/sex3.jpg",
  "/images/sex4.jpg",
  "/images/sex5.jpg",
  "/images/sex6.jpg",
  "/images/sex7.jpg",
  "/images/sex8.jpg",
  "/images/sex1.png",
  "/images/sex2.jpg",
  "/images/sex3.jpg",
  "/images/sex4.jpg",
  "/images/sex5.jpg",
  "/images/sex6.jpg",
  "/images/sex7.jpg",
  "/images/sex8.jpg",
];

function shuffleCards(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

class Player {
  constructor() {
    this._score = 0;
    this._turns = 0;
  }

  scored() {
    this._score++;
  }

  didTurn() {
    this._turns++;
  }

  get score() {
    return this._score;
  }
  get turns() {
    return this._turns;
  }
}

let app = new Vue({
  // select the element for this app
  el: "#app",

  data: {
    player1: null,
    player2: null,
    cards: [],
    flippedCards: [],
    foundCards: [],
    started: false,
    startTime: 0,
    timer: null,
    time: "--:--",
    playing: null,
    winner: null,
    finished: false,
    theme: []
  },

  methods: {
    resetGame: function resetGame() {
      this.started = false;
      this.timer = null;
      this.startTime = 0;
      this.time = "--:--"
      this.player1 = new Player();
      this.player2 = new Player();
      this.winner = false;
      this.finished = false;
      this.flippedCards = [];
      this.foundCards = [];
      this.playing = this.player1;

      this.cards = this.theme;
    },

    brands: function brands() {
      var cards = shuffleCards(CardTypes);
      this.flipAllBack();
      this.theme = cards;
      clearInterval(this.timer);
      this.resetGame();
    },

    pokemon: function pokemon() {
      var cards = shuffleCards(CardTypes2);
      this.flipAllBack();
      this.theme = cards;
      clearInterval(this.timer);
      this.resetGame();
    },

    sex: function sex() {
      var cards = shuffleCards(CardTypes3);
      this.flipAllBack();
      this.theme = cards;
      clearInterval(this.timer);
      this.resetGame();
    },

    flipAllBack: function flipAllBack() {
      for (const card of this.flippedCards) {
        card.flipped = false;
        card.found = false;
      }
      for (const card of this.foundCards) {
        card.flipped = false;
        card.found = false;
      }
    },

    checkSame: function checkSame() {
      if (this.flippedCards[0].image === this.flippedCards[1].image) {
        return true;
      }
    },

    checkWinner: function checkWinner() {
      if (this.player1.score == this.player2.score) {
        this.finished = true;
      } else {
        if (this.player1.score > this.player2.score) {
          this.finished = true;
          this.winner = "Player 1";
        } else {
          this.finished = true;
          this.winner = "Player 2";
        }
      }
    },

    startGame: function startGame() {
      this.started = true;
      this.startTime = moment();

      this.timer = setInterval(function() {
        app.time = moment(moment().diff(app.startTime)).format("mm:ss");
      }, 1000);
    },

    finishGame: function finishGame() {
      console.log("finishing game");
      this.started = false;
      clearInterval(this.timer);
      this.checkWinner();
    },

    checkAllFound: function checkAllFound() {
      console.log("checking if all cards are found");
      var foundCards = this.player1.score + this.player2.score;
      if (foundCards == this.cards.length / 2) {
        console.log("all cards are found");
        return true;
      }
    },

    changeTurn: function() {
      if (this.playing == this.player1) {
        this.playing = this.player2;
      } else {
        this.playing = this.player1;
      }
    },

    checkFlipped: function checkFlipped() {
      if (this.checkSame()) {
        setTimeout(function() {
          app.flippedCards[0].found = true;
          app.flippedCards[1].found = true;
          app.foundCards.push(app.flippedCards[0]);
          app.foundCards.push(app.flippedCards[1]);
          app.flippedCards = [];
          app.playing.didTurn();
          app.playing.scored();
          if (app.checkAllFound()) {
            app.finishGame();
          }
        }, 200);
      } else {
        setTimeout(function() {
          app.playing.didTurn();
          app.flippedCards[0].flipped = false;
          app.flippedCards[1].flipped = false;
          app.flippedCards = [];
          app.changeTurn();
        }, 1000);
      }
    },

    addToFlipped: function(card) {
      this.flippedCards.push(card);
      if (this.flippedCards.length == 2) {
        this.checkFlipped();
      }
    }
  },

  created: function created() {
    this.brands();
    this.resetGame();
  }
});
