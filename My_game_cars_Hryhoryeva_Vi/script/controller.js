'use strict'
function Controller(car) {
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
}