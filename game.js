let gameScene = new Phaser.Scene('Game');

gameScene.preload = function() {
    // no se requiere la función preload ya que no estamos cargando imágenes
};

gameScene.create = function() {
    // variables para seguir el estado del juego
    this.board = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // para seguir el estado del tablero
    this.currentPlayer = 1; // 1 representa al jugador X, 2 representa al jugador O

    // crear los cuadros del tablero
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = i * 200 + 100;
            let y = j * 200 + 100;
            let graphics = this.add.graphics({ fillStyle: { color: 0xffffff } });
            graphics.fillRect(x, y, 180, 180);
            graphics.setInteractive(new Phaser.Geom.Rectangle(x, y, 180, 180), Phaser.Geom.Rectangle.Contains);
            graphics.on('pointerdown', function(pointer) {
                this.handlePlayerMove(pointer);
            }, this);
        }
    }
};

gameScene.update = function() {
    // lógica del juego
};

gameScene.handlePlayerMove = function(pointer) {
    // controlar el movimiento del jugador
    let clickedX = pointer.worldX;
    let clickedY = pointer.worldY;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            let x = i * 200 + 100;
            let y = j * 200 + 100;

            if (clickedX >= x && clickedX <= x + 180 && clickedY >= y && clickedY <= y + 180) {
                let index = i * 3 + j;
                if (this.board[index] === 0) {
                    this.board[index] = this.currentPlayer;
                    let text = this.add.text(x + 90, y + 90, this.currentPlayer === 1 ? 'X' : 'O', { fontFamily: 'Arial', fontSize: 120, color: '#000000' });
                    text.setOrigin(0.5);
                    // verificar si el jugador actual ha ganado
                    if (this.checkWin(this.currentPlayer)) {
                        this.scene.restart();
                    }
                    // cambiar el turno del jugador
                    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                }
                return;
            }
        }
    }
};

gameScene.checkWin = function(player) {
    // verificar si el jugador ha ganado
    let winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let condition of winConditions) {
        if (this.board[condition[0]] === player &&
            this.board[condition[1]] === player &&
            this.board[condition[2]] === player) {
            return true;
        }
    }
    return false;
};

let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
    scene: gameScene
};

let game = new Phaser.Game(config);
