import { main } from './main';

// Attach to global for GAS execution
(global as any).main = main;
