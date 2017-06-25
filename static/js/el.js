var r = new RangeBar({
    values: [[0, 24], [24, 41]], // array of value pairs; each pair is the min and max of the range it creates
    readonly: false, // whether this bar is read-only
    min: 0, // value at start of bar
    max: 52, // value at end of bar
    valueFormat: function (a) {
        return a;
    }, // formats a value on the bar for output
    valueParse: function (a) {
        return a;
    }, // parses an output value for the bar
    snap: 1, // clamps range ends to multiples of this value (in bar units)
    minSize: 9, // smallest allowed range (in bar units)
    maxSize: 24,
    maxRanges: 3, // maximum number of ranges allowed on the bar
    bgMarks: {
        count: 1, // number of value labels to write in the background of the bar
        interval: Infinity, // provide instead of count to specify the space between labels
        label: function (v) {
            return v
        } // string or function to write as the text of a label. functions are called with normalised values.
    },
    label: 'Base period',
    indicator: null, // pass a function(RangeBar, Indicator, Function?) Value to calculate where to put a current indicator, calling the function whenever you want the position to be recalculated
    allowDelete: false, // set to true to enable double-middle-click-to-delete
    deleteTimeout: 5000, // maximum time in ms between middle clicks
    vertical: false, // if true the rangebar is aligned vertically, and given the class elessar-vertical
    bounds: null, // a function that provides an upper or lower bound when a range is being dragged. call with the range that is being moved, should return an object with an upper or lower key
    htmlLabel: false, // if true, range labels are written as html
    allowSwap: false // swap ranges when dragging past
});
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
        return moment().add(w, 'week').weekday(1).format('DD. MM. YYYY');
    }

    function get_date_end(w) {
        w = w == 0 ? 0 : w - 1;
        return moment().add(w, 'week').weekday(7).format('DD. MM. YYYY');
    }

    $('#selected_peaks').empty();
    $(ranges).each(function (i, e) {
        $('#selected_peaks').append('<li>' + get_date_start(e[0]) + ' - ' + get_date_end(e[1]) + '</li>');
    });
});
$(document).ready(function () {
    $('#training-periods-panel .js-grid-text-0').attr('data-original-title', moment().weekday(1).format('DD. MM. YYYY')).tooltip({
        placement: 'bottom',
        trigger: 'manual'
    }).tooltip('show');
    $(r.$el).trigger('change');
});
