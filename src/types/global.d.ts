declare global {
  interface Window {
    process?: {
      versions?: {
        electron?: string;
      };
    };
  }
}

export {};