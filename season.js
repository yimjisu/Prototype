// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
  });

var restaurant = document.getElementById("restaurant");
var season = document.getElementById("season");
$(season).css("background-color", "#2BC78C");
function bindEvents(){
  restaurant.onclick = function(){
    $(this).css("background-color", "#2BC78C");
    $(season).css("background-color", "#8FECC9");
    restaurant();
  }
  season.onclick = function(){
    $(this).css("background-color", "#2BC78C");
    $(restaurant).css("background-color", "#8FECC9");
    season();
  }
}

function select_ing(){
  var selected_ings=[];
  var ings = document.getElementsByTagName("input");
  for(var i=0; i < ings.length; i++){
    if (ings[i].checked == true){
      selected_ings.push(ings[i].id);
    }
  }
  //for our prototype, we only care if only spinach is selected
  if ((selected_ings.length == 1) && (selected_ings[0]=="Spinach")){
    console.log("spinach checked", selected_ings);
  }
}
