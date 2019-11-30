
var firebaseConfig = {
    apiKey: "AIzaSyCOcr4HPhBal2OwvuoH97BdhvyeIbIWgJ0",
    authDomain: "trains-5079c.firebaseapp.com",
    databaseURL: "https://trains-5079c.firebaseio.com",
    projectId: "trains-5079c",
    storageBucket: "trains-5079c.appspot.com",
    messagingSenderId: "918762059216",
    appId: "1:918762059216:web:2ae0418338d4c1575e75d5",
    measurementId: "G-HK1Q01JFRE"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  var dataRef = firebase.database();


  //values: 
  var trainName = ''; 
  var destination = ''; 
  var firstTrainTime = ''; 
  var frequency = ''; 
  
  var nextArrival = '';
  var minutesAway = '';  

  //capture button click: 

  $('#addTrain').on("click", function(event){ 
    event.preventDefault(); 

    trainName = $('#trainName').val().trim(); 
    destination = $('#destination').val().trim();
    firstTrainTime = $('#firstTrainTime').val().trim(); 
    frequency = $('#frequency').val().trim();  
    
    minutesAway = moment().endOf(frequency).fromNow();
     

    dataRef.ref().push({ 
        trainName, 
        destination,
        firstTrainTime, 
        frequency,
        nextArrival,
        minutesAway,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });  
});

dataRef.ref().on('child_added', function(childSnapshot) {    
    
    console.log(childSnapshot.val().trainName);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency); 
    console.log(childSnapshot.val().nextArrival); 
    console.log(childSnapshot.val().minutesAway);

    $('#newRow').append('<tr><td>' + childSnapshot.val().trainName + '</td><td>' 
        + childSnapshot.val().destination + '</td><td>' 
        + childSnapshot.val().frequency + '</td><td>' 
        + childSnapshot.val().nextArrival + '</td><td>'
        + childSnapshot.val().minutesAway + '</td></tr>');
            
}, function(errorObject) { 
    console.log('errors handled: ' + errorObject.code);
})



