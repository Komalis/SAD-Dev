<?php
	//Connexion à la base de donnée MYSQL.
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=WebChat', 'root', '');
	}
	catch (Exception $e)
	{
			die('Erreur : ' . $e->getMessage());
	}
	$time = $_GET['actualTime'];
	$pseudo = $_GET['pseudo'];
	$message = $_GET['message'];
	//$bdd->exec('INSERT INTO WebChat(time, pseudo, message) VALUES("", "", "")');
?>