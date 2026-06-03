const navbar = document.getElementById('navbar')
const backToTop = document.getElementById('backToTop')

window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
  if (window.scrollY > 500) {
    backToTop.classList.add('visible')
  } else {
    backToTop.classList.remove('visible')
  }
})

// MOBILE MENU
const hamburger = document.getElementById('hamburger')
const mobileMenu = document.getElementById('mobileMenu')

hamburger.addEventListener('click', () => {
  const isActive = hamburger.classList.toggle('active')
  mobileMenu.classList.toggle('active')
  hamburger.setAttribute('aria-expanded', isActive)
  document.body.style.overflow = mobileMenu.classList.contains('active')
    ? 'hidden'
    : ''
})

hamburger.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault()
    hamburger.click()
  }
})

function closeMenu() {
  hamburger.classList.remove('active')
  mobileMenu.classList.remove('active')
  hamburger.setAttribute('aria-expanded', 'false')
  document.body.style.overflow = ''
}

// SCROLL REVEAL
const revealElements = document.querySelectorAll('.reveal')
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
)

revealElements.forEach(el => revealObserver.observe(el))

// COUNTERS
function animateCounter(elementId, target, suffix = '', duration = 2000) {
  const element = document.getElementById(elementId)
  if (!element) return
  const startTime = performance.now()

  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)
    const easeOut = 1 - Math.pow(1 - progress, 3)
    const current = target * easeOut

    if (elementId === 'counter3') {
      element.textContent = current.toFixed(1) + suffix
    } else {
      element.textContent = Math.floor(current).toLocaleString('pt-BR') + suffix
    }

    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    }
  }
  requestAnimationFrame(updateCounter)
}

const heroObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter('counter1', 6, '+', 2000)
        animateCounter('counter2', 400, '+', 2500)
        animateCounter('counter3', 5.0, '', 2000)
        heroObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.3 }
)

heroObserver.observe(document.getElementById('hero'))

// SCROLL TO TOP
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href')
    if (targetId === '#') return
    const target = document.querySelector(targetId)
    if (target) {
      e.preventDefault()
      const offset = 80
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset
      window.scrollTo({ top: targetPosition, behavior: 'smooth' })
    }
  })
})
