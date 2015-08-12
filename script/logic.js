// This script file is for handling the logic aspect of WeSpent

// Our global variables =======================================================

// The total amount spent so far.
var totalSpent = 0;
// ============================================================================

// Check whether or not we should add another participant row. If we've filled
// all the available rows (both name and salary fields), then add another row.
function checkAddRow()
{
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
    else
    {
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
  }
}

// Add listeners to the name and salary fields.
//
// nameField    The name field to add a listener to.
// salaryField  The salary field to add a listener to.
function addParticipantListener(nameField, salaryField)
{
  if(nameField != null && salaryField != null)
  {
    if(nameField.addEventListener && salaryField.addEventListener)
    { // All browsers, IE9+
      nameField.addEventListener("input",
        function(){
          checkAddRow()
        }, false);
      salaryField.addEventListener("input",
        function(){
          checkAddRow()
        }, false);
    }
    else if(nameField.attachEvent && salaryField.attachEvent)
    { // IE8-
      nameField.addEventListener("input",
        function(){
          checkAddRow()
        });
      salaryField.addEventListener("input",
        function(){
          checkAddRow()
        });
    }
  }
}

// Add a participant row to the participant table.
function addParticipantRow()
{
  var ni = document.getElementById('participant-table');
  var numi = document.getElementById('theValue');
  var newRow = document.createElement('div');
  var num = ++numi.value;
  newRow.setAttribute('class', "form-group");
  newRow.setAttribute('id', "row" + num);

  newRow.innerHTML = '                <div class="row">\n                  <div class="col-xs-6">\n                    <input id=\"textinput\" name=\"textinput\" type=\"text\" class=\"form-control input-md name-field\" placeholder=\"Name\"><\/div>\n                    <div class=\"col-xs-6\"><div class=\"input-group\"> <span class=\"input-group-addon\">$<\/span>\n                      <input id=\"prependedtext\" name=\"prependedtext\" class=\"form-control salary-field\" placeholder=\"Salary\" type=\"password\"> \n                      <span class=\"input-group-btn\">\n                        <button class=\"btn btn-danger\" type=\"button\" onclick=\"removeParticipantRow('+num+')\">-<\/button>\n                      <\/span>\n                    <\/div>\n                  <\/div>\n                <\/div>';
              
  // Add listeners to the newly created fields.
  addParticipantListener(newRow.children[0].children[0].children[0], newRow.children[0].children[1].children[0].children[1]);
  
  ni.appendChild(newRow);
  
  // Since we've added a row, we can allow other rows to be deleted with the
  // remove button.
  if(document.getElementsByClassName("participant-row").length > 1)
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
  console.log("Row is " + rowNum)
  var rows = document.getElementsByClassName("form-group");
  if(rows.length != 1)
  {
    document.getElementById('participant-table').removeChild(document.getElementById("row"+rowNum) ); 
    
    if(rows.length == 1)
    {
      document.getElementsByClassName("remove")[0].setAttribute('class', "remove-no");
    }
  }
}

// Start button is clicked
function startClicked()
{
  startTimer();
}

function resetClicked()
{
  resetTimer();
  totalSpent = 0;
  updateCostDisplay();
}

// Update the cost display.
function updateCostDisplay()
{
  // We're only going to accumulate total salary from rows that have
  // the name AND salary field filled.
  // We also know that the timer sets off an event every second, so we can use
  // that to simply add on the cost of this second to the grand (global) total.
  // This allows us to keep track of the total cost of the meeting, even when
  // people come and go.
  
  var spentThisSecond = 0;
  var nameFields = document.getElementsByClassName("name-field");
  var salaryFields = document.getElementsByClassName("salary-field");
  
  if(nameFields.length > 0)
  {
    for(var i = 0; i < nameFields.length; i++)
    {
      if(nameFields[i].value.match(/\S/) && salaryFields[i].value.match(/\S/))
      {
        spentThisSecond += (salaryFields[i].value / 31449600);
      }
    }    
  }
  totalSpent += spentThisSecond;
  
  document.getElementById("cost-display").innerHTML =
    "$" + totalSpent.toFixed(2);
}

// Create the timerEvent listener so we know when to update the cost.
function createTimerListener()
{
  document.addEventListener("timerEvent", updateCostDisplay, false);
}

// Function to initialize the page.
function init(){
  addParticipantListener(document.getElementsByClassName("name-field")[0],
      document.getElementsByClassName("salary-field")[0]);
  createTimerListener();
}

window.onload = init;