import "@testing-library/jest-dom/vitest";

class ResizeObserverMock {
  observe() {}
  disconnect() {}
  unobserve() {}
}

window.ResizeObserver = ResizeObserverMock as typeof ResizeObserver;
window.matchMedia = (query: string) =>
  ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    dispatchEvent: () => false,
  }) as MediaQueryList;
window.HTMLElement.prototype.scrollTo = function scrollTo() {};
window.HTMLCanvasElement.prototype.getContext = () => null;
