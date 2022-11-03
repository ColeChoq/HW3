/*
Author: Colton Choquette
Email: Colton_Choquette@student.uml.edu

The purpose of this file is to provide the interactivity of the page. This is where the 
programming for the web application is held. It's responsible for both verifing input and 
producing the table.

Source: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces

    -I used this for the basic structure of a dynamic table with heavy modification to 
     make it useful for our project 


*/




/*This is an input verification function that runs upon the user pressing 
the generate table button. When the input is:
    Valid: Runs the generate table function
    Invalid: Displays descriptive error message
 */
function checkinput(){

    /*Clears all previous error messages*/
    document.getElementById('cmn').innerHTML = "";
    document.getElementById('rmn').innerHTML = "";
    document.getElementById('ugh').innerHTML = "";

    /*Get input into vars */
    const ColMax=document.getElementById('thing3').value;
    const ColMin=document.getElementById('thing4').value;

    const RowMax=document.getElementById('thing1').value;
    const  RowMin=document.getElementById('thing2').value;

    const chk = 0;
    
    /*Ensures all values are within proper range */
    if(Number(ColMin) > 150 || Number(ColMin) < -150 
    || Number(ColMax) > 150 || Number(ColMax) < -150 
    || Number(RowMin) > 150 || Number(RowMin) < -150 
    || Number(RowMax)> 150 || Number(RowMax) < -150)
    {
        document.getElementById('ugh').innerHTML = "Each Value Must Be Less Than 150 & More Than -150";
        chk = 1;
    }


    /*Ensures all mins are less than max */
    if(Number(ColMax) <= Number(ColMin)){
        document.getElementById('cmn').innerHTML = "must be lower than max";
        chk = 1;
    }
    if(Number(RowMax) <= Number(RowMin)){
        document.getElementById('rmn').innerHTML = 'must be lower than max';
        chk = 1;
    }
    /*If no errors run the generate table function */
    if(chk == 0){
        generateTable();
    }
    
    
}

//This function generates the table based on the users input
function generateTable() {

    

    //get input from user
    const ColMax=document.getElementById('thing3').value;
    const ColMin=document.getElementById('thing4').value;

    const RowMax=document.getElementById('thing1').value;
    const  RowMin=document.getElementById('thing2').value;

    //Determine row and column lengths
    const Rcount=RowMax-RowMin;
    const Ccount=ColMax-ColMin;

   
    

    // Gets the existing table and creates a new tbody
    const tbl = document.getElementById("table");
    const tblBody = document.createElement("tbody");
  
    // creating all cells
    for (let i = 1; i <= Ccount + 2; i++) {

      // creates a table row
      const row = document.createElement("tr");
      //if first row - make each entry a header and leave first box blank
      if(i==1){
        for (let j = 1; j <= Rcount + 2; j++) {
            if(j==1){
                //These four lines along with some at end of this function were taken from the source listed at the top
                const cell = document.createElement("th");
                const cellText = document.createTextNode(" ");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else{
                const cell = document.createElement("th");
                const cellText = document.createTextNode((j-2)+Number(RowMin));
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
        }
      }
      //if not first row -first column are headers - the rest are products
      else{
        for (let j = 1; j <= Rcount + 2; j++) {
            
            if(j==1){
                const cell = document.createElement("th");
                const cellText = document.createTextNode((i-2)+Number(ColMin));
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else{
                const cell = document.createElement("td");
                //Extra Styling for table (checkerboard)
                if(i % 2 == 0){
                    if(j % 2 == 0){
                        cell.setAttribute("style", "background-color: grey;")
                    }
                    else{
                        cell.setAttribute("style", "background-color: tan;")
                    }
                }
                else{
                    if(j%2 == 1){
                        cell.setAttribute("style", "background-color: grey;")
                    }
                    else{
                        cell.setAttribute("style", "background-color: tan;")
                    }
                }
                //The Squares^2 are YELLOW!
                if(((j-2)+Number(RowMin))==((i-2)+Number(ColMin))){
                    cell.setAttribute("style", "background-color: Yellow;")
                }

                const cellText = document.createTextNode(((j-2)+Number(RowMin))*((i-2)+Number(ColMin)));
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            
               
          }
      }
      
  
      // add the row to the end of the table body
      tblBody.appendChild(row);
    }

    //Clear the existing table
    var Table = document.getElementById("table");
    Table.innerHTML = "";

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
}
  
  