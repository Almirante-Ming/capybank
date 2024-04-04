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
            <h1> Cadastro - Capibank </h1>
        </div>
        <form action = "#" method = "POST">
            <section>
                <label>Nome Completo:</label>
                <input type="text">
                <label> CPF: </label>
                <input type="text">
            </section>
            <section>
                <label> Email: </label>
                <input type="text">
                <label> Telefone </label>
                <input type="text">
                <label>Data de nascimento: </label>
                <input type = "date">
            </section>
            <section>
                <label> Senha: </label>
                <input type = "password">
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