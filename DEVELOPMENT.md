# Development Framework and Testing Strategy

## Overview

This document describes the development framework and testing strategy for the wavlpf project, designed to prioritize rapid prototyping and early UX delivery.

## Development Framework: Vite

### Why Vite?

We've adopted **Vite** as our primary development framework for the following reasons:

1. **⚡ Instant Server Start**: Vite starts the dev server instantly, regardless of project size, by leveraging native ES modules
2. **🔥 Lightning Fast HMR**: Hot Module Replacement (HMR) is extremely fast, providing immediate feedback on code changes
3. **📦 Optimized Builds**: Production builds are optimized using Rollup with excellent tree-shaking
4. **🎯 Zero Config**: Works out-of-the-box with TypeScript, eliminating configuration overhead
5. **🚀 Rapid Prototyping**: The combination of instant start and fast HMR enables rapid iteration on ideas

### Development Workflow

#### Starting Development

```bash
npm run dev
```

This starts the Vite development server with:
- Hot Module Replacement (HMR) for instant updates
- Fast refresh on file changes
- Automatic browser opening
- TypeScript compilation on-the-fly

### Building for Production

```bash
npm run build
```

This:
1. Builds the Rust WASM module with `wasm-pack`
2. Compiles TypeScript with `tsc` for type checking
3. Bundles the application with Vite for optimized production output
4. Generates source maps for debugging

#### Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing before deployment.

## Testing Strategy: Vitest

### Why Vitest?

We've adopted **Vitest** as our testing framework for the following reasons:

1. **🔗 Native Vite Integration**: Vitest shares the same configuration as Vite, reducing complexity
2. **⚡ Blazing Fast**: Tests run in parallel with smart watch mode
3. **🎯 Jest-Compatible API**: Easy to learn if you know Jest, but faster and more modern
4. **📊 Built-in Coverage**: Code coverage reporting with v8 (no additional setup needed)
5. **🖥️ UI Mode**: Visual test runner for better developer experience

### Testing Philosophy

Our testing strategy prioritizes:

1. **Unit Test Core Logic**: Focus on testing pure functions and business logic
   - Signal processing (oscillator, filter)
   - Data transformation (WAV generation)
   - Mathematical correctness

2. **Fast Feedback Loop**: Tests run quickly to maintain development velocity
   - Average test suite execution: < 1 second
   - Watch mode for continuous testing during development

3. **High Coverage of Critical Paths**: Ensure core audio processing is well-tested
   - Filter stability and correctness
   - WAV file format compliance
   - Waveform generation accuracy

### Running Tests

#### Run Tests Once

```bash
npm test -- --run
# or
npm run test:run
```

#### Watch Mode (Development)

```bash
npm test
```

Tests automatically re-run when files change.

#### UI Mode (Visual Test Runner)

```bash
npm run test:ui
```

Opens a browser-based test runner with:
- Visual test results
- Interactive test filtering
- Source code viewing
- Test execution timeline

#### Code Coverage

```bash
npm run coverage
```

Generates coverage reports in:
- Terminal (text format)
- `coverage/` directory (HTML format)

## Test Organization

Tests are colocated with source files:

```
src/
├── wav.ts              # WAV generation implementation
├── wav.test.ts         # WAV generation tests
├── settings.ts         # Settings implementation
├── settings.test.ts    # Settings tests
├── performance-stats.ts    # Performance stats implementation
└── performance-stats.test.ts  # Performance stats tests
```

Note: DSP implementations (oscillator, filter) have been consolidated into the Rust WASM module (`wasm-audio/src/lib.rs`) and are tested through Rust's native test framework. To run Rust tests:

```bash
cd wasm-audio
cargo test
```

The Rust test suite includes 7 tests covering:
- Biquad LPF filter creation and coefficient calculation
- Sawtooth and pulse wave generation with proper sample ranges
- Filter stability with high-frequency attenuation
- Audio rendering with Hz and Cent decay modes
- Duty ratio clamping for pulse waves

### Test Coverage

Current test coverage includes:

1. **wav.test.ts**: Tests WAV file generation
   - File format structure validation
   - Audio parameter encoding
   - Float to PCM conversion
   - Error handling for edge cases

2. **settings.test.ts**: Tests settings management
   - Settings validation
   - localStorage persistence
   - Import/export functionality
   - Default settings handling

3. **performance-stats.test.ts**: Tests performance monitoring
   - Statistics calculation
   - Sample tracking
   - Reset functionality

4. **Rust Tests** (in `wasm-audio/src/lib.rs`): Tests signal processing
   - Biquad LPF filter creation and stability
   - High-frequency attenuation
   - Sawtooth wave generation
   - Pulse wave generation with duty ratio clamping
   - Audio rendering with Hz and Cent decay

## Benefits for Rapid Prototyping

### 1. Immediate Visual Feedback
- Changes appear instantly in the browser
- No manual refresh needed
- Preserves application state during HMR

### 2. Confidence in Core Logic
- Tests run automatically in watch mode
- Catch regressions immediately
- Refactor with confidence

### 3. Low Configuration Overhead
- Single `vite.config.ts` file
- Minimal setup required
- Focus on features, not tooling

### 4. Professional Development Experience
- Modern tooling that's enjoyable to use
- Fast iteration cycles maintain flow state
- Visual test runner for debugging

## Integration with CI/CD

The framework integrates seamlessly with GitHub Actions:

```yaml
- name: Build TypeScript
  run: npm run build
```

The build process:
1. Type-checks TypeScript code
2. Bundles with Vite for production
3. Outputs to `dist/` directory
4. Deploys to GitHub Pages

## Future Enhancements

As the project grows, consider adding:

1. **E2E Testing**: Playwright or Cypress for user interaction testing
2. **Visual Regression Testing**: Percy or Chromatic for UI changes
3. **Performance Monitoring**: Lighthouse CI for performance budgets
4. **Linting**: ESLint for code quality (optional, to avoid slowing down prototyping)

## Best Practices

### During Prototyping Phase

1. **Prioritize Speed**: Don't over-test during early exploration
2. **Test Core Logic**: Focus on signal processing and data transformation
3. **Use HMR Effectively**: Keep dev server running for rapid iteration
4. **Visual Verification**: Use the browser to verify UX changes

### Before Production

1. **Run Full Test Suite**: `npm run test:run`
2. **Check Coverage**: `npm run coverage`
3. **Build Locally**: `npm run build && npm run preview`
4. **Verify Deployment**: Check GitHub Pages after merge

## Conclusion

This development framework and testing strategy balances:
- **Speed**: Fast development cycle with Vite and quick tests
- **Quality**: Confidence from automated testing of core logic
- **Simplicity**: Minimal configuration and easy-to-use tools
- **Scalability**: Foundation that can grow with the project

The setup enables rapid prototyping while maintaining code quality, making it ideal for exploring ideas and delivering early UX without sacrificing maintainability.
