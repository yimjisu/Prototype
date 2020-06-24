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
  var ings = document.getElementsByTagName("input");
  selected_ings=[];
  for(var i=0; i < ings.length; i++){
    if (ings[i].checked == true){
      selected_ings.push(ings[i].id);
    }
  }
  if (selected_ings.length == 0){window.alert("Please make a selection.");}
  else{
    if ((selected_ings.length == 1) && (selected_ings[0]=="Spinach")){
      window.location.replace("./spinach.html");
    }else if (selected_ings.includes("Quinoa") && selected_ings.includes("Fennel") && (selected_ings.length == 2)){
        window.location.replace("./quinoa.html");
    }else if (selected_ings.includes("Orange") && selected_ings.includes("Lemon") && (selected_ings.length == 2)){
      window.location.replace("./orange.html");
    }else{
      window.alert("Sorry! No result found, try something else.");
      selected_ings=[];
      for(var i=0; i < ings.length; i++){
        if (ings[i].checked == true){
          ings[i].checked=false;
        }
      }
    }
  }
});

var show_v=0;
var show_veg = document.getElementById("show_more");
show_veg.addEventListener('click', function(){
  if (!show_v){
    more = document.getElementsByClassName("more")
    for(var i=0; i<more.length; i++)
      more[i].style.display = "block";
    show_veg.innerHTML="Show less"
    show_v=1;
  }else{
    more = document.getElementsByClassName("more")
    for(var i=0; i<more.length; i++)
      more[i].style.display = "none";
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
