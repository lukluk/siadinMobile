(function($) {
$.fn.serializeFormJSON = function() {

   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};
})(jQuery);

function loadTable(tbl,tableName,iquery)
{
  
	$('loading').html(roticss_loading);
	$.getJSON('http://boxapps.net/testAPI/?jsoncallback=?',{query:iquery,call:tableName},function(data,textStatus){
		
		if(textStatus=='timeout' || textStatus=='error' || textStatus=='parsererror') //javascript storage --begin
		{			
			var xdata=$.jStorage.get(tableName,data); //offline mode , get from stograge
		}else
		{			
			$.jStorage.set(tableName,data); //online mode , get from live api
			var xdata=data;
		} //javascript storage --end		
		
			var htmlrow='';
			var htmlcol='';
			
			var rows=data[tableName];

			
			$.each( rows[0], function( key, value ) {
		  		htmlcol+='<td>'+key+'</td>';
			});

			$('#'+tbl+' .head').html(htmlcol);
			for(var i in rows)
			{
				htmlrow+='<tr><td>'+rows[i].nim+'</td>';
				htmlrow+='<td>'+rows[i].nama+'</td>';
				htmlrow+='<td>'+rows[i].alamat+'</td></tr>';
			}
			$('#'+tbl+' .row').html(htmlrow);
			$('loading').html('');
		
	});
}

function sendDataForm(form,callback)
{
	var url = $('#'+form).attr('action');
	var params = $('#'+form).serializeFormJSON();
	
	$.post(url+'&callback=?',params, function (data) {
    	callback(data);
	  });

	
	
}
