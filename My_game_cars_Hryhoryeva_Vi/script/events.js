function Event() {

    let self = this;

    self.coinCollected = function () {
        // clickSound(coinAudio);

    }

    self.crashed = function () {
        state = 3;
    }

    // добавляем музыку
    // let crashAudio = new Audio('./music/crash.mp3');
    // crashAudio.volume = 0.2;
    // let coinAudio = new Audio('./music/coin.mp3');
    // coinAudio.volume = 0.4;
    // function clickSound(audio) {
    //     audio.currentTime = 0;
    //     audio.play();
    // }
    //
    // clickSoundInit(crashAudio);
    // clickSoundInit(coinAudio);
    // function clickSoundInit(audio) {
    //     audio.play(); // запуск звука
    //     audio.pause(); // и сразу остановка
    // }
}