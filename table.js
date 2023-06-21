//Supabase declaration
const { createClient } = supabase;
const supabaseUrl = 'https://zvxyndktyspeujwtwsnm.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2eHluZGt0eXNwZXVqd3R3c25tIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4NzAyNTcxMSwiZXhwIjoyMDAyNjAxNzExfQ.4Jip-036UrDH_MZwHxrGWd4tS_W6QYLviagQinMMGYk'
const supabase1 = createClient(supabaseUrl, supabaseKey)
console.log(supabase1);

//generate dynamic table
function generateDynamicTable(data) {
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
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create table body with data rows
    data.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(header => {
            const cell = document.createElement('td');
            cell.textContent = rowData[header];
            row.appendChild(cell);
        });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);
    
    return table;
}

// Function to fetch data

async function fetch_Session() {
    
   //retrieving the data from the seesion
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

  const { data, error } = await supabase1
  .from('Sessions')
  .select( 'ID, session_date, session_time, patient_first_name, patient_last_name, doctor_name' )
  .eq('user_id',data1)

  if (error) {
    console.error(error);
    return;
  }

  console.log(data);
  //fetching Container
  const container = document.getElementById('my_table'); 

  // Extract the column values and store them in an array
  const dynamicTable = generateDynamicTable(data);

  //fetch inserted data
  container.appendChild(dynamicTable);
  
}


// Function to be executed when the button is clicked
function handleClick() {
    console.log("Button clicked!");
    fetch_Session();
  }

// Event listener registration
window.addEventListener('load' , (e) => {
  // Code to be executed when the button is clicked
    e.preventDefault();
    handleClick();
  });
