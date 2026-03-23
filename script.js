function toggleSenha(id) {
    let campo = document.getElementById(id);
    campo.type = campo.type === "password" ? "text" : "password";
}

document.getElementById("cadastroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();

    let erroNome = document.getElementById("erroNome");
    let erroEmail = document.getElementById("erroEmail");
    let erroSenha = document.getElementById("erroSenha");
    let mensagem = document.getElementById("mensagemSucesso");

    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroSenha.textContent = "";
    mensagem.textContent = "";

    let valido = true;

    if (nome === "") {
        erroNome.textContent = "Nome obrigatório";
        valido = false;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        erroEmail.textContent = "Email inválido";
        valido = false;
    }

    if (senha.length < 8) {
        erroSenha.textContent = "Senha deve ter no mínimo 8 caracteres";
        valido = false;
    }

    if (valido) {
        let novoUsuario = { nome, email, senha, telefone: "" };
        let listaUsuarios = JSON.parse(localStorage.getItem("clientes")) || [];

        let emailJaExiste = listaUsuarios.find(user => user.email === email);
        
        if (emailJaExiste) {
            erroEmail.textContent = "Este e-mail já está em uso.";
            return;
        }

        listaUsuarios.push(novoUsuario);
        localStorage.setItem("clientes", JSON.stringify(listaUsuarios));

        mensagem.textContent = "Cadastro realizado com sucesso!";
        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }
});
