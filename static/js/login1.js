$('#strava-button').click(function(e) {
    if (!$('#agree-checkbox').checked) {
        e.preventDefault();
        $('#agree').fadeTo(500, 1);
        setTimeout(function() {$('#agree').fadeTo(500, 0);}, 4000);
    }
});

function changeButton() {
    if ($('#agree-checkbox').is(':checked')) {
        $('#agree').fadeTo(400, 0);
        $('.noterms').hide();
        $('.terms').show();
    }
    else {
        $('.terms').hide();
        $('.noterms').show();
    }
}