function Engine(objects) {

    let self = this;
    let car = objects['car'];
    let enemyCar = objects['enemy'];
    let road = objects['road'];
    let trees = objects['trees'];
    let view = objects['view'];
    let event = objects['event'];
    let coin = objects['coin'];

    self.start = function () {

        requestAnimationFrame(tick);

        function tick() {
            if (state === 1) {
                treeMove();
                // carMove();
                // enemyCarMove();
                // coinMove();
                //
                // if (isCrashed()) {
                //     event.crashed();
                // }
                //
                // if (isCoinCollected()) {
                //
                // }
            }

        }

        requestAnimationFrame(tick);
    }

    function carMove() {
        let carPosition = car.getCarPosition();
        if (carPosition.y < 0 && car.getSpeedY() < 0)
            car.stopMoveTop();
        if (carPosition.y + car.getHeight() > road.getHeight() && car.getSpeedY() > 0)
            car.stopMoveBottom();
        if (carPosition.x < -road.getWidth() / 2 + car.getWidth() / 2 && car.getSpeedX() < 0)
            car.stopMoveLeft();
        if (carPosition.x > road.getWidth() / 2 - car.getWidth() / 2 && car.getSpeedX() > 0)
            car.stopMoveRight();

        car.move();
        view.update(car.getElement(), carPosition.x, carPosition.y);
    }

    function treeMove() {
        for (let i = 0; i < trees.length; i++) {
            trees[i].move();
            view.update(trees[i].getElement(), trees[i].getPosition().x, trees[i].getPosition().y);
        }
    }

    function enemyCarMove() {
        let enemyCarPosition = enemyCar.getPosition();
        enemyCar.move();

        if (enemyCarPosition.y > window.innerHeight) {
            let newPositionX;
            let newPositionY = -400;

            const direction = Math.floor(Math.random() * 2); // чтобы было целое число

            if (direction === 0) { // движение влево
                newPositionX = -Math.floor(Math.random() * (road.getWidth() / 2 + 1 - enemyCar.getElement().width));
            } else if (direction === 1) { // движение вправо
                newPositionX = Math.floor(Math.random() * (road.getWidth() / 2 + 1 - enemyCar.getElement().width));
            }
            enemyCar.setPosition(newPositionX, newPositionY);
        }
        view.update(enemyCar.getElement(), enemyCarPosition.x, enemyCarPosition.y);
    }

    function isCrashed() {

        let carPosition = car.getCarPosition();
        const carTopY = carPosition.y; // верхняя граница машинки
        const carBottomY = carPosition.y + car.getHeight(); // нижняя граница машинки
        const carLeftX = carPosition.x - car.getWidth() / 2;
        const carRightX = carPosition.x + car.getWidth() / 2;

        let enemyCarPosition = enemyCar.getPosition();
        const enemyCarTopY = enemyCarPosition.y; // верхняя граница машинки
        const enemyCarBottomY = enemyCarPosition.y + enemyCar.getHeight(); // нижняя граница машинки
        const enemyCarLeftX = enemyCarPosition.x - enemyCar.getWidth() / 2;
        const enemyCarRightX = enemyCarPosition.x + enemyCar.getWidth() / 2;

        if (carTopY > enemyCarBottomY || carBottomY < enemyCarTopY) {
            return false;
        }
        if (carLeftX > enemyCarRightX || carRightX < enemyCarLeftX) {
            return false;
        }
        return true;
    }

    function coinMove() {
        let coinPosition = coin.getPosition();
        coin.move();

        if (coinPosition.y > window.innerHeight) {
            let newPositionX;
            let newPositionY = -100; // 100 - больше высоты монетки

            const direction = Math.floor(Math.random() * 2); // чтобы было целое число

            coin.style.display = 'block';
            coin.visible = true;

            if (direction === 0) { // движение влево
                newPositionX = -Math.floor(Math.random() * (road.getWidth() / 2 + 1 - coin.getElement().width));
            } else if (direction === 1) { // движение вправо
                newPositionX = Math.floor(Math.random() * (road.getWidth() / 2 + 1 - coin.getElement().width));
            }
            coin.setPosition(newPositionX, newPositionY);
        }
        view.update(coin.getElement(), coinPosition.x, coinPosition.y);
    }


    function isCoinCollected() {
        let carPosition = car.getCarPosition();
        const carTopY = carPosition.y; // верхняя граница машинки
        const carBottomY = carPosition.y + car.getHeight(); // нижняя граница машинки
        const carLeftX = carPosition.x - car.getWidth() / 2; // левая граница машинки
        const carRightX = carPosition.x + car.getWidth() / 2; // правая граница  машинки

        let coinPosition = coin.getPosition();
        const coinTopY = coinPosition.y; // верхняя граница монетки
        const coinBottomY = coinPosition.y + coin.getHeight(); // нижняя граница монетки
        const coinLeftX = coinPosition.x - coin.getWidth() / 2; // левая граница монетки
        const coinRightX = coinPosition.x + coin.getWidth() / 2; // правая граница монетки

        if (carTopY > coinBottomY || carBottomY < coinTopY) {
            return false;
        }
        if (carLeftX > coinRightX || carRightX < coinLeftX) {
            return false;
        }
        return true;
        // if (coin.visible) {
        //     score++;
        //     gameScore.innerHTML = score;
        //     coin.style.display = 'none';
        //     coin.visible = false;
        //     clickSound(coinAudio);
        //     if (score % 1 === 0) {
        //         speed += 0.5 ;
        //     }
        // }
    }


}



