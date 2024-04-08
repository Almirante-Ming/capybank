const style_css = require('./css.js') 

const login = `
<!DOCTYPE html>
<html lang="pt_BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="login.css">
    <script src="../Controllers/Scripts/login.js"></script>
    <title>CapyBank Login</title>
    <style>
        ${style_css}
    </style>
</head>

<body>

    <div class="container">
        <div class="container-left">
            <div class="logo-tudo">
                <div class="logo">
                    <!-- <img src="../imgs/capi.png" alt=""> -->
                    <span>Acesse sua conta</span>
                </div>
            </div>
            <div class="form-box">
                <form action="/validar_login.js" method="post">
                    <div class="input-box">
                        <h2>ID</h2>
                        <input name = 'name' type="text" id="usr" placeholder="Insira seu User ID" required>
                    </div>
                    <div class="input-box">
                        <h2>Passphase</h2>
                        <input name = 'senha' type="password" id="pwd" placeholder="passphase" required>
                    </div>
                    <div class="remember">
                        <label>
                            <input type="checkbox"> Remember-me
                        </label>
                        <a>Forgot password</a>
                    </div>
                    <div class="center-button">
                        <div class="bott">
                            <input type="submit" class="btn" value="Login" onclick="vldLgn()">
                            <input type="submit" class="btn" value="Esqueceu Minha Conta" onclick="fgtPwd()">
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="container-direita">
            <h3>Não possui conta? </h3>
            <a href="cadastro.html"><button> Cadastre-se!</button></a>
        </div>
    </div>
</body>

</html>`

module.exports = login;