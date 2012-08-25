jQuery.ajax(
	{
		type: 'GET',
		url: "http://craftinor.forumjv.com/cgi-bin/jvforums/kick_user.cgi?forum=79351&topic=3329&numero=3332&page=1&k=87e03f2ab23c16ee212a12165df767c7&motif=Autre",
		success: function(data, textStatus, jqXHR) 
		{
			alert("Success");
		}
	}
);