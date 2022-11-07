var array_of_edges = []; // global variable to hold edges

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
		} else { // if it exists, just store the line to be added to edges[]
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

		// object representing a line, source:(x,y) ---> target:(x,y)
		edges.push({
			source: {
				x:parseInt(x1),
				y:parseInt(y1), 
				index:parseInt(v1) // node index
			},
			target: {
				x:parseInt(x2),
				y:parseInt(y2),
				index:parseInt(v2)
			},
			index:i-1 // line segment index (first is line 0, second is line 1,...)	
		});
	}
	array_of_edges = [...edges]; // store lines in a global variable
	return edges;
}

// finds intersections which lines intersect and outputs them
function printIntersections() {
	var intersections = linkCrossingsParam(array_of_edges);
	var textarea = document.getElementById("output");
	textarea.value = "";

	for (var i = 0; i < intersections.length; i+=2) {
		textarea.value += "segment "+intersections[i][0][2]+" crosses segment "+intersections[i][1][2]+", ";
	}
	textarea.value = textarea.value.replace(/, $/, "") + "."; // replace trailing comma with period
}

// take list of line objects, draw lines in svg
function drawLines(incomingData) {

	d3.selectAll("svg").selectAll("*").remove(); // clear previous drawing
	var maxX = d3.max(incomingData, d => parseInt(d.source.x || d.target.x)) // get largest x coordinate
	var maxY = d3.max(incomingData, d => parseInt(d.source.y || d.source.y)) // get largest y coordinate
	var xScale = d3.scaleLinear().domain([0,maxX]).range([0,580]); // x scale
	var yScale = d3.scaleLinear().domain([0,maxY]).range([0,460]); // y scale
	d3.select("svg").attr("style","height: 480px; width: 600px;");
	d3.select("svg")
	.selectAll("line")
	.data(incomingData)
	.enter()
	.insert("line")
	.attr("x1", d => xScale(parseInt(d.source.x)))
	.attr("y1", d => yScale(parseInt(d.source.y)))
	.attr("x2", d => xScale(parseInt(d.target.x)))
	.attr("y2", d => yScale(parseInt(d.target.y)))
	.style("stroke", "black")
}