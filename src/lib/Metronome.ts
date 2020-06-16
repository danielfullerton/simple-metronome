import { Sound, Sounds } from './Sounds';

export class Metronome {
  private tempo = 120;
  private noteCount = 1;
  private readonly incrementConstant = 100;
  private playing = false;
  private stopped = true;
  private aggregator = 0;
  private notesPerBar = 4;
  private sound = Sounds.Clave;

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
    if (this.aggregator >= (60000 / this.tempo) || first) {
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
    if (this.noteCount === 1) {
      this.sound.accent.start();
    } else {
      this.sound.fill.start();
    }
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

  getTempo () {
    return this.tempo;
  }

  setSound (sound: Sound) {
    this.sound = sound;
  }

  getSound () {
    return this.sound;
  }
}
