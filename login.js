function toggleSenha(id) {
    let campo = document.getElementById(id);
    campo.type = campo.type === "password" ? "text" : "password";
}

document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let senha = document.getElementById("senha").value.trim();

    let erroEmail = document.getElementById("erroEmail");
    let erroSenha = document.getElementById("erroSenha");
    let mensagemErro = document.getElementById("mensagemErro");
    let mensagemSucesso = document.getElementById("mensagemSucesso");

    erroEmail.textContent = "";
    erroSenha.textContent = "";
    mensagemErro.textContent = "";
    mensagemSucesso.textContent = "";

    let listaUsuarios = JSON.parse(localStorage.getItem("clientes")) || [];

    if (listaUsuarios.length === 0) {
        mensagemErro.textContent = "Nenhum agente cadastrado no sistema.";
        return;
    }

    let usuarioEncontrado = listaUsuarios.find(user => user.email === email);

    if (!usuarioEncontrado) {
        erroEmail.textContent = "E-mail não encontrado.";
        return;
    }

    if (senha !== usuarioEncontrado.senha) {
        erroSenha.textContent = "Senha incorreta.";
        return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    mensagemSucesso.textContent = "Acesso Autorizado!";

    setTimeout(() => {
        window.location.href = "principal.html";
    }, 2000);
});
