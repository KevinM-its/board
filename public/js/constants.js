

const ORANGE = '#f70';
const GREEN  = '#0f0';
const BLUE   = '#0ff';
const PINK   = '#f0f';
const YELLOW = '#ff0';
const RED    = '#f00';
const WHITE  = '#fff';
const BLUES  = '#00f';

const STARS = 100;
const MAX_PLAYERS = 4;

const BOARD_GAME = [
    "OCVIBRCOPS",
    "R        C",
    "I        R",
    "I        B",
    "OPCRBIBPPO",
];

const COLORS = [
    ORANGE,
    GREEN,
    BLUE,
    RED
];


const socketIO = io();
const context = $canvas.getContext('2d');


$canvas.width  = window.innerWidth;
$canvas.height = window.innerHeight - 5;

const { size, x, y } =  responsive();

const BLOCK_SIZE = size;
 
const board = new Board ( x, y );

const image = new NewImage(
    './../assets/its.png', size > 50 ? 400 : 200, size > 50 ? 300 : 150);

const dice  = new Dice($dice, 150, 150);

