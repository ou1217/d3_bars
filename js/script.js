// 1.
//WHAT'S GOING ON HERE? WHERE DOES IT GET USED AND WHAT DOES IT AFFECT?
/*Define the dimension of the chartting area and is used later:height equals the css-controlled container height of 500px minus the top and bottom margins; the same for the width.*/.

var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
// 2.
//WHAT ARE x AND y ?
/*x serves to return a scaled display of values: here we used rangeRoundBands to divide the entire chart width into equally-width bands with a padding of 0.1.
Similalry, y represents y-axis:*/
var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

var y = d3.scale.linear()
    .range([height, 0]);
    
// 3.
//HOW DO THEY x AND y AXIS GET DRAWN?
/*d3.svg.axis() returns a default axis, and if scale() is 
specified with an predetermined array, it will show as the x or y controls */
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");/* 
.orient controls orientation, where "bottom" return a display of horizontal axis with ticks below;
"left"returns a vertical axis with tick on the left;*/ 
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .ticks(10, "%");/* .ticks specifis arguments of the scale: 10 ticks in total in the format of %*/

//4.
//WHERE DOES THIS APPEAR? WHAT DOES IT LOOK LIKE IN YOUR BROWSER INSPECTOR?
var svg = d3.select(".chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("js/juanbaseballcard.json", function(error, data) {
    console.log(data);
 //5.
  //WHAT'S HAPPENING HERE?
  x.domain(data.stats.map(function(d) { return d.year; }));
  y.domain([0, d3.max(data.stats, function(d) { return d.H; })]);
  
 //6.
 //WHAT'S GOING ON IN THE NEXT TWO BLOCKS?
  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
//7.
  //AND WHAT'S THIS? ARE WE ITERATING THROUGH OUR DATA HERE?
  //HOW IS THIS DIFFERENT THAN THE $.each() METHOD WE USED TO CREATE THE LAST CHART?
  svg.selectAll(".bar")
      .data(data.stats)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.year); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.H); })
      .attr("height", function(d) { return height - y(d.H); });

});

function type(d) {
  d.frequency = +d.frequency;
  return d;
}






