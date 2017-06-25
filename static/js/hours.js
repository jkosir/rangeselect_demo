function getInitialHours() {
    if (typeof initial_hours === 'undefined') {
        return 500;
    }
    return initial_hours;
}
function setTooltipAndStats(e, v) {
    $('.noUi-handle').attr('title', parseInt(v)).tooltip('fixTitle').tooltip('show');
    function numberWithPeriods(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    $('#hours-stats').empty().append('<h4><strong>' + Math.round(v) + '</strong> annual training hours</h4>\
        <ul>\
        <li>Average of <strong>' + Math.round(v / 45) + '</strong>hrs per week</li>\
    <li><strong>' + Math.round(v * 0.0293) + '</strong>hrs of training in hardest weeks</li>\
    <li>About ' + numberWithPeriods(Math.round(v * 25.4)) + ' kilometers in season</li></ul>')
}
var slider = $('#hours-slider').noUiSlider({
    start: getInitialHours(), step: 25, connect: "lower", range: {'min': 450, 'max': 1150}
}).on('slide', setTooltipAndStats);

$(window).load(function () {
    setTooltipAndStats(1, getInitialHours());
});
var formSubmit = function (action, method, input) {
    'use strict';
    var form;
    form = $('<form />', {
        action: action,
        method: method,
        style: 'display: none;'
    });
    if (typeof input !== 'undefined' && input !== null) {
        $.each(input, function (name, value) {
            $('<input />', {
                type: 'hidden',
                name: name,
                value: value
            }).appendTo(form);
        });
    }
    form.appendTo('body').submit();
};
var submitButtonClick = function () {
    formSubmit('', 'post', {
        hours: parseInt(slider.val()),
        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
    })
};
$('.noUi-handle').tooltip({placement: 'top', trigger: 'manual'}).attr('data-original-title', 500).tooltip('show');
$('#ion_range2').ionRangeSlider({
    type: "double",
    grid: true,
    values: Array.apply(null, Array(29)).map(function (_, i) {
        return 25 * i + 450;
    })
});