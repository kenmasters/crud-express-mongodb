'use strict';

jQuery(document).ready(function($){
	$('#update').click(function(){
		  // Send PUT Request here
		  fetch('quotes', {
		    method: 'put',
		    headers: {'Content-Type': 'application/json'},
		    body: JSON.stringify({
		      'name': 'Darth Vader',
		      'quote': 'I find your lack of faith disturbing.'
		    })
		  }).then(res => {
		  	console.log('@first then');
		  	if (res.ok) return res.json()
			}).then(data => {
			  console.log(data)
			  // window.location.reload(true)
			}).catch(function(err) {
				console.log('Something went wrong. ' + err.message)
			})
	});

	$('#delete').click(function(){
		fetch('quotes', {
		  method: 'delete',
		  headers: {'Content-Type': 'application/json'},
		  body: JSON.stringify({
		    'name': 'Darth Vader'
		  })
		})
		.then(res => {
		  if (res.ok) return res.json()
		}).
		then(data => {
		  console.log(data)
		  window.location.reload()
		})
	});
});
