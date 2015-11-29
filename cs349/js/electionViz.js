

/*
 * Election visualization.
 * CS349 Fall 2015  Assignment 4
 */ 

var AbstractView = function () {
};

_.extend(AbstractView.prototype, {
    _instantiateInterface: function (templateId, attachToElement) {

        // Create a container object for the content we'll add
        this.hostElement = $("<div class='view_div'></div>");

        // Attach to the document
        attachToElement.append(this.hostElement);

        // Load the template
        var clonedContent = $($("#" + templateId).html());

        // Append it to the host element
        this.hostElement.append(clonedContent);
    }
});

var MenuView = function (attachToElement, model) {
    this._instantiateInterface('menu_template', attachToElement);

    this.hostElement.find("#run_simulation_button").click(function() {
		if (model.runSimulation()){
			$("#app").css({"opacity" : "0.3"});
			$("#loader").css({"display" : "inline-block"});
			$("#run_simulation_helper").css({"display" : "none"});
		}else{
			$("#run_simulation_helper").css({"display" : "inline-block"});
		}
	});

    this.hostElement.find("#change_voters_button").click(function() {
    	$("#num_voters_display").css({"display":"none"});
    	$("#num_voters_input").css({"display":"inline-block"});
    	$("#num_voters_input_help").css({"display":"inline-block"});
    	$("#change_voters_button").css({"display":"none"});
    });
    
    this.hostElement.find("#change_deviation_button").click(function() {
    	$("#deviation_display").css({"display":"none"});
    	$("#deviation_input").css({"display":"inline-block"});
    	$("#deviation_input_help").css({"display":"inline-block"});
    	$("#change_deviation_button").css({"display":"none"});
    });

    this.hostElement.find("#deviation_input").bind("enterKey",function(e){
	   	console.log("enter pressed");
	   	if (isNaN($("#deviation_input").val()) || parseFloat($("#deviation_input").val()) > 2 || parseFloat($("#deviation_input").val()) < 0.1){
	   		$("#deviation_input").val("Invalid!");
	   		return;
	   	}

	   	model.changeDeviation(parseFloat($("#deviation_input").val()));
	   	$("#deviation_display").html($("#deviation_input").val());
	   	$("#deviation_display").css({"display":"inline-block"});
	   	$("#change_deviation_button").css({"display":"inline-block"});
	   	$("#deviation_input").css({"display":"none"});
    	$("#deviation_input_help").css({"display":"none"});
	});
	this.hostElement.find("#deviation_input").keyup(function(e){
	    if(e.keyCode == 13) {
	        $(this).trigger("enterKey");
	    }
	});

    this.hostElement.find("#num_voters_input").bind("enterKey",function(e){
	   	console.log("enter pressed");
	   	if (isNaN($("#num_voters_input").val()) || parseFloat($("#num_voters_input").val()) > 100000 || parseFloat($("#num_voters_input").val()) < 200){
	   		$("#num_voters_input").val("Invalid!");
	   		return;
	   	}

	   	model.changeVoters(parseInt($("#num_voters_input").val()));
	   	$("#num_voters_display").html($("#num_voters_input").val());
	   	$("#num_voters_display").css({"display":"inline-block"});
	   	$("#change_voters_button").css({"display":"inline-block"});
	   	$("#num_voters_input").css({"display":"none"});
    	$("#num_voters_input_help").css({"display":"none"});
	});
	this.hostElement.find("#num_voters_input").keyup(function(e){
	    if(e.keyCode == 13) {
	        $(this).trigger("enterKey");
	    }
	});

	this.hostElement.find("#resolution_changer").change(function () {
      	console.log($(this).val());
      	model.changeSize(parseInt($(this).val()));
  	});

  	this.hostElement.find("form").submit(function( e ) {
		console.log(e);
		if ($(this).children("#xpos").val() == "" || isNaN($(this).children("#xpos").val()) || parseFloat($(this).children("#xpos").val()) < -0.25 || parseFloat($(this).children("#xpos").val()) >1.25){
			$(this).children("#xpos").val("Invalid!");
	   		return false;
		}
		if ($(this).children("#ypos").val() == "" || isNaN($(this).children("#ypos").val()) || parseFloat($(this).children("#ypos").val()) < -0.25 || parseFloat($(this).children("#ypos").val()) >1.25){
			$(this).children("#ypos").val("Invalid!");
	   		return false;
		}
		model.addCandidate(parseFloat($(this).children("#xpos").val()),parseFloat($(this).children("#ypos").val()));
		$(this).children("#xpos").val("");
		$(this).children("#ypos").val("");
		return false;
	});

	this.hostElement.css({"position":"relative", "width":"100%", "margin": "0", "left" : "20px"});

}
_.extend(MenuView.prototype, AbstractView.prototype);

// var CandidateInputView = function (attachToElement, model) {
//     this._instantiateInterface('candidate_input_template', attachToElement);

    

// }
// _.extend(CandidateInputView.prototype, AbstractView.prototype);

var PlotView = function (attachToElement, model, type) {
    this._instantiateInterface('plot_template', attachToElement);

    this.hostElement.children("h2").html(type);

    var canvas =  this.hostElement.children("canvas");
    var context = canvas[0].getContext("2d");
	var pixels = context.getImageData(0, 0, canvas.width(), canvas.height());
	var bgColours = [[97, 177, 239, 255], //blue
				   [245, 126, 128, 255], //red
				   [116, 239, 97, 255], //green
				   [255, 193, 153, 255], //orange
				   [153, 76, 0, 255], //brown
				   [255, 128, 255, 255]]; //pink
	var canColours = ["blue", //blue
				   "red", //red
				   "green", //green
				   "#e68a00", //orange
				   "#663300", //brown 
				   "#b300b2"]; //pink

	canvas.click(function(e) {
		var x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
		var y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;

		x -= canvas.offset().left;
		y -= canvas.offset().top;

		x = x*1.5/canvas.width() - 0.25;
		y = y*1.5/canvas.height() - 0.25;
		model.addCandidate(x,y);
		// debugger;
	});

    model.addObserver(function (model, response) {

    	if (response.data != null){
	    	var index = response.data.electoralSystems.indexOf(type);
	    	var pixelDim = 200;//Math.round(canvas.height());
	    	var diff = Math.round(pixelDim/response.data.results.length);

	    	for (var row = 0; row < response.data.results.length; row++){
	    		for (var col = 0; col < response.data.results[row].length; col++){
	    			var result = response.data.results[row][col][index];
	    			var pindex = (col*diff*pixelDim + row*diff)*4; // switch columns and rows to match profs

	    			for (var pRow = 0; pRow < diff; pRow++){
	    				for (var pCol = 0; pCol < diff; pCol++){

	    					pixels.data[pindex+pCol*4+pRow*4*pixelDim] = bgColours[result][0];
    						pixels.data[pindex+1+pCol*4+pRow*4*pixelDim] = bgColours[result][1];
    						pixels.data[pindex+2+pCol*4+pRow*4*pixelDim] = bgColours[result][2];
    						pixels.data[pindex+3+pCol*4+pRow*4*pixelDim] = bgColours[result][3];
	    				}
	    			}
	    		}
	    	}
	    	context.putImageData(pixels, 0, 0);
	    	plots_graphed = true;
    	}

    	if (response.candidates != null){
    		for (var i = 0; i < response.candidates.length; i++){


    			context.fillStyle=canColours[i];
    			context.fillRect((parseFloat(response.candidates[i].x) + 0.25) * canvas.width()/1.5 - 5, (parseFloat(response.candidates[i].y) + 0.25) * canvas.height()/1.5 - 5, 10, 10);
    			context.rect((parseFloat(response.candidates[i].x) + 0.25) * canvas.width()/1.5 - 5, (parseFloat(response.candidates[i].y) + 0.25) * canvas.height()/1.5 - 5,10,10);
    			context.stroke();
    		}
    	}

		$("#app").css({"opacity" : "1"});
		$("#loader").css({"display" : "none"});
    });
};
_.extend(PlotView.prototype, AbstractView.prototype);

$(function() {
	console.log("Execution begins in electionViz.js");
	var model = electionViz.model();
	
	//plots
	var fptpPlot = new PlotView($("#app"), model, "FPTP");
	var condorcetPlot = new PlotView($("#app"), model, "Condorcet");
	var bordaPlot = new PlotView($("#app"), model, "Borda");
	var IRVPlot = new PlotView($("#app"), model, "IRV");

	var menuView = new MenuView($("#app"), model);
});
