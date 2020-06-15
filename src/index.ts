import * as Tone from 'tone';

const BPM = 300;

let agg = 0;
let count = 1;
let inc_constant = 100;
let interval: NodeJS.Timer;

const high = new Tone.Player('assets/sounds/high_clave.wav').toMaster();
const low = new Tone.Player('assets/sounds/low_clave.wav').toMaster();

const startMet = () => {
  interval = setInterval(() => {
    agg+= inc_constant;
    if (agg >=((60 * 1000) / BPM)) {
      if (count === 1) {
        high.start();
      } else {
        low.start();
      }
      count = count >= 4 ? 1 : count + 1;
      agg = 0;
    }
  }, inc_constant);
};

const stopMet = () => {
  clearInterval(interval);
};


const start: HTMLElement = document.getElementById('start');
start.onclick = () => {
  startMet();
};

const stop = document.getElementById('stop');
stop.onclick = () => {
  stopMet();
}



// todo: credit https://freesfx.co.uk
