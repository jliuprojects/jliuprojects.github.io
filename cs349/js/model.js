

// Establish a namespace
var electionViz = electionViz || {};

/*
 * Create a model object within the electionViz namespace.
 */
electionViz.model = function () {
	// Private instance variables
	var numCandidates = 0;
	var	candidatePositions = [];
	var observers = []; //list of callbacks
	var simulationStarted = false;
	var results = null;
	var size = 200;
	var voters = 1000;
	var sigma = 1.0;

	function addObserver(updateFunc) {
		observers.push(updateFunc);
		// updateFunc();
	}

	function updateResults(data){

		results = data;
	}

	function addCandidate(xpos, ypos) {
		if (numCandidates >= 6){
			return;
		}
		numCandidates++;
		candidatePositions.push({x: xpos, y: ypos});

		// Notify our observers
		// Save a reference to this for the function call below

		var self = this;

		for (var i = 0; i < observers.length; i++){
        	observers[i](self, {candidates: candidatePositions, data: results});
        }
	}

	function changeSize(newSize) {
		size = newSize;
	}

	function changeVoters(newVoters) {
		voters = newVoters;
	}

	function changeSigma(newSigma) {
		sigma = newSigma;
	}

	function runSimulation(){
		simulationStarted = true;

		if (candidatePositions.length < 2){
			return false;
		}

		var self = this;

		$.ajax({
            contentType: "application/json",
            dataType: "json",
            url: "http://localhost:9000/electionSimulation",
            data: JSON.stringify({
			    "candidates": candidatePositions,
			    "size": size,
			    "numVoters": voters,
			    "sigma": sigma
			}),
            method: 'POST',
            success: function (json) {

                // console.log(JSON.stringify(json));
                
                results = json;
                for (var i = 0; i < observers.length; i++){
                	observers[i](self, {candidates: candidatePositions, data: json});
                }
            }
        });

        return true;
	}

	function hasResults(){
		return simulationStarted;
	}

	console.log("Initializing the model.");
	// Return public functions
	return {
		addObserver: addObserver,
		addCandidate: addCandidate,
		runSimulation: runSimulation,
		changeSize: changeSize,
		changeVoters: changeVoters,
		changeDeviation : changeSigma
	};

};