function Engine(objects) {

    let self = this;
    let car = objects['car'];
    let enemyCar = objects['enemy'];
    let road = objects['road'];
    let trees = objects['trees'];
    let view = objects['view'];
    let coin = objects['coin'];
    let storage = objects['storage'];

    // добавляем музыку
    let carAudio = new Audio('./music/car.mp3');
    carAudio.volume = 0.2;
    let crashAudio = new Audio('./music/crash.mp3');
    crashAudio.volume = 0.2;
    let coinAudio = new Audio('./music/coin.mp3');
    coinAudio.volume = 0.4;

    self.start = function() {
        view.gameOffDisplay('none');
        clickSoundInit(carAudio);
        requestAnimationFrame(tick);

        function tick() {
            if (state === 2) {
                if (carAudio.paused) {
                    playSound(carAudio);
                }

                treeMove();
                carMove();
                enemyCarMove();
                coinMove();

                if (isCrashed())
                    gameFinishEvent();

                if (isCoinCollected())
                    coinCollectedEvent();
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
            let isCrashed = true;

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

            if (((carTopY > enemyCarBottomY || carBottomY < enemyCarTopY) ||
                (carLeftX > enemyCarRightX || carRightX < enemyCarLeftX))) {
                isCrashed = false;
            }

            return isCrashed;
        }

        function coinMove() {
            let coinPosition = coin.getPosition();
            coin.move();

            if (coinPosition.y > window.innerHeight) {
                let newPositionX;
                let newPositionY = -100; // 100 - больше высоты монетки

                const direction = Math.floor(Math.random() * 2); // чтобы было целое число

                view.setDisplay(coin.getElement(), 'block')
                coin.setVisible(true);

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
            let isCollect = true;

            let carPosition = car.getCarPosition();
            const carTopY = carPosition.y; // верхняя граница машинки
            const carBottomY = carPosition.y + car.getHeight(); // нижняя граница машинки
            const carLeftX = carPosition.x - car.getWidth() / 2; // левая граница машинки
            const carRightX = carPosition.x + car.getWidth() / 2; // правая граница машинки

            let coinPosition = coin.getPosition();
            const coinTopY = coinPosition.y; // верхняя граница монетки
            const coinBottomY = coinPosition.y + coin.getHeight(); // нижняя граница монетки
            const coinLeftX = coinPosition.x - coin.getWidth() / 2; // левая граница монетки
            const coinRightX = coinPosition.x + coin.getWidth() / 2; // правая граница монетки

            if (((carTopY > coinBottomY || carBottomY < coinTopY) ||
                (carLeftX > coinRightX || carRightX < coinLeftX))) {
                isCollect = false;
            }

            return isCollect && coin.isVisible();
        }

        function coinCollectedEvent() {
            score++;
            console.log(score);
            coin.setVisible(false);
            view.setDisplay(coin.getElement(), 'none')
            view.updateScore();
            playSound(coinAudio);
            if (score % 1 === 0) {

                for (let i = 0; i < trees.length; i++) {
                    trees[i].addSpeed();
                }

                enemyCar.addSpeed();
                coin.addSpeed();
            }
        }

        function gameFinishEvent() {
            state = 3;
            playSound(crashAudio);
            stopSound(carAudio);
            vibration(true);
            view.gameOffDisplay('block');
            storage.storeInfo();
        }

        // добавляем вибрацию
        function vibration(strike) {
            if (navigator.vibrate) {
                if (!strike)
                    window.navigator.vibrate(100);
                else
                    window.navigator.vibrate([100, 50, 500]);
            }
        }


        function playSound(audio) {
            audio.currentTime = 0;
            audio.play();
        }

        function stopSound(audio) {
            audio.pause();
        }

        function clickSoundInit(audio) {
            audio.play(); // запуск звука
            audio.pause(); // и сразу остановка
        }

    }
}



