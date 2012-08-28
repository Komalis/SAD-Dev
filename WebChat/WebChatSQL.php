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
	//$bdd->exec('INSERT INTO WebChat(pseudo, message) VALUES("Komalis", "Hello World!")');
	//Nombre de Message
	$SQLnbMessage = $bdd->query('SELECT COUNT(pseudo) FROM WebChat');
	$nbMessage = $SQLnbMessage->fetch();
	$actualTime = $_GET['actualTime'];
	$SQLwebChat = $bdd->query('SELECT * FROM WebChat');
	echo "<p>" . $nbMessage[0] . "</p>";
	for ($i = 0 ; $i < $nbMessage[0] ; $i++)
	{
		$webChat = $SQLwebChat->fetch();
		echo "<p>" . $webChat['pseudo'] . ";" . $webChat['message'] . "</p>";
	}
?>