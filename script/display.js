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
  newRow.innerHTML = "<input type=text class=\"input-field\"></input> \
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
}

window.onload = init;