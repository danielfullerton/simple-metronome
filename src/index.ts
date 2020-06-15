import { el, mount } from 'redom';
const PROJECT_TITLE = 'metronome';

const title = el('h1', PROJECT_TITLE);
mount(document.body, title);

const BPM = 30;

let agg = 0;
let count = 1;
let inc_constant = 100;

setInterval(() => {
  agg+= inc_constant;
  if (agg >=((60 * 1000) / BPM)) {
    console.log(count);
    count = count >= 4 ? 1 : count + 1;
    agg = 0;
  }
}, inc_constant);
