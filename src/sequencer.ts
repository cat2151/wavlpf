// Tone.js JSON Sequencer - Event Scheduler
// Based on tonejs-json-sequencer by cat2151
// https://github.com/cat2151/tonejs-json-sequencer

import type * as ToneTypes from 'tone';

// JSON sequence event types
export interface CreateNodeEvent {
  eventType: 'createNode';
  nodeId: number;
  nodeType: string;
  args?: unknown;
}

export interface ConnectEvent {
  eventType: 'connect';
  nodeId: number;
  connectTo: number | 'toDestination';
}

export interface TriggerAttackReleaseEvent {
  eventType: 'triggerAttackRelease';
  nodeId: number;
  args: [string, string, string]; // [note, duration, time]
}

export interface DepthRampToEvent {
  eventType: 'depth.rampTo';
  nodeId: number;
  args: [string, string, string]; // [value, rampTime, time]
}

export type SequenceEvent = CreateNodeEvent | ConnectEvent | TriggerAttackReleaseEvent | DepthRampToEvent;

/**
 * Manages Tone.js nodes for the sequencer
 */
export class SequencerNodes {
  private nodes: (ToneTypes.ToneAudioNode | null)[] = [];

  get(nodeId: number): ToneTypes.ToneAudioNode | null {
    return this.nodes[nodeId] ?? null;
  }

  set(nodeId: number, node: ToneTypes.ToneAudioNode): void {
    this.nodes[nodeId] = node;
  }

  disposeAll(): void {
    this.nodes.forEach(node => {
      if (node && typeof node.dispose === 'function') {
        try {
          node.dispose();
        } catch (error) {
          console.warn('Failed to dispose node:', error);
        }
      }
    });
    this.nodes = [];
  }
}

/**
 * Schedule or execute a sequence event
 * @param Tone - Tone.js library instance
 * @param nodes - Node manager
 * @param element - Event to process
 */
export function scheduleOrExecuteEvent(
  Tone: typeof ToneTypes,
  nodes: SequencerNodes,
  element: SequenceEvent
): void {
  switch (element.eventType) {
    case 'createNode':
      createNode(Tone, nodes, element);
      break;
    case 'connect':
      connectNode(nodes, element);
      break;
    case 'triggerAttackRelease': {
      const node = nodes.get(element.nodeId);
      if (!node || !('triggerAttackRelease' in node)) {
        console.warn(
          'Sequencer: triggerAttackRelease called for missing or invalid node',
          element.nodeId
        );
        break;
      }
      node.triggerAttackRelease(...element.args);
      break;
    }
    case 'depth.rampTo': {
      const node = nodes.get(element.nodeId);
      if (!node || !('depth' in node)) {
        console.warn(
          'Sequencer: depth.rampTo called for missing node or node without depth',
          element.nodeId
        );
        break;
      }
      const depth = (node as any).depth;
      if (!depth || typeof depth.rampTo !== 'function') {
        console.warn(
          'Sequencer: depth.rampTo called for node without depth.rampTo',
          element.nodeId
        );
        break;
      }
      depth.rampTo(...element.args);
      break;
    }
  }
}

/**
 * Create a Tone.js node based on the event
 */
