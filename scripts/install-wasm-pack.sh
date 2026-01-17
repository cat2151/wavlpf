#!/bin/bash

# wasm-pack installation script for wavlpf project
# This script installs wasm-pack, which is required for building the WASM modules

set -e

echo "🦀 Installing wasm-pack..."

# Check if cargo is installed
if ! command -v cargo &> /dev/null; then
    echo "❌ Error: Rust and cargo must be installed first."
    echo "Install Rust from: https://rustup.rs/"
    exit 1
fi

# Check if wasm-pack is already installed
if command -v wasm-pack &> /dev/null; then
    CURRENT_VERSION=$(wasm-pack --version | awk '{print $2}')
    echo "✅ wasm-pack is already installed (version $CURRENT_VERSION)"
    exit 0
fi

echo "📦 Installing wasm-pack via cargo..."

# Install wasm-pack using cargo
# This method works even when network access to rustwasm.github.io is restricted
cargo install wasm-pack

# Verify installation
if command -v wasm-pack &> /dev/null; then
    VERSION=$(wasm-pack --version | awk '{print $2}')
    echo "✅ wasm-pack successfully installed (version $VERSION)"
    echo ""
    echo "You can now build the WASM modules with:"
    echo "  npm run build:wasm"
else
    echo "❌ Error: wasm-pack installation failed"
    exit 1
fi
