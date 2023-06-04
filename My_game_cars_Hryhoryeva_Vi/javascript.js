game();
function game() {
    let isPause = false;
    let animationID = null;

    const speed = 3;

    const car= document.querySelector('.car');
    const elem1Info = {
        width: car.clientWidth,
        height: car.clientHeight,
        coords: getCoordinat(car),
        move: {
            top: null,
            bottom: null,
            left: null,
            right: null,
        }
    };

    const road = document.querySelector('.road');
    const roadInfo = {
        width: road.clientWidth,
        height: road.clientHeight,
    }

    const carSecond = document.querySelector('.car2');
    const elem2Info = {
        width: carSecond.clientWidth,
        height: carSecond.clientHeight,
        coords: getCoordinat(carSecond),
    }

    const trees= document.querySelectorAll('.tree');

    const treesCoords = [];
    for (let i = 0; i < trees.length; i++) {
        const tree = trees[i];
        const coordsTree = getCoordinat(tree);
        treesCoords.push(coordsTree);
    }

    document.addEventListener('keydown', function(event)  {
        if (!isPause) {
            const code = event.code;
            if (code === 'ArrowUp' && elem1Info.move.top === null) {
                elem1Info.move.top = requestAnimationFrame(carMoveTop);
            } else if(code === 'ArrowDown' && elem1Info.move.bottom === null) {
                elem1Info.move.bottom = requestAnimationFrame(carMoveBottom);
            } else if (code === 'ArrowLeft' && elem1Info.move.left === null) {
                elem1Info.move.left = requestAnimationFrame(carMoveLeft);
            } else if (code === 'ArrowRight' && elem1Info.move.right === null) {
                elem1Info.move.right = requestAnimationFrame(carMoveRight);
            }
        } else if (isPause) {
            return;
        }
    })
    document.addEventListener('keyup', function (event) {
        const code = event.code;
        if (code === 'ArrowUp') {
            cancelAnimationFrame(elem1Info.move.top);
            elem1Info.move.top = null;
        } else if(code === 'ArrowDown') {
            cancelAnimationFrame(elem1Info.move.bottom);
            elem1Info.move.bottom = null;
        } else if (code === 'ArrowLeft') {
            cancelAnimationFrame(elem1Info.move.left);
            elem1Info.move.left = null;
        } else if (code === 'ArrowRight') {
            cancelAnimationFrame(elem1Info.move.right);
            elem1Info.move.right = null;
        }
    });

    //расчитаем координаты для машинки
    function carMoveTop() {
        const newY = elem1Info.coords.y - 5;
        if (newY < 0) {
            return;
        }
        elem1Info.coords.y = newY; // перезаписываем новые значения по y
        car.style.transform = `translate( ${elem1Info.coords.x}px, ${newY}px )`;
        elem1Info.move.top = requestAnimationFrame(carMoveTop);
        console.log(getConflict(elem1Info, elem2Info));
    }
    function carMoveBottom() {
        const newY = elem1Info.coords.y + 5;
        if (newY + elem1Info.height > roadInfo.height) {
            return;
        }
        elem1Info.coords.y = newY; // перезаписываем новые значения по y
        car.style.transform = `translate( ${elem1Info.coords.x}px, ${newY}px )`;
        elem1Info.move.bottom = requestAnimationFrame(carMoveBottom);
        console.log(getConflict(elem1Info, elem2Info));
    }
    function carMoveLeft() {
        const newX = elem1Info.coords.x - 5;
        if (newX < -roadInfo.width / 2 + elem1Info.width / 2 ) {
            return;
        }
        elem1Info.coords.x = newX; // перезаписываем новые значения по y
        car.style.transform = `translate( ${newX}px, ${elem1Info.coords.y}px )`;
        elem1Info.move.left = requestAnimationFrame(carMoveLeft);
        console.log(getConflict(elem1Info, elem2Info));
    }
    function carMoveRight() {
        const newX = elem1Info.coords.x + 5;
        if (newX > roadInfo.width / 2 - elem1Info.width / 2 ) {
            return;
        }
        elem1Info.coords.x = newX; // перезаписываем новые значения по y
        car.style.transform = `translate( ${newX}px, ${elem1Info.coords.y}px )`;
        elem1Info.move.right = requestAnimationFrame(carMoveRight);
        console.log(getConflict(elem1Info, elem2Info));
    }

    animationID = requestAnimationFrame(startGame);
    function startGame() {
        treesAnimation();
        carSecondAnimation();

        if (getConflict(elem1Info, elem2Info)) {
            return gameFinish();
        }
        // console.log();
        animationID = requestAnimationFrame(startGame);
    }
    function treesAnimation() {
        for (let i = 0; i < trees.length; i++) {
            const tree = trees[i];
            const coords = treesCoords[i];

            let newYCoord = coords.y + speed;

            if (newYCoord > window.innerHeight) {
                newYCoord = -400; // больше высоты самого большого дерева (280px), чтобы не накладывались при движении деревья
            }
            treesCoords[i].y = newYCoord; //перезаписываем координату y
            tree.style.transform = `translate( ${coords.x}px, ${newYCoord}px )`;
        }
    }
    function carSecondAnimation() {
        let newCoordX = elem2Info.coords.x;
        let newCoordY = elem2Info.coords.y + speed/2;

        if (newCoordY > window.innerHeight) {
            newCoordY = -150; // больше высоты монетки

            const direction = parseInt(Math.random() * 2); // чтобы было целое число

            if (direction === 0) { // движение влево
                newCoordX = -parseInt(Math.random() * (roadInfo.width/2 + 1 - elem2Info.width));
            } else if (direction === 1) { // движение вправо
                newCoordX = parseInt(Math.random() * (roadInfo.width/2 + 1 - elem2Info.width));
            }
        }

        elem2Info.coords.x = newCoordX; //перезаписываем координату
        elem2Info.coords.y = newCoordY; //перезаписываем координату
        carSecond.style.transform = `translate( ${newCoordX}px, ${newCoordY}px )`;
    }
    function getConflict(elem1Info, elem2Info) {
        const carTopY = elem1Info.coords.y; // верхняя граница машинки
        const carBottomY = elem1Info.coords.y + elem1Info.height; // нижняя граница машинка
        const carLeftX = elem1Info.coords.x - elem1Info.width/2;
        const carRightX = elem1Info.coords.x + elem1Info.width/2;

        const carSecondTopY = elem2Info.coords.y;
        const carSecondBottomY = elem2Info.coords.y + elem2Info.height;
        const carSecondLeftX = elem2Info.coords.x - elem2Info.width/2;
        const carSecondRightX = elem2Info.coords.x + elem2Info.width/2;

        if (carTopY > carSecondBottomY || carBottomY < carSecondTopY) {
            return false;
        }
        if (carLeftX > carSecondRightX || carRightX < carSecondLeftX) {
            return false;
        }
        return true;
    }
    function getCoordinat(elem) {
        const matrix = window.getComputedStyle(elem).transform;
        const array = matrix.split(',');
        const x = array[array.length - 2];
        const y = array[array.length - 1];
        const numberX = parseFloat(x);
        const numberY = parseFloat(y);
        return  { x: numberX, y: numberY};
    }

    const gameBtn = document.querySelector('.game-btn');
    gameBtn.addEventListener('click', () => {
        isPause = !isPause;
        if (isPause) {
            cancelAnimationFrame(animationID);
            cancelAnimationFrame(elem1Info.move.top);
            cancelAnimationFrame(elem1Info.move.bottom);
            cancelAnimationFrame(elem1Info.move.left);
            cancelAnimationFrame(elem1Info.move.right);
            gameBtn.children[0].style.display = 'none';
            gameBtn.children[1].style.display = 'block';
        } else {
            animationID = requestAnimationFrame(startGame);
            gameBtn.children[0].style.display = 'block';
            gameBtn.children[1].style.display = 'none';
        }
    });
    function gameFinish() {
        gameBtn.style.display = 'none';

    }
}
