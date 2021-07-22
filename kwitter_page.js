//YOUR FIREBASE LINKS
// Your web app's Firebase configuration
var firebaseConfig = {
      apiKey: "AIzaSyDg_Krgsuexz55as02kh7IgXgtpd3usTxg",
      authDomain: "kwitter-f1517.firebaseapp.com",
      databaseURL: "https://kwitter-f1517-default-rtdb.firebaseio.com",
      projectId: "kwitter-f1517",
      storageBucket: "kwitter-f1517.appspot.com",
      messagingSenderId: "295210876874",
      appId: "1:295210876874:web:7e6de5753e4c156d759933"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name= localStorage.getItem("user_name");
    room_name= localStorage.getItem("room_name");

    function send(){
msg=document.getElementById("message").value;
firebase.database().ref(room_name).push({
 name:user_name, message:msg, like:0 });
 document.getElementById("msg").value = "";
    }
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
name=message_data["name"];
message=message_data["message"];
like=message_data["like"];
row = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4><h4 class='message_h4'>"+ message +"</h4><button class='btn btn-warning' id='"+firebase_message_id+"' value='"+like+"' onclick='updateLike(this.id)'><span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
 document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();
function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location="index.html";
      }
      function updateLike(message_id)
{
	button_id = message_id;
	likes = document.getElementById(button_id).value;
	likes_in_number = Number(likes) + 1;
	console.log(likes_in_number);

	firebase.database().ref(room_name).child(message_id).update({
		like : likes_in_number
	 });

}

