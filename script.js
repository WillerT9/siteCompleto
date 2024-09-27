// Captura o evento de submit do formulário
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Evita o comportamento padrão do formulário

    // Coleta os valores dos campos
    let nome = document.getElementById('nome').value;
    let sobrenome = document.getElementById('sobrenome').value;
    let cpf = document.getElementById('cpf').value;
    let rg = document.getElementById('rg').value;
    let rua = document.getElementById('rua').value;
    let casa = document.getElementById('casa').value;
    let complemento = document.getElementById('complemento').value;
    let bairro = document.getElementById('bairro').value;
    let cidade = document.getElementById('cidade').value;
    let estado = document.getElementById('estado').value;
    let telefone = document.getElementById('telefone').value;
    let email = document.getElementById('email').value;
    let genero = document.querySelector('input[name="genero"]:checked').value;
    let contatos = document.querySelectorAll('input[name="contato"]:checked');
    let foto = document.getElementById('foto').files[0];

    // Validação simples para garantir que todos os campos obrigatórios foram preenchidos
    if (!nome || !sobrenome || !cpf || !rg || !telefone || !email || !genero || contatos.length === 0 || !estado || !foto) {
        alert('Por favor, preencha todos os campos obrigatórios antes de enviar.');
        return;
    }

    // Usa FileReader para carregar a imagem do perfil
    let reader = new FileReader();

    reader.onload = function(event) {
        let fotoUrl = event.target.result;

        // Exibe os resultados no div com id "result"
        let resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h2>Dados Submetidos:</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>Sobrenome:</strong> ${sobrenome}</p>
            <p><strong>CPF:</strong> ${cpf}</p>
            <p><strong>RG:</strong> ${rg}</p>
            <p><strong>Rua:</strong>${rua}</p>
            <p><strong>Número da casa:</strong>${casa}</p>
            <p><strong>Complemento:</strong>${complemento}</p>
            <p><strong>Bairro:</strong>${bairro}</p>
            <p><strong>Cidade:</strong>${cidade}</p>
            <p><strong>Estado:</strong>${estado}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Gênero:</strong> ${genero}</p>
            <p><strong>Preferências de Contato:</strong> ${Array.from(contatos).map(contato => contato.value).join(', ')}</p>
            <p><strong>Foto de Perfil:</strong></p>
            <img src="${fotoUrl}" alt="Sua Foto" style="max-width: 100%; height: auto;">
        `;

        // Limpa o formulário
        document.getElementById('cadastroForm').reset();
    };

    // Lê o arquivo da foto como URL
    reader.readAsDataURL(foto);
});

// Função para formatar o telefone no formato (xx) xxxxx-xxxx
function formatPhoneNumber(input) {
    let cleaned = input.value.replace(/\D/g, '');  // Remove tudo que não for dígito
    let formatted = cleaned;

    if (cleaned.length > 0) {
        formatted = '(' + cleaned.substring(0, 2);
    }
    if (cleaned.length > 2) {
        formatted += ') ' + cleaned.substring(2, 7);
    }
    if (cleaned.length > 7) {
        formatted += '-' + cleaned.substring(7, 11);
    }

    input.value = formatted;
}

// Adiciona um listener para o campo de telefone para formatá-lo automaticamente
document.getElementById("telefone").addEventListener("input", function () {
    formatPhoneNumber(this);
});

function formatCPF(input) {
    let cpf = input.value.replace(/\D/g, '');  // Remove caracteres não numéricos
    if (cpf.length > 11) cpf = cpf.slice(0, 11);  // Limita o CPF a 11 dígitos
    
    let formatted = cpf;
    if (cpf.length > 3) {
        formatted = cpf.substring(0, 3) + '.' + cpf.substring(3, 6);
    }
    if (cpf.length > 6) {
        formatted += '.' + cpf.substring(6, 9);
    }
    if (cpf.length > 9) {
        formatted += '-' + cpf.substring(9, 11);
    }

    input.value = formatted;
}
// Listeners para mascarar os campos de CPF e RG
document.getElementById("cpf").addEventListener("input", function () {
    formatCPF(this);
});

document.getElementById("rg").addEventListener("input", function () {
    formatRG(this);
});
let button = document.getElementById('enviar');
let sectionPrincipal = document.getElementById('section-principal');
let sectionSecundaria = document.getElementById('section-secundaria');
let result = document.getElementById('result');

button.addEventListener('click', (event) => {
    event.preventDefault(); // Evita o envio do formulário
    
    const formData = new FormData(document.getElementById('cadastroForm'));
    let output = '<h2>Dados Cadastrados:</h2>';
    
    formData.forEach((value, key) => {
        if (key === 'foto') {
            // Trata o campo de foto para exibir a imagem
            if (value instanceof File) {
                const imageUrl = URL.createObjectURL(value);
                output += `<p><strong>${key}:</strong></p><img src="${imageUrl}" alt="Foto escolhida" style="max-width: 100%; height: auto;"/>`;
            }
        } else {
            output += `<p><strong>${key}:</strong> ${value}</p>`;
        }
    });
    
    result.innerHTML = output;

    // Mover as seções
    sectionPrincipal.classList.toggle('mover-principal');
    sectionSecundaria.classList.toggle('aparecer-secundaria');

    document.getElementById('cadastroForm').reset();
});

function disableOptions(questionName){
    let options = document.getElementsByName(questionName);
    options.forEach(options =>{
        if (!options.checked){
            options.disabled = true;
        }
    });
}

// Função para desativar as opções após seleção de resposta
function disableOptions(questionName) {
    let options = document.getElementsByName(questionName);
    options.forEach(option => {
        if (!option.checked) {
            option.disabled = true;
        }
    });
}


// Função para enviar o quiz e calcular a pontuação
function submitQuiz(event) {
    event.preventDefault(); // Impede o envio real do formulário

    // Respostas corretas do quiz
    let correctAnswers = {
        q1: 'B',
        q2: 'D',
        q3: 'A',
        q4: 'C',
        q5: 'A',
        q6: 'C',
        q7: 'A'
    };

    let form = document.getElementById('quiz-form');
    let score = 0;

    // Verifica as respostas do usuário
    for (let key in correctAnswers) {
        let userAnswer = form.elements[key].value;
        if (userAnswer === correctAnswers[key]) {
            score++;
        }
    }

    // Desativa o botão de enviar
    document.getElementById('enviar').disabled = true;

    // Ativa o botão de "Responder Novamente"
    document.getElementById('reenviar').disabled = false;

    // Exibe o resultado na tela
    let result = document.getElementById('result1');
    result.innerHTML = `Você acertou ${score} de 7 perguntas.`;
}

// Função para reiniciar o quiz
function restartQuiz() {
    // Seleciona o formulário
    let form = document.getElementById('quiz-form');

    // Reseta o formulário
    form.reset();

    // Reativa todas as opções de perguntas
    let options = form.querySelectorAll('input[type="radio"]');
    options.forEach(option => {
        option.disabled = false;
    });

    // Reativa o botão de envio
    document.getElementById('enviar').disabled = false;

    // Desativa o botão de "Responder Novamente"
    document.getElementById('reenviar').disabled = true;

    // Limpa o resultado exibido
    document.getElementById('result1').innerText = '';
}