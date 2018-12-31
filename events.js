// Can't seem to get this to load due to the elements being dynamicly loaded. This is an interesting problem I've not come across and I'm open to suggestions on how to solve it.

const navButton = document.querySelectorAll('nav li')
console.log(navButton)
navButton.addEventListener("click", togglePosts);

function togglePosts () {
  console.log('test')
}