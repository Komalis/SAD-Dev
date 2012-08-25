//Creation du head de la colonne.
var colonneHeadSujet = document.querySelector("#liste_topics tbody tr").getElementsByTagName('th')[2];
var colonneHeadLock = document.createElement('th');
colonneHeadLock.id = "clock";
colonneHeadLock.className = "col_moder";
document.querySelector("#liste_topics tbody tr").insertBefore(colonneHeadLock, colonneHeadSujet);
//Rajout de l'ID sur les topics.
for (i = 1 ; i < nombresSujets ; i++)
{
	jQuery("#liste_topics tbody tr")[i].id = "topic";
}
//Creation du corps de la colonne.
var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
for (var i = 1 ; i < nombresSujets ; i++)
{
	var urlTopic = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByTagName("td")[2].getElementsByTagName('a')[0].href;
	var colonneCorpsSujet = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByTagName("td")[2];
	var colonneCorpsLock = document.createElement('td');
	var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
}

//Obtenir l'URL de Lock.
jQuery('#liste_topics tbody #topic').each(function()
{
	var urlTopic = this.getElementsByTagName('td')[2].getElementsByTagName('a')[0].href;
	jQuery.ajax(
	{
		type: 'GET',
		url: urlTopic,
		success: function(data, textStatus, jqXHR)
		{
			var lockPage = document.implementation.createHTMLDocument();
			lockPage.documentElement.innerHTML = data;
			urlLock = lockPage.getElementsByClassName('bloquer')[0].href;
			alert(colonneCorpsSujet);
		}
	})
});