import { Board } from './board';
import { Priect } from './priece';

const gap = 20;

const board = new Board(document.documentElement.querySelector('#board'), gap);
board.draw();

const priect = new Priect(document.documentElement.querySelector('#chessPiece'), gap);
priect.init();
