// Sample sequences for tonejs-json-sequencer
// Based on the Sampler (Piano) example from tonejs-json-sequencer
// https://github.com/cat2151/tonejs-json-sequencer

import type { SequenceEvent } from './sequencer';

/**
 * Default piano sequence - based on the Sampler (Piano) sample
 * from tonejs-json-sequencer
 */
export const pianoSequence: SequenceEvent[] = [
  {
    eventType: 'createNode',
    nodeId: 0,
    nodeType: 'Sampler',
    args: {
      urls: {
        C4: 'https://tonejs.github.io/audio/salamander/C4.mp3',
        E4: 'https://tonejs.github.io/audio/salamander/E4.mp3',
        G4: 'https://tonejs.github.io/audio/salamander/G4.mp3',
        B4: 'https://tonejs.github.io/audio/salamander/B4.mp3',
      },
      release: 1,
    }
  },
  {
    eventType: 'connect',
    nodeId: 0,
    connectTo: 'toDestination'
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['C4', '4n', '+0i']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['D#4', '4n', '+96i']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['F#4', '4n', '+192i']
  },
  {
    eventType: 'triggerAttackRelease',
    nodeId: 0,
    args: ['A4', '4n', '+288i']
  }
];
