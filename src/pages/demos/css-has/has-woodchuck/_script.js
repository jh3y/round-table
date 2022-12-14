// Peter Piper picked a peck of pickled peppers,
// A peck of pickled peppers Peter Piper picked;
// If Peter Piper picked a peck of pickled peppers,
// Whereβs the peck of pickled peppers Peter Piper picked?

if (typeof window !== 'undefined') {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  const RECOG = new window.SpeechRecognition()
  RECOG.continuous = true
  RECOG.interimResults = true


  const STATE = {
    RUNNING: false,
  }

  const START = () => {
    if (!STATE.RUNNING) {
      STATE.RUNNING = true
      document.body.style.setProperty('--recording', 1)
      RECOG.start()
    }
  }

  RECOG.onend = () => {
    console.info('Restarting due to error, etc.')
    // Shouldn't end, restart.
    // Only restart if state is still running.
    if (STATE.RUNNING) RECOG.start()
  }
  // Peter Piper picked a peck of pickled peppers,
  // A peck of pickled peppers Peter Piper picked;
  // If Peter Piper picked a peck of pickled peppers,
  // Whereβs the peck of pickled peppers Peter Piper picked?
  const PARTICLES = [
    {
      trigger: 'cat',
      emoji: 'πΉ'
    },
    {
      trigger: 'peter',
      emoji: 'π·ββοΈ'
    },
    {
      trigger: 'picked',
      emoji: 'β'
    },
    {
      trigger: 'peck',
      emoji: 'π'
    },
    {
      trigger: 'pickled',
      emoji: 'π₯'
    },
    {
      trigger: 'peppers',
      emoji: 'πΆ'
    },
    {
      trigger: 'lit',
      emoji: 'π₯'
    },
    {
      trigger: 'boom',
      emoji: 'π£'
    },
    {
      trigger: 'wood',
      emoji: 'π΄',
    },
    {
      trigger: 'chuck',
      emoji: 'πͺ'
    },
    {
      trigger: 'babies',
      emoji: 'πΆ'
    },
    {
      trigger: 'king',
      emoji: 'π«'
    },
    {
      trigger: 'scientist',
      emoji: 'π'
    }
    
  ]

  const EMOJIS = document.querySelector('.emojis')
  const PROCESS_AUDIO = e => {
    const TRANSCRIPT = e.results[e.results.length - 1][0].transcript
      .toLowerCase()
      .trim()
    if (e.results[e.results.length - 1].isFinal === true) {
      for (const WORD of TRANSCRIPT.split(' ')) {
        const PARTICLE = PARTICLES.filter(p => {
          return WORD.indexOf(p.trigger) !== -1
        })[0]
        if (PARTICLE) {
          if (PARTICLE.trigger === 'peter' && document.querySelector('.peter') !== null) return 
          const P = document.createElement('div')
          if (PARTICLE.trigger !== 'king' && PARTICLE.trigger !== 'babies') P.innerText = PARTICLE.emoji
          if (PARTICLE.trigger === 'scientist') P.innerText = 'π¨π»ββοΈ'
          P.className = PARTICLE.trigger
          P.dataset.emoji = PARTICLE.emoji
          EMOJIS.appendChild(P)
          if (
            PARTICLE.trigger === 'wood' ||
            PARTICLE.trigger === 'pickled' ||
            PARTICLE.trigger === 'peppers' ||
            PARTICLE.trigger === 'peck' ||
            PARTICLE.trigger === 'chuck'
          ) {
            P.addEventListener('animationend', () => {
              console.info(PARTICLE.trigger)
              P.remove()
            })
          }
          if (PARTICLE.trigger === 'king') {
            P.addEventListener('animationend', () => {
              P.dataset.emoji = 'π€΄'
            })
          }
          if (PARTICLE.trigger === 'boom') {
            setTimeout(() => EMOJIS.innerHTML = '', 2000)
          }
          P.style.setProperty('--index', EMOJIS.children.length)
        }
      }
      // for (const PARTICLE of PARTICLES) {
      //   if (TRANSCRIPT.indexOf(PARTICLE.trigger) !== -1) {
      //     const P = document.createElement('div')
      //     P.innerText = PARTICLE.emoji
      //     P.className = PARTICLE.trigger
      //     EMOJIS.appendChild(P)
      //     if (PARTICLE.trigger === 'wood' || PARTICLE.trigger === 'chuck') {
      //       P.addEventListener('animationend', () => {
      //         P.remove()
      //       })
      //     }
      //     if (PARTICLE.trigger === 'boom') {
      //       setTimeout(() => EMOJIS.innerHTML = '', 2000)
      //     }
      //     P.style.setProperty('--index', EMOJIS.children.length)
      //   }
      // }
    }
    document.querySelector('main').innerText = TRANSCRIPT
  }

  RECOG.onresult = PROCESS_AUDIO


  START()
}