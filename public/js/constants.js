const ORANGE = "#f70";
const GREEN = "#0f0";
const BLUE = "#0ff";
const PINK = "#f0f";
const YELLOW = "#ff0";
const RED = "#f00";
const WHITE = "#fff";
const BLUES = "#00f";

const STARS = 100;
const MAX_PLAYERS = 4;

const BOARD_GAME = [
  "VPBOIPCBIPBV",
  "I          R",
  "R          I",
  "B          O",
  "P          B",
  "I          I",
  "C           ",
  "VBPROIBPIR S",
];

const COLORS = [ORANGE, GREEN, BLUE, RED];

const socketIO = io();
const context = $canvas.getContext("2d");

const dice = new Dice();
const board = new Board();
