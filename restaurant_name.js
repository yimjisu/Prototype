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

function findgroup(){
  var table = document.getElementById('grouptable');
  
  groups = [{
    'profile' : [
      {'name': 'Jisu Yim',
      'comment': 'Waiting for anyone who can enjoy dinner!',
      'img' : 'user img/user1.png'}
    , {'name': 'Taylor Swift',
    'comment': 'Enjoy meal with us!',
    'img' : 'user img/user2.png'}
    ],
    'number': {'current': 2, 'expected': 3},
    'date' : "2020.05.16 5PM ~ 7PM"
  },{
    'profile' : [
      {'name': 'Neila Rostom',
      'comment': 'Waiting for anyone who can enjoy dinner!',
      'img' : 'user img/user3.png'}
    , {'name': 'Anchit Tandon',
    'comment': 'Enjoy meal with us!',
    'img' : 'user img/user4.png'}
    , {'name': 'Wang Junsen',
    'comment': 'I really wanted to go here.',
    'img' : 'user img/user5.png'}
    ],
    'number': {'current': 3, 'expected': 4},
    'date' : "2020.05.16 5PM ~ 7PM"
  }]

  for (var j=0; j<groups.length; j++){
    group = groups[j];
  var profile = group['profile'];
  var number = group['number'];
  var date = group['date'];
  var groupTable = document.createElement("table");
  groupTable.style.backgroundColor = "white";
  groupTable.style.marginTop = "10px";
  groupTable.style.marginBottom = "5px";
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
  cell1.style.fontSize = "12px";
  cell1.style.letterSpacing = '5px';
  cell1.align = 'left';
  cell1.style.paddingLeft = '10px';
  cell2 = numberRow.insertCell(1);
  cell2.align = 'right';
  sendMessage = document.createElement('button');
  sendMessage.innerHTML = '<b>Send Message</b>';
  //sendMessage.onclick = message(groupTable);
  cell2.append(sendMessage);

  var profilecell = groupTable.insertRow(groupTable.rows.length).insertCell(0);
  profilecell.colSpan = "2";

  for(var i=0; i<profile.length; i++){
    var profileTable = document.createElement('table');
    var user = profile[i];
    var cell = document.createElement('tr');
    seeProfile = document.createElement('button');
    seeProfile.innerHTML = '<b>See Profile</b>';
    imgSrc = '<img src= "'+user['img']+'" height = "20"></img>';
    cell1 = cell.insertCell(0)
    cell1.innerHTML = imgSrc;
    cell2 = cell.insertCell(1)
    cell2.innerHTML = user['name'];
    cell2.style.fontSize = "15px";
    cell2.align = 'left';
    cell3 = cell.insertCell(2)
    cell3.append(seeProfile);
    cell3.align = 'right';
    cell.colSpan = "2";
    profileTable.appendChild(cell);

    var cell = document.createElement('tr');
    cell1 = cell.insertCell(0);
    cell1.colSpan = "3";
    cell1.width = 400;
    cell1.style.wordBreak = "break-all";
    cell1.style.borderStyle = "dotted";
    cell1.style.borderWidth = "1px";
    cell1.innerText = user['comment'];
    cell1.style.padding = "5px";
    cell1.align = "left";
    cell1.style.fontSize = "12px";
    profileTable.width = groupTable.width;
    profileTable.appendChild(cell);

    profilecell.append(profileTable);
  }
  profilecell.style.borderRadius = "10px";
  profilecell.style.borderStyle = "solid";
  profilecell.style.borderWidth = "1px";
  profilecell.style.padding = "5px";
  profilecell.style.backgroundColor = "#FFF";

  var cell = groupTable.insertRow(groupTable.rows.length);
  cell1 = cell.insertCell(0);
  cell1.innerHTML = 
  '<i class="far fa-calendar-alt"></i><script src="https://kit.fontawesome.com/fc9bca2b43.js" crossorigin="anonymous"></script>'
  + ' '+date;
  cell1.align = 'left';
  cell1.style.paddingLeft = '10px';

  var groupCell = table.insertRow(table.rows.length-1).insertCell(0);
  groupCell.colSpan = "2";
  groupCell.append(groupTable);
}
  buttonStyle();
}

function buttonStyle(){
  var btns = document.getElementsByTagName('button');
  for(var i=0; i<btns.length; i++){
    var btn = btns[i];
    btn.style.backgroundColor = '#FFF';
    btn.style.borderStyle = 'solid';
    btn.style.borderWidth = '1.5px';
    btn.style.borderRadius = '20px';
    btn.style.borderColor = '#20D994';
    btn.style.fontSize = '10px';
    btn.style.color = '#20D994';
    btn.style.marginBottom = '5px';
    btn.style.fontFamily = "'Baloo Thambi 2', cursive";
  }
}
function createGroup(){

}

function message(table){
}
function gotData(data){
  var val = data.val();
  if(val){

  }
}

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