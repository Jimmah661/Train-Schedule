// Initialise Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCU9OtgZ3fqyQulZ_mEDmu01pnmfCJ3j-c",
    authDomain: "train-timetable-77fa2.firebaseapp.com",
    databaseURL: "https://train-timetable-77fa2.firebaseio.com",
    projectId: "train-timetable-77fa2",
    storageBucket: "",
    messagingSenderId: "1022215882729",
    appId: "1:1022215882729:web:76b388fcc1814688"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();


// On click function to deal with submitting new train times
$('button').on('click', function (event) {
    event.preventDefault();

    var name = $('#trainName').val().trim();
    var dest = $('#destination').val().trim();
    var first = $('#firstTime').val().trim();
    var freq = $('#frequency').val().trim();

    console.log(name, dest, first, freq);
    $('#trainName').val("");
    $('#destination').val("");
    $('#firstTime').val("");
    $('#frequency').val("");

    database.ref('/newTrain').push({
        name: name,
        dest: dest,
        first: first,
        freq: freq
    });
});

database.ref('/newTrain').on('child_added', function (snap) {
    var trainRow = $('<tr>');

    var trainTime = moment(snap.val().first, "HH:mm")
    console.log(trainTime)
    // var name = snap.val().name;
    var dest = snap.val().dest;
    var first = snap.val().first;
    var freq = snap.val().freq;
    var time = moment().from(trainTime)
    console.log(time)

    // Steps to work out the Time till next and the minutes remaining
    // minus the initial time from the current time
    // times the number of hours by 60 and add to the minutes to get minutes elapsed
    // get the modulus remainder of the minutes elapsed by the frequency
    // times the modulus remainder by the frequency
    // minus the modulus*frequency from the minutes elapsed to get time till next train
    // minus the time till next train from the frequency and add to current time to get the next departure time

    trainRow.append($('<td>' + snap.val().name + '</td>'));
    trainRow.append($('<td>' + snap.val().dest + '</td>'));
    trainRow.append($('<td>' + snap.val().freq + '</td>'));
    trainRow.append($('<td>' + "Next Arrival" + '</td>'));
    trainRow.append($('<td>' + "Minutes Away" + '</td>'));

    $('#trainList').append(trainRow)
});