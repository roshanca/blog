'use strict'

const scrollView = document.querySelector('.scroll-view')
const toc = document.querySelector('.section-nav')
const tocPath = document.querySelector('.toc-marker path')
let tocItems

// Factor of screen size that the element must cross
// before it's considered visible
const TOP_MARGIN = 0.1
const BOTTOM_MARGIN = 0.2

let pathLength

window.addEventListener('resize', drawPath, false)
scrollView.addEventListener('scroll', sync, false)

drawPath()

function drawPath() {
  tocItems = [].slice.call(toc.querySelectorAll('li'))

  // Cache element references and measurements
  tocItems = tocItems.map(function (item) {
    const anchor = item.querySelector('a')
    let targetAnchors = document.getElementsByClassName('anchor')
    targetAnchors = [].slice.call(targetAnchors)
    const target = targetAnchors.filter((targetElement) => {
      return (
        targetElement.hash.slice(1) === encodeURIComponent(anchor.getAttribute('href').slice(1))
      )
    })[0]

    return {
      listItem: item,
      anchor,
      target
    }
  })

  // Remove missing targets
  tocItems = tocItems.filter(function (item) {
    return !!item.target
  })

  let path = []
  let pathIndent

  tocItems.forEach(function (item, i) {
    let x = item.anchor.offsetLeft - 5,
      y = item.anchor.offsetTop,
      height = item.anchor.offsetHeight

    if (i === 0) {
      path.push('M', x, y, 'L', x, y + height)
      item.pathStart = 0
    } else {
      // Draw an additional line when there's a change in
      // indent levels
      if (pathIndent !== x) path.push('L', pathIndent, y)

      path.push('L', x, y)

      // Set the current path so that we can measure it
      tocPath.setAttribute('d', path.join(' '))
      item.pathStart = tocPath.getTotalLength() || 0

      path.push('L', x, y + height)
    }

    pathIndent = x

    tocPath.setAttribute('d', path.join(' '))
    item.pathEnd = tocPath.getTotalLength()
  })

  pathLength = tocPath.getTotalLength()

  sync()
}

function sync() {
  const windowHeight = window.screen.availHeight

  let pathStart = pathLength
  let pathEnd = 0

  let visibleItems = 0

  tocItems.forEach(function (item) {
    const { y } = item.target.getBoundingClientRect()

    if (y > 1 && y < windowHeight - 20) {
      pathStart = Math.min(item.pathStart, pathStart)
      pathEnd = Math.max(item.pathEnd, pathEnd)

      visibleItems += 1

      item.listItem.classList.add('visible')
    } else {
      item.listItem.classList.remove('visible')
    }
  })

  // Specify the visible path or hide the path altogether
  // if there are no visible items
  if (visibleItems > 0 && pathStart < pathEnd) {
    tocPath.setAttribute('stroke-dashoffset', '1')
    tocPath.setAttribute(
      'stroke-dasharray',
      '1, ' + pathStart + ', ' + (pathEnd - pathStart) + ', ' + pathLength
    )
    tocPath.setAttribute('opacity', 1)
  }
}

/**
 * scroll to anchor smoothly
 */
toc.querySelectorAll('a').forEach(anchor => {
  anchor.addEventListener('click', (evt) => {
    evt.preventDefault()

    const { target } = tocItems.find(item => item.anchor === anchor)
    const { y } = target.getBoundingClientRect()
    const [_, hashString] = target.href.split('#')

    scrollBy(y - 2, 300, () => (window.location.hash = hashString))
  }, false)
})

function scrollBy(distance, duration, callback) {
  const initialY = scrollView.scrollTop
  const y = initialY + distance
  const baseY = (initialY + y) * 0.5
  const diff = initialY - baseY
  const startTime = performance.now()
  const headerHeight = document.getElementById('header').clientHeight

  function step() {
    let normalizedTime = (performance.now() - startTime) / duration
    if (normalizedTime > 1) {
      normalizedTime = 1
      callback && callback()
    }
    scrollView.scrollTo(0, baseY + diff * Math.cos(normalizedTime * Math.PI) - headerHeight)
    if (normalizedTime < 1) {
      window.requestAnimationFrame(step)
    }
  }

  window.requestAnimationFrame(step)
}

/**
 * anchor config
 */
const anchors = new AnchorJS()
anchors.options = {
  placement: 'left',
  icon: ''
}
anchors.add()
