// Seleção de item do menu
var menuItem = document.querySelectorAll('.itens-menu');

function selecionar() {
    menuItem.forEach((item) => item.classList.remove('ativo'));
    this.classList.add('ativo');
}

menuItem.forEach((item) => item.addEventListener('click', selecionar));

var expandir = document.querySelector('.btn-expandir');
var menuLateral = document.querySelector('.menu-lateral');

expandir.addEventListener('click', function() {
    menuLateral.classList.toggle('expandir');
});

document.addEventListener('DOMContentLoaded', () => {
    loadAvatar();
    loadUsername();
    initializeMenu();
    loadTopics();
});

function loadAvatar() {
    const avatarImg = document.getElementById('avatarImg');
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario && usuario.avatar) {
        avatarImg.src = usuario.avatar;
    } else {
        avatarImg.alt = 'Nenhum avatar selecionado';
    }
}

function loadUsername() {
    var username = localStorage.getItem('username');
    if (username) {
        document.getElementById('avatarName').innerText = username;
    }
}

function initializeMenu() {
    var menuItem = document.querySelectorAll('.itens-menu');
    menuItem.forEach(item => {
        item.addEventListener('click', selecionar);
    });

    var expandir = document.querySelector('.btn-expandir');
    var menuLateral= document.querySelector('.menu-lateral');

    expandir.addEventListener('click', () => {
        menuLateral.classList.toggle('expandir');
    });
}

// Função para obter os tópicos armazenados no localStorage
function getStoredTopics() {
    return JSON.parse(localStorage.getItem("topics")) || [];
}

function saveTopics(topics) {
    localStorage.setItem("topics", JSON.stringify(topics));
}

function loadTopics() {
    const topics = getStoredTopics();
    displayTopics(topics);
}

function displayTopics(topics) {
    const topicContainer = document.getElementById('topic-container');
    topicContainer.innerHTML = "";
    topics.forEach(topic => {
        addTopicToDOM(topic);
    });
}

function addTopic() {
    const topicTitle = document.getElementById('topic-title').value.trim();
    if (topicTitle) {
        const topic = {
            id: Date.now(),
            title: topicTitle,
            comments: []
        };
        saveTopic(topic);
        addTopicToDOM(topic);
        document.getElementById('topic-title').value = '';
    }
}

function saveTopic(topic) {
    const topics = getStoredTopics();
    topics.push(topic);
    saveTopics(topics);
}

function addTopicToDOM(topic) {
    const topicContainer = document.getElementById('topic-container');
    const topicElement = document.createElement('div');
    topicElement.className = 'topic';
    topicElement.id = `topic-${topic.id}`;
    topicElement.innerHTML = `
        <h3 class="topic-title" id="topic-${topic.id}" contenteditable="false">${topic.title}</h3>
        <div class="comments-container" id="comments-${topic.id}">
            ${topic.comments && Array.isArray(topic.comments) ? topic.comments.map(comment => `
                <div class="comment">
                    <img src="${comment.avatar}" alt="Avatar" class="avatar">
                    <strong>${comment.username}:</strong>
                    <p>${comment.text}</p>
                </div>
            `).join('') : ''}
        </div>
        <input type="text" placeholder="Escreva um comentário" id="comment-input-${topic.id}">
        <button onclick="addComment(${topic.id})">Adicionar Comentário</button>
        <button class="edit-topic" onclick="editTopic(${topic.id})">Editar</button>
        <button class="save-topic" onclick="saveTopicEdit(${topic.id})" style="display: none;">Salvar</button>
        <button class="delete-topic" onclick="deleteTopic(${topic.id})">Excluir</button>
    `;
    topicContainer.appendChild(topicElement);
}

function addComment(topicId) {
    const commentInput = document.getElementById(`comment-input-${topicId}`);
    const commentText = commentInput.value.trim();

    if (commentText) {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        
        const comment = {
            username: usuario ? usuario.nome : 'Anônimo',
            avatar: usuario ? usuario.avatar : '',
            text: commentText
        };

        const topics = getStoredTopics();
        const topic = topics.find(t => t.id === topicId);
        if (topic) {
            topic.comments.push(comment);
            saveTopics(topics);
            const commentsContainer = document.getElementById(`comments-${topicId}`);
            const commentElement = document.createElement('div');
            commentElement.className = 'comment';
            commentElement.innerHTML = `
                <img src="${comment.avatar}" alt="Avatar" class="avatar">
                <strong>${comment.username}:</strong>
                <p>${comment.text}</p>
            `;
            commentsContainer.appendChild(commentElement);
            commentInput.value = '';
        }
    }
}

function searchTopics() {
    const searchTerm = document.getElementById("search-bar").value.trim().toLowerCase();
    const topics = getStoredTopics();
    const filteredTopics = topics.filter(topic => topic.title.toLowerCase().includes(searchTerm));
    displayTopics(filteredTopics);
}

function editTopic(topicId) {
    const topicElement = document.getElementById(`topic-${topicId}`);
    const topicTitleElement = topicElement.querySelector('.topic-title');
    topicTitleElement.contentEditable = true;
    topicTitleElement.focus();
    const editButton = topicElement.querySelector('.edit-topic');
    const saveButton = topicElement.querySelector('.save-topic');
    editButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
}

function saveTopicEdit(topicId) {
    const topicElement = document.getElementById(`topic-${topicId}`);
    const topicTitleElement = topicElement.querySelector('.topic-title');
    const newTitle = topicTitleElement.innerText;

    const topics = getStoredTopics();
    const topicIndex = topics.findIndex(t => t.id === topicId);
    if (topicIndex !== -1) {
        topics[topicIndex].title = newTitle;
        saveTopics(topics);
    }

    topicTitleElement.contentEditable = false;
    const editButton = topicElement.querySelector('.edit-topic');
    const saveButton = topicElement.querySelector('.save-topic');
    editButton.style.display = 'inline-block';
    saveButton.style.display = 'none';
    loadTopics();
}

function deleteTopic(topicId) {
    const topics = getStoredTopics();
    const updatedTopics = topics.filter(topic => topic.id !== topicId);
    saveTopics(updatedTopics);
    loadTopics();
}

function searchOnEnter(event) {
    if (event.key === 'Enter') {
        searchTopics();
    }
}
