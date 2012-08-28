// ==UserScript==
// @name        SAD-Dev
// @description Search and Destroy
// @include     http://www.jeuxvideo.com/forums/*
// @version     1.0.0
// ==/UserScript==

var isMassLock = 0;
var isMassDelock = 0;

//Ajout de l'état de l'Arme de modération.
function interfaceBase()
{
	var blocModeration = $(".bloc3")[0].getElementsByClassName('bloc_inner')[0];
	var eltLienBase = blocModeration.getElementsByTagName('p')[1];
	var armeEtat = document.createElement('p');
	armeEtat.id = "ArmeEtat";
	armeEtat.className = "lien_base";
	armeEtat.innerHTML = "État de l'Arme: ";
	armeEtat.innerHTML += "<font color='red'>Repos</font>"
	blocModeration.insertBefore(armeEtat, eltLienBase);
};

//Ajout du Mass Lock
function interfaceMassLock()
{
	var blocModeration = $(".bloc3")[0].getElementsByClassName('bloc_inner')[0];
	var eltLienBase = blocModeration.getElementsByTagName('p')[1];
	var massLockBouton = document.createElement('a');
	massLockBouton.id = "MassLock";
	massLockBouton.className = "lien_base";
	massLockBouton.innerHTML = "Mass Lock";
	massLockBouton.href = "javascript:void(0)";
	massLockBouton.onclick = function(){ massLock(); };
	blocModeration.insertBefore(massLockBouton, eltLienBase);
}

//Ajout du Mass Délock
function interfaceMassDelock()
{
	var blocModeration = $(".bloc3")[0].getElementsByClassName('bloc_inner')[0];
	var eltLienBase = blocModeration.getElementsByTagName('p')[1];
	var massDelockBouton = document.createElement('a');
	massDelockBouton.id = "MassDélock";
	massDelockBouton.className = "lien_base";
	massDelockBouton.innerHTML = "Mass Délock";
	massDelockBouton.href = "javascript:void(0)";
	massDelockBouton.onclick = function(){ massDelock(); };
	blocModeration.insertBefore(massDelockBouton, eltLienBase);
}

//Change l'état de l'Arme de modération.
function changeEtat(etat, color)
{
	var armeEtat = $('#ArmeEtat')[0];
	armeEtat.innerHTML = "État de l'Arme: ";
	armeEtat.innerHTML += "<font color='"+ color +"'>"+ etat +"</font>"
} 

function lock(idTopic)
{
	if (isMassLock)
	{
		var lockConfirmation = 1;
	}
	else
	{
		var lockConfirmation = confirm("Êtes vous sûr de vouloir BLOQUER cette question ainsi que toutes ses réponses associées ?");
	}
	if (lockConfirmation)
	{
		//Change l'état de l'Arme de Modération
		if (!isMassLock)
		{
			changeEtat("Lock", "green");
		}
		var urlTopic = $('#' + idTopic.id)[0].parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
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
						$('#' + idTopic.id)[0].parentNode.getElementsByTagName("td")[1].getElementsByTagName("img")[0].src = "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif";
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
	if (isMassDelock)
	{
		var lockConfirmation = 1;
	}
	else
	{
		var lockConfirmation = confirm("Êtes vous sûr de vouloir DÉBLOQUER cette question ainsi que toutes ses réponses associées ?");
	}
	if (lockConfirmation)
	{
		//Change l'état de l'Arme de Modération
		if (!isMassDelock)
		{
		changeEtat("Délock", "green");
		}
		var urlTopic = $('#' + idTopic.id)[0].parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
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
						$('#' + idTopic.id)[0].parentNode.getElementsByTagName("td")[1].getElementsByTagName("img")[0].src = "http://image.jeuxvideo.com/pics/forums/topic_dossier1.gif";
						idTopic.onclick = function(){ lock(this); };
						changeEtat("Repos", "red");
					}
				})
			}
		})
	}
};

function massLock()
{
	var lockConfirmation = confirm('Êtes vous sûr de vouloir BLOQUER ces question ainsi que toutes ses réponses associées ?'); 
	if (lockConfirmation)
	{
		changeEtat("Mass Lock", "green")
		//Ce qui se passe quand on appuit sur le bouton.
		var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
		for (var i = 1 ; i < nombresSujets ; i++)
		{
			var checkBoxSelection = document.querySelector("#selec" + i);
			if (checkBoxSelection.checked)
			{
				var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
				var urlTopic = checkBoxSelection.parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
				if (imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_marque_on.gif" || imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_dossier2.gif" || imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_dossier1.gif") 
				{
					isMassLock = 1;
					$('#lock' + i).click();
					isMassLock = 0;
				}
			}
		}
	}
};

function massDelock()
{
	var lockConfirmation = confirm('Êtes vous sûr de vouloir DÉBLOQUER ces question ainsi que toutes ses réponses associées ?'); 
	if (lockConfirmation)
	{
		changeEtat("Mass Délock", "green")
		//Ce qui se passe quand on appuit sur le bouton.
		var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
		for (var i = 1 ; i < nombresSujets ; i++)
		{
			var checkBoxSelection = document.querySelector("#selec" + i);
			if (checkBoxSelection.checked)
			{
				var imgTopic = document.querySelector("#liste_topics tbody").getElementsByTagName('tr')[i].querySelector("td img").src;
				var urlTopic = checkBoxSelection.parentNode.parentNode.getElementsByTagName("td")[4].getElementsByTagName("a")[0].href;
				if (imgTopic == "http://image.jeuxvideo.com/pics/forums/topic_cadenas.gif") 
				{
					isMassDelock = 1;
					$('#lock' + i).click();
					isMassDelock = 0;
				}
			}
		}
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
		var colonneCorpsSujet = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByTagName("td")[3];
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

function colonneSelectionTopic()
{
	//Creation du head pour la colonne.
	var nombresSujets = document.querySelector("#liste_topics tbody").childElementCount;
	var colonneHeadSujet = document.querySelector("#liste_topics tbody tr").getElementsByTagName('th')[0];
	var colonneHeadSelection = document.createElement('th');
	var allSelection = 0;
	colonneHeadSelection.id = "cselect";
	colonneHeadSelection.className = "col_moder";
	document.querySelector("#liste_topics tbody tr").insertBefore(colonneHeadSelection, colonneHeadSujet);
	//Creation du corps de la colonne.
	for (var i = 1 ; i < nombresSujets ; i++)
	{
		var colonneCorpsSujet = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByTagName("td")[0];
		var colonneCorpsSelection = document.createElement('td');
		var checkBoxSelection = document.createElement('input');
		var targetList = localStorage['targetList'];
		var pseudoListe = document.createElement("option");
		pseudoListe.id = "autoSelec";
		pseudoListe.name = "autoSelec";
		pseudoListe.innerHTML = targetList;
		var targetNumber = pseudoListe.childElementCount;
		var pseudonyme = document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].getElementsByClassName("pseudo")[0].innerHTML;
		checkBoxSelection.id = "selec" + [i];
		checkBoxSelection.name = "selec" + [i];
		checkBoxSelection.type = "checkbox";
		checkBoxSelection.align = "center";
		for (var j = 0 ; j < targetNumber ; j++)
		{
			if (pseudoListe.getElementsByTagName("option")[j].innerHTML == pseudonyme)
			{
				checkBoxSelection.checked = "checked";
			}
		}
		document.querySelector("#liste_topics tbody").getElementsByTagName("tr")[i].insertBefore(colonneCorpsSelection, colonneCorpsSujet).appendChild(checkBoxSelection);
	}
	var headCheckBoxSelection = document.createElement('input');
	headCheckBoxSelection.id = "selec0";
	headCheckBoxSelection.name = "selec0";
	headCheckBoxSelection.type = "checkbox";
	headCheckBoxSelection.align = "center";
	headCheckBoxSelection.addEventListener("click", function()
	{ 
		if (allSelection == 0)
		{
			for ( var i = 1 ; i < nombresSujets ; i++)
			{
				document.querySelector("#selec" + [i]).checked = "checked";
			}
			allSelection = 1;
		}
		else if (allSelection == 1)
		{
			for ( var i = 1 ; i < nombresSujets ; i++)
			{
				document.querySelector("#selec" + [i]).checked = "";
			}
			allSelection = 0;
		}
	}, false);
	document.querySelector("#cselect").appendChild(headCheckBoxSelection);
};

colonneSelectionTopic();
interfaceBase();
interfaceMassLock();
interfaceMassDelock();
boutonLock();