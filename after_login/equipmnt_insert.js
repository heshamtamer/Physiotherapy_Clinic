const { createClient } = supabase;
const supabaseUrl = 'https://zvxyndktyspeujwtwsnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHluZGt0eXNwZXVqd3R3c25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAyNTcxMSwiZXhwIjoyMDAyNjAxNzExfQ.4Jip-036UrDH_MZwHxrGWd4tS_W6QYLviagQinMMGYk'
const supabase1 = createClient(supabaseUrl, supabaseKey)
console.log(supabase1);
//ON HOLD
function getInputValue() {
    // Get the value from the text field element
    var ename_txt           = document.getElementById("ename_txt").value;
    var ID_txt           = document.getElementById("ID_txt").value;
    var emodel_txt       = document.getElementById("emodel_txt").value;
    var sn_txt           = document.getElementById("sn_txt").value;
    var acq_txt           = document.getElementById("acq_txt").value;
    var cost_txt           = document.getElementById("cost_txt").value;
    var AV_txt           = document.getElementById("AV_txt").value;
    var sid_txt           = document.getElementById("sid_txt").value;
    // passing the data to be inserted
    insert_Patient(ID_txt, ename_txt, emodel_txt, sn_txt ,acq_txt ,cost_txt ,AV_txt , sid_txt   ); 
  }

async function insert_Patient(id, ename, emodel, sn , acq ,cost , AV ,sid  ) {
    const { data, error } = await supabase1
    .from('Equipment')
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
    .from('Equipment')
    .insert([{
        ID  : id , 
        Name : ename,
        Model : emodel ,
        Serial_Number : sn, 
        Acquisition_Date : acq, 
        Purchase_Cost : cost, 
        Availability : AV,
        Session_ID : sid


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