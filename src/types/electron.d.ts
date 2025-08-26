declare global {
  interface Window {
    electronAPI?: {
      onToggleSearch: (callback: () => void) => void;
      removeToggleSearchListener: (callback: () => void) => void;
    };
  }
}

export {};