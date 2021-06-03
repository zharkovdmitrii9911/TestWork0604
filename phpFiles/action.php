<?php

                
include 'logIn.php';
$UserWork = new XMLworker;
if (isset($_POST['Operation'])) {
if ($_POST['Operation']=='registration') {
    if (!$UserWork->Search($_POST['Login'])){
        $user = new User();
        $user ->LogIn = $_POST['Login'];
        $user ->Name = $_POST['Name'];
        $user ->Pass = $_POST['Pass'];
        $user ->Email = $_POST['Email'];
        $UserWork->AddNew($user);
        echo '2';
    }else{
        echo '3'.$_POST['Operation'];
    }}
    elseif ($_POST['Operation']=='authorization') {
        if ($UserWork->Search($_POST['Login'])) {
            $user = new User();
            $user ->LogIn = $_POST['Login'];
            $user ->Pass = $_POST['Pass'];
            if ($UserWork->LogIn($user)) {

                $HelpUserParams= $UserWork->Read($user ->LogIn);
                $LogIn = ($HelpUserParams ->LogIn); 
                $Name = ($HelpUserParams ->Name); 
                $Email = ($HelpUserParams ->Email);  
                $array = array(
                    'LogIn' => $LogIn, 
                    'Name' => $Name,  
                    'Email' => $Email       
                );
                $json = json_encode($array);
                echo $json;
                setcookie("OnLine", true, strtotime( '+1 days' ) , '/',);
                setcookie("UserLogIn", $LogIn, strtotime( '+30 days' ) , '/',);
                setcookie("UserName", $Name, strtotime( '+30 days' ) , '/',);
                setcookie("UserEmail", $Email, strtotime( '+30 days' ) , '/',);
            }else{
                echo 'Error';
            }
        }
    
    }elseif ($_POST['Operation']=='search') {
        if ($UserWork->Search($_POST['Login'])){
            echo'Такой логин уже существует';
        }
    }   
}

/*session_start();
if (!isset($_SESSION['User'])) {
    $_SESSION['User'] = "asdasff";
}
//echo $_SESSION['User'];
//echo "<script>javascript:history.back();</script>";
if(isset($_GET['z'])) {
	header("Content-type: text/txt; charset=UTF-8");
	if($_GET['z']=='1') {
		$value = 'что-то откуда-то';

        setcookie("TestCookie", $value);
        session_start();
        echo $value;
      
        $_SESSION['AAAAAA'] = $value;
	}
	
	else {
		echo 'карявый POST запрос';
	}
}*/
/*
// создадим переменную для формирования ответа
$output ='';
// если в массиве пост есть ключ nameUser, то
if (isset($_POST['nameUser'])) {
  // в переменную name помещаем переданное с помощью запроса имя
  $name = $_POST['nameUser'];
  // добавляем в переменную output строку приветствия с именем
  $output .= 'Здравствуйте, '.$name.'! ';
  // добавляем в переменную output IP-адрес пользователя
  if ($_SERVER['REMOTE_ADDR']) {
    $output .= 'Ваш IP адрес: '. $_SERVER['REMOTE_ADDR'];
  }
  else {
   $output .= 'Ваш IP адрес неизвестен.';
  }
  // выводим ответ
  echo $output;
}*/
?>