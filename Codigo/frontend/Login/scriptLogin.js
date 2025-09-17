function logar() {
    const login = document.getElementById('login');
    const senha = document.getElementById('senha');

    const userData = {
        usuario: login.value,
        senha: senha.value
    };

    axios.post('http://localhost:3000/auth/login', userData)
        .then(response => {
            if (response.status === 200) {
                alert('Login realizado com sucesso');
                location.href = "../INICIO/dashboard.html";
            }
        })
        .catch(error => {
            if (error.response) {
                alert('Usuário ou senha incorretos');
            } else {
                console.error('Erro no login:', error);
                alert('Erro ao tentar realizar login. Tente novamente mais tarde.');
            }
        });
}
