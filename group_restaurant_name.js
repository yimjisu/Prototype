// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
var exist_groups = groups;
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

function restaurantName(){
  var name = "Veggie Paradise";
  var cell = document.getElementById('restaurant_name');
  cell.innerText += ' '+name;
  cell.style.fontWeight = 'bold';
}
function findgroup(){
  var table = document.getElementById('group table');
  table.style.paddingLeft = "15%";  table.style.paddingRight = "15%"; table.style.borderSpacing = "10px";
  for(var k=0; k<exist_groups.length/3; k++){
    var groupRow = table.insertRow(table.rows.length);
  for (var j=k*3; j<(k+1)*3; j++){
    if (j == groups.length) break;
    group = groups[j];
  var profile = group['profile'];
  var number = group['number'];
  var date = group['date'];
  var groupTable = document.createElement("table");
  groupTable.style.backgroundColor = "#E7FDF5"; groupTable.style.padding = "10px"; groupTable.style.height = "300px"; groupTable.style.alignContent = "flex-start";
  groupTable.style.borderRadius = '10px';
  var numberRow = groupTable.insertRow(0);
  var cell1 = numberRow.insertCell(0);
  for(var i=0; i<number['current']; i++){
    var cell = document.createElement('td');
    cell.innerHTML = 
    '<i class="fas fa-user"></i><script src="https://kit.fontawesome.com/fc9bca2b43.js" crossorigin="anonymous"></script>';  
    cell1.append(cell);
  }
  for(var i=0; i<number['expected']-number['current']; i++){
    var cell = document.createElement('td');
    cell.innerHTML = 
    '<i class="far fa-user"></i><script src="https://kit.fontawesome.com/fc9bca2b43.js" crossorigin="anonymous"></script>';  
    cell1.append(cell);
  }
  cell1.innerHTML += '  '+number['current']+'/'+number['expected'];
  cell1.style.fontSize = "12px";  cell1.style.letterSpacing = '5px';
  cell1.align = 'left';  cell1.style.paddingLeft = '10px';
  cell2 = numberRow.insertCell(1);  cell2.align = 'right';
  sendMessage = document.createElement('button');  sendMessage.innerHTML = '<b>Send Message</b>';
  sendMessage.onclick = function(){
    message();
  };
  cell2.append(sendMessage);
  
  numberRow.style.height= "15px";

  var profilecell = groupTable.insertRow(groupTable.rows.length).insertCell(0);
  profilecell.colSpan = "2";

  for(var i=0; i<profile.length; i++){
    var profileTable = document.createElement('table');
    profileTable.style.height = "30px";
    var user = profile[i];
    var cell = document.createElement('tr');
    seeProfile = document.createElement('button');
    seeProfile.innerHTML = '<b>See Profile</b>';
    imgSrc = '<img src= "'+user['img']+'" height = "20"></img>';
    cell1 = cell.insertCell(0); cell1.innerHTML = imgSrc;
    cell2 = cell.insertCell(1); cell2.innerHTML = user['name']; cell2.style.fontSize = "15px"; cell2.align = 'left';
    cell3 = cell.insertCell(2); cell3.append(seeProfile); cell3.align = 'right';
    cell.colSpan = "2";
    profileTable.appendChild(cell);

    var cell = document.createElement('tr');
    cell1 = cell.insertCell(0); cell1.colSpan = "3"; cell1.width = 400;
    cell1.style.wordBreak = "break-all"; cell1.style.borderStyle = "dotted"; cell1.style.borderWidth = "1.5px"; cell1.style.borderColor="#20D994";
    cell1.innerText = user['comment']; cell1.style.padding = "5px";
    cell1.align = "left"; cell1.style.fontSize = "12px";
    profileTable.width = groupTable.width;
    profileTable.appendChild(cell);
    profilecell.append(profileTable);
  }
  profilecell.style.borderRadius = "10px"; profilecell.style.borderStyle = "solid";profilecell.style.borderWidth = "1px"; profilecell.style.padding = "5px";
  profilecell.style.backgroundColor = "#FFF"; profilecell.style.height = "200px"; profilecell.style.verticalAlign = "baseline"; profilecell.style.borderColor = "#20D994";

  var cell = groupTable.insertRow(groupTable.rows.length);
  cell1 = cell.insertCell(0);
  cell1.innerHTML = 
  '<i class="far fa-calendar-alt"></i><script src="https://kit.fontawesome.com/fc9bca2b43.js" crossorigin="anonymous"></script>'
  + ' '+date;
  cell1.align = 'left';
  cell1.style.paddingLeft = '10px';

  var groupCell = groupRow.insertCell(j%3);
  groupCell.colSpan = "2";
  groupCell.append(groupTable);
  buttonStyle();
  }}
}

function buttonStyle(){
  var btns = document.getElementsByTagName('button');
  for(var i=0; i<btns.length; i++){
    var btn = btns[i];
    btn.style.backgroundColor = '#FFF';
    btn.style.borderStyle = 'solid';
    btn.style.borderWidth = '1.5px';
    btn.style.borderRadius = '20px';
    btn.style.borderColor = '#173143';
    btn.style.fontSize = '10px';
    btn.style.color = '#173143';
    btn.style.marginBottom = '5px';
    btn.style.fontFamily = "'Baloo Thambi 2', cursive";
  }
}

function createGroup(){

}

function message(table){
  console.log("send message");
}

function gotData(data){
  var val = data.val();
  if(val){

  }
}
restaurantName();
bindEvents();
findgroup();

function saveData(){
  firebaseConfig = {
    apiKey: "AIzaSyBes0fHM41It37PdCiQLI_vMPIvo30d9_g",
    authDomain: "cs374-pr3-e024c.firebaseapp.com",
    databaseURL: "https://cs374-pr3-e024c.firebaseio.com",
    projectId: "cs374-pr3-e024c",
    storageBucket: "cs374-pr3-e024c.appspot.com",
    messagingSenderId: "23030168417",
    appId: "1:23030168417:web:3e44eda51a8f0f0c84a320",
    measurementId: "G-CH433X2PJJ"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  console.log(firebase);

  database = firebase.database();
  ref = database.ref('restaurant_name');
}
});