<?php header('Content-Type: text/html; charset=utf-8'); 
ini_set('display_errors',1);
ini_set('display_startup_erros',1);
error_reporting(E_ALL);

// Inclui o arquivo class.phpmailer.php localizado na pasta phpmailer
require("class.phpmailer.php");
require("class.smtp.php");

// Inicia a classe PHPMailer
$mail = new PHPMailer();
 
  $nome = $_POST['nome'];
  $email = $_POST['email'];
  $celular = $_POST['celular'];
  $cidade = $_POST['cidade'];
  $texto = $_POST['texto'];

// Define os dados do servidor e tipo de conexão
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->IsSMTP(); // Define que a mensagem será SMTP
$mail->Host = "smtp.umbler.com"; // Endereço do servidor SMTP
$mail->SMTPAuth = true; // Usar autenticação SMTP (obrigatório para smtp.seudomínio.com.br)
$mail->Username = 'contato@imovelar.com.br'; // Usuário do servidor SMTP (endereço de email)
$mail->Password = 'im*010203'; // Senha do servidor SMTP (senha do email usado)
$mail->SMTPOptions = array(
    'ssl' => array(
        'verify_peer' => false,
        'verify_peer_name' => false,
        'allow_self_signed' => true
    )
);
// Define o remetente
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->From = $email; // Seu e-mail
$mail->Sender = 'contato@imovelar.com.br'; // Seu e-mail
$mail->FromName =  $nome; // Seu nome
 
// Define os destinatário(s)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//$mail->AddAddress($email);
$mail->AddAddress('contato@imovelar.com.br', 'Lead do site'); // Copia
$mail->AddBCC('contato@novaeraweb.com.br', 'Site Imovelar'); // Cópia Oculta
 
// Define os dados técnicos da Mensagem
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->IsHTML(true); // Define que o e-mail será enviado como HTML
$mail->CharSet = 'utf-8'; // Charset da mensagem (opcional)
 
// Define a mensagem (Texto e Assunto)
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
$mail->Subject  = "Lead do Site - Imovelar"; // Assunto da mensagem 
$mail->Body = '
Lead captado através do site:<br><br>
Nome: '.$nome.'<br>
Email: '.$email.'<br>
Celular: '.$celular.'<br>
Cidade: '.$cidade.'<br>
Proposta: '.$texto.'<br>
';

$mail->AltBody = '
Contato enviado através do site por<br><br>
Nome: '.$nome.'<br>
Email: '.$email.'<br>
Proposta: '.$texto.'<br>
';
//Enviando o email 

//==================================================== 
if ($enviado = $mail->Send()){ 
        header("Location: ../index.php?enviado=true");
        } 
    else{ 
        echo "</b>Falha no envio do E-Mail!</b>"; 
echo "<b>Informações do erro:</b> " . $mail->ErrorInfo;
      }