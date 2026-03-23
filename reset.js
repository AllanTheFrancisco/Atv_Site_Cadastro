function toggleSenha(id) {
    let campo = document.getElementById(id);
    campo.type = campo.type === "password" ? "text" : "password";
}

document.getElementById("resetForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let novaSenha = document.getElementById("novaSenha").value.trim();
    
    let mensagemErro = document.getElementById("mensagem");
    let mensagemSucesso = document.getElementById("mensagemSucesso");

    mensagemErro.textContent = "";
    mensagemSucesso.textContent = "";

    let listaUsuarios = JSON.parse(localStorage.getItem("clientes")) || [];

    if (listaUsuarios.length === 0) {
        mensagemErro.textContent = "Nenhum usuário cadastrado no sistema.";
        return;
    }

    let indexUsuario = listaUsuarios.findIndex(user => user.email === email);

    if (indexUsuario === -1) {
        mensagemErro.textContent = "Email não encontrado na base de dados.";
        return;
    }
    
    if (novaSenha.length < 8) {
        mensagemErro.textContent = "A nova senha deve ter no mínimo 8 caracteres.";
        return;
    }

    listaUsuarios[indexUsuario].senha = novaSenha;
    localStorage.setItem("clientes", JSON.stringify(listaUsuarios));

    mensagemSucesso.textContent = "Senha redefinida com sucesso!";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 2000);
});
