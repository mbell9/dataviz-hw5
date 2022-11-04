// import { randomNumber, linkCrossingsParam } from "./crossings.js";

var array_of_edges = [];

function parseData() {
	var text = document.getElementById("dataset").value;
	var lines = text.split("\n");
	var edges = []
	var nodes = {} 
	for(var i=1; i<lines.length-1; i++)
	{
		var l = lines[i]
		var arr = l.split("   ")
		var v1 = arr[0]
		var v2 = arr[1]
		if (!(v1 in nodes)) {
			var x1 = randomNumber(0, lines.length)
			var y1 = randomNumber(0, lines.length)
			nodes[v1] = {x:x1, y:y1}
		} else {
			var x1 = nodes[v1].x
			var y1 = nodes[v1].y
		}
		if (!(v2 in nodes)) {
			var x2 = randomNumber(0, lines.length)
			var y2 = randomNumber(0, lines.length)
			nodes[v2] = {x:x2, y:y2}
		} else {
			var x2 = nodes[v2].x
			var y2 = nodes[v2].y
		}
		edges.push({"x1":parseInt(x1), "x2":parseInt(x2), "y1":parseInt(y1), "y2":parseInt(y2)})
	}
	array_of_edges = [...edges];
	return edges;
}

function findIntersection() {
	console.log(array_of_edges)
	const intersections = linkCrossingsParam(array_of_edges);
	console.log(intersections)
	var textarea = document.getElementById("output");
	textarea.value = intersections;
}

function drawLines(incomingData) {
	var maxCoord = d3.max(incomingData, d => parseInt(d.length))
	var xScale = d3.scaleLinear().domain([0,20]).range([0,580]);
	var yScale = d3.scaleLinear().domain([0,20]).range([0,460]);
	d3.select("svg").attr("style","height: 480px; width: 600px;");
	d3.select("svg")
	.selectAll("line")
	.data(incomingData)
	.enter()
	.insert("line")
	.attr("x1", d => xScale(parseInt(d.x1)))
	.attr("y1", d => yScale(parseInt(d.y1)))
	.attr("x2", d => xScale(parseInt(d.x2)))
	.attr("y2", d => yScale(parseInt(d.y2)))
	.style("stroke", "black")
}

function dataViz(incomingData) {
	d3.selectAll("svg").selectAll("*").remove();

	if (document.getElementById("bar").checked) {
		var maxPopulation = d3.max(incomingData, d => parseInt(d.population))
		var yScale = d3.scaleLinear().domain([0,maxPopulation]).range([0,460]);
		d3.select("svg").attr("style","height: 480px; width: 600px;");
		d3.select("svg")
		.selectAll("rect")
		.data(incomingData)
		.enter()
		.append("rect")
		.attr("width", 50)
		.attr("height", d => yScale(parseInt(d.population)))
		.attr("x", (d,i) => i * 60)
		.attr("y", d => 480 - yScale(parseInt(d.population)))
		.style("fill", "#FE9922")
		.style("stroke", "#9A8B7A")
		.style("stroke-width", "1px")
	}
	else if (document.getElementById("scatter").checked) {
		// var maxPopulation = d3.max(incomingData, d => parseInt(d.population))
		var yScale = d3.scaleLinear().domain([0,100]).range([50,400]);
		var radiusScale = d3.scaleLinear().domain([0,100]).range([5,30]);
		d3.select("svg").attr("style","height: 480px; width: 600px;");
		d3.select("svg")
		.selectAll("circle")
		.data(incomingData)
		.enter()
		.append("circle")
		.attr("r", d => radiusScale(d))
		.attr("cx", (d,i) => (i * 60) + 10)
		.attr("cy", d => 480 - yScale(d))
		.style("fill", "blue")
		.style("stroke", "black")
		.style("stroke-width", "1px");
	}
}