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

var selected_ings=[];

var select_btn = document.getElementById("select");

select_btn.addEventListener('click', function(){
  var ings = document.getElementsByTagName("input")
  selected_ings=[];
  for(var i=0; i < ings.length; i++){
    if (ings[i].checked == true){
      selected_ings.push(ings[i].id);
    }
  }
  if ((selected_ings.length == 1) && (selected_ings[0]=="Spinach")){
    window.location.replace("./spinach.html");
  }
});

var show_v=0;
var show_veg = document.getElementById("show_more");
show_veg.addEventListener('click', function(){
  if (!show_v){
    document.getElementById("more").style.display = "block";
    show_veg.innerHTML="Show less"
    show_v=1;
  }else{
    document.getElementById("more").style.display = "none";
    show_veg.innerHTML="Show more"
    show_v=0;
  }
});

var show_f=0;
var show_fruits = document.getElementById("show_more2");
show_fruits.addEventListener('click', function(){
  if (!show_f){
    document.getElementById("more2").style.display = "block";
    show_fruits.innerHTML="Show less"
    show_f=1;
  }else{
    document.getElementById("more2").style.display = "none";
    show_fruits.innerHTML="Show more"
    show_f=0;
  }
});
