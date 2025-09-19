export {};

declare global {
  interface WindowEventMap {
    // our custom DOM event carries a string route in detail
    navigate: CustomEvent<string>;
  }
}
