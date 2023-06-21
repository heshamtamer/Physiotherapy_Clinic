// Function to be executed when the button is clicked
function handleClick() {
    console.log("Button clicked!");
    window.location.href = 'login_book.html';
  }
  
// Event listener registration
let form = document.querySelector('form')
form.addEventListener('submit' , (e) => {
  e.preventDefault();
  handleClick();
})
