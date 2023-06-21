const { createClient } = supabase;
const supabaseUrl = 'https://zvxyndktyspeujwtwsnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHluZGt0eXNwZXVqd3R3c25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAyNTcxMSwiZXhwIjoyMDAyNjAxNzExfQ.4Jip-036UrDH_MZwHxrGWd4tS_W6QYLviagQinMMGYk'
const supabase1 = createClient(supabaseUrl, supabaseKey)

const table = document.getElementById('table-container-1');
const cells = table.getElementsByTagName('td');

// a function that fetches the data based on the inserted table id and orders the table to be 
// created using the fetched data
async function fetch_data( table_name , table_id) {
  const { data, error } = await supabase1
  .from(table_name)
  .select( '*' )

  if (error) {
  console.error(error);
  return;
  }

  console.log(data);
  //fetching Container
  const container = document.getElementById(table_id); 
  container.innerHTML = ''

  // Extract the column values and store them in an array
  const dynamicTable = generateDynamicTable(data , table_name);

  //fetch inserted data
  container.appendChild(dynamicTable);

    console.log("Button clicked!");
}
// the button event lisitner that activates depending on the entered button id
async function eve_lis(bt_id ,table_name , table_id){
   console.log(supabase1);
  const button = document.getElementById(bt_id);
  button.addEventListener('click', function() {
    // Code to be executed when the button is clicked
    fetch_data(table_name ,table_id );
    event_lis_butt("insert_btn" , table_name)
  });
}

// Function to update the value in the Supabase table
async function updateValueInSupabase(rowData, table_name) {
  try {
    const { data, error } = await supabase1
      .from(table_name)
      .update(rowData)
      .match({ ID: rowData.ID });

    if (error) {
      console.error(error);
      return;
    }

    console.log('Data updated successfully:', data);
  } catch (error) {
    console.error(error);
  }
}

//Generate table
function generateDynamicTable(data , table_name) {
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  // Create table header
  const headers = Object.keys(data[0]);
  const headerRow = document.createElement('tr');
  headers.forEach(header => {
    const th = document.createElement('th');
    th.textContent = header;
    headerRow.appendChild(th);
  });
  headerRow.innerHTML += '<th>Action</th>'; // Add Actions header
  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Create table body with data rows
  data.forEach(rowData => {
    const row = document.createElement('tr');
    headers.forEach(header => {
      const cell = document.createElement('td');
      cell.textContent = rowData[header];
      cell.setAttribute('contenteditable', 'true'); // Make the cell editable
       // Add event listener to update the value in Supabase table when cell is edited
       cell.addEventListener('input', () => {
        rowData[header] = cell.textContent;
        // console.log(rowData[header])
        // console.log(rowData)
        // console.log(table_name)
        updateValueInSupabase(rowData, table_name);
      });
      row.appendChild(cell);
    });

    // Create edit and delete buttons for each row
    const actionsCell = document.createElement('td');
    // const editButton = document.createElement('button');
    // editButton.textContent = 'Edit';
    // editButton.addEventListener('click', function() {
    //   editRow(data , rowData.ID); // Call the editRow function and pass the rowData
    // });

    // Delete Button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteRow(data , rowData.ID , table_name); // Call the deleteRow function and pass the rowData
    });
    deleteButton.style.backgroundColor = "#3a6cf4"
    deleteButton.style.color = "white";
    deleteButton.style.padding = "10px";
    deleteButton.style.fontSize = "15px";
    deleteButton.style.cursor = "pointer";
    
    //actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  return table;
}


function editRow(data, rowData) {
  // Handle the edit operation for the row data
  console.log('Edit:', data);
  console.log('Edit:', rowData);
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}




async function deleteRow(data , rowData ,  table_name) {

  // Handle the delete operation for the row data
  async function delete_bolbol(){ 
    
  const { data, error } = await supabase1
  .from(table_name)
  .delete()
  .eq('ID', rowData)
  location.reload();
  console.log(error)

    

} 
  delete_bolbol();
  //console.log('Deleted:');
}
// Add event listeners to table cells
for (let i = 0; i < cells.length; i++) {
  cells[i].addEventListener('click', function() {
    // Enable editing by setting the "contenteditable" attribute to true
    this.setAttribute('contenteditable', 'true');
  });

  cells[i].addEventListener('blur', function() {
    // Disable editing by removing the "contenteditable" attribute
    this.removeAttribute('contenteditable');

    // Get the updated content
    const updatedContent = this.textContent;

    // Perform any additional actions with the updated content
    console.log('Updated content:', updatedContent);
  });
}
//insert button event listner
async function event_lis_butt(bt_id ,table_name){
  console.log(supabase1);
 const button = document.getElementById(bt_id);
 button.addEventListener('click', function() {
   // Code to be executed when the button is clicked
   console.log("ins")
   insert_btn_adjst(table_name)
 });
}
 // fun that adjsuts the function of the insert button depending on the table 
async function insert_btn_adjst (table_name ){
  if(table_name == "Doctors")
  window.location.href = '../after_login/doctor_insert.html';
  else{
    if(table_name == "Equipment"){
      window.location.href = '../after_login/equipmnt_insert.html';
    }else{
      if(table_name == "Sessions"){
        window.location.href = '../after_login/insert_session.html';
      }else{
        if(table_name == "Users"){
          window.location.href = '../after_login/insert_user.html';
        }else{
          if(table_name == "Department"){
            window.location.href = '../after_login/deprtmnt_insert.html';
          }}}
    }
  }
}

eve_lis('doctors_btn',  "Doctors" ,'table-container-1' )
eve_lis("equipment_btn" ,"Equipment" , 'table-container-1' )
eve_lis("sessions_btn" , "Sessions" , 'table-container-1' )
eve_lis("user_btn" , "Users" , 'table-container-1')
eve_lis("department_btn" , "Department" , 'table-container-1')

//insert button event listner
