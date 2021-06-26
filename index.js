class Graph {
	constructor(){
		this.adjacencyList = new Map();
		this.cycleContainer = [];
		this.printed = [];

	}

	addVertex(vertex = null) {
		if (vertex !== null && vertex !== '' && vertex !== undefined) {
			this.adjacencyList.set(vertex, []);
		}
	}

	addEdge(origin, destination) {
		this.adjacencyList.get(origin).push(destination);
		this.adjacencyList.get(destination).push(origin);
	}

	isNodeDone(nodeVal) {
		return !this.printed.includes(nodeVal) && !this.cycleContainer.includes(nodeVal)
	}

	print(cycleArr) {
	    let count = 0;
	    let res = '';
	    let arrow = ' -> ';
	    while (count < cycleArr.length) {
	        res += cycleArr[count] + arrow;
	        this.printed.push(cycleArr[count]);
	        count++;
	    }

	    return res;
	}

	dfs(start, parent, visited = new Set()) {
        if(this.isNodeDone(start)) {
	       this.cycleContainer.push(start);
        }

		visited.add(start);

		const destinations = this.adjacencyList.get(start);

		for (let destination of destinations) {

			if (!visited.has(destination)) {
                if (this.isNodeDone(destination)) {
                    this.cycleContainer.push(destination);
                    this.dfs(destination, start, visited);
			    }

			} else if (parent !== destination && this.cycleContainer.length > 2) {
                    if (this.isNodeDone(destination)) {
                        this.cycleContainer.push(destination);
                    }
    				const from = this.cycleContainer.findIndex(x => x === destination);
                    const cycleArr = this.cycleContainer.slice(from, this.cycleContainer.length);
    				if (cycleArr.length > 2) {
                        const res = this.print(cycleArr);
                        this.cycleContainer = [];
                        visited = new Set();
                        console.log(res + destination);
                    }

			}


		}
	}


}

var testNumbersVertices = [0, 1, 2, 3, 4];

var testNumberEdges= [
	[1, 0],
	[0, 2],
	[2, 3],
	[2, 4],
	[3, 4],
];

var graphNumbers = new Graph();

testNumbersVertices.forEach(num => graphNumbers.addVertex(num));

testNumberEdges.forEach(num => graphNumbers.addEdge(...num));

graphNumbers.dfs(1, null);

var test2Vertices = ['v1', 'v2', 'v3', 'v4', 'v5', 'v6', 'v7'];

var test2Edges = [
	['v1', 'v2'],
	['v2', 'v3'],
	['v2', 'v7'],
	['v3', 'v4'],
	['v3', 'v7'],
	['v4', 'v5'],
	['v4', 'v7'],
	['v5', 'v6'],
	['v6', 'v7'],
];

var graphTest2 = new Graph();

test2Vertices.forEach(test2Val => graphTest2.addVertex(test2Val));

test2Edges.forEach(testEdge => graphTest2.addEdge(...testEdge));

graphTest2.dfs('v1', null);

var airports = ['LAX', 'ATL', 'DFW', 'ORD', 'MEX', 'AMS', 'JFK', 'LOS', 'VKO', 'IST', 'LHR', 'AMS', 'CUN'];

var routes = [
	['LAX', 'ORD'],
	['LAX', 'MEX'],
	['MEX', 'DFW'],
	['MEX', 'CUN'],
	['CUN', 'DFW'],
	['DFW', 'ATL'],
	['DFW', 'LOS'],
	['LOS', 'AMS'],
	['JFK', 'ATL'],
	['ORD', 'ATL'],
	['ATL', 'LAX'],
	['LOS', 'VKO'],
	['VKO', 'AMS'],
	['VKO', 'IST'],
	['IST', 'LHR'],
	['AMS', 'JFK'],
	['AMS', 'IST'],
	['LHR', 'JFK'],
	['JFK', 'ORD'],
	['ATL', 'AMS'],
];

var graphAirports = new Graph();

airports.forEach(airport => graphAirports.addVertex(airport));

routes.forEach(route => graphAirports.addEdge(...route));

graphAirports.dfs('LAX', null);
