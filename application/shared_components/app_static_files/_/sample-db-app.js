function styleSalesByCatChart(options) {
    // Setup a callback function which gets called when data is retrieved, it allows to manipulate the series
    options.dataFilter = function( data ) {
        data.series[ 0 ].color = "#0B6623";
         data.series[1].color = '#9DC183';
        return data;
    };
    // Set chart initialization options
    //options.type = "line";
    return options;
}