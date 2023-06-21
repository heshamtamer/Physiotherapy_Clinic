const { createClient } = supabase;
const supabaseUrl = 'https://zvxyndktyspeujwtwsnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHluZGt0eXNwZXVqd3R3c25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAyNTcxMSwiZXhwIjoyMDAyNjAxNzExfQ.4Jip-036UrDH_MZwHxrGWd4tS_W6QYLviagQinMMGYk'
const supabase1 = createClient(supabaseUrl, supabaseKey)
console.log(supabase1);
//ON HOLD
function getInputValue() {
    // Get the value from the text field element
    var ID_txt           = document.getElementById("ID_txt").value;
    var doc_name_txt           = document.getElementById("doc_name_txt").value;
    var bdate_text       = document.getElementById("date_txt").value;
    var email_txt           = document.getElementById("email_txt").value;
    var speciality_txt           = document.getElementById("speciality_txt").value;
    var Phone_txt           = document.getElementById("Phone_txt").value;
    var sex_txt           = document.getElementById("sex_txt").value;
    // passing the data to be inserted
    insert_Patient(ID_txt, doc_name_txt, bdate_text, email_txt ,speciality_txt ,Phone_txt, sex_txt  ); 
  }

async function insert_Patient(id, dname, bdate, Email , speciality ,Phone, sex1) {
    const { data, error } = await supabase1
    .from('Doctors')
    .select( 'ID' )

     if (error) {
    console.error(error);
    return;
    }

  // Extract the column values and store them in an array
    const ID_data = data.map(row => row.ID);
    var check_user = false;
     for (let i = 0; i < 50 ; i++) {
    if(ID_data[i] == id ) {
      check_user=true;
      break;
    }
    }
    if(check_user){
        alert('ID already exisit');
        return;
    }
    // inserting succesful data 
    const { data1, error1 } = await supabase1
    .from('Doctors')
    .insert([{
        ID  : id , 
        birth_date : bdate,
        full_name : dname ,
        sex : location, 
        speciality : speciality, 
        email : Email, 
        phone_number : Phone,
        sex:sex1



    }])

    if (error1) {
        
        console.log(error1);
        return;
    }

    alert('insertion Successful')
}
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