'use strict'
function Controller(car, view, storage) {

    let self = this;

    document.addEventListener('keydown', function(event){
        const code = event.code;
        if (code === 'ArrowUp') {
            car.moveTop();
        } else if(code === 'ArrowDown') {
            car.moveBottom();
        } else if (code === 'ArrowLeft') {
            car.moveLeft()
        } else if (code === 'ArrowRight') {
            car.moveRight();
        }
    })

    document.addEventListener('keyup', function (event) {
        const code = event.code;
        if (code === 'ArrowUp') {
            car.stopMoveTop()
        } else if(code === 'ArrowDown') {
            car.stopMoveBottom()
        } else if (code === 'ArrowLeft') {
            car.stopMoveLeft()
        } else if (code === 'ArrowRight') {
            car.stopMoveRight()
        }
    })

    view.getRecordsBtn().addEventListener('click', () => {
        view.showRecordTable();
        console.log('records table')
    });

    view.getNewGameBtn().addEventListener('click', () => {
        view.showNewGameForm();
    });

    view.getPauseBtn().addEventListener('click', () => {
        if (state !== 0) {
            if (state === 1) {
                state = 2;
                view.unpause();
            } else {
                state = 1;
                view.pause();
            }
        }
    });

    view.getSaveBtn().addEventListener('click', () => {
        player = view.getPlayerName();
        state = 2
        view.saveFormHide();

    });

    view.getRestartBtn().addEventListener('click', () => {
        state = 0;
        view.restart();
    });


    window.onbeforeunload = befUnload();

    function befUnload(eo) {
        eo = eo || window.event;
        if (state === 2) {
            eo.returnValue = 'Данные не будут сохранены!';
        }
    }


    // let leftArrow = document.querySelector('.arrowLeft');
    // leftArrow.addEventListener('touchstart', arrowLeftMove, false);
    // leftArrow.addEventListener('touchend', stopPlayer, false);
    //
    // let rightArrow = document.querySelector('.arrowRight');
    // rightArrow.addEventListener('touchstart', arrowRightMove, false);
    // rightArrow.addEventListener('touchend', stopPlayer, false);
    //
    // function arrowLeftMove (EO) {
    //     myModel.playerMove(left);
    //     EO.preventDefault();
    // }
    // function arrowRightMove (EO) {
    //     myModel.playerMove(right);
    //     EO.preventDefault();
    // }
}