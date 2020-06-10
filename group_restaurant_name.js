// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
  var userName = "User";
  var userImg = "https://image.flaticon.com/icons/png/512/272/272075.png";
  var groups = [];
var restaurant = document.getElementById("restaurant");
var season = document.getElementById("season");
var restaurantName;
var Result = fnGetParameterByName('name');
console.log(Result);
function fnGetParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
  results = regex.exec(location.search);
  var result = results === null ? "G" : decodeURIComponent(results[1].replace(/\+/g, " "));
  restaurantName = result.replace('_', ' ');
} 
$(restaurant).css("background-color", "#2BC78C");

var groupNumber = 0;
function setrestaurantName(){
  var cell = document.getElementById('restaurant_name');
  cell.innerText += ' '+restaurantName;
  cell.style.fontWeight = 'bold';
}
setrestaurantName();
function findgroup(){
  var table = document.getElementById('group table');
  var numRows =table.rows.length;
  console.log(table.rows.length, groups);
  for(var i=0; i<numRows ;i++){
    table.deleteRow(0);
  }
  table.style.paddingLeft = "15%";  table.style.paddingRight = "15%"; table.style.borderSpacing = "10px";
  for(var k=0; k<groups.length/3; k++){
    var groupRow = table.insertRow(table.rows.length);
  for (var j=k*3; j<(k+1)*3; j++){
    if (j == groups.length) break;
    group = groups[j];
  var profile = group['profile'];
  var number = group['number'];
  var date = group['date'];
  var groupTable = document.createElement("table");
  groupTable.style.backgroundColor = "#E7FDF5"; groupTable.style.padding = "10px"; groupTable.style.height = "300px"; groupTable.style.alignContent = "flex-start";
  groupTable.style.borderRadius = '10px'; groupTable.style.width = "350px";
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
  sendMessage.setAttribute("id", restaurantName+" #"+j.toString());
  sendMessage.onclick = function(){
    
    $("#sendtogroup")[0].innerText = "Group : "+$(this)[0].id;
    dialog1.dialog( "open" );
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
    imgSrc = '<div class="crop"><img src= "'+user['img']+'" height = "20"></img></div>';
    cell1 = cell.insertCell(0); cell1.innerHTML = imgSrc; cell1.align = 'right'; cell1.style.width = "20px";
    cell2 = cell.insertCell(1); cell2.innerHTML = user['name']; cell2.style.fontSize = "15px"; cell2.align = 'left';
    //cell3 = cell.insertCell(2); cell3.append(seeProfile); cell3.align = 'right';
    cell.colSpan = "2";
    profileTable.appendChild(cell);

    var cell = document.createElement('tr');
    cell1 = cell.insertCell(0); cell1.colSpan = "3"; cell1.width = 400;
    cell1.style.wordBreak = "break-all"; cell1.style.borderStyle = "dotted"; cell1.style.borderWidth = "1.5px"; cell1.style.borderColor="#20D994";
    cell1.innerText = user['comment']; cell1.style.padding = "1px"; cell1.style.fontSize = "15px"; 
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
  }}
}
ref.on('value', gotData);
function gotData(data){
  groups = [];
  var val = data.val();
 var key = Object.keys(val);
  for (var i=0; i<key.length; i++){
      var k= key[i];
      if(val[k]['restaurant'] == restaurantName)  groups.push(val[k]);
    }
  console.log(groups);
  findgroup();
}
});