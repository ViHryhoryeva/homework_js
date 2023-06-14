'use strict'
function View() {

    let self = this;

    const menuForm = document.querySelector('.menu-form');
    const newGameBtn = document.querySelector('.game-btn');
    const recordsBtn = document.querySelector('.records-btn');
    const recordTable = document.querySelector('.table-records');
    const gameScore = document.querySelector('.game-score');
    const restartForm = document.querySelector('.game-off');
    const gamePlayerForm = document.querySelector('.player');
    const pauseBtn = document.querySelector('.pause-btn');
    const saveBtn = document.querySelector('.save');
    const playerNameField = document.getElementById('IName');
    const restartBtn = document.querySelector('.restart-btn');

    self.getNewGameBtn = function () {
        return newGameBtn;
    }

    self.getRecordsBtn = function () {
        return recordsBtn;
    }

    self.showRecordTable = function () {
        recordTable.style.display = 'block';
        console.log('records table')
    }
    self.showNewGameForm = function () {
        recordTable.style.display = 'none';
        menuForm.style.display = 'none';
        gamePlayerForm.style.display = 'block';
    }

    self.update = function (element, x, y) {
        element.style.transform = `translate( ${x}px, ${y}px )`;
    }

    self.setDisplay = function (element, value) {
        element.style.display = value;
    }

    self.updateScore = function () {
        gameScore.innerHTML = score.toString();
    }

    self.gameOffDisplay = function (value) {
        restartForm.style.display = value;
        const text = restartForm.querySelector('.text-score');
        text.innerHTML = score.toString();
    }

    // self.getPlayerName = function (value) {
    //     gamePlayerForm.style.display = value;
    //
    // }

    self.pause = function () {
        console.log("pause")
        pauseBtn.children[1].style.display = 'block';
        pauseBtn.children[0].style.display = 'none';
    }

    self.unpause = function () {
        console.log("unpause")
        pauseBtn.children[1].style.display = 'none';
        pauseBtn.children[0].style.display = 'block';
    }

    self.saveFormHide = function () {
        gamePlayerForm.style.display = 'none'
    }

    self.getPauseBtn = function () {
        return pauseBtn;
    }

    self.getSaveBtn = function () {
        return saveBtn;
    }

    self.getPlayerName = function () {
        return playerNameField.value;
    }

    self.getRestartBtn = function () {
        return restartBtn;
    }

    self.restart = function () {
        window.location.reload();
    }

    // создадим таблицу
    // let table = document.createElement('table');
    // let row = table.insertRow(); // добавим строку
    //
    // let cell1 = row.insertCell(); // добавим ячейки
    // let cell2 = row.insertCell();
    // let cell3 = row.insertCell();
    //
    // cell1.innerHTML = '№'; // вставим текст
    // cell2.innerHTML = 'Имя игрока';
    // cell3.innerHTML = 'Счет';
    //
    // // Отобразим таблицу на странице
    // document.body.appendChild(table);
}