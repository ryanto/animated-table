import Controller from '@ember/controller';
import move from 'ember-animated/motions/move';
import { fadeIn, fadeOut } from 'ember-animated/motions/opacity';

export default Controller.extend({
  rows: [],
  currentId: 1,

  interval: null,

  init() {
    this._super(...arguments);
    this.startInterval();
  },

  *transition({ insertedSprites, keptSprites, removedSprites }) {
    yield Promise.all(removedSprites.map(sprite => fadeOut(sprite, { duration: 300 })));
    yield Promise.all(keptSprites.map(sprite => move(sprite, { duration: 300 })));
    yield Promise.all(insertedSprites.map(sprite => fadeIn(sprite, { duration: 300 })));
  },

  addRow() {
    this.rows.addObject({
      id: this.currentId++,
      random1: (Math.random() * 100).toFixed(0),
      random2: (Math.random() * 1000 + 100).toFixed(0)
    });
  },

  startInterval() {
    if (!this.interval) {
      let interval = setInterval(
        () => { this.addRow() },
        1800
      );
      this.set('interval', interval);
    }
  },

  endInterval() {
    clearInterval(this.interval);
    this.set('interval', null);
  },

  actions: {
    addSingle() {
      this.addRow();
    },

    toggleTimer() {
      if (this.interval) {
        this.endInterval();
      } else {
        this.startInterval();
      }
    }

  }
});
