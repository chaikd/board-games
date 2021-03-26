import { Board } from './board';
import { Priect } from './priece';
import './index.scss';

const gap = 20;

const board = new Board(document.documentElement.querySelector('#board'), gap);
board.draw();

function initPriect() {
    const priect = new Priect(document.documentElement.querySelector('#chessPiece'), gap);
    priect.init();
}
initPriect();

document.documentElement.querySelector('.button')?.addEventListener('click', () => {
    initPriect();
})
