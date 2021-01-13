// take tag  <ul>
const track = document.querySelector('.carousel_track')

//take in <ul> his children that is <li>
const slides = Array.from(track.children)
console.log(slides)

// take selector in buttons
const nextButton = document.querySelector('.carousel_button_right')
const prevButton = document.querySelector('.carousel_button_left')

const dotsNav = document.querySelector('.carousel_nav')
const dots = Array.from(dotsNav.children)

// take size of slide which depends from window size
const slideWidth = slides[0].getBoundingClientRect().width
console.log(slideWidth)

// arrange the slides next to one another
// slides[0].style.left = 0
// slides[1].style.left = slideWidth + 'px'
// slides[2].style.left = slideWidth * 2 + 'px'

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + 'px'
}
slides.forEach(setSlidePosition)

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = 'translateX(-' + targetSlide.style.left + ')'
  currentSlide.classList.remove('current_slide')
  targetSlide.classList.add('current_slide')
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('current_slide')
  targetDot.classList.add('current_slide')
}

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add('isHidden')
    nextButton.classList.remove('isHidden')
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove('isHidden')
    nextButton.classList.add('isHidden')
  } else {
    prevButton.classList.remove('isHidden')
    nextButton.classList.remove('isHidden')
  }
}

// click left - move left
prevButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current_slide')
  const prevSlide = currentSlide.previousElementSibling

  const currentDot = dotsNav.querySelector('.current_slide')
  const prevDot = currentDot.previousElementSibling
  const prevIndex = slides.findIndex((slide) => slide === prevSlide)
  // move the slide

  moveToSlide(track, currentSlide, prevSlide)
  updateDots(currentDot, prevDot)
  hideShowArrows(slides, prevButton, nextButton, prevIndex)
})

// click right - move right
nextButton.addEventListener('click', (e) => {
  const currentSlide = track.querySelector('.current_slide')
  const nextSlide = currentSlide.nextElementSibling

  const currentDot = dotsNav.querySelector('.current_slide')
  const nextDot = currentDot.nextElementSibling
  const nextIndex = slides.findIndex((slide) => slide === nextSlide)
  // move the slide
  moveToSlide(track, currentSlide, nextSlide)
  updateDots(currentDot, nextDot)
  hideShowArrows(slides, prevButton, nextButton, nextIndex)
})

//click on the indicators move to that slide
dotsNav.addEventListener('click', (e) => {
  //what indicator was clicked on?
  const targetDot = e.target.closest('button')

  if (!targetDot) return
  const currentSlide = track.querySelector('.current_slide')
  const currentDot = dotsNav.querySelector('.current_slide')
  const targetIndex = dots.findIndex((dot) => dot === targetDot)

  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)
  updateDots(currentDot, targetDot)
  hideShowArrows(slides, prevButton, nextButton, targetIndex)
})
