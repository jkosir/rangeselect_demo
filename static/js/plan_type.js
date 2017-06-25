$(document).ready(function(){

    $('.plan-buttons button').on('click', function (e) {
        $('#selected-plan').text($(e.currentTarget).attr('data-value'));
        $('.plan-buttons button').removeClass('active');
        $(e.currentTarget).addClass('active');
    });
    initial_type = undefined;
    if (typeof initial_type !== 'undefined') {
        $('#selected-plan').text($('.plan-buttons button[name="' + initial_type + '"]').attr('data-value'));
        $('.plan-buttons button[name="' + initial_type + '"]').addClass('active');
    }
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
        plan_type: $('.plan-buttons button.active').attr('name'),
        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
    })
};