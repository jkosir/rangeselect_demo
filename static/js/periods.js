function getInitialPeaks() {
    if (typeof initial_peaks === 'undefined') {
        return [[0, 24], [24, 41]];
    }
    var temp = [[0]];
    for (var i = 0; i < initial_peaks.length; i++) {
        temp[i].push(initial_peaks[i]);
        temp[i + 1] = [initial_peaks[i]];
    }
    temp.pop();
    return temp;
}

var r = new RangeBar({
    values: getInitialPeaks(), // array of value pairs; each pair is the min and max of the range it creates
    readonly: false, // whether this bar is read-only
    min: 0, // value at start of bar
    max: 52, // value at end of bar
    snap: 1, // clamps range ends to multiples of this value (in bar units)
    minSize: 9, // smallest allowed range (in bar units)
    maxSize: 24,
    maxRanges: 3, // maximum number of ranges allowed on the bar
    label: 'Base period', allowDelete: false, // set to true to enable double-middle-click-to-delete
    vertical: false, // if true the rangebar is aligned vertically, and given the class elessar-vertical
    bounds: null, // a function that provides an upper or lower bound when a range is being dragged. call with the range that is being moved, should return an object with an upper or lower key
    htmlLabel: false, // if true, range labels are written as html
    allowSwap: false // swap ranges when dragging past
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
        ranges: JSON.stringify(r.val()),
        csrfmiddlewaretoken: document.getElementsByName('csrfmiddlewaretoken')[0].value
    })
};
/**
 * Created by JKosir on 8. 02. 2017.
 */
$('#range_slider').append(r.$el);
$('#ion_range').ionRangeSlider({
    type: "double",
    grid: true,
    from: 0,
    values: Array.apply(null, Array(53)).map(function (_, i) {
        return i;
    })
});

$(r.$el).on('change', function (ev, ranges) {
    ranges = r.squeezeRanges();
    function get_date_start(w) {
        return moment().add(w, 'week').startOf('week').format('DD. MM. YYYY');
    }

    function get_date_end(w) {
        w = w == 0 ? 0 : w - 1;
        return moment().add(w, 'week').endOf('week').format('DD. MM. YYYY');
    }

    $('#selected_peaks').empty();
    $(ranges).each(function (i, e) {
        $('#selected_peaks').append('<li>' + get_date_start(e[0]) + ' - ' + get_date_end(e[1]) + '</li>');
    });
});
$(document).ready(function () {
    $('#training-periods-panel .js-grid-text-0').attr('data-original-title', moment().startOf('week').format('DD. MM. YYYY')).tooltip({
        placement: 'bottom',
        trigger: 'manual'
    }).tooltip('show');
    $(r.$el).trigger('change');
});

