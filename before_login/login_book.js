//Supabase declaration
const { createClient } = supabase;
const supabaseUrl = 'https://zvxyndktyspeujwtwsnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHluZGt0eXNwZXVqd3R3c25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAyNTcxMSwiZXhwIjoyMDAyNjAxNzExfQ.4Jip-036UrDH_MZwHxrGWd4tS_W6QYLviagQinMMGYk'
const supabase1 = createClient(supabaseUrl, supabaseKey)
console.log(supabase1);

//Function to retrieve data from the text boxes
function getInputValue() {
  // Get the value from the text field element
  var usernamelogin_txt = document.getElementById("UsernameLogin_txt").value;
  var passwordlogin_txt = document.getElementById("PasswordLogin_txt").value;

  return ([usernamelogin_txt, passwordlogin_txt] ) ;
}

// Function to fetch data
async function fetch_Patient() {
  const { data, error } = await supabase1
  .from('Users')
  .select( 'user_name, password , admin' )

  if (error) {
    console.error(error);
    return;
  }

  // Extract the column values and store them in an array
  const username_data = data.map(row => row.user_name);
  const password_data = data.map(row => row.password);
  const admin_data = data.map(row => row.admin);

  //fetch inserted data
  var [user_name_txt , pass_word_txt] = getInputValue();
  
  var check_user = false;
  var signed_in_user = null;
  for (let i = 0; i < 50 ; i++) {
    if(username_data[i] == user_name_txt && password_data[i] == pass_word_txt) {
      check_user=true;
      signed_in_user = i;
      break;
    }
  }
  sessionStorage.setItem('key_username', user_name_txt);
  // const value_user = sessionStorage.getItem('key_username');

  //console.log(value_user);
  sessionStorage.setItem('key_i', signed_in_user);
  const value_i = sessionStorage.getItem('key_i');
  console.log(value_i);

  if(!check_user) {
    alert("Wrong Username or Password")
    return; 
  }
  var is_admin = admin_data[signed_in_user];
  if (!is_admin){
     window.location.href = '../after_login/book.html';}
  else{
    window.location.href = '../after_login/admin.html';
  }
  
}
// Function to be executed when the button is clicked
function handleClick() {
    console.log("Button clicked!");
    fetch_Patient();
  }

// Event listener registration
let form = document.querySelector('form')
form.addEventListener('submit' , (e) => {
  e.preventDefault();
  handleClick();
})
