document.addEventListener('DOMContentLoaded', () => {
    // Referências para os elementos do DOM
    const componentTypeSelect = document.getElementById('componentType');
    const componentPreview = document.getElementById('componentPreview');
    const htmlOutput = document.querySelector('#htmlCode code');
    const cssOutput = document.querySelector('#cssCode code');
    const jsOutput = document.querySelector('#jsCode code'); // Para futuro uso, se houver JS do componente

    // Opções de personalização por componente
    const buttonOptions = document.getElementById('buttonOptions');
    const inputOptions = document.getElementById('inputOptions');
    const cardOptions = document.getElementById('cardOptions');

    // Mapeamento de elementos de entrada para o componente de preview
    const buttonInputs = {
        text: document.getElementById('buttonText'),
        bgColor: document.getElementById('buttonBgColor'),
        textColor: document.getElementById('buttonTextColor'),
        padding: document.getElementById('buttonPadding'),
        borderRadius: document.getElementById('buttonBorderRadius'),
        fontSize: document.getElementById('buttonFontSize'),
        width: document.getElementById('buttonWidth'),
        height: document.getElementById('buttonHeight')
    };

    const inputInputs = {
        placeholder: document.getElementById('inputTextPlaceholder'),
        borderColor: document.getElementById('inputBorderColor'),
        bgColor: document.getElementById('inputBgColor'),
        textColor: document.getElementById('inputTextColor'),
        padding: document.getElementById('inputPaddingInput'), // Renomeado para evitar conflito com 'padding' geral
        borderRadius: document.getElementById('inputBorderRadius'),
        fontSize: document.getElementById('inputFontSize')
    };

     const cardInputs = {
        title: document.getElementById('cardTitle'),
        content: document.getElementById('cardContent'),
        bgColor: document.getElementById('cardBgColor'),
        borderColor: document.getElementById('cardBorderColor'),
        borderRadius: document.getElementById('cardBorderRadiusCard'), // Renomeado
        padding: document.getElementById('cardPaddingCard'), // Renomeado
        shadow: document.getElementById('cardShadow')
    };


    // Funções para renderizar os componentes
    function renderButton() {
        const text = buttonInputs.text.value;
        const bgColor = buttonInputs.bgColor.value;
        const textColor = buttonInputs.textColor.value;
        const padding = buttonInputs.padding.value + 'px';
        const borderRadius = buttonInputs.borderRadius.value + 'px';
        const fontSize = buttonInputs.fontSize.value + 'px';
        const width = buttonInputs.width.value ? buttonInputs.width.value + 'px' : 'auto';
        const height = buttonInputs.height.value ? buttonInputs.height.value + 'px' : 'auto';

        componentPreview.innerHTML = `
            <button class="generated-button" style="
                background-color: ${bgColor};
                color: ${textColor};
                padding: ${padding};
                border-radius: ${borderRadius};
                font-size: ${fontSize};
                width: ${width};
                height: ${height};
            ">${text}</button>
        `;
    }

    function renderInput() {
        const placeholder = inputInputs.placeholder.value;
        const borderColor = inputInputs.borderColor.value;
        const bgColor = inputInputs.bgColor.value;
        const textColor = inputInputs.textColor.value;
        const padding = inputInputs.padding.value + 'px';
        const borderRadius = inputInputs.borderRadius.value + 'px';
        const fontSize = inputInputs.fontSize.value + 'px';


        componentPreview.innerHTML = `
            <input type="text" class="generated-input" placeholder="${placeholder}" style="
                border-color: ${borderColor};
                background-color: ${bgColor};
                color: ${textColor};
                padding: ${padding};
                border-radius: ${borderRadius};
                font-size: ${fontSize};
            ">
        `;
    }

    function renderCard() {
        const title = cardInputs.title.value;
        const content = cardInputs.content.value;
        const bgColor = cardInputs.bgColor.value;
        const borderColor = cardInputs.borderColor.value;
        const borderRadius = cardInputs.borderRadius.value + 'px';
        const padding = cardInputs.padding.value + 'px';
        const shadow = cardInputs.shadow.value;

        componentPreview.innerHTML = `
            <div class="generated-card" style="
                background-color: ${bgColor};
                border-color: ${borderColor};
                border-radius: ${borderRadius};
                padding: ${padding};
                box-shadow: ${shadow};
            ">
                <h3>${title}</h3>
                <p>${content}</p>
            </div>
        `;
    }

    // Função para atualizar a pré-visualização com base no componente selecionado
    function updatePreview() {
        const selectedComponent = componentTypeSelect.value;
        switch (selectedComponent) {
            case 'button':
                renderButton();
                break;
            case 'input':
                renderInput();
                break;
            case 'card':
                renderCard();
                break;
            // Adicione mais casos aqui para novos componentes
        }
    }

    // Função para alternar as opções de personalização visíveis
    function showComponentOptions(componentId) {
        document.querySelectorAll('.component-options').forEach(optionDiv => {
            optionDiv.classList.remove('active');
        });
        document.getElementById(componentId).classList.add('active');
    }

    // Event Listeners para atualização em tempo real
    componentTypeSelect.addEventListener('change', () => {
        const selectedComponent = componentTypeSelect.value;
        showComponentOptions(selectedComponent + 'Options');
        updatePreview(); // Atualiza a pré-visualização quando o componente muda
    });

    // Adiciona listeners para todos os inputs de personalização
    Object.values(buttonInputs).forEach(input => input.addEventListener('input', updatePreview));
    Object.values(inputInputs).forEach(input => input.addEventListener('input', updatePreview));
    Object.values(cardInputs).forEach(input => input.addEventListener('input', updatePreview));


    // Função para gerar o código HTML e CSS
    window.generateCode = function() {
        const selectedComponent = componentTypeSelect.value;
        let html = '';
        let css = '';
        let js = ''; // Para JS específico do componente, se necessário

        const previewElement = componentPreview.querySelector('.generated-' + selectedComponent);
        if (!previewElement) {
            htmlOutput.textContent = 'Nenhum componente para gerar.';
            cssOutput.textContent = '';
            jsOutput.textContent = '';
            return;
        }

        // HTML
        html = previewElement.outerHTML;

        // CSS
        const styles = window.getComputedStyle(previewElement);
        css += `.${previewElement.classList[0]} {\n`; // Pega a primeira classe (ex: generated-button)
        for (let i = 0; i < styles.length; i++) {
            const propName = styles.item(i);
            const propValue = styles.getPropertyValue(propName);
            // Filtra propriedades que são auto ou que não foram definidas explicitamente (para CSS mais limpo)
            // Você pode refinar este filtro
            if (propValue && propValue !== 'auto' && propValue !== 'initial' && propValue !== 'unset' && propValue !== 'normal' && propValue !== '0px') {
                 // Pequeno ajuste para evitar propriedades muito específicas que podem ser noise
                 if (propName.startsWith('border-') && propName !== 'border-radius' && propValue === '0px none rgb(0, 0, 0)') continue;
                 if (propName.includes('transition') || propName.includes('animation') || propName.includes('user-select')) continue;

                css += `  ${propName}: ${propValue};\n`;
            }
        }
        css += `}\n`;

        // Se for um input, adicione o placeholder CSS
        if (selectedComponent === 'input') {
            const placeholderColor = inputInputs.textColor.value; // Assume a cor do texto para o placeholder
            css += `\n.${previewElement.classList[0]}::placeholder {\n  color: ${placeholderColor};\n}\n`;
        }


        // Atualiza as áreas de código
        htmlOutput.textContent = html;
        cssOutput.textContent = css;
        jsOutput.textContent = js; // Por enquanto, vazio para a maioria dos componentes

        // Ativa a aba HTML por padrão após gerar
        showCodeTab('html');
    };

    // Funções para as abas de código
    window.showCodeTab = function(tabName) {
        document.querySelectorAll('.code-panel').forEach(panel => {
            panel.classList.remove('active');
        });
        document.querySelectorAll('.code-tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        document.getElementById(tabName + 'Code').classList.add('active');
        document.querySelector(`.code-tab-btn[onclick="showCodeTab('${tabName}')"]`).classList.add('active');
    };

    // Função para copiar código para a área de transferência
    window.copyCode = function(type) {
        const codeElement = document.querySelector(`#${type}Code code`);
        const textToCopy = codeElement.textContent;

        navigator.clipboard.writeText(textToCopy).then(() => {
            alert(`Código ${type.toUpperCase()} copiado para a área de transferência!`);
        }).catch(err => {
            console.error('Erro ao copiar: ', err);
            alert('Falha ao copiar o código. Por favor, copie manualmente.');
        });
    };

    // Inicializa a página: mostra as opções do botão e renderiza o botão padrão
    showComponentOptions('buttonOptions');
    updatePreview();
});