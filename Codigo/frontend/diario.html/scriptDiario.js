// Função para selecionar item do menu
var menuItem = document.querySelectorAll('.itens-menu');

function selecionar() {
    menuItem.forEach((item) =>
        item.classList.remove('ativo')
    );
    this.classList.add('ativo');
}

menuItem.forEach((item) =>
    item.addEventListener('click', selecionar)
);


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
document.addEventListener('DOMContentLoaded', () => {
    const btnExpandir = document.querySelector('.btn-expandir');
    const menuLateral = document.querySelector('.menu-lateral');

    btnExpandir.addEventListener('click', () => {
        menuLateral.classList.toggle('expandido');
    });
});

function enviar() {
    var dataEscolhidaTexto = document.getElementById("calender");
    var dataPreechida = dataEscolhidaTexto.value != "";
    var dataEscolhida = new Date(dataEscolhidaTexto.value);
    

    var fazBem = document.getElementById("feelingsForm").value;
    var aprendeu = document.getElementById("learn").value;
    var dia = document.getElementById("day").value;

    if (fazBem != "" && aprendeu != "" && dia != "" && dataPreechida == true) {
        document.getElementById("validacao").textContent = "";
        salvarDados(fazBem);
        alert("Enviado com sucesso");
        return true;
    } else {
        alert('A data não pode ser posterior a data atual!')
        return false;
    }
}
document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault();
    if (enviar()) {
        document.getElementById('formulario').reset(); 
    }
});
window.addEventListener('load', atualizarGrafico);

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
function dataEscolhida() {
    var dataEscolhidaTexto = document.getElementById("calender");
    var dataPreechida = dataEscolhidaTexto.value != "";
    var dataEscolhida = new Date(dataEscolhidaTexto.value);
    var hoje = new Date();
    var maiorQueHoje = dataEscolhida > hoje;

    if (dataPreechida == false || maiorQueHoje == true) {
        document.getElementById("validacao").textContent = "Data inválida.";
    } else {
        document.getElementById("validacao").textContent = "";
    }

    if (dataPreechida == true && maiorQueHoje == false) {
        document.getElementById("validacao").textContent = "";
    }
}

function salvarDados(fazBem) {
    const calender = document.getElementById('calender').value;
    const feeling = fazBem;
    const learn = document.getElementById('learn').value;
    const day = document.getElementById('day').value;

    const data = { calender, feeling, learn, day };

    let dadosSalvos = localStorage.getItem('dados') ? JSON.parse(localStorage.getItem('dados')) : [];

    dadosSalvos.push(data);

    localStorage.setItem('dados', JSON.stringify(dadosSalvos));

    atualizarGrafico();
}




let dadosGraficos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let seriesGrafico = {
    labels: ["Animado", "Ansioso", "Calmo", "Apaixonado", "Agitado" ],
    datasets: [
        {
            label: "Sentimentos",
            data: dadosGraficos,
            backgroundColor: [
                'green',
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 205, 86)',
                'rgb(138, 43, 226)',
                'rgb(199, 21, 133)',
                'rgb(127, 255, 0)',
                'rgb(127, 255, 212)',
                'rgb(25, 25, 112)',
                'rgb(240, 230, 140)',
                'rgb(255, 165, 0)'
            ],
            hoverOffset: 10
        }
    ]
};

let chart = new Chart(document.getElementById("grafico"), {
    type: 'doughnut',
    data: seriesGrafico,
    options: {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function (context) {
                        let label = context.label || '';
                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed !== null) {
                            label += context.parsed;
                        }
                        return label;
                    }
                }
            }
        }
    }
});

function atualizarGrafico() {
    let dadosSalvos = localStorage.getItem('dados') ? JSON.parse(localStorage.getItem('dados')) : [];
    let novosDados = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    dadosSalvos.forEach(entry => {
        novosDados[entry.feeling - 1]++;
    });

    chart.data.datasets[0].data = novosDados;
    chart.update();
}
