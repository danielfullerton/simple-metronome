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
      const value = Number.parseInt(e.target.value) || 120;
      this.metronome.setTempo(value);
    }
    this.document.getElementById('notes').onchange = (e: any) => {
      const value = Number.parseInt(e.target.value) || 100;
      this.metronome.setNotesPerBar(value);
      this.setIndicators();
    }
    this.document.getElementById('tempoPercentage').onchange = (e: any) => {
      this.metronome.setDecimalOfTempo((Number.parseInt(e.target.value)) / 100);
    }
    this.window.addEventListener('keypress', e => {
      if (e.key === ' ') {
        this.metronome.toggle();
      }
    });

    this.setIndicators();
    this.setOnTick();
    this.setShouldPlayCount();
  }

  setIndicators () {
    const indicatorEl = this.document.getElementById('indicators');
    while (indicatorEl.firstChild) {
      indicatorEl.removeChild(indicatorEl.firstChild);
    }
    const num = this.metronome.getNotesPerbar();
    for (let i = 0; i < num; i++) {
      const indicator = document.createElement('div');
      indicator.className = 'indicator';
      indicator.id = `indicator-${i + 1}`;
      indicator.onclick = () => {
        if (/.*disabled.*/ig.test(indicator.className)) {
          indicator.className = 'indicator';
        } else {
          indicator.className += ' disabled';
        }
      };
      indicatorEl.appendChild(indicator);
    }
  }

  setOnTick () {
    this.metronome.setOnTick(count => {
      const indicator = this.document.getElementById(`indicator-${count}`);
      const orig = indicator.style.background;
      setTimeout(() => {
        indicator.style.background = 'blue';
      }, 50);
      setTimeout(() => {
        indicator.style.background = orig;
      }, 250);
    });
  }

  setShouldPlayCount () {
    this.metronome.setShouldPlayCount(count => {
      const indicator = this.document.getElementById(`indicator-${count}`);
      return !/.*disabled.*/ig.test(indicator.className);
    });
  }
}
