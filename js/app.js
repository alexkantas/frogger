var horizontialOffset = 101;
var verticalOffset = 83;

// Enemies our player must avoid
var Enemy = function (sprite, x, y, speed) {
    this.sprite = sprite;
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += verticalOffset * dt * this.speed;
    if (this.x > 505) {
        this.x = -100;
        this.speed = Math.random() * 4 + 0.9;
    }

    if ((this.x - 70 < player.x) && (this.x + 70 > player.x)
        && ((this.y < player.y) && (this.y + 80 > player.y))) {
        resetAfterCollision();
        //console.log("exases!!!");
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var resetVisited = false;

function resetAfterCollision() {
    console.log('mesa sti rester');
    if (resetVisited) return;
    console.log('poly mesa sti rester');
    resetVisited = true;
    setTimeout(function () {
        alert("you lost!!!");
        player.x = 202;
        player.y = 404;
        resetVisited = false;
    }, 200);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (sprite) {
    this.sprite = sprite;
    this.x = 202;
    this.y = 404;
};

Player.prototype.update = function (dt) {
}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.handleInput = function (key) {


    //up
    if (key === 'up') {
        if (this.y <= -11) {
            alert('You Win!!!');
            this.x = 202;
            this.y = 404;
            return;
        }
        this.y -= verticalOffset;
    }

    //right
    if (key === 'right') {
        if (this.x >= 400) {
            return;
        }
        this.x += horizontialOffset;
    }

    //down
    if (key === 'down') {
        if (this.y >= 404) {
            return;
        }
        this.y += verticalOffset;
    }

    //left
    if (key === 'left') {
        if (this.x <= 0) {
            return;
        }
        this.x -= horizontialOffset;
    }


}


var player = new Player('images/char-horn-girl.png');

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
allEnemies = [];
var topPosition = 60;
topEnemy = new Enemy('images/enemy-bug.png', Math.random() * 500, topPosition, Math.random() * 5 + 1.4);
midleEnemy = new Enemy('images/enemy-bug.png', Math.random() * 500, topPosition + verticalOffset, Math.random() * 2 + 0.9);
lastEnemy = new Enemy('images/enemy-bug.png', Math.random() * 500, topPosition + verticalOffset * 2, Math.random() * 2);

allEnemies.push(topEnemy, midleEnemy, lastEnemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//Get DOM buttons
var actionButtons = document.querySelectorAll('button');
actionButtons.forEach(function (button) {
    button.addEventListener('click',buttonsActionListener)
})

//Handle buttons click Function
function buttonsActionListener(evt) {
    var action = evt.target.id;
    player.handleInput(action);
}