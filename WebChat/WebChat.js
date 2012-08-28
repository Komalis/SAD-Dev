//Création de la chatBox
/*var chatBox = document.createElement('textarea');
chatBox.disabled = "disabled";
chatBox.wrap = "off";
chatBox.cols = "50";
chatBox.rows = "20";
chatBox.name = "chatBox";
document.appendChild(chatBox);*/

actualDate = new Date();
var actualTime = actualDate.getTime();
jQuery.ajax(
{
	type: 'GET',
	url: "http://localhost/WebChatSQL.php?actualTime=" + actualTime,
	success: function(data)
	{
		var chatPage = document.implementation.createHTMLDocument("chatPage");
		chatPage.documentElement.innerHTML = data;
		var nbMessage = chatPage.getElementsByTagName('p')[0].innerHTML;
		for (i = 1 ; i <= nbMessage ; i++)
		{
			var splitMSG = chatPage.getElementsByTagName('p')[i].innerHTML.split(';');
			document.getElementsByName('chatBox')[0].innerHTML += "[00:00:00] " + splitMSG[0] + ": " + splitMSG[1] + "\n";
		}
		console.log(chatPage.documentElement.innerHTML);
		//setTimeout(function(){ refreshChatBox(); }, 2000);
	}
});

function refreshChatBox()
{
	actualDate = new Date();
	var actualTime = actualDate.getTime();
	jQuery.ajax(
	{
		type: 'POST',
		url: "http://localhost/WebChatSQL.php",
		data: "actualTime=" + actualTime,
		success: function(data)
		{
			var chatPage = document.implementation.createHTMLDocument("chatPage");
			chatPage.documentElement.innerHTML = data;
			var nbMessage = chatPage.getElementsByTagName('p')[0].innerHTML;
			for (i = 1 ; i < nbMessage ; i++)
			{
				var splitMSG = chatPage.getElementsByTagName('p')[i].innerHTML.split(';');
				document.getElementsByName('chatBox')[0].innerHTML += "[00:00:00] " + splitMSG[0] + ": " + splitMSG[1] + "\n";
			}
			//setTimeout(function(){ refreshChatBox(); }, 2000);
		}
	});
};