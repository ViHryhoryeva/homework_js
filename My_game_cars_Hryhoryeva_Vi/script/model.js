'use strict'
// function GameData() {
//     let self = this;
//
//     let state = 1;
//     let coins = 0;
//     let player
//
//     self.getState = function () {
//         return state;
//     }
//
//     self.setState = function (newState) {
//         state = newState;
//     }
//
//     self.getCoins = function () {
//         return state;
//     }
//
//     self.addCoin = function (newState) {
//         coins++;
//     }
//
//     self.getPlayer = function () {
//         return player;
//     }
//
//     self.setPlayer = function (value) {
//         player = value;
//     }
// }

function Car(element) {
    let self = this;

    let width = element.clientWidth;
    let height = element.clientHeight;
    let position = getPosition(element);

    let speed = 5;
    let speedX = 0;
    let speedY = 0;

    self.move = function() {
        position.x = position.x + speedX;
        position.y = position.y + speedY;
    }

    self.moveTop = function() {
        speedY = -speed;
    }

    self.moveBottom = function() {
        speedY = speed;
    }

    self.moveLeft = function() {
        speedX = -speed;
    }

    self.moveRight = function() {
        speedX = speed;
    }

    self.stopMoveTop = function() {
        speedY = 0;
    }

    self.stopMoveBottom = function() {
        speedY = 0;
    }

    self.stopMoveLeft = function() {
        speedX = 0;
    }

    self.stopMoveRight = function() {
        speedX = 0;
    }

    self.getElement = function () {
        return element;
    }

    self.getCarPosition = function () {
        return position;
    }

    self.getSpeedX = function () {
        return speedX;
    }

    self.getSpeedY = function () {
        return speedY;
    }

    self.getHeight = function () {
        return height;
    }

    self.getWidth = function () {
        return width;
    }
}

function Road(element) {
    let self = this;

    let width = element.clientWidth;
    let height = element.clientHeight;

    self.getHeight = function () {
        return height;
    }

    self.getWidth = function () {
        return width;
    }
}

function Tree(element) {
    let self = this;

    let position = getPosition(element);
    let speed = 2;

    self.move = function () {
        let newPositionY = position.y + speed;

        if (newPositionY > window.innerHeight)
            newPositionY = -400; // больше высоты самого большого дерева (280px), чтобы не накладывались при движении деревья

        position.y = newPositionY + speed;
    }

    self.getPosition = function () {
        return position;
    }

    self.getElement = function () {
        return element;
    }

    self.addSpeed = function () {
        speed += 0.5;
    }
}

function EnemyCar(element) {
    let self = this;

    let width = element.clientWidth;
    let height = element.clientHeight;
    let position = getPosition(element);

    let speed = 2;

    self.move = function () {
        position.y = position.y + speed;
    }

    self.getHeight = function () {
        return height;
    }

    self.getWidth = function () {
        return width;
    }

    self.getPosition = function () {
        return position;
    }

    self.setPosition = function (x, y) {
        position.x = x;
        position.y = y;
    }

    self.getElement = function () {
        return element;
    }

    self.addSpeed = function () {
        speed += 1;
    }
}

function Coin(element) {
    let self = this;

    let width = element.clientWidth;
    let height = element.clientHeight
    let position = getPosition(element);
    let visible = true;

    let speed = 4;

    self.move = function () {
        position.y = position.y + speed;
    }

    self.setPosition = function (x, y) {
        position.x = x;
        position.y = y;
    }

    self.getHeight = function (){
        return height;
    }

    self.getWidth = function (){
        return width;
    }

    self.getPosition = function () {
        return position;
    }

    self.getElement = function () {
        return element;
    }

    self.isVisible = function () {
        return visible;
    }

    self.setVisible = function (value) {
        visible = value;
    }

    self.addSpeed = function () {
        speed += 0.5;
    }
}

function getPosition(elem) {
    const matrix = window.getComputedStyle(elem).transform;
    const array = matrix.split(',');
    const x = array[array.length - 2];
    const y = array[array.length - 1];
    const numberX = parseFloat(x);
    const numberY = parseFloat(y);
    return  { x: numberX, y: numberY};
}
