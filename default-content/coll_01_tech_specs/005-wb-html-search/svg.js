(function() {

    var cv = d3wb.config().data("data.csv").toCanvas()
    var colors = d3wb.color.category()
    d3.csv(cv.data, function(error, data) {

        // create your actual data visualization...
        createDataVisualization(data)

        // create a callback to decide what to do
        // with the text content
        var callback = function(text) {
            console.log("-- callback='" + text + "'");
            d3.selectAll(".rects")
                .attr("stroke", function(d) {
                    if (text != "" && d["food"].includes(text)) {
                        return "red"
                    } else {
                        return "none"
                    }
                })
                .attr("fill", function(d, i) {
                    if (text != "" && d["food"].includes(text)) {
                        return "red"
                    } else {
                        return colors[i * 4]
                    }
                })
        }

        // create the search bar
        var t = d3wb.html.textfield()
            .callback(callback)
            .style("top", "10px")
            .style("left", "10px")
        cv.div.call(t)

        // create more controls for this demonstration
        createOtherControls()
    })

    var createDataVisualization = function(data) {
        var rectSize = 50
        var topSpace = 60
        var boxes = cv.selectAll(".boxes")
            .data(data).enter()
            .append("g")
            .attr("class", "boxes")
            .attr("transform", function() {
                var x = Math.random() * cv.wid - rectSize
                x = x >= 0 ? x : 0
                var y = Math.random() * cv.hei - rectSize
                y = y >= topSpace ? y : topSpace
                return "translate(" + x + "," + y + ")"
            })

        cv.selectAll(".boxes")
            .append("rect")
            .attr("class", "rects")
            .attr("fill", function(d, i) {
                return colors[i * 4]
            })
            .attr("width", rectSize).attr("height", rectSize)

        cv.selectAll(".boxes")
            .append("text")
            .attr("class", "texts")
            .text(function(d) {
                return d["animal"]
            })
            .attr("fill", "white")
            .attr("pointer-events", "none")
            .attr("dominant-baseline", "hanging")
    }

    var createOtherControls = function() {
        // add an info box how to use it
        var box = d3wb.html.infoBox()
            .controlColor(d3wb.color.foreground)
            .controlColorHover(d3wb.color.red)
            .infoColor("#fff")
            .infoFill("#444")
            .infoContent(`<b>Hover</b> rectangles to see solutions.</br><b>Use search box</b> to search animals by food.`)
            .style("top", "35px")
            .style("left", "10px")
        cv.div.call(box)

        // add solutions as tooltips
        var tooltip = wbCooltip().selector(function(d) {
            return d["food"]
        })
        cv.selectAll(".boxes").call(tooltip)
    }
})()