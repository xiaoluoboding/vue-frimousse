export function getFastBoundingRects(
  elements: Array<Element>,
): Promise<Map<Element, DOMRect>> {
  return new Promise((resolve) => {
    const rects = new Map<Element, DOMRect>();

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        rects.set(entry.target, entry.boundingClientRect);
      }

      observer.disconnect();
      resolve(rects);
    });

    for (const element of elements) {
      observer.observe(element);
    }
  });
}
