<?php
class User
{
    public $LogIn="nonFound",$Name="nonFound",$Pass="nonFound",$Email="nonFound";
}

class XMLworker
{
    public function Search($LogIn)
    {
        $xml = simplexml_load_file('Users.xml');
        foreach ($xml->User as $User) {
            if ($User->LogIn==$LogIn) {
               return true;
            }
         }
         return false;
    }
    public function AddNew($User)
    {
        $xml = simplexml_load_file('Users.xml');
        $item = $xml->addChild('User');
        $item->addChild('LogIn', $User ->LogIn);
        $item->addChild('Name', $User ->Name);
        $item->addChild('Pass', password_hash($User ->Pass, PASSWORD_DEFAULT));
        $item->addChild('Email', $User ->Email);
        file_put_contents('Users.xml', $xml->asXML());
    }
    public function LogIn($User)
    {
        $xml = simplexml_load_file('Users.xml');
        foreach ($xml->User as $UserDB) {
            if ($UserDB->LogIn==$User->LogIn) {
               
               if (password_verify($User->Pass, $UserDB->Pass)) {
                return true;
                } else {
                return false;
                }
            }      
         }
         return false;
    }
    public function Read($LogIn)
    {
        $user = new User();
        $xml = simplexml_load_file('Users.xml');
        foreach ($xml->User as $User) {
            if ($User->LogIn==$LogIn) {
               
               $user ->LogIn = $User->LogIn;
               $user ->Name = $User ->Name;
               $user ->Pass = $User->Pass;
               $user ->Email = $User->Email;
               return $user;
            }      
         }
         return $user;
    }
}

/*$bar = new XMLworker;
$user = new User();
$user ->LogIn = 'ase';
$user ->Pass = 'ase';
$user ->Email = 'ase';
$bar->Write($user);
#$a = $bar->Read('ads1');
#print $a->LogIn;*/


?>