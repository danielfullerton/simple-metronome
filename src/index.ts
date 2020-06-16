import { Metronome } from './lib/Metronome';

const metronome = new Metronome();

document.getElementById('start').onclick = () => {
  metronome.start();
}

document.getElementById('stop').onclick = () => {
  metronome.stop();
}

document.getElementById('bpm').onchange = (e: any) => {
  metronome.setTempo(Number.parseInt(e.target.value));
}

window.addEventListener('keypress', e => {
  if (e.key === ' ') {
    metronome.toggle();
  }
});

// todo: credit https://freesfx.co.uk
