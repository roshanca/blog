'use strict'

let isFolded = false
const scrollElement = document.querySelector('.scroll-view')

scrollElement.addEventListener(
  'scroll',
  (evt) => {
    const target = evt.target || evt.srcElement
    const { scrollTop } = target
    const header = document.querySelector('#header')
    const postTitle = header.querySelector('.post-title')
    const author = header.querySelector('.author')
    const icons = header.querySelector('.header-icon')

    if (scrollTop === 0) {
      header.classList.remove('fold')
      postTitle && postTitle.classList.remove('show')
      author && author.classList.remove('transparent')
      icons && icons.classList.remove('remove')
      isFolded = false
      return
    }

    if (scrollTop > 50 && !isFolded) {
      header.classList.add('fold')
      postTitle && postTitle.classList.add('show')
      author && author.classList.add('transparent')
      icons && icons.classList.add('remove')
      isFolded = true
    }
  },
  false
)
