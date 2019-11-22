
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
  var newRowAdd = ''; 

  //capture button click: 

  $('#addTrain').on("click", function(event){ 
    event.preventDefault(); 

    trainName = $('#trainName').val().trim(); 
    destination = $('#destination').val().trim();
    firstTrainTime = $('#firstTrainTime').val().trim(); 
    frequency = $('#frequency').val().trim();  
    newRowAdd = $("#newRow").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + firstTrainTime + "</td><td>" + frequency + "</td></tr>")
    
    dataRef.ref().push({ 
        trainName: trainName, 
        destination: destination,
        firstTrainTime: firstTrainTime, 
        frequency: frequency,
        newRowAdd: newRowAdd,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    
    
})

  dataRef.ref().on('child_added', function(childSnapshot) {    
    console.log(childSnapshot.val()); 
    console.log("hi")
    $('#newRow').append(childSnapshot.val().newRowAdd) 
    
    }, function(errorObject) { 
    console.log('errors handled: ' + errorObject.code);
    })

dataRef.ref().orderByChild('dataAdded').limitToLast(1).on('child_added', function(snapshot) {
    $('#newRow').text(snapshot.val().newRowAdd); 
})

