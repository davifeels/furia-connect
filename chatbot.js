document.addEventListener('DOMContentLoaded', function() {
    // Elementos da interface
    const sendButton = document.querySelector('.send-button');
    const userInput = document.querySelector('.user-input');
    const messagesContainer = document.querySelector('.messages');

    // Banco de respostas personalizadas para cada jogador
    const playersData = {
        'chatbot_fallen.html': {
            name: "FalleN",
            replies: [
                "Salve, fã da FURIA! Sou o FalleN, como posso te ajudar hoje?",
                "Minha jornada no CS começou em 2004... quer saber mais sobre como me tornei o 'Professor'?",
                "Acredito que o conhecimento é a arma mais poderosa no CS. Por isso sempre estudo muito o jogo.",
                "Meu maior orgulho foi criar a 'FalleN School' e ajudar a desenvolver a cena brasileira.",
                "Na FURIA, encontrei um time com a mesma fome de vitória que eu tinha no início da carreira.",
                "O Major de Columbus em 2016 foi mágico, mas ainda quero conquistar muito mais!"
            ],
            color: "#f7a600",
            info: {
                career: "FalleN começou sua carreira no CS em 2004 e é um dos maiores ícones do cenário competitivo de CS:GO.",
                victories: "Vencedor de múltiplos Majors, incluindo o MLG Columbus em 2016.",
                curiosities: "Além de ser jogador, FalleN também é mentor e fundou a 'FalleN School', que ensina jogadores aspirantes.",
                training: "Meu treino é muito focado em estratégia. A parte mental do jogo é tão importante quanto a habilidade mecânica.",
                notableMoments: "O Major de Columbus foi um momento mágico, mas eu também guardo com carinho a nossa vitória na ESL Pro League.",
                stats: "Tenho mais de 15.000 horas jogadas no CS:GO e fui o melhor jogador brasileiro em 2016."
            }
        },
        'chatbot_art.html': {
            name: "arT",
            replies: [
                "E aí, guerreiro! Sou o arT, o capitão da FURIA. Bora conversar?",
                "Meu estilo de jogo agressivo vem da minha filosofia: quem não arrisca não petisca!",
                "Ser capitão da FURIA é um desafio diário, mas amo liderar esse time de guerreiros.",
                "Nosso estilo de jogo único vem da nossa química e da vontade de quebrar paradigmas.",
                "A pressão que fazemos vem do treino intenso e da confiança que temos uns nos outros."
            ],
            color: "#ff3a3a",
            info: {
                career: "arT é conhecido por seu estilo de jogo agressivo e por ser um dos maiores líderes do CS:GO.",
                victories: "Ele foi parte fundamental da FURIA nas vitórias da ESL Pro League e BLAST Premier.",
                curiosities: "arT sempre se destaca por sua leitura de jogo e estilo ousado. Ele é um dos capitães mais respeitados no cenário.",
                training: "Eu treino bastante, mas o mais importante para mim é estar sempre atento às oportunidades de liderança.",
                notableMoments: "A vitória na ESL Pro League foi um dos melhores momentos da minha carreira.",
                stats: "Tenho uma taxa de headshots de 35% e sou o capitão da equipe desde 2018."
            }
        }
    };

    // Identificação correta do jogador atual
    const currentPage = window.location.pathname.split('/').pop();
    console.log("Página atual:", currentPage); // Verifique no console do navegador

    // Verifica se o jogador existe
    if (!playersData[currentPage]) {
        console.error("Jogador não encontrado, redirecionando para FalleN");
        window.location.href = 'doc_yuurih.html';
        return;
    }

    const currentPlayer = playersData[currentPage];
    console.log("Jogador atual:", currentPlayer.name); // Verifique no console

    document.title = `Chatbot ${currentPlayer.name}`;
    document.querySelector('.send-button').style.backgroundColor = currentPlayer.color;

    // Função para adicionar mensagens no chat
    function addMessage(content, isBot = true) {
        const message = document.createElement('p');
        message.classList.add(isBot ? 'bot-message' : 'user-message');
        message.innerHTML = `<strong>${isBot ? currentPlayer.name : 'Você'}:</strong> ${content}`;
        if (isBot) message.style.color = currentPlayer.color;
        messagesContainer.appendChild(message);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Mensagem inicial do bot
    addMessage(currentPlayer.replies[0]);

    // Função para enviar mensagem
    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessage(message, false);
            userInput.value = "";

            let reply = getReply(message); // Função que determina a resposta

            setTimeout(() => addMessage(reply), 500);
        }
    }

    // Função para gerar respostas baseadas na pergunta
    function getReply(message) {
        const lowerMessage = message.toLowerCase();

        // Perguntas sobre a carreira
        if (lowerMessage.includes("carreira") || lowerMessage.includes("história") || lowerMessage.includes("como começou")) {
            return currentPlayer.info.career;

        // Perguntas sobre vitórias e conquistas
        if (lowerMessage.includes("vitórias") || lowerMessage.includes("conquistas") || lowerMessage.includes("campeonato")) {
            return currentPlayer.info.victories;

        // Perguntas sobre curiosidades
        if (lowerMessage.includes("curiosidade") || lowerMessage.includes("fatos") || lowerMessage.includes("sabia")) {
            return currentPlayer.info.curiosities;

        // Perguntas sobre treino
        if (lowerMessage.includes("treino") || lowerMessage.includes("treinamento")) {
            return currentPlayer.info.training;

        // Perguntas sobre momentos marcantes
        if (lowerMessage.includes("momento") || lowerMessage.includes("marcante") || lowerMessage.includes("melhor momento")) {
            return currentPlayer.info.notableMoments;

        // Perguntas sobre estatísticas
        if (lowerMessage.includes("estatísticas") || lowerMessage.includes("stats") || lowerMessage.includes("jogo")) {
            return currentPlayer.info.stats;
        }

        // Respostas padrão
        return currentPlayer.replies[Math.floor(Math.random() * currentPlayer.replies.length)];
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && userInput.value.trim()) {
            sendMessage();
        }
    });

    // Botão de voltar
    const backButton = document.createElement('button');
    backButton.textContent = 'Voltar aos Jogadores';
    backButton.className = 'back-button';
    backButton.onclick = () => window.location.href = 'index.html';
    backButton.style.marginTop = '20px';
    backButton.style.padding = '10px';
    backButton.style.backgroundColor = currentPlayer.color;
    backButton.style.color = 'white';
    backButton.style.border = 'none';
    backButton.style.borderRadius = '5px';
    document.querySelector('.chat-container').appendChild(backButton);
});
