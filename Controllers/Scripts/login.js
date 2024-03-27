//mudar a visibilidade da senha no formulário de login
function chgVsb(){
    var inputElement = document.getElementById('pwd');
    inputElement.type = 'text';
        
    }
//validar o login
function vldLgn(id,pwd){
    var id = document.getElementById('id').value;
    var pwd = document.getElementById('pwd').value;
        
    if(id == 'admin' && pwd == 'admin'){
        window.location.href = 'http://127.0.0.1:5500/Controllers/dash.html';
    }
    else{
        error[0].innerHTML('Usuário ou senha inválidos!');
    }
    
    }
 //redirecionar para a página de recuperação de acesso   
function fgtPwd(){
    
    }