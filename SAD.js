// ==UserScript==
// @name        SAD
// @namespace   http://www.jeuxvideo.com/
// @description Search and Destroy
// @include 	http://www.jeuxvideo.com/forums/*
// @version     0.1
// ==/UserScript==

function init()
{
	var urlForum = window.location.href;
	if (urlForum[32] == 0 || urlForum[48] == 2)
	{
		//Verification de la connection a la moderation.
		var moderationActif = document.querySelector("#liste_topics tbody tr").getElementsByTagName('th')[1];
		if (moderationActif.className == "col_moder")
		{
			initLockBouton();
		}
	}
}

function initLockBouton()
{
	var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
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
	//Creation de la colonne temporaire.
	jQuery('#liste_topics tbody #topic').each(function()
	{
		var colonneCorpsSujet = this.getElementsByTagName("td")[2];
		var colonneCorpsLock = document.createElement('td');
		colonneCorpsLock.innerHTML = '';
		this.insertBefore(colonneCorpsLock, colonneCorpsSujet);
	});
	//Création du bouton de Lock.
	jQuery('#liste_topics tbody #topic').each(function()
	{
		var imgTopic = this.querySelector("td img").src;
		var urlTopic = this.getElementsByTagName('td')[3].getElementsByTagName('a')[0].href;
		var boutonLock = this.getElementsByTagName('td')[2];
		var t = this;
		jQuery.ajax(
		{
			type: 'GET',
			url: urlTopic,
			success: function(data)
			{
				var lockPage = document.implementation.createHTMLDocument("Lock");
				lockPage.documentElement.innerHTML = data;
				if (imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif" || imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_marque_off.gif")
				{
					urlLock = lockPage.getElementsByClassName('debloquer')[0].href;
					boutonLock.innerHTML = '<a target="popup" href="'+ urlLock +'" title="Débloquer ce message" id="lock' + i + '"><img src="http://image.noelshack.com/fichiers/2012/26/1341119589-bt_forum_bann_48h.gif" alt="Bloquer ce message" height="12" width="11">'
				}
				else
				{
					urlLock = lockPage.getElementsByClassName('bloquer')[0].href;
					boutonLock.innerHTML = '<a target="popup" href="'+ urlLock +'" title="Bloquer ce message" id="lock' + i + '"><img src="http://image.noelshack.com/fichiers/2012/26/1341119589-bt_forum_bann_48h.gif" alt="Bloquer ce message" height="12" width="11">'
				}
			}
		})
	});
}

init();