import { gsap } from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';


if (gsap.registerPlugin) {
  gsap.registerPlugin(Draggable)
  gsap.registerPlugin(InertiaPlugin)
}

const CONTAINER = document.querySelector('.container')
const TOOLBAR = document.querySelector('.container__toolbar')
const SCREEN = document.querySelector('.container__screen')
let screenCast
let capture
const sketch = function (s) {
  s.setup = () => {
    capture = s.createCapture(s.VIDEO).parent(SCREEN)
    SCREEN.querySelector('canvas').remove()
  }
}
const createCapture = () => {
  screenCast = new p5(sketch, SCREEN);
}

const draggable = new Draggable(CONTAINER, {
  trigger: TOOLBAR,
  bounds: window,
  inertia:true,
  onPress() {
    gsap.killTweensOf(CONTAINER);
    this.update();
  },
});

const FAB = document.querySelector('[popovertoggletarget=menu]')
FAB.showPopover()
const MENU_POP = document.querySelector('#menu')
CONTAINER.addEventListener('beforetoggle', e => {
  if (e.newState === "open") {
    MENU_POP.hidePopover()
    createCapture()
  } else {
    capture.remove()
    screenCast.clear()
    screenCast.remove()
  }
})