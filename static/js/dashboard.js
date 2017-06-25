d3.json("/dashboard-planned-workout/", function (error, json) {
    if (error) return console.warn(error);
    var data = [{key: 'Workouts', values: json}];

    var chart = nv.models.discreteBarChart()
        .x(function (d) {
            return moment(d.date).format('Do MMM')
        })    //Specify the data accessors.
        .y(function (d) {
            if (d.report) {
                return d.report.grade
            } else return 0;
        }).valueFormat(d3.format('d'))
        .forceY([0, 10])
        .color(function (d, i) {
            return '#333333'
        })
        .tooltips(true)
        .showValues(true)
        .transitionDuration(350).tooltipContent(function (key, y, e, d) {
            return '<table class="nv-pointer-events-none">\
                    <thead>\
                    <tr class="nv-pointer-events-none">\
                        <td colspan="3" class="nv-pointer-events-none"><strong class="x-value">'+d.point.friendly_name+'</strong></td>\
                    </tr>\
                    </thead>\
                    <tbody>\
                    <tr class="nv-pointer-events-none">\
                        <td class="legend-color-guide nv-pointer-events-none">\
                            <div style="background-color: rgb(16, 207, 189);" class="nv-pointer-events-none"></div>\
                        </td>\
                        <td class="key nv-pointer-events-none">Completed</td>\
                        <td class="value nv-pointer-events-none">'+d.point.completed+'</td>\
                    </tr>\
                    </tbody>\
                </table>';
        });
    chart.yAxis.tickFormat(d3.format('d'));
    d3.select('#chart svg')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
});

