'use strict';
function Storage() {

    let self = this;

    const url = 'https://fe.it-academy.by/AjaxStringStorage2.php';
    const stringName='HRYHORYEVA_VI_RECORD_CARS_TEST';
    let updatePassword;


    class User {
        constructor(name, score) {
            this.name = name;
            this.score = score;
        }
    }

    self.storeInfo = function () {
        updatePassword=Math.random();
        let currentUser = new User(player, score)
        let currentUserJson = JSON.stringify(currentUser);
        console.log('Save: ' + currentUserJson);
        return 200;
    }

}
