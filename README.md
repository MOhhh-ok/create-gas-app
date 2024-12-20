# Create GAS App

A CLI tool to set up a Google Apps Script development environment with TypeScript and clasp.

This tool will:
1. Initialize a TypeScript project
2. Install necessary dependencies (@google/clasp, @types/google-apps-script)
3. Set up clasp configuration
4. Create basic project structure (src/dist directories)
5. Configure build scripts for TypeScript compilation and deployment

Features:
- TypeScript support for better development experience
- Automatic clasp setup and login
- Support for npm, yarn, and pnpm
- Watch mode for development
- Easy deployment with clasp


## Install

```
npm i @masa-dev/create-gas-app
```

## Usage

```
npm create-gas-app
```