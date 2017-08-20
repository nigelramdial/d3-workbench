(function() {

    var cv = d3wb.config().attr("margin", "20 20 20 20")
        .data("data.json")
        .toCanvas()

    d3.json(cv.data, function(error, data) {

        var chart = wbSankeyDiagram()
            .width(cv.wid)
            .height(cv.hei)
            .fill(d3wb.color.foreground)
            .colors(d3wb.color.ordinal())
        cv.datum(data).call(chart)

    })

})()