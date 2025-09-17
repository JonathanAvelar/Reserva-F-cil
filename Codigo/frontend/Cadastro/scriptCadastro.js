import axios from 'axios';

var cadForm = document.getElementById("cadastra-usuario");
const campos = document.querySelectorAll('.required');
const span = document.querySelectorAll('.span');
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

cadForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o envio do formulário

    // Validação dos campos
    if (validateForm()) {
        sendFormData(); // Envia os dados se todos os campos forem válidos
    }
});

function validateForm() {
    let isValid = true;

    // Validar Nome
    if (campos[0].value.length < 3) {
        setError(0);
        isValid = false;
    } else {
        removeError(0);
    }

    // Validar Usuário
    if (campos[1].value.length < 3) {
        setError(1);
        isValid = false;
    } else {
        removeError(1);
    }

    // Validar E-mail
    if (!emailRegex.test(campos[2].value)) {
        setError(2);
        isValid = false;
    } else {
        removeError(2);
    }

    // Validar Senha
    if (campos[3].value.length < 4) {
        setError(3);
        isValid = false;
    } else {
        removeError(3);
    }

    return isValid;
}

function setError(index) {
    span[index].style.visibility = 'visible';
}

function removeError(index) {
    span[index].style.visibility = 'hidden';
}

export function sendFormData() {
    var nome = document.getElementById('nome').value;
    var usuario = document.getElementById('usuario').value;
    var email = document.getElementById('email').value;
    var telefone = document.getElementById('telefone').value;
    var senha = document.getElementById('senha').value;

    const userData = {
        nome,
        usuario,
        email,
        telefone,
        senha
    };

    axios.post('http://localhost:3000/auth/register', userData)
        .then(response => {
            if (response.status === 201) {
                alert("CADASTRADO COM SUCESSO\nVOCÊ SERÁ REDIRECIONADO PARA A PÁGINA DE LOGIN");
                location.href = "../Login/login.html";
            } else {
                alert("Erro ao cadastrar usuário: " + response.data.message);
            }
        })
        .catch(error => {
            console.error('Erro ao enviar dados:', error);
            alert("Erro ao enviar dados, tente novamente.");
        });
}
