<?php
header('content-type:text/html;charset=utf-8');//设置字符编码

require "conn.php";

if(isset($_POST['user']) && isset($_POST['pass'])){
    $user=$_POST['user'];
    $pass=sha1($_POST['pass']);
    $result=$conn->query("select * from user where username='$user' and password='$pass' ");

    if($result->fetch_assoc()){//匹配成功
        echo true;
    }else{
        echo false;
    }

}