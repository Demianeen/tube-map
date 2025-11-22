declare global {
  interface Window {
    serwist?: {
      register: () => Promise<void>;
    };
  }
}

export {};
