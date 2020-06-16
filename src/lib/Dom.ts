import { Metronome } from './Metronome';

export class Dom {
  constructor (
    private window: Window,
    private document: Document,
    private metronome: Metronome // normally would be done via DI, but just passing here normally to keep it lightweight
  ) {}

  init () {
    this.document.getElementById('start').onclick = () => {
      this.metronome.start();
    }

    this.document.getElementById('stop').onclick = () => {
      this.metronome.stop();
    }

    this.document.getElementById('bpm').onchange = (e: any) => {
      this.metronome.setTempo(Number.parseInt(e.target.value));
    }

    this.document.getElementById('notes').onchange = (e: any) => {
      this.metronome.setNotesPerBar(Number.parseInt(e.target.value));
    }

    this.window.addEventListener('keypress', e => {
      if (e.key === ' ') {
        this.metronome.toggle();
      }
    });
  }
}
