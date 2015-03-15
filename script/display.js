// This script file is for handling the display aspect of WeSpent

function toggleCheckBox(checkbox, showHideDivID)
{
  if(!checkbox.checked)
  {
    toggleDiv(showHideDivID, "block");
  }
  else
  {
    toggleDiv(showHideDivID, "none");
  }
}

// Toggle visibility of the specified div.
//
// showHideDivID  The ID of the div to show/hide.
function toggleDiv(showHideDivID, value)
{
  var element = document.getElementById(showHideDivID);
  element.style.display = value;
}

function displayAllToggles()
{
  var elements = document.getElementsByClassName("toggle");
  for(var i = 0; i < elements.length; i++)
  {
    elements[i].style.checked = false;
  }
}

window.onload = displayAllToggles;