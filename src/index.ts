import { Metronome } from './lib/Metronome';
import { Dom } from './lib/Dom';
import './style.scss';

const metronome = new Metronome();
const dom = new Dom(window, document, metronome);
dom.init();

// todo: credit https://freesfx.co.uk
