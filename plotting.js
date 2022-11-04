var array_of_edges = []; // trying to use global variable, idk

// read data in the input box and generate random coordinates for each node
function parseData() { 
	var text = document.getElementById("dataset").value;
	var lines = text.split("\n");
	var edges = []
	var nodes = {} 
	
	// skip header, read line-by-line
	for(var i=1; i<lines.length-1; i++)
	{
		var l = lines[i]
		var arr = l.split("   ")
		var v1 = arr[0] // vertex 1
		var v2 = arr[1] // vertex 2
		
		// if the node is not assigned coordinates, generate them and add to nodes dict
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
		// object representing a line, (x1,y1) ---> (x2,y2)
		edges.push({"x1":parseInt(x1), "x2":parseInt(x2), "y1":parseInt(y1), "y2":parseInt(y2)})
	}
	array_of_edges = [...edges]; // want to store lines in a global variable, not sure how
	return edges;
}

// should return an array of intersections, takes
function findIntersection() {
	console.log(array_of_edges) // TEST: prints empty
	const intersections = linkCrossingsParam(array_of_edges); // method from crossings.js, on line 789
	var textarea = document.getElementById("output");
	textarea.value = intersections;
}

// take list of line objects {x1:x1,y1:y1,x2:x2,y2:y2}, draw lines in svg
function drawLines(incomingData) {
	var maxCoord = d3.max(incomingData, d => parseInt(d.length))
	var xScale = d3.scaleLinear().domain([0,20]).range([0,580]); // x scale
	var yScale = d3.scaleLinear().domain([0,20]).range([0,460]); // y scale
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
