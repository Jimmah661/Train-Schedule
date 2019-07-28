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

    var name = snap.val().name;
    var dest = snap.val().dest;
    var first = snap.val().first;
    var freq = snap.val().freq;

    trainRow.append($('<td>' + name + '</td>'));
    trainRow.append($('<td>' + dest + '</td>'));
    trainRow.append($('<td>' + freq + '</td>'));

    $('#trainList').append(trainRow)
});