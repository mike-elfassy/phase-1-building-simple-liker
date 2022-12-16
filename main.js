// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
let errorModal = document.querySelector('#modal')


// Add click event listeners
document.querySelectorAll('article').forEach( post => {
  let postId = post.id
  let heartGlyph = post.querySelector('.like-glyph')
  heartGlyph.addEventListener('click', heartClick => handleHeartClick(heartClick, postId))
})

function handleHeartClick (heartClick, postId) {
  let currentHeart = heartClick.target
  
  console.log('Post ID:', postId)
  console.log('Current Heart:', currentHeart.textContent)

  mimicServerCall() // PATCH with postId and currentHeart
    .then((data) => {
      console.log('200', data)
      console.log('New Heart:', flipHeart(currentHeart))
    })
    .catch((data) => {
      console.log('400', data)
      displayError(data)
    })

}


// Helper Functions

function displayError(errorMessage) {
  errorModal.className = ''
  errorModal.querySelector('#modal-message').textContent = errorMessage
  setTimeout(() => errorModal.className = 'hidden', 3000)
}

function flipHeart(currentHeart) {
  // Like
  if (currentHeart.textContent === EMPTY_HEART) {
    currentHeart.textContent = FULL_HEART
    currentHeart.className = 'like-glyph activated-heart'
    return FULL_HEART
  }
  // Unlike
  else {
    currentHeart.textContent = EMPTY_HEART
    currentHeart.className = 'like-glyph'  
    return EMPTY_HEART
  }
}


//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