function createNode(
  Tone: typeof ToneTypes,
  nodes: SequencerNodes,
  element: CreateNodeEvent
): void {
  switch (element.nodeType) {
    // Instruments
    case 'AMSynth':
      nodes.set(element.nodeId, new Tone.AMSynth(element.args));
      break;
    case 'DuoSynth':
      nodes.set(element.nodeId, new Tone.DuoSynth(element.args));
      break;
    case 'FMSynth':
      nodes.set(element.nodeId, new Tone.FMSynth(element.args));
      break;
    case 'MembraneSynth':
      nodes.set(element.nodeId, new Tone.MembraneSynth(element.args));
      break;
    case 'MetalSynth':
      nodes.set(element.nodeId, new Tone.MetalSynth(element.args));
      break;
    case 'MonoSynth':
      nodes.set(element.nodeId, new Tone.MonoSynth(element.args));
      break;
    case 'NoiseSynth':
      nodes.set(element.nodeId, new Tone.NoiseSynth(element.args));
      break;
    case 'PluckSynth':
      nodes.set(element.nodeId, new Tone.PluckSynth(element.args));
      break;
    case 'PolySynth':
      nodes.set(element.nodeId, new Tone.PolySynth(element.args));
      break;
    case 'Sampler':
      nodes.set(element.nodeId, new Tone.Sampler({
        ...(element.args as object),
        onload: () => {
          console.log('Sampler loaded successfully');
        },
        onerror: (error: Error) => {
          console.error('Sampler loading error:', error);
        }
      } as any));
      break;
    case 'Synth':
      nodes.set(element.nodeId, new Tone.Synth(element.args));
      break;
    // Effects
    case 'AutoFilter':
      nodes.set(element.nodeId, new Tone.AutoFilter(element.args));
      break;
    case 'AutoPanner':
      nodes.set(element.nodeId, new Tone.AutoPanner(element.args));
      break;
    case 'AutoWah':
      nodes.set(element.nodeId, new Tone.AutoWah(element.args));
      break;
    case 'BitCrusher':
      nodes.set(element.nodeId, new Tone.BitCrusher(element.args));
      break;
    case 'Chebyshev':
      nodes.set(element.nodeId, new Tone.Chebyshev(element.args));
      break;
    case 'Chorus':
      nodes.set(element.nodeId, new Tone.Chorus(element.args));
      break;
    case 'Distortion':
      nodes.set(element.nodeId, new Tone.Distortion(element.args));
      break;
    case 'FeedbackDelay':
      nodes.set(element.nodeId, new Tone.FeedbackDelay(element.args));
      break;
    case 'Freeverb':
      nodes.set(element.nodeId, new Tone.Freeverb(element.args));
      break;
    case 'FrequencyShifter':
      nodes.set(element.nodeId, new Tone.FrequencyShifter(element.args));
      break;
    case 'JCReverb':
      nodes.set(element.nodeId, new Tone.JCReverb(element.args));
      break;
    case 'Phaser':
      nodes.set(element.nodeId, new Tone.Phaser(element.args));
      break;
    case 'PingPongDelay':
      nodes.set(element.nodeId, new Tone.PingPongDelay(element.args));
      break;
    case 'PitchShift':
      nodes.set(element.nodeId, new Tone.PitchShift(element.args));
      break;
    case 'Reverb':
      nodes.set(element.nodeId, new Tone.Reverb(element.args));
      break;
    case 'StereoWidener':
      nodes.set(element.nodeId, new Tone.StereoWidener(element.args));
      break;
    case 'Tremolo':
      nodes.set(element.nodeId, new Tone.Tremolo(element.args));
      break;
    case 'Vibrato':
      nodes.set(element.nodeId, new Tone.Vibrato(element.args));
      break;
    default:
      console.warn(`Unknown node type: ${element.nodeType}`);
  }
}

/**
 * Connect a node to another node or destination
 */
function connectNode(nodes: SequencerNodes, element: ConnectEvent): void {
  const node = nodes.get(element.nodeId);
  if (!node) {
    console.warn(`Node ${element.nodeId} not found for connection`);
    return;
  }

  if (element.connectTo === 'toDestination') {
    node.toDestination();
  } else {
    const targetNode = nodes.get(element.connectTo as number);
    if (targetNode) {
      node.connect(targetNode);
    } else {
      console.warn(`Target node ${element.connectTo} not found`);
    }
  }
}

/**
 * Play a JSON sequence
 * @param Tone - Tone.js library instance
 * @param nodes - Node manager
 * @param sequence - Array of sequence events
 */
export async function playSequence(
  Tone: typeof ToneTypes,
  nodes: SequencerNodes,
  sequence: SequenceEvent[]
): Promise<void> {
  // Dispose existing nodes
  nodes.disposeAll();

  // First pass: create nodes and connections
  sequence.forEach(element => {
    try {
      if (element.eventType === 'createNode' || element.eventType === 'connect') {
        scheduleOrExecuteEvent(Tone, nodes, element);
      }
    } catch (error) {
      console.error('Error creating node or connection:', error);
    }
  });

  // Wait for all audio buffers to load (important for Sampler)
  await Tone.loaded();
  console.log('All audio buffers loaded');

  // Second pass: schedule playback events
  sequence.forEach(element => {
    try {
      if (element.eventType !== 'createNode' && element.eventType !== 'connect') {
        scheduleOrExecuteEvent(Tone, nodes, element);
      }
    } catch (error) {
      console.error('Error scheduling event:', error);
    }
  });
}
