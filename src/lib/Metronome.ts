import { Sound, Sounds } from './Sounds';

export interface OnTick<T> {
  (noteCount: number): T;
}

export class Metronome {
  private tempo = 120;
  private noteCount = 1;
  private readonly incrementConstant = 100;
  private playing = false;
  private stopped = true;
  private aggregator = 0;
  private notesPerBar = 4;
  private sound = Sounds.Clave;
  private decimalOfTempo = 1;
  private onTick: OnTick<void> = () => {};
  private shouldPlayCount: OnTick<boolean> = () => true;

  constructor () {}

  start () {
    if (this.playing) {
      return;
    }
    this.playing = true;
    this.stopped = false;
    this.play(true);
  }

  play (first = true) {
    if (this.stopped) {
      return;
    }

    // todo: can we reduce or remove latency between intervals? Drift correction works for aggregation timing, not so much for consistent interval timing.
    this.aggregator += this.incrementConstant;
    if (this.aggregator >= (60000 / (this.tempo * this.decimalOfTempo)) || first) {
      this.playNote();
      this.noteCount = this.noteCount >=this.notesPerBar ? 1 : this.noteCount + 1;
      this.aggregator = 0;
    }
    setTimeout(() => this.play(false), this.incrementConstant);
  }

  stop () {
    this.playing = false;
    this.stopped = true;
    this.count(true);
  }

  toggle () {
    if (this.stopped) {
      this.start();
    } else {
      this.stop();
    }
  }

  playNote () {
    if (this.shouldPlayCount(this.noteCount)) {
      if (this.noteCount === 1) {
        this.sound.accent.start();
      } else {
        this.sound.fill.start();
      }
    }
    this.onTick(this.noteCount);
  }

  count (reset = false) {
    if (reset) {
      this.noteCount = 1;
      return;
    }

    this.noteCount++;
  }

  setTempo (tempo: number) {
    if (tempo < 30 || tempo > 300) {
      throw new Error('Cannot set tempo above 300 or below 30!');
    }

    this.tempo = tempo;
  }

  setNotesPerBar (notes: number) {
    if (notes < 1 || notes > 20) {
      throw new Error('Notes per bar must be less than 20 and greater than 1.')
    }

    this.notesPerBar = notes;
  }

  getNotesPerbar () {
    return this.notesPerBar;
  }

  setDecimalOfTempo (decimal: number) {
    if (decimal > 2 || decimal < .25) {
      throw new Error('Tempo percentage should be between 25% and 200%');
    }

    this.decimalOfTempo = decimal;
  }

  setOnTick (onTick: OnTick<void>) {
    this.onTick = onTick;
  }

  setShouldPlayCount (onTick: OnTick<boolean>) {
    this.shouldPlayCount = onTick;
  }
}
