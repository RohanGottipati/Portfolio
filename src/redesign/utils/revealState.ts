// Tracks whether the first page has finished its intro reveal, so persistent
// chrome (banner, name, links) doesn't re-animate on every route change.
let initialRevealDone = false;

export function isInitialRevealDone(): boolean {
  return initialRevealDone;
}

export function markInitialRevealDone(): void {
  initialRevealDone = true;
}