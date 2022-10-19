import "../../../../../public/shared/scripts/scroll-timeline.js";

const TRIGGERS = document.querySelectorAll('section')
const BACKDROPS = document.querySelectorAll('.backdrops li')
const SCROLLER = document.querySelector('.scroller')

// For each TRIGGER set up a ViewTimeline
// Then create WAAPI for each backdrop

const TIMELINES = []

TRIGGERS.forEach(subject => {
  TIMELINES.push(new ViewTimeline({
    subject,
    axis: 'block'
  }))
})

BACKDROPS.forEach((backdrop, index) => {
  const IMG = backdrop.querySelector('img')

  // Entry
  IMG.animate([{
    transform: 'translateY(0%)'
  }
  ], {
    timeline: TIMELINES[index - 1],
    fill: 'both',
    delay: {
      phase: 'exit', 
      percent: CSS.percent(5),
    },
    endDelay: {
      phase: 'exit', 
      percent: CSS.percent(75),
    }
  })
  // Exit
  IMG.animate([{
    transform: 'translateY(-50%)'
  }
  ], {
    timeline: TIMELINES[index],
    fill: 'both',
    delay: {
      phase: 'exit', 
      percent: CSS.percent(5),
    },
    endDelay: {
      phase: 'exit', 
      percent: CSS.percent(100),
    }
  })
})