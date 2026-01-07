// Sample sequences for tonejs-json-sequencer
// Based on the Sampler (Piano) example from tonejs-json-sequencer
// https://github.com/cat2151/tonejs-json-sequencer

import type { SequenceEvent } from './sequencer';

/**
 * Default piano-style sequence using PolySynth instead of Sampler
 * Based on the structure of the Sampler (Piano) sample
 * from tonejs-json-sequencer, but using synthesizer to avoid
 * external audio file dependencies
 */
export const pianoSequence: SequenceEvent[] = [
  {
    eventType: 'createNode',
    nodeId: 0,
    nodeType: 'PolySynth',
    args: {
      options: {
        oscillator: {
          type: 'sine'
        },
        envelope: {
          attack: 0.001,
          decay: 0.2,
          sustain: 0.3,
          release: 0.5
        }
      }
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
