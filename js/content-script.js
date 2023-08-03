// const ws = new WebSocket('ws://localhost:9696');
// ws.onopen = function () {
//     console.log("Connected")
//   };

 $(document).ready(function() {
	$("#webPrint, .olorinPlugin").on("click", function(event) {
		var printer = $(this).data('printer');
		var printDiv = $(this).data('print');
		console.log(printer)
		console.log(printDiv)

		// fetch printer name , page width and height corresponding to that printer
	    chrome.storage.local.get([printer,printer+"_width",printer+"_height"]).then(value => {
		  var pageWidthVariable = printer+"_width";
		  var pageHeightVariable = printer+"_height";
		  var pageWidth = 0;
		  var pageHeight = 0;
		  if(value && value[pageWidthVariable]){
			pageWidth = value[pageWidthVariable]
		  }
		  if(value && value[pageHeightVariable]){
			pageHeight = value[pageHeightVariable]
		  }
		  if(value && value[printer]){
		  	var printerName = value[printer]
		  	var printContent = $(printDiv).html()
		  	if(printContent && printerName){
		  		const ws = new WebSocket('ws://localhost:9696');
		  		ws.onopen = function () {
				    const message = {
					    id: 'print',
					    text: 'printer-command',
					    content:printContent,
					    printer:printerName,
						pageWidth:pageWidth,
						pageHeight:pageHeight
					  };
					    ws.send(JSON.stringify(message));
				  };
				  // check if message is received
					ws.onmessage = function(event) {
					  const data = JSON.parse(event.data);
					   // Check the identifier or unique property
					    if (data.id === 'printerList') {
					        // updatePrinter(data)
					    } 
					};
		  	}
		  }
		});

	}) 	
 })