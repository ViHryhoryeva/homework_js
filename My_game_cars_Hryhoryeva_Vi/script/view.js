'use strict'
class View {

    update(element, x, y) {
        element.style.transform = `translate( ${x}px, ${y}px )`;
    }

}