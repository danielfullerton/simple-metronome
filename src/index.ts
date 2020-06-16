import { Metronome } from './lib/Metronome';

const metronome = new Metronome();

document.getElementById('start').onclick = () => {
  metronome.start();
}

document.getElementById('stop').onclick = () => {
  metronome.stop();
}

window.addEventListener('keypress', e => {
  if (e.key === ' ') {
    metronome.toggle();
  }
});

// todo: credit https://freesfx.co.uk
