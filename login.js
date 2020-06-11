var firebaseConfig, database, ref, refMy;
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
database = firebase.database();
ref = database.ref('restaurant_name');
refMy = database.ref('my room');

database = firebase.database();
/*
var btn = document.createElement('button');
btn.innerText = 'login';
var userName, userImg;
email = $("#inemail"),
password = $("#inpassword"),
allFields = $( [] ).add( email ).add(password),
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
dialog = $( "#signIn-form" ).dialog({
autoOpen: false,
height: 400,
width: 350,
modal: true,
buttons: {
  "Login": signIn,
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
});

btn.addEventListener("click", function() {
    dialog.dialog( "open" );
});

var myroom = document.getElementById('myroom');
var user = firebase.auth().currentUser;
if(user == null){
    myroom.appendChild(btn);
}

function signIn(){
  const promise = firebase.auth().signInWithEmailAndPassword(email.val(), password.val());
  promise.catch(e=>alert(e.message));
  allFields.removeClass( "ui-state-error" );
  dialog.dialog( "close" );
  myroom.removeChild(btn);
  refProfile = database.ref('profile');
  refProfile.on('value', gotDataProfile);
  return true;
}
function gotDataProfile(data){
    user = auth.currentUser;
    groups = [];
    var val = data.val();
    var key = Object.keys(val);
    for (var i=0; i<key.length; i++){
        var k= key[i];
        if(user && val[k]['email'] == user.email){
            userName = val[k]['name'];
            userImg = val[k]['img'];
        } 
    }
}
*/
var dialog1, form,
     
  // From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
message= $( "#message" ),
allFields = $( [] ).add( message ),
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

var dialog2, form,
     
// From http://www.whatwg.org/specs/web-apps/current-work/multipage/states-of-the-type-attribute.html#e-mail-state-%28type=email%29
rname = $("#rname"),
num = $( "#num" ),
dates = $("#date"),
start = $("#start"),
end = $( "#end" ),
comment = $( "#comment" ),
allFields = $( [] ).add(rname).add( num ).add( start ).add(end).add( comment ),
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
    'restaurant': rname.val(),
    'myroom': true,
    'host': "User",
    'profile': [{'name': "User",
      'comment': comment.val(),
      'img' : "https://image.flaticon.com/icons/png/512/272/272075.png"}],
    'number': {'current': 1, 
    'expected': parseInt(numVal)},
    'date' : date+' '+stime+'~'+etime
    }
    ref.push(data);
    refMy.push(data);
    dialog2.dialog( "close" );
    return true;
}
dialog2 = $( "#dialog-form" ).dialog({
autoOpen: false,
height: 600,
width: 350,
modal: true,
buttons: {
  "Create Group": addUser,
  Cancel: function() {
    dialog2.dialog( "close" );
  }
},
close: function() {
  form[ 0 ].reset();
  allFields.removeClass( "ui-state-error" );
}
});

form = dialog2.find( "form" ).on( "submit", function( event ) {
event.preventDefault();
addUser();
});

$( "#create-group" ).on( "click", function() {

dialog2.dialog( "open" );
});

