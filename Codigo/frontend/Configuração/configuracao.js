// Função para selecionar item do menu
var menuItem = document.querySelectorAll('.itens-menu');

function selecionar() {
    menuItem.forEach((item) => item.classList.remove('ativo'));
    this.classList.add('ativo');
}

menuItem.forEach((item) => item.addEventListener('click', selecionar));

// Expandir menu
var expandir = document.querySelector('.btn-expandir');
var menuLateral = document.querySelector('.menu-lateral');

expandir.addEventListener('click', function() {
    menuLateral.classList.toggle('expandir'); 
});

// Função para carregar os dados do usuário
function loadUserData() {
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        document.getElementById('username').value = usuario.nome;
        document.getElementById('email').value = usuario.email;
        document.getElementById('selectedAvatarImg').src = usuario.avatar;
    }
}

// Função para selecionar avatar
function selectAvatar(imgElement) {
    const selectedAvatarImg = document.getElementById('selectedAvatarImg');
    const avatarSrc = imgElement.src;
    selectedAvatarImg.src = avatarSrc;

    // Armazena o avatar selecionado no localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
    usuario.avatar = avatarSrc;
    localStorage.setItem('usuario', JSON.stringify(usuario));
}
function selectAvatar(imgElement) {
    const selectedAvatarImg = document.getElementById('selectedAvatarImg');
    let avatarSrc = imgElement.src;

    // Verifica se o src da imagem é vazio
    if (!avatarSrc) {
        avatarSrc = '../Imagens/Configuração/padrao.jpg'; // Caminho do avatar padrão
    }

    selectedAvatarImg.src = avatarSrc;

    // Armazena o avatar selecionado no localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
    usuario.avatar = avatarSrc;
    localStorage.setItem('usuario', JSON.stringify(usuario));
}

// Função para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

// Função para atualizar dados do usuário
function updateData() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    let isValid = true;
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');

    usernameError.textContent = '';
    emailError.textContent = '';

    if (!username) {
        usernameError.textContent = 'O nome de usuário não pode estar vazio.';
        isValid = false;
    }

    if (!email) {
        emailError.textContent = 'O email não pode estar vazio.';
        isValid = false;
    } else if (!validateEmail(email)) {
        emailError.textContent = 'Por favor, insira um email válido.';
        isValid = false;
    }

    if (isValid) {
        const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
        usuario.nome = username;
        usuario.email = email;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert('Dados atualizados com sucesso!');
    }
}

// Função para mudar senha
function changePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    let isValid = true;
    const currentPasswordError = document.getElementById('currentPasswordError');
    const newPasswordError = document.getElementById('newPasswordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    currentPasswordError.textContent = '';
    newPasswordError.textContent = '';
    confirmPasswordError.textContent = '';

    const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
    const savedPassword = usuario.password;

    if (currentPassword !== savedPassword) {
        currentPasswordError.textContent = 'Senha atual incorreta.';
        isValid = false;
    }

    if (!newPassword) {
        newPasswordError.textContent = 'A nova senha não pode estar vazia.';
        isValid = false;
    } else if (newPassword !== confirmPassword) {
        confirmPasswordError.textContent = 'As senhas não coincidem.';
        isValid = false;
    }

    if (isValid) {
        usuario.password = newPassword;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert('Senha alterada com sucesso!');
    }
}

document.addEventListener('DOMContentLoaded', loadUserData);

 // avatar no menu 
 document.addEventListener('DOMContentLoaded', function() {
    const avatarImg = document.getElementById('avatarImg');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario && usuario.avatar) {
        avatarImg.src = usuario.avatar;
    } else {
        avatarImg.alt = 'Nenhum avatar selecionado';
    }
});
window.onload = function() {
    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById('avatarName').innerText = username;
    }
};
// Função para atualizar dados do usuário
function updateData() {
    const username = document.getElementById('username').value;

    let isValid = true;
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');

    usernameError.textContent = '';
    emailError.textContent = '';

    if (!username) {
        usernameError.textContent = 'O nome de usuário não pode estar vazio.';
        isValid = false;
    }

    if (isValid) {
        const usuario = JSON.parse(localStorage.getItem('usuario')) || {};
        usuario.nome = username;
        localStorage.setItem('usuario', JSON.stringify(usuario));
        alert('Nome de usuário atualizado com sucesso!');
    }
}
