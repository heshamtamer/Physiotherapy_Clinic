const { createClient } = supabase;
const supabaseUrl = 'https://zvxyndktyspeujwtwsnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHluZGt0eXNwZXVqd3R3c25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAyNTcxMSwiZXhwIjoyMDAyNjAxNzExfQ.4Jip-036UrDH_MZwHxrGWd4tS_W6QYLviagQinMMGYk'
const supabase1 = createClient(supabaseUrl, supabaseKey)
console.log(supabase1);

function getInputValue() {
    // Get the value from the text field element
    var ID_txt           = document.getElementById("ID_txt").value;
    var dname_txt           = document.getElementById("dname_txt").value;
    var location_txt       = document.getElementById("location_txt").value;
    var sup_id_txt           = document.getElementById("sup_id_txt").value;
    // passing the data to be inserted
    insert_Patient(ID_txt, dname_txt, location_txt, sup_id_txt); 
  }

async function insert_Patient(id, dname, location, sup_id) {
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
    if(ID_data[i] == sup_id ) {
      check_user=true;
      break;
    }
    }
    if(!check_user){
        alert('supervisor ID is incorrect');
        return;
    }
    // inserting succesful data 
    const { data1, error1 } = await supabase1
    .from('Department')
    .insert([{
        ID  : id , 
        department_name : dname,
        department_supervisor : sup_id ,
        location : location
    }])

    if (error1) {
        
        console.error(error1);
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