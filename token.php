<?php 
function token() {
    if(!isset($_SESSION))
        throw new Exception("Sessão não iniciada.", 1);
    $token = md5(uniqid(microtime(), true));
    $_SESSION['token'] = $token; //Saving for future assess
    return $token;
}

function tokenVerify() {
    if(!isset($_SESSION))
        throw new Exception("Sessão não iniciada.", 1);
    if(!isset($_SESSION['token']))
        return false;
    if(!isset($_POST['token']))
        return false;

    return $_SESSION['token'] === $_POST['token'];
}

?>
