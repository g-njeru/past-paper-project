import '@testing-library/jest-dom'

if (typeof ResizeObserver === 'undefined') {
  global.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
}

if (typeof window.scrollIntoView === 'undefined') {
  Element.prototype.scrollIntoView = () => {}
}
