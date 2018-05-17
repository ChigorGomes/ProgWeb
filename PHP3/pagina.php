<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" />
    <title>Formulário de Contato</title>
</head>
<body>
    <h1>Formulário de Contato</h1>
        <p>Por favor, preencha o formulário abaixo e clique no botão Enviar Mensagem. Agaredecemos por seu contato.</p>
    
    <form method="POST">
        <fieldset>
            <legend>Dados Básicos</legend>
                <label>Nome</label>
                    <input type="text" name="nome" id="nome" required><br>
                
                <label>E-mail</label>
                    <input type="email" name="email" id="email" placeholder="seunome@dominio.com.br" required><br>
                
                <label>Website</label>
                    <input type="url" id="url" name="url" value="http://"><br>
                        
        </fieldset>
        <fieldset>
            <textarea rows="4" cols="50" name="mensagem" id="mensagem">Este é o valor padrão!</textarea>
        </fieldset>
        
        <input type="reset" name="resetar" id="resetar" value="Resetar Dados">
        <input type="submit" name="enviar" id="enviar" value="Enviar Mensagem">

    </form>
</body>
</html>
