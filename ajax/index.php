<?

if(isset($_GET['order']) )
{
	$data = json_decode($_GET['order'], true);

	$type = $data['type'];
	$phone = $data['phone'];
	$sum = $data['sum'];
	$cart = $data['cart'];
	$message = 'Тип: '.$type.';'."\r\n".'Телефон: '.$phone.';'."\r\n".'Сумма: '.$sum.';'."\r\n".'Детали заказа:'."\r\n";

	for ($i = 0; $i < count($cart); $i++) 
	{
		$message .= '{id: '.$cart[$i]['id'].', '.'товар: '.$cart[$i]['name'].', '.'объем: '.$cart[$i]['volume'].', '.'количество: '.$cart[$i]['amount'].', '.'цена: '.$cart[$i]['price'].'}'."\r\n";
	}

	echo $message;

	$from = 'MedStore';
	$to = 'atellmer@gmail.com';

	sendEmail($from, $to, $type, $message);
	exit;
}



function sendEmail($from, $to, $subject, $message) {
	$headers = 
	'From: '.$from.'@'. $_SERVER['HTTP_HOST'] . "\r\n" .
	'Reply-To: '.$from.'@'. $_SERVER['HTTP_HOST'] . "\r\n" .
	'X-Mailer: PHP/' . phpversion();
	mail($to, $subject, $message, $headers);
}
