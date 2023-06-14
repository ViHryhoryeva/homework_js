'use strict'
init();
function init() {
    const carElement = document.querySelector('.car');
    const roadElement = document.querySelector('.road');
    const enemyCarElement = document.querySelector('.car2');
    const treeElements = document.querySelectorAll('.tree');
    const coinElement = document.querySelector('.coin');

    let view = new View();
    let storage = new Storage();
    let car = new Car(carElement);
    let road = new Road(roadElement);
    let enemyCar = new EnemyCar(enemyCarElement);
    let coin = new Coin(coinElement);

    let trees = [];
    for (let i = 0; i < treeElements.length; i++) {
        trees.push(new Tree(treeElements[i]));
    }

    const objects = {};
    objects['car'] = car;
    objects['road'] = road;
    objects['trees'] = trees;
    objects['view'] = view;
    objects['enemy'] = enemyCar;
    objects['coin'] = coin;
    objects['storage'] = storage;

    let engine = new Engine(objects);
    engine.start();

    new Controller(car, view, storage);
}