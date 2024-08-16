// JavaScript Document
const content = document.querySelectorAll(".content_center p")
let currentIndex = 0;
let prevIndex = 0;
let nextIndex = 0;

function showSlide(c, i) {
  content[c].classList.add('active');
  content[i].classList.remove('active');
}


function arrowLeft() {
  if (currentIndex >= 0) {
    currentIndex = (currentIndex - 1 + content.length) % content.length
    nextIndex = (currentIndex + 1) % content.length
    showSlide(currentIndex, nextIndex)
  } else {
    currentIndex = content.length - 1;
    nextIndex = 0;
  }

}

function arrowRight() {
  if (currentIndex < content.length - 1) {
    currentIndex = (currentIndex + 1) % content.length
    prevIndex = currentIndex - 1
    showSlide(currentIndex, prevIndex)
  } else {
    currentIndex = 0;
    prevIndex = content.length - 1;
    showSlide(currentIndex, prevIndex)
  }
}
