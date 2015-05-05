export const hasTouch = 'ontouchstart'   in window;
export const hasPtr   = 'pointerEnabled' in navigator || msPointerEnabled in 'navigator';

export const ptrdown = hasPtr? 'pointerdown': hasTouch? 'touchstart': 'mousedown';
export const ptrmove = hasPtr? 'pointermove': hasTouch? 'touchmove' : 'mousemove';
export const ptrup   = hasPtr? 'pointerup'  : hasTouch? 'touchend'  : 'mouseup';

