//Supabase declaration
const { createClient } = supabase;
const supabaseUrl = 'https://zvxyndktyspeujwtwsnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHluZGt0eXNwZXVqd3R3c25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAyNTcxMSwiZXhwIjoyMDAyNjAxNzExfQ.4Jip-036UrDH_MZwHxrGWd4tS_W6QYLviagQinMMGYk'
const supabase1 = createClient(supabaseUrl, supabaseKey)
console.log(supabase1);

//Function to retrieve data from the text boxes
function getInputValue() {
  // Get the value from the text field element
  var fname_txt           = document.getElementById("firstName_txt").value;
  var lname_txt           = document.getElementById("lastName_txt").value;
  // var username_txt        = document.getElementById("Username_txt").value;
  var time1_txt           = document.getElementById("time_txt").value;
  var phoneNumber_txt     = document.getElementById("phone_txt").value;
  var date1_txt         = document.getElementById("date_txt").value;
  var doctor_txt         = document.getElementById("doctor_txt").value;
  var section_txt         = document.getElementById("section_txt").value;



  // passing the data to be inserted
  
  insert_Session(fname_txt, lname_txt, phoneNumber_txt, date1_txt, doctor_txt, section_txt,time1_txt);
  
  
}

// Fetch Departments from Supabase
async function fetchDepartments() {
  try {
    const { data: departments, error3 } = await supabase1
    .from('Department')
    .select('ID ,department_name');

    if (error3) {
      console.error(error3);
      return;
    }
    console.log(departments);


    
    // Populate department dropdown
    const departmentDropdown = document.getElementById('section_txt');
    departments.forEach((department) => {
      const option = document.createElement('option');
      option.value = department.ID;
      option.text = department.department_name;
      console.log(option.value);
      console.log(option.text);
      departmentDropdown.appendChild(option);
    });
  } catch (error3) {
    console.error('Error:', error3.message);
  }
}

// Fetch doctors from Supabase
async function fetchDoctors() {
  try {
    const { data: doctors, error3 } = await supabase1
    .from('Doctors')
    .select('ID ,full_name');

    if (error3) {
      console.error(error3);
      return;
    }
    console.log(doctors);


    
    // Populate doctors dropdown
    const doctorsDropdown = document.getElementById('doctor_txt');
    doctors.forEach((doctor) => {
      const option = document.createElement('option');
      option.value = doctor.full_name;
      option.text = doctor.full_name;
      console.log(option.value);
      console.log(option.text);
      doctorsDropdown.appendChild(option);
    });
  } catch (error3) {
    console.error('Error:', error3.message);
  }
}

// Function to fetch data
async function insert_Session(fname, lname, number, date, doctor, section1, time ) {

  // Check doctor availability
  const { data: schedules, error0 } = await supabase1
      .from('Sessions')
      .select()
      .eq('doctor_name', doctor)
      .eq('session_date', date)
      .eq('session_time', time);

    if (error0) {
    console.error(error0);
    return;
  }

    // If there are any overlapping schedules, doctor is not available
    const isAvailable = schedules.length === 0;
    console.log(isAvailable);
    if(!isAvailable){
      alert('Sorry, Doctor is not available at that time');
      return;
    }
  //retrieving the data from the seesion
  const value = sessionStorage.getItem('key_username');
  const value_i = sessionStorage.getItem('key_i');
  console.log(value_i);

  //fetching the id
  const { data: rows, error1 } = await supabase1
  .from('Users')
  .select('ID') // Specify the columns you want to retrieve

  const id_data = rows.map(row => row.ID);

  if (error1) {
  console.error(error1);
    return;
  }

  // Access the desired cell values from the retrieved row
  const data1 = id_data[value_i];
  console.log(data1)

  //inserting the data
  const { data, error } = await supabase1
  .from('Sessions')
  .insert([{
    session_date: date
    ,patient_first_name : fname
    ,patient_last_name : lname    
    ,doctor_name: doctor
    ,section: section1
    ,phone_number: number
    ,user_id: data1
    ,session_time: time
    
  }])

  if (error) {
    console.error(error);
    return;
  }

  alert('Booking Successful')
}

// Function to be executed when the button is clicked
function handleClick() {
    console.log("Button clicked!");
    getInputValue();
  }
// Function to be executed when the button is clicked
function handleClickLoad() {
  console.log("Page loaded!");
  fetchDoctors();
  fetchDepartments();
}

// Event listener registration

let form = document.querySelector('form')
form.addEventListener('submit' , (e) => {
  e.preventDefault();
  handleClick();
})

// Event listener registration
window.addEventListener('load' , (e) => {
  // Code to be executed when the button is clicked
    e.preventDefault();
    handleClickLoad();
  });

