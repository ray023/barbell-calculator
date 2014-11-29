function draw_bar_with_weights() 
{
		var WIDTH_FACTOR	=	.8; //80% of screen size
		var HEIGHT_FACTOR	=	.1; //10% of height size
		var WEIGHT_SPACER	=	 2;
		var ctx = $("#_barCanvas")[0].getContext("2d");
		
		ctx.canvas.width  = (window.innerWidth	*	WIDTH_FACTOR);
		ctx.canvas.height = (window.innerHeight	*	HEIGHT_FACTOR);
		
		var bar_width	=	ctx.canvas.width * .8;
		var bar_height	=	ctx.canvas.height * .1;
		var bar_x		=	(ctx.canvas.width - bar_width)
		var bar_y		=	(ctx.canvas.height * .5)	

		var plate_stop_width	=	bar_width * .01;
		var plate_stop_height	=	bar_height * 4;
		var plate_stop_y		=	bar_y - ((plate_stop_height - (bar_y / 2)));
		var rubber_plate_height	=	bar_height * 8;
		var rubber_plate_y		=	(ctx.canvas.height / 2) - (rubber_plate_height/2) + (bar_height/2);
		var small_plate_height	=	plate_stop_height;
		var small_plate_y		=	plate_stop_y;
		var left_plate_stop_x	=	bar_x + (bar_width * .3);
		var right_plate_stop_x	=	bar_x + (bar_width * .7);
		
		var forty_five_plate_width		=	bar_width * .04;
		var thirty_five_plate_width		=	bar_width * .03;
		var twenty_five_plate_width		=	bar_width * .025;
		var fifteen_five_plate_width	=	bar_width * .02;
		var ten_plate_width				=	bar_width * .015;
		var small_plate_width			=	bar_width * .01;
				
		//Draw Bar
		ctx.fillStyle = "black";
		ctx.fillRect (bar_x, bar_y, bar_width, bar_height);
		
		//Draw Plate stop left
		ctx.fillStyle = "black";
		ctx.fillRect (left_plate_stop_x, plate_stop_y, plate_stop_width, plate_stop_height);
		
		//Draw Plate stop right
		ctx.fillStyle = "black";
		ctx.fillRect (right_plate_stop_x, plate_stop_y, plate_stop_width, plate_stop_height);
		
		var current_plate_left_x	=	left_plate_stop_x;
		var current_plate_right_x	=	right_plate_stop_x + plate_stop_width;
		var current_plate_width = 0;
		var current_plate_height = 0;
		var current_plate_y	=	0;
		var current_plate_color	=	'';

		if (typeof sessionStorage['plates'] === 'undefined') 
			return;
		
		var storedNames=JSON.parse(sessionStorage['plates']);
		
		for (var plateCounter=0; plateCounter<storedNames.length; plateCounter++) {
			var $plate_value	=	parseFloat(storedNames[plateCounter]);

			switch ($plate_value)
			{
			case 45:
				current_plate_width		=	forty_five_plate_width;
				current_plate_color		=	'red';
				current_plate_height	=	rubber_plate_height;
				current_plate_y			=	rubber_plate_y;
				break;
			case 35:
				current_plate_width		=	thirty_five_plate_width;
				current_plate_color		=	'blue';
				current_plate_height	=	rubber_plate_height;
				current_plate_y			=	rubber_plate_y;
				break;
			case 25:
				current_plate_width		=	twenty_five_plate_width;
				current_plate_color		=	'chocolate';
				current_plate_height	=	rubber_plate_height;
				current_plate_y			=	rubber_plate_y;
				break;
			case 15:
				current_plate_width		=	fifteen_five_plate_width;
				current_plate_color		=	'teal';
				current_plate_height	=	rubber_plate_height;
				current_plate_y			=	rubber_plate_y;
				break;
			case 10:
				current_plate_width		=	ten_plate_width;
				current_plate_color		=	'green';
				current_plate_height	=	rubber_plate_height;
				current_plate_y			=	rubber_plate_y;
				break;
			case 5:
				current_plate_width		=	small_plate_width;
				current_plate_color		=	'orange';
				current_plate_height	=	small_plate_height;
				current_plate_y			=	small_plate_y;
				break;
			case 2.5:
				current_plate_width		=	small_plate_width;
				current_plate_color		=	'purple';
				current_plate_height	=	small_plate_height;
				current_plate_y			=	small_plate_y;
				break;
			case 0.25:
				current_plate_width		=	small_plate_width;
				current_plate_color		=	'steelblue';
				current_plate_height	=	small_plate_height;
				current_plate_y			=	small_plate_y;
				break;

			}
			current_plate_left_x	=	current_plate_left_x - current_plate_width;

			ctx.fillStyle	=	current_plate_color;
			ctx.fillRect(current_plate_left_x, current_plate_y, current_plate_width, current_plate_height);
			ctx.fillStyle	=	current_plate_color;
			ctx.fillRect(current_plate_right_x, current_plate_y, current_plate_width, current_plate_height);
			current_plate_right_x	=	current_plate_right_x + current_plate_width + WEIGHT_SPACER;
			current_plate_left_x = current_plate_left_x - WEIGHT_SPACER;
		}

}


function recalculate_weight()
{
	var running_tally	=	parseInt($('#_barbellBase').val());	

	if (typeof sessionStorage['plates'] != 'undefined') {
		var storedNames=JSON.parse(sessionStorage['plates']);

		for (var i=0; i<storedNames.length; i++)
			running_tally = running_tally + (storedNames[i] * 2);
		
		if ((storedNames.length - 1) < 0)
		{
			$('#undo').text('No plates on bar');
			$('#plates_on_bar').html('');
		}
		else
		{
			$('#undo').text('Drop ' + storedNames[storedNames.length - 1]);
			$('#plates_on_bar').html(storedNames.join(' | '));
		}

		draw_bar_with_weights();
		
	}
	else
	{
		$('#undo').text('No plates on bar');
		$('#plates_on_bar').html('');
		
		draw_bar_with_weights();
	}
	
	
	
	$('#_calculatedWeight').text(running_tally);
		
}

function fill_plate_count() {
	
	//See if there is a weight that needs to be preloaded into the plate counts
	if(!sessionStorage.weight_value)
		return;
	
	var weight_value = sessionStorage.weight_value;
	sessionStorage.removeItem("weight_value");
	
	if (weight_value < 33) 
	{
		recalculate_weight();
		return;
	}
	
	if (weight_value >= 45)
	{
		$('#_barbellBase').val('45');
		weight_value = weight_value - 45;
	}
	else
	{
		$('#_barbellBase').val('33');
		weight_value = weight_value - 33;
	}
	
	$('#_barbellBase').slider('refresh');
	
	if (weight_value < .5) //Smallest weight
	{
		recalculate_weight();
		return;
	}
	
	var plateArray	=	[45,35,25,10,5,2.5,.5,.25]
	var storedPlates=[];
	var storedplateCount=0;
	
	for (var tt = 0; tt < plateArray.length; tt++) {
		var plate_value	=	parseFloat(plateArray[tt]);
		if (weight_value >= (plate_value * 2))
		{
			//Set plate count:
			plate_count = Math.floor((Math.floor(weight_value / plate_value)) / 2);
			for (var mm = 1; mm <= plate_count; mm++ ) {
				storedPlates[storedplateCount]	=	plate_value;
				storedplateCount++;
			}
			weight_value = weight_value - (plate_value * plate_count * 2);
			if (weight_value == 0)
				break; //leave the for
		}
	}
	sessionStorage['plates']=JSON.stringify(storedPlates);
	
	recalculate_weight();
}