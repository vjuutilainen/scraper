// client side javascript

window.onload = function(){

	var data;

	var getData = function(q){

		d3.json("data?address="+q.address+"&selector="+q.selector+"&properties="+q.properties, function(data){
	
			updateDivs(data);

		});
		
	};

	var prepareUI = function(){

	  var form = document.getElementById("scrapeform");
	  
	  form.onsubmit = function(e){
	    console.log("submitted");
	    e.preventDefault();

	    var address = document.scrapeform.address.value;
	    var selector = document.scrapeform.selector.value;
	    var properties = document.scrapeform.properties.value;

	    getData({address: address, selector: selector, properties: properties});
	    
	  }
	}

	initGraph();
	prepareUI();

}

initGraph = function(){

	//var width = window.innerWidth;
	//var height = window.innerHeight;

	//svg = d3.select("body").append("svg").attr("width",width).attr("height",height);

	results = d3.select('body').append('table').attr('id','results');

};

updateDivs = function(data){

	data = data;

	if(data === 'No matching elements found' || data === 'Selector and properties not defined'){



	}

	else{

	fields = Object.getOwnPropertyNames(data[0]);

	results.append('tr')
				.attr('class','headers')
				.html(function(d){

					return createSummary(d,fields);

				});

	scrapeEnter = results.selectAll('.scraperow')
				.data(data)
				.enter();

	scrapeEnter.append('tr')
			   .attr('class','scraperow')
			   .html(function(d){

			   	 	return createFields(d,fields);

			   });

	}

}

var createSummary = function(d,fields){

	var fieldstring = '';
	var fieldstart = '<td>';
	var fieldend = '</td>';

	fields.forEach(function(field){

		fieldstring = fieldstring+fieldstart+field+fieldend;

	});

	return fieldstring;

}


var createFields = function(d,fields){

	var fieldstring = '';
	var fieldstart = '<td>';
	var fieldend = '</td>';

	fields.forEach(function(field){

		fieldstring = fieldstring+fieldstart+d[field]+fieldend;

	});

	return fieldstring;

}
