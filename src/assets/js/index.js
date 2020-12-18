import { Board } from './board.js';
import { Priect } from './priece.js';

const gap = 20;

const board = new Board(document.documentElement.querySelector('#board'), gap);
board.draw();

const priect = new Priect(document.documentElement.querySelector('#chessPiece'), gap);
priect.init();