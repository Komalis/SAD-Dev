<?php
	//Connexion � la base de donn�e MYSQL.
	try
	{
		$bdd = new PDO('mysql:host=localhost;dbname=WebChat', 'root', '');
	}
	catch (Exception $e)
	{
			die('Erreur : ' . $e->getMessage());
	}
	$bdd->exec('INSERT INTO WebChat(pseudo, message) VALUES("Komalis", "Hello World!");
	echo "C\'est un Hello World!";
?>