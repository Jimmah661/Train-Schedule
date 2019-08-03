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
    var first = moment(($('#firstTime').val().trim()), 'HH:mm').format('HH:mm')
    var freq = $('#frequency').val().trim();

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

// Populate table on page load
database.ref('/newTrain').on('child_added', function (snap) {
    var trainRow = $('<tr>');

    //SAME AS REMAININGTIME BELOW, JUST READABLE
    // var trainTime = moment(snap.val().first, "HH:mm")
    // var difference = moment().diff(trainTime, 'minutes');
    // var remainingTime = parseInt(snap.val().freq) - (difference % parseInt(snap.val().freq));

    var remainingTime = parseInt(snap.val().freq) - ((moment().diff(moment(snap.val().first, "HH:mm"), 'minutes')) % parseInt(snap.val().freq));

    trainRow.append($('<td>' + snap.val().name + '</td>'));
    trainRow.append($('<td>' + snap.val().dest + '</td>'));
    trainRow.append($('<td>' + snap.val().freq + '</td>'));
    trainRow.append($('<td>' + moment().add(remainingTime, 'minutes').format('LT') + '</td>'));
    if (remainingTime == 0) {
        trainRow.append($('<td>Arriving Now!</td>'))
    }
    else {
        trainRow.append($('<td>' + remainingTime + ' Minutes</td>'));
    }

    $('#trainList').append(trainRow)
});