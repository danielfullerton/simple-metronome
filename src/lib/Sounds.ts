import * as Tone from "tone";

// todo: dedicate file
export interface Playable {
  start: () => void;
}

// todo: dedicate file
export interface Sound {
  accent: Playable;
  fill: Playable;
}

export class Sounds {
  static readonly Clave: Sound = {
    accent: new Tone.Player('assets/sounds/high_clave.wav').toMaster(),
    fill: new Tone.Player('assets/sounds/low_clave.wav').toMaster()
  };
}
