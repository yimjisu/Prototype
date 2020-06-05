// This allows the Javascript code inside this block to only run when the page
// has finished loading in the browser.

$( document ).ready(function() {
  var userName = "User";
  var userImg = "https://image.flaticon.com/icons/png/512/272/272075.png";
  var Name = "Veggie Paradise";
  var groups = [];
var myroom = document.getElementById("myroom");

$(myroom).css("background-color", "#2BC78C");

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
  var restaurantName = group['restaurant'];
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
  cell2 = numberRow.insertCell(1);
  cell2.innerText = restaurantName;
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

var dialog, form,
     
  // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
name = $( "#name" ),
email = $( "#email" ),
password = $( "#password" ),
allFields = $( [] ).add( name ).add( email ).add( password ),
tips = $( ".validateTips" );

function updateTips( t ) {
  tips
    .text( t )
    .addClass( "ui-state-highlight" );
  setTimeout(function() {
    tips.removeClass( "ui-state-highlight", 1500 );
  }, 500 );
}

function checkRegexp( o, regexp, n ) {
  if ( !( regexp.test( o.val() ) ) ) {
    o.addClass( "ui-state-error" );
    updateTips( n );
    return false;
  } else {
    return true;
  }
}
     
function send() {
  allFields.removeClass( "ui-state-error" );
  dialog1.dialog( "close" );
  return true;
}

dialog1 = $( "#message-form" ).dialog({
  autoOpen: false,
  height: 400,
  width: 350,
  modal: true,
  buttons: {
    "Send": send,
    Cancel: function() {
      dialog1.dialog( "close" );
    }
  },
  close: function() {
    form[ 0 ].reset();
    allFields.removeClass( "ui-state-error" );
  }
});

form = dialog1.find( "form" ).on( "submit", function( event ) {
  event.preventDefault();
  send();
});

var dialog, form,
     
// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
num = $( "#num" ),
dates = $("#date"),
start = $("#start"),
end = $( "#end" ),
comment = $( "#comment" ),
allFields = $( [] ).add( num ).add( start ).add(end).add( comment ),
tips = $( ".validateTips" );

function updateTips( t ) {
  console.log(tips);
tips
  .text( t )
  .addClass( "ui-state-highlight" );
setTimeout(function() {
  tips.removeClass( "ui-state-highlight", 1500 );
}, 500 );
}

function checkRegexp( o, regexp, n ) {
if ( !( regexp.test( o.val() ) ) ) {
  o.addClass( "ui-state-error" );
  updateTips( n );
  return false;
} else {
  return true;
}
}

function addUser() {
    allFields.removeClass( "ui-state-error" );
    console.log(start.val());
    numVal = num.val();
    if(numVal < 2){
      num.addClass( "ui-state-error" );
      updateTips( "Number has to be over 1" );
      return false;
    }
    date = dates.val();
    stime = start.val();
    etime = end.val();
    if(!date){
      dates.addClass( "ui-state-error" );
      updateTips( "Fill the date" );
      return false;
    }
    if(!stime){
      start.addClass( "ui-state-error" );
      updateTips( "Fill the time" );
      return false;
    }
    if(!etime){
      end.addClass( "ui-state-error" );
      updateTips( "Fill the time" );
      return false;
    }
    console.log(parseInt(num));
    data = {
    'restaurant': Name,
    'myroom': true,
    'profile': [{'name': userName,
      'comment': comment.val(),
      'img' : userImg}],
    'number': {'current': 1, 
    'expected': parseInt(numVal)},
    'date' : date+' '+stime+'~'+etime
    }
    ref.push(data);
    refMy.push(data);
    dialog.dialog( "close" );
    return true;
}
dialog = $( "#dialog-form" ).dialog({
autoOpen: false,
height: 400,
width: 350,
modal: true,
buttons: {
  "Create Group": addUser,
  Cancel: function() {
    dialog.dialog( "close" );
  }
},
close: function() {
  form[ 0 ].reset();
  allFields.removeClass( "ui-state-error" );
}
});

form = dialog.find( "form" ).on( "submit", function( event ) {
event.preventDefault();
addUser();
});

$( "#create-group" ).on( "click", function() {
dialog.dialog( "open" );
});

var firebaseConfig, database, ref;

function gotData(data){
  groups = [];
  var val = data.val();
 var key = Object.keys(val);
  for (var i=0; i<key.length; i++){
      var k= key[i];
      if('myroom' in val[k])  groups.push(val[k]);
    }
  console.log(groups);
  findgroup();
}

saveData();

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
  refMy = database.ref('my room');
  refMy.on('value', gotData);
}
});