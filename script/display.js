// This script file is for handling the display aspect of WeSpent

// Toggle the visibility of a div.
//
// checkbox       The checkbox that was checked.
// showHideDivID  The id of the div to toggle the visibility of.
function toggleCheckBox(checkbox, showHideDivID)
{
  if(!checkbox.checked)
  {
    document.getElementById(showHideDivID).style.display = "block";
  }
  else
  {
    document.getElementById(showHideDivID).style.display = "none";
  }
}

function checkAddRow()
{
  console.log("Checking...");
  var nameFields = document.getElementsByClassName("name-field");
  var salaryFields = document.getElementsByClassName("salary-field");
  var allFull = true;
  
  for(var i = 0; i < nameFields.length; i++)
  {
    if(!nameFields[i].value.match(/\S/))
    {
      allFull = false;
      if(nameFields[i].className.indexOf("error") == -1)
      {
        nameFields[i].className = nameFields[i].className + " error";
      }
    }
    else{
      nameFields[i].className = nameFields[i].className.replace(" error", "");
    }
    
    if(!salaryFields[i].value.match(/\S/))
    {
      allFull = false;
      if(salaryFields[i].className.indexOf("error") == -1)
      {
        salaryFields[i].className = salaryFields[i].className + " error";
      }
    }
    else
    {
      salaryFields[i].className = salaryFields[i].className.replace(" error", "");
    }
  }
  
  if(allFull)
  {
    addParticipantRow();
    updateListeners();
  }
}

function updateListeners()
{
  var nameFields = document.getElementsByClassName("name-field");
  var salaryFields = document.getElementsByClassName("salary-field");
  if(nameFields.length > 0)
  {
    if(nameFields[0].addEventListener)
    { // All browsers, IE9+
      for(var i = 0; i < nameFields.length; i++)
      {
        nameFields[i].addEventListener("input",
          function(){
            checkAddRow()
          }, false);
        salaryFields[i].addEventListener("input",
          function(){
            checkAddRow()
          }, false);
      }
    }
    else if(nameFields[0].attachEvent){ // IE8-
      for(var i = 0; i < nameFields.length; i++)
      {
        nameFields[i].addEventListener("input",
          function(){
            checkAddRow()
          });
        salaryFields[i].addEventListener("input",
          function(){
            checkAddRow()
          });
      }
    }
  }
}

// Uncheck all of the checkboxes.
function uncheckCheckBoxes()
{
  var elements = document.getElementsByClassName("checkbox");
  for(var i = 0; i < elements.length; i++)
  {
    elements[i].checked = false;
  }
}

// Add a participant row to the participant table.
function addParticipantRow()
{
  var ni = document.getElementById('participant-rows');
  var numi = document.getElementById('theValue');
  var newRow = document.createElement('div');
  var num = ++numi.value;
  newRow.setAttribute('class', "participant-row");
  newRow.setAttribute('id', "row" + num);
  newRow.innerHTML = "<input type=text class=\"name-field\"></input> \
                  <input type=password class=\"salary-field\"></input> \
              <div class=\"remove-wrapper\" onclick=\"removeParticipantRow("+num+")\"> \
                <div class=\"remove\">-</div> \
              </div>";
  ni.appendChild(newRow);
  
  // Since we've added a row, we can allow other rows to be deleted with the
  // remove button.
  if(document.getElementsByClassName("participant-row").length == 2)
  {
    document.getElementsByClassName("remove-no")[0].setAttribute('class', "remove");
  }
}

// Remove the selected element unless it is the last row of the participant
// table.
//
// rowNum  The row ID number to delete.
function removeParticipantRow(rowNum)
{
  var rows = document.getElementsByClassName("participant-row");
  if(rows.length != 1)
  {
    document.getElementById('participant-rows').removeChild(
        document.getElementById("row"+rowNum) ); 
    if(rows.length == 1)
      document.getElementsByClassName("remove")[0].setAttribute('class', "remove-no");
  }
}

// Function to initialize the page.
function init(){
  uncheckCheckBoxes();
  updateListeners();
}

window.onload = init;