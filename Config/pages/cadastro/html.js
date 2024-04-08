const cadastro = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastro</title>
    <style>
     
        form > section {
            display: flex;
            flex-direction: column;
        }

        input {
            width: 300px;
        }
        
        button {
            width: 50px;
            height: 30px;
            margin-top: 20px;
        }

    </style>
</head>
<body>
        <div>
            <h1> Cadastro - Capibank (PROTÓTIPO) </h1>
        </div>
        <form action = "/salvar_cadastro.js" method = "POST">
            <section>
                <label for = 'name'>Nome Completo:</label>
                <input name = 'name' type="text">
                <label for = 'cpf'> CPF: </label>
                <input name = 'cpf' type="text">
            </section>
            <section>
                <label for = 'email'> Email: </label>
                <input name = 'email' type="text">
                <label for = 'telefone'> Telefone </label>
                <input name = 'telefone' type="text">
                <label for = 'data_nascimento'>Data de nascimento: </label>
                <input name = 'data_nascimento' type = "date">
            </section>
            <section>
                <label for = 'senha'> Senha: </label>
                <input name = 'senha' type = "password">
                <label> Confirme a senha: </label>
                <input type = "password">
            </section>
            <section> 
                <button type = 'submit'>Enviar </button>
            </section>
        </form>
        <hr>
        <a href = "login.html">Voltar</a>
</body>
</html>
`

module.exports = cadastro