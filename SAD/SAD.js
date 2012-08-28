//Ajout de l'état de l'Arme de modération.
function interfaceBase()
{
	var blocModeration = $(".bloc_inner")[2];
	var eltLienBase = $(".bloc_inner")[2].querySelector('p');
	var armeEtat = document.createElement('p');
	armeEtat.id = "ArmeEtat";
	armeEtat.className = "lien_base";
	armeEtat.innerHTML = "État de l'Arme: ";
	armeEtat.innerHTML += "<font color='red'>Repos</font>"
	blocModeration.insertBefore(armeEtat, eltLienBase);
};

//Change l'état de l'Arme de modération.
function changeEtat(etat, color)
{
	var armeEtat = $('#ArmeEtat')[0];
	armeEtat.innerHTML = "État de l'Arme: ";
	armeEtat.innerHTML += "<font color='"+ color +"'>"+ etat +"</font>"
} 

function lock(idTopic)
{
	var lockConfirmation = confirm("Êtes vous sûr de vouloir BLOQUER cette question ainsi que toutes ses réponses associées ?");
	if (lockConfirmation)
	{
		//Change l'état de l'Arme de Modération
		changeEtat("Lock", "green");
		var urlTopic = $('#' + idTopic.id)[0].parentNode.getElementsByTagName("td")[3].getElementsByTagName("a")[0].href;
		//Récupère le lien de Lock du Topic
		jQuery.ajax(
		{
			type: 'GET',
			url: urlTopic,
			success: function(data)
			{
				var lockPage = document.implementation.createHTMLDocument("Lock");
				lockPage.documentElement.innerHTML = data;
				var urlLock = lockPage.getElementsByClassName('bloquer')[0].href;
				//Lock du Topic
				jQuery.ajax(
				{
					type: 'GET',
					url: urlLock,
					success: function(data)
					{
						//Change l'état de l'Arme de Modération
						$('#' + idTopic.id)[0].parentNode.getElementsByTagName("td")[0].getElementsByTagName("img")[0].src = "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif";
						idTopic.onclick = function(){ delock(this); };
						changeEtat("Repos", "red");
					}
				})
			}
		})
	}
};

function delock(idTopic)
{
	var lockConfirmation = confirm("Êtes vous sûr de vouloir DÉBLOQUER cette question ainsi que toutes ses réponses associées ?");
	if (lockConfirmation)
	{
		//Change l'état de l'Arme de Modération
		changeEtat("Délock", "green");
		var urlTopic = $('#' + idTopic.id)[0].parentNode.getElementsByTagName("td")[3].getElementsByTagName("a")[0].href;
		//Récupère le lien de Lock du Topic
		jQuery.ajax(
		{
			type: 'GET',
			url: urlTopic,
			success: function(data)
			{
				var lockPage = document.implementation.createHTMLDocument("Lock");
				lockPage.documentElement.innerHTML = data;
				var urlLock = lockPage.getElementsByClassName('debloquer')[0].href;
				//Lock du Topic
				jQuery.ajax(
				{
					type: 'GET',
					url: urlLock,
					success: function(data)
					{
						//Change l'état de l'Arme de Modération
						$('#' + idTopic.id)[0].parentNode.getElementsByTagName("td")[0].getElementsByTagName("img")[0].src = "http://image.jeuxvideo.com/pics/forums/topic_dossier1.gif";
						idTopic.onclick = function(){ lock(this); };
						changeEtat("Repos", "red");
					}
				})
			}
		})
	}
};

function boutonLock()
{
	//Creation du head de la colonne.
	var colonneHeadSujet = document.querySelector("#liste_topics tbody tr").getElementsByTagName('th')[2];
	var colonneHeadLock = document.createElement('th');
	colonneHeadLock.id = "clock";
	colonneHeadLock.className = "col_moder";
	document.querySelector("#liste_topics tbody tr").insertBefore(colonneHeadLock, colonneHeadSujet);
	//Creation du corps de la colonne.
	var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
	for (var i = 1 ; i < nombresSujets ; i++)
	{
		var colonneCorpsSujet = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByTagName("td")[2];
		var colonneCorpsLock = document.createElement('td');
		colonneCorpsLock.id = "lock" + [i];
		var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
		if (imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif" || imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_marque_off.gif") 
		{
			colonneCorpsLock.onclick = function(){ delock(this); };
			colonneCorpsLock.innerHTML = '<a href="javascript:void(0);" title="Debloquer ce message"><img src="http://image.noelshack.com/fichiers/2012/26/1341119589-bt_forum_bann_48h.gif" alt="Bloquer ce message" height="12" width="11">'
			document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].insertBefore(colonneCorpsLock, colonneCorpsSujet);
		}
		else
		{
			colonneCorpsLock.onclick = function(){ lock(this); };
			colonneCorpsLock.innerHTML = '<a href="javascript:void(0);" title="Bloquer ce message"><img src="http://image.noelshack.com/fichiers/2012/26/1341119589-bt_forum_bann_48h.gif" alt="Bloquer ce message" height="12" width="11">'
			document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].insertBefore(colonneCorpsLock, colonneCorpsSujet);
		}
	}
};

interfaceBase();
boutonLock();