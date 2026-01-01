# Architecture Diagrams

## Current Architecture

### cat-oscilloscope (Current)
```
┌─────────────────────────────────────────────────────────┐
│                    cat-oscilloscope                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐                                       │
│  │ main.ts      │                                       │
│  │ (UI Logic)   │                                       │
│  └──────┬───────┘                                       │
│         │                                                │
│         v                                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Oscilloscope (Coordinator)               │   │
│  └─────────────────────────────────────────────────┘   │
│         │                                                │
│         ├─────────┬──────────┬──────────┬─────────┐    │
│         v         v          v          v         v     │
│  ┌──────────┐ ┌────────┐ ┌──────┐ ┌──────┐ ┌──────┐  │
│  │  Audio   │ │ Gain   │ │ Freq │ │ Wave │ │ Zero │  │
│  │ Manager  │ │ Control│ │ Est. │ │ Rend.│ │ Cross│  │
│  │(Web Audio│ │        │ │      │ │      │ │ Det. │  │
│  │   API)   │ │        │ │      │ │      │ │      │  │
│  └──────────┘ └────────┘ └──────┘ └──────┘ └──────┘  │
│       │                                                  │
│       v                                                  │
│  ┌──────────┐                                           │
│  │Microphone│                                           │
│  └──────────┘                                           │
└─────────────────────────────────────────────────────────┘
```

### wavlpf (Current)
```
┌─────────────────────────────────────────────────────────┐
│                        wavlpf                            │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐                                       │
│  │ index.ts     │                                       │
│  └──────┬───────┘                                       │
│         │                                                │
│         v                                                │
│  ┌─────────────────────────────────────────────────┐   │
│  │              synth.ts                            │   │
│  │         (Main Synthesizer Logic)                 │   │
│  └─────────────────────────────────────────────────┘   │
│         │                                                │
│         ├──────────┬──────────┬──────────┐             │
│         v          v          v          v              │
│  ┌──────────┐ ┌────────┐ ┌────────┐ ┌────────┐        │
│  │oscillator│ │ filter │ │  wav   │ │ Tone.js│        │
│  │(Sawtooth)│ │(Biquad)│ │(Gen.)  │ │(Player)│        │
│  └──────────┘ └────────┘ └────────┘ └────────┘        │
│                                                          │
│  NO WAVEFORM VISUALIZATION                              │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Proposed Architecture

### Modular cat-oscilloscope
```
┌─────────────────────────────────────────────────────────┐
│            @cat2151/oscilloscope-core                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────────────────────────────────────┐   │
│  │         Oscilloscope (Coordinator)               │   │
│  │  constructor(canvas, audioSource: AudioSource)   │   │
│  └─────────────────────────────────────────────────┘   │
│         │                                                │
│         ├─────────────────┬─────────────────┐          │
│         v                 v                 v           │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────┐  │
│  │ AudioSource  │  │    Core      │  │   Renderer   │  │
│  │ (Interface)  │  │  Processing  │  │              │  │
│  └──────────────┘  └─────────────┘  └──────────────┘  │
│         ^                 ^                             │
│         │                 │                             │
│  ┌──────┴───────┐  ┌──────┴──────┬──────────┬───────┐ │
│  │              │  │             │          │        │ │
│  v              v  v             v          v        v │
│ ┌────────┐ ┌─────────┐ ┌────────┐ ┌─────┐ ┌──────┐  │
│ │ Audio  │ │ Buffer  │ │  Gain  │ │Freq │ │ Zero │  │
│ │Manager │ │ Adapter │ │Control │ │ Est.│ │Cross │  │
│ │(Mic)   │ │(Buffer) │ │        │ │     │ │ Det. │  │
│ └────────┘ └─────────┘ └────────┘ └─────┘ └──────┘  │
│     │           │                                       │
│     │           │                                       │
└─────┼───────────┼───────────────────────────────────────┘
      │           │
      v           v
┌──────────┐ ┌─────────────┐
│Microphone│ │Float32Array │
└──────────┘ └─────────────┘
```

### Integrated wavlpf with Oscilloscope
```
┌─────────────────────────────────────────────────────────────┐
│                      wavlpf (Enhanced)                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐                                           │
│  │ index.ts     │                                           │
│  └──────┬───────┘                                           │
│         │                                                    │
│         v                                                    │
│  ┌───────────────────────────────────────────────────────┐ │
│  │              synth.ts (Enhanced)                       │ │
│  │         (Synthesizer + Visualization)                  │ │
│  └───────────────────────────────────────────────────────┘ │
│         │                                                    │
│         ├──────────┬──────────┬──────────┬────────────┐    │
│         v          v          v          v            v     │
│  ┌──────────┐ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐│
│  │oscillator│ │ filter │ │  wav   │ │ Tone.js│ │ Oscope ││
│  │(Sawtooth)│ │(Biquad)│ │(Gen.)  │ │(Player)│ │        ││
│  └─────┬────┘ └────┬───┘ └────────┘ └────────┘ └────┬───┘│
│        │           │                                  │     │
│        │ samples   │ filtered                         │     │
│        └───────────┴──────────────────────────────────┘     │
│                    │                                         │
│                    v                                         │
│  ┌───────────────────────────────────────────────────────┐ │
│  │        @cat2151/oscilloscope-core                     │ │
│  │                                                        │ │
│  │  ┌──────────────┐         ┌────────────────┐         │ │
│  │  │ BufferAdapter│◄────────┤  Oscilloscope  │         │ │
│  │  │  (samples)   │         │   (render())   │         │ │
│  │  └──────────────┘         └────────┬───────┘         │ │
│  │                                     │                  │ │
│  │                                     v                  │ │
│  │                          ┌────────────────┐           │ │
│  │                          │ Canvas Element │           │ │
│  │                          │  (800x400px)   │           │ │
│  │                          └────────────────┘           │ │
│  └───────────────────────────────────────────────────────┘ │
│                                                              │
│  WITH REAL-TIME WAVEFORM VISUALIZATION ✓                    │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Data Flow

### Before Filtering
```
generateSawtooth()
       │
       v
   samples (Float32Array)
       │
       ├────────────────────┐
       │                    │
       v                    v
  applyFilter()       bufferAdapter.setBuffer()
       │                    │
       v                    v
   filtered            oscilloscope.render()
       │                    │
       v                    v
  playAudio()          Canvas Display
                     (Pre-filter waveform)
```

### After Filtering
```
applyFilter(samples)
       │
       v
   filtered (Float32Array)
       │
       ├────────────────────┐
       │                    │
       v                    v
  generateWav()       bufferAdapter.setBuffer()
       │                    │
       v                    v
  playAudio()         oscilloscope.render()
       │                    │
       v                    v
  Audio Output        Canvas Display
                   (Post-filter waveform)
```

## Interface Definition

```typescript
┌────────────────────────────────────────────────┐
│          AudioSource Interface                  │
├────────────────────────────────────────────────┤
│ + getTimeDomainData(): Float32Array | null     │
│ + getFrequencyData(): Uint8Array | null        │
│ + getSampleRate(): number                      │
│ + getFFTSize(): number                         │
│ + isReady(): boolean                           │
└────────────────────────────────────────────────┘
            ▲                       ▲
            │                       │
            │                       │
┌───────────┴─────────┐   ┌─────────┴────────────┐
│   AudioManager      │   │   BufferAdapter      │
│   (Microphone)      │   │   (Float32Array)     │
├─────────────────────┤   ├──────────────────────┤
│ Web Audio API       │   │ Direct buffer input  │
│ Real-time capture   │   │ No Web Audio needed  │
│ FFT from API        │   │ Manual FFT (opt.)    │
└─────────────────────┘   └──────────────────────┘
    (Existing)                  (NEW)
```

## Module Dependencies

### Current cat-oscilloscope
```
Oscilloscope
    ├── AudioManager (Web Audio API) ──> REQUIRED
    ├── GainController
    ├── FrequencyEstimator
    ├── WaveformRenderer
    └── ZeroCrossDetector
```

### Proposed cat-oscilloscope-core
```
Oscilloscope
    ├── AudioSource (Interface) ──> ABSTRACT
    │   ├── AudioManager ──> OPTIONAL (for microphone)
    │   └── BufferAdapter ──> OPTIONAL (for buffers)
    ├── GainController (Independent)
    ├── FrequencyEstimator (Independent)
    ├── WaveformRenderer (Independent)
    └── ZeroCrossDetector (Independent)
```

## Component Relationships

```
                    ┌────────────────┐
                    │  Application   │
                    │  (wavlpf)      │
                    └────────┬───────┘
                             │
                             │ uses
                             v
        ┌────────────────────────────────────────┐
        │    @cat2151/oscilloscope-core          │
        │                                         │
        │  ┌──────────────────────────────────┐  │
        │  │    Oscilloscope (Facade)         │  │
        │  └──────────┬───────────────────────┘  │
        │             │ composes                  │
        │             v                           │
        │  ┌──────────────────────────────────┐  │
        │  │ Core Components (Independent)    │  │
        │  │ - WaveformRenderer               │  │
        │  │ - ZeroCrossDetector              │  │
        │  │ - FrequencyEstimator             │  │
        │  │ - GainController                 │  │
        │  └──────────────────────────────────┘  │
        │             ^                           │
        │             │ implements                │
        │  ┌──────────┴───────────────┐          │
        │  │   AudioSource Interface   │          │
        │  └──────────────────────────┘          │
        │      ^                  ^               │
        │      │                  │               │
        │  ┌───┴────┐     ┌──────┴──────┐        │
        │  │ Audio  │     │   Buffer    │        │
        │  │Manager │     │   Adapter   │        │
        │  └────────┘     └─────────────┘        │
        └────────────────────────────────────────┘
```

---

These diagrams illustrate the transformation from tightly-coupled architecture to a flexible, adapter-based design that enables seamless integration with wavlpf.
