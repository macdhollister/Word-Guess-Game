var music = new Audio("assets/sounds/ghostbusters.mp3");
var winSound = new Audio("assets/sounds/win.wav");
var loseSound = new Audio("assets/sounds/lose.wav");

let game = {
    // words: ['lantern', 'prank', 'costume', 'sweets', 'darkness', 'monster', 'shadows', 'decorations', 'moonlight', 'spiderweb', 'disguise', 'night', 'supernatural', 'October', 'superstition', 'holiday', 'orange', 'party', 'acorn', 'harvest', 'scarecrow', 'autumn', 'hayride', 'squash', 'corn', 'leaves', 'squirrel', 'crow', 'pumpkin', 'bat', 'owl', 'spider', 'bug', 'rat', 'worm', 'cat', 'snake', 'pirate', 'superhero', 'fairy', 'pixie', 'witch', 'ninja', 'princess', 'candy', 'flashlight', 'masks', 'cloak', 'goodies', 'safety', 'doorbell', 'gown', 'hat', 'wigs', 'fangs', 'makeup', 'bogeyman', 'mummy', 'werewolf', 'extraterrestrial', 'mutant', 'witch', 'ghost', 'vampire', 'zombie', 'giant', 'villain', 'goblin', 'warlock', 'Frankenstein', 'Maleficent', 'Beetlejuice', 'Casper', 'Ursula', 'Dracula', 'alarming', 'fear', 'scary', 'bloodcurdling', 'frighten', 'shocking', 'boo', 'goosebumps', 'chilling', 'spooky', 'creepy', 'horrify', 'startling', 'eek', 'nightmare', 'unnerving', 'eerie', 'petrify', 'blood', 'eyeballs', 'heart', 'bones', 'femur', 'skeleton', 'brain', 'fingernails', 'skull', 'cadaver', 'guts', 'apparition', 'ectoplasm', 'phantom', 'cemetery', 'ghastly', 'poltergeist', 'coffin', 'ghoul', 'spectral', 'corpse', 'graveyard', 'spirit', 'crypt', 'spook', 'dead', 'tombstone', 'battling', 'creeping', 'pretending', 'bobbing', 'dancing', 'raking', 'breaking', 'decorating', 'scaring', 'bulging', 'partying', 'slithering', 'bursting', 'dribbling', 'sneaking', 'carving', 'fluttering', 'sparkling', 'crawling', 'grinning', 'tricking', 'bellowing', 'creaking', 'screaming', 'bubbling', 'hooting', 'thumping', 'bumping', 'howling', 'cackling', 'rattling'],
    words: ['Casper', 'Dracula'],
    wins: 0,
    losses: 0,
    word: "placeholder",
    blanks: [],
    guessesLeft: 10,
    lettersGuessed: [],
    gameOver: true,
    resetGame: function() {
        let location = Math.floor(Math.random()*this.words.length);
        this.word = this.words[location];
        this.blanks = this.word.split("").fill("_");
        this.guessesLeft = 10;
        this.lettersGuessed = [];
        this.updateDisplay();
    },
    updateDisplay: function() {
        document.getElementById("wordBlanks").innerText = game.blanks.join(" ");
        document.getElementById("guessesLeft").innerText = game.guessesLeft;
        document.getElementById("lettersGuessed").innerText = game.lettersGuessed.join(", ");
        document.getElementById("wins").innerText = game.wins;
        document.getElementById("losses").innerText = game.losses;
    }
}

document.onload = function() {
    music.play();
}

document.onkeyup = function(event) {
    var letter = event.key.toLowerCase();

    let letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    // Ensures only alphabetical characters
    if(!letters.includes(letter)) return;

    if(game.gameOver) {
        game.resetGame();
        game.gameOver = false;
    }

    for (let i = 0; i < game.word.length; i++) {
        if (game.word[i].toLowerCase() == letter) {
            game.blanks[i] = letter;
        }
    }
    
    if (!game.word.includes(letter) && !game.lettersGuessed.includes(letter)) {
        game.guessesLeft--;
    }

    if(!game.lettersGuessed.includes(letter)) {
        game.lettersGuessed.push(letter);
    }

    game.updateDisplay();

    if (game.blanks.join("") == game.word.toLowerCase()) {
        game.gameOver = true;
        document.getElementById("wordBlanks").innerText = "You win! Press any letter to play again!";
        game.wins++;
        winSound.play();
    } 
    
    if (game.guessesLeft == 0) {
        game.gameOver = true;
        document.getElementById("wordBlanks").innerText = "You Lost! Press any letter to play again. The word was " + game.word + ".";
        game.losses++;
        loseSound.play();
    }
}