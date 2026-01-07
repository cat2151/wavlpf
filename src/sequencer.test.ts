import { describe, it, expect, vi, beforeEach } from 'vitest';
import { SequencerNodes, scheduleOrExecuteEvent, playSequence } from './sequencer';
import type { CreateNodeEvent, ConnectEvent, TriggerAttackReleaseEvent, SequenceEvent } from './sequencer';

// Mock Tone.js types and instances
const createMockNode = () => ({
  dispose: vi.fn(),
  connect: vi.fn(),
  toDestination: vi.fn().mockReturnThis(),
  triggerAttackRelease: vi.fn(),
  depth: {
    rampTo: vi.fn(),
  },
});

const createMockTone = () => ({
  Synth: vi.fn(function() { return createMockNode(); }),
  PolySynth: vi.fn(function() { return createMockNode(); }),
  FMSynth: vi.fn(function() { return createMockNode(); }),
  Sampler: vi.fn(function() { return createMockNode(); }),
  Vibrato: vi.fn(function() { return createMockNode(); }),
  loaded: vi.fn().mockResolvedValue(undefined),
});

describe('SequencerNodes', () => {
  let nodes: SequencerNodes;

  beforeEach(() => {
    nodes = new SequencerNodes();
  });

  describe('set and get', () => {
    it('should store and retrieve a node', () => {
      const mockNode = createMockNode();
      nodes.set(0, mockNode as any);
      expect(nodes.get(0)).toBe(mockNode);
    });

    it('should return null for non-existent node', () => {
      expect(nodes.get(99)).toBeNull();
    });
  });

  describe('disposeAll', () => {
    it('should dispose all nodes', () => {
      const mockNode1 = createMockNode();
      const mockNode2 = createMockNode();
      
      nodes.set(0, mockNode1 as any);
      nodes.set(1, mockNode2 as any);
      
      nodes.disposeAll();
      
      expect(mockNode1.dispose).toHaveBeenCalled();
      expect(mockNode2.dispose).toHaveBeenCalled();
    });

    it('should handle dispose errors gracefully', () => {
      const mockNode = createMockNode();
      mockNode.dispose.mockImplementation(() => {
        throw new Error('Dispose error');
      });
      
      nodes.set(0, mockNode as any);
      
      // Should not throw
      expect(() => nodes.disposeAll()).not.toThrow();
    });

    it('should clear the nodes array', () => {
      const mockNode = createMockNode();
      nodes.set(0, mockNode as any);
      nodes.disposeAll();
      
      expect(nodes.get(0)).toBeNull();
    });
  });
});

describe('scheduleOrExecuteEvent', () => {
  let nodes: SequencerNodes;
  let mockTone: ReturnType<typeof createMockTone>;

  beforeEach(() => {
    nodes = new SequencerNodes();
    mockTone = createMockTone();
  });

  describe('createNode event', () => {
    it('should create a Synth node', () => {
      const event: CreateNodeEvent = {
        eventType: 'createNode',
        nodeId: 0,
        nodeType: 'Synth',
        args: {},
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(mockTone.Synth).toHaveBeenCalledWith({});
      expect(nodes.get(0)).toBeDefined();
    });

    it('should create a PolySynth node with options', () => {
      const event: CreateNodeEvent = {
        eventType: 'createNode',
        nodeId: 0,
        nodeType: 'PolySynth',
        args: { options: { oscillator: { type: 'sine' } } },
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(mockTone.PolySynth).toHaveBeenCalledWith({
        options: { oscillator: { type: 'sine' } },
      });
    });
  });

  describe('connect event', () => {
    it('should connect node to destination', () => {
      const mockNode = createMockNode();
      nodes.set(0, mockNode as any);

      const event: ConnectEvent = {
        eventType: 'connect',
        nodeId: 0,
        connectTo: 'toDestination',
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(mockNode.toDestination).toHaveBeenCalled();
    });

    it('should connect node to another node', () => {
      const mockNode1 = createMockNode();
      const mockNode2 = createMockNode();
      nodes.set(0, mockNode1 as any);
      nodes.set(1, mockNode2 as any);

      const event: ConnectEvent = {
        eventType: 'connect',
        nodeId: 0,
        connectTo: 1,
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(mockNode1.connect).toHaveBeenCalledWith(mockNode2);
    });

    it('should warn when connecting missing node', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const event: ConnectEvent = {
        eventType: 'connect',
        nodeId: 99,
        connectTo: 'toDestination',
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Node 99 not found for connection'
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('triggerAttackRelease event', () => {
    it('should trigger note on valid node', () => {
      const mockNode = createMockNode();
      nodes.set(0, mockNode as any);

      const event: TriggerAttackReleaseEvent = {
        eventType: 'triggerAttackRelease',
        nodeId: 0,
        args: ['C4', '4n', '+0i'],
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(mockNode.triggerAttackRelease).toHaveBeenCalledWith('C4', '4n', '+0i');
    });

    it('should warn when node is missing', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const event: TriggerAttackReleaseEvent = {
        eventType: 'triggerAttackRelease',
        nodeId: 99,
        args: ['C4', '4n', '+0i'],
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Sequencer: triggerAttackRelease called for missing or invalid node',
        99
      );
      
      consoleSpy.mockRestore();
    });
  });

  describe('depth.rampTo event', () => {
    it('should call depth.rampTo on valid node', () => {
      const mockNode = createMockNode();
      nodes.set(0, mockNode as any);

      const event = {
        eventType: 'depth.rampTo' as const,
        nodeId: 0,
        args: ['0.5', '100i', '+0i'] as [string, string, string],
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(mockNode.depth.rampTo).toHaveBeenCalledWith('0.5', '100i', '+0i');
    });

    it('should warn when node is missing', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

      const event = {
        eventType: 'depth.rampTo' as const,
        nodeId: 99,
        args: ['0.5', '100i', '+0i'] as [string, string, string],
      };

      scheduleOrExecuteEvent(mockTone as any, nodes, event);

      expect(consoleSpy).toHaveBeenCalled();
      
      consoleSpy.mockRestore();
    });
  });
});

describe('playSequence', () => {
  let nodes: SequencerNodes;
  let mockTone: ReturnType<typeof createMockTone>;

  beforeEach(() => {
    nodes = new SequencerNodes();
    mockTone = createMockTone();
  });

  it('should execute two-pass sequence: nodes first, then events', async () => {
    const sequence: SequenceEvent[] = [
      {
        eventType: 'createNode',
        nodeId: 0,
        nodeType: 'Synth',
        args: {},
      },
      {
        eventType: 'connect',
        nodeId: 0,
        connectTo: 'toDestination',
      },
      {
        eventType: 'triggerAttackRelease',
        nodeId: 0,
        args: ['C4', '4n', '+0i'],
      },
    ];

    await playSequence(mockTone as any, nodes, sequence);

    // Verify node was created and connected
    expect(mockTone.Synth).toHaveBeenCalled();
    expect(mockTone.loaded).toHaveBeenCalled();
    
    const node = nodes.get(0);
    expect(node).toBeDefined();
    expect((node as any).toDestination).toHaveBeenCalled();
    expect((node as any).triggerAttackRelease).toHaveBeenCalledWith('C4', '4n', '+0i');
  });

  it('should dispose existing nodes before playing', async () => {
    const mockNode = createMockNode();
    nodes.set(0, mockNode as any);

    const sequence: SequenceEvent[] = [
      {
        eventType: 'createNode',
        nodeId: 1,
        nodeType: 'Synth',
        args: {},
      },
    ];

    await playSequence(mockTone as any, nodes, sequence);

    expect(mockNode.dispose).toHaveBeenCalled();
  });

  it('should wait for audio buffers to load', async () => {
    const sequence: SequenceEvent[] = [
      {
        eventType: 'createNode',
        nodeId: 0,
        nodeType: 'Sampler',
        args: { urls: { C4: 'test.mp3' } },
      },
    ];

    await playSequence(mockTone as any, nodes, sequence);

    expect(mockTone.loaded).toHaveBeenCalled();
  });

  it('should handle errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    mockTone.Synth.mockImplementation(() => {
      throw new Error('Test error');
    });

    const sequence: SequenceEvent[] = [
      {
        eventType: 'createNode',
        nodeId: 0,
        nodeType: 'Synth',
        args: {},
      },
    ];

    // Should not throw
    await expect(playSequence(mockTone as any, nodes, sequence)).resolves.not.toThrow();
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
