// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.



$( document ).ready(function() {
  
  });

var restaurant = document.getElementById("restaurant");
var season = document.getElementById("season");
$(restaurant).css("background-color", "#2BC78C");
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





