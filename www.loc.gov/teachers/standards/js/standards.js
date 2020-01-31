// JavaScript Document

(function($) {
	$(document).ready(function() {			
				
		createStandardsForm = function(formLocation, outputData, loid){					
					
			if(!loid){
				//$.cookie('loidCookie', 'none', {path: '/'});
			}else{
				$.cookie('loidCookie', loid, {path: '/'});				
			}
		
			$.ajax({
				async: false,
				url : '/teachers/standards/standardsForm.php?formLocation='+formLocation,
				type : 'get',
				dataType : "html",
				//global: false,				
				//loid : loid,
				//data : data,
				success : function (data) {
					
					$(outputData).html(data);
					
				}
				
			});		
			
		}		
		
	});
		
})(jQuery); 