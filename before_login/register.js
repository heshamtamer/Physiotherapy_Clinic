//Supabase declaration
const { createClient } = supabase;
const supabaseUrl = 'https://zvxyndktyspeujwtwsnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHluZGt0eXNwZXVqd3R3c25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAyNTcxMSwiZXhwIjoyMDAyNjAxNzExfQ.4Jip-036UrDH_MZwHxrGWd4tS_W6QYLviagQinMMGYk'
const supabase1 = createClient(supabaseUrl, supabaseKey)
console.log(supabase1);

//Function to retrieve data from the text boxes
function getInputValue() {
  // Get the value from the text field element
  var fname_txt           = document.getElementById("Fname_txt").value;
  var lname_txt           = document.getElementById("Lname_txt").value;
  var username_txt        = document.getElementById("Username_txt").value;
  var email_txt           = document.getElementById("Email_txt").value;
  var password_txt        = document.getElementById("Password_txt").value;
  var confirmPassword_txt = document.getElementById("ConfirmPassword_txt").value;
  var phoneNumber_txt     = document.getElementById("Phone_txt").value;
  var address_txt         = document.getElementById("Address_txt").value;

  if (password_txt != confirmPassword_txt){
    alert('Password is different')
    return;
  }

  // passing the data to be inserted
   
  insert_Patient(fname_txt, lname_txt, username_txt, email_txt, password_txt, phoneNumber_txt, address_txt);

 
}

// Function to fetch data
async function insert_Patient(fname, lname, username, email1, pass_word, number, address1 ) {
  const { data, error } = await supabase1
  .from('Users')
  //Checking is username or email in use before or not
  .select( 'user_name, email' )

  if (error) {
    console.error(error);
    return;
  }

  // Extract the column values and store them in an array
  const username_data = data.map(row => row.user_name);
  const email_data = data.map(row => row.email);

  //checking the username
  var check_user = true;
  for (let i = 0; i < 50 ; i++) {
    if(username_data[i] == username) {
      check_user=false;
    }
  }
  if(!check_user) {
    alert("Username is taken")
    return; 
  }

  //checking the email
  var check_user1 = true;
  for (let i = 0; i < 50 ; i++) {
    if(email_data[i] == email1) {
      check_user1=false;
    }
  }
  if(!check_user1) {
    alert("Email is linked to another account")
    return; 
  }
  // inserting succesful data 
  const { data1, error1 } = await supabase1
  .from('Users')
  .insert([{
    address: address1
    ,email : email1
    ,Fname : fname
    ,Lname : lname
    ,phone_number: number
    ,user_name : username
    ,password: pass_word
  }])
  
  if (error1) {
    console.error(error1);
    return;
  }
  
  alert('Registration Successful')
}

// Function to be executed when the button is clicked
function handleClick() {
    console.log("Button clicked!");
    getInputValue();
  }
  
// Event listener registration

let form = document.querySelector('form')
form.addEventListener('submit' , (e) => {
  e.preventDefault();
  handleClick();
})


