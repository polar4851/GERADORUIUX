document.addEventListener('DOMContentLoaded', () => {
    // Referências para os elementos do DOM
    const componentTypeSelect = document.getElementById('componentType');
    const componentPreview = document.getElementById('componentPreview');
    const htmlOutput = document.querySelector('#htmlCode code');
    const cssOutput = document.querySelector('#cssCode code');
    const jsOutput = document.querySelector('#jsCode code');

    // Opções de personalização por componente
    const buttonOptions = document.getElementById('buttonOptions');
    const inputOptions = document.getElementById('inputOptions');
    const cardOptions = document.getElementById('cardOptions');

    // Mapeamento de elementos de entrada para o componente de preview
    const buttonInputs = {
        text: document.getElementById('buttonText'),
        bgColor: document.getElementById('buttonBgColor'),
        textColor: document.getElementById('buttonTextColor'),
        paddingY: document.getElementById('buttonPaddingY'),
        paddingX: document.getElementById('buttonPaddingX'),
        borderRadius: document.getElementById('buttonBorderRadius'),
        fontSize: document.getElementById('buttonFontSize'),
        fontWeight: document.getElementById('buttonFontWeight'),
        hoverEffect: document.getElementById('buttonHoverEffect'),
        shadow: document.getElementById('buttonShadow'),
        gradient: document.getElementById('buttonGradient'),
        gradientColor1: document.getElementById('buttonGradientColor1'),
        gradientColor2: document.getElementById('buttonGradientColor2'),
        gradientColorsDiv: document.getElementById('buttonGradientColors')
    };

    const inputInputs = {
        placeholder: document.getElementById('inputTextPlaceholder'),
        width: document.getElementById('inputWidth'),
        padding: document.getElementById('inputPaddingInput'),
        borderColor: document.getElementById('inputBorderColor'),
        borderWidth: document.getElementById('inputBorderWidth'),
        borderStyle: document.getElementById('inputBorderStyle'),
        borderRadius: document.getElementById('inputBorderRadius'),
        bgColor: document.getElementById('inputBgColor'),
        textColor: document.getElementById('inputTextColor'),
        fontSize: document.getElementById('inputFontSize'),
        shadow: document.getElementById('inputShadow')
    };

    const cardInputs = {
        title: document.getElementById('cardTitle'),
        content: document.getElementById('cardContent'),
        bgColor: document.getElementById('cardBgColor'),
        borderRadius: document.getElementById('cardBorderRadiusCard'),
        padding: document.getElementById('cardPaddingCard'),
        shadow: document.getElementById('cardShadow'),
        titleColor: document.getElementById('cardTitleColor'),
        contentColor: document.getElementById('cardContentColor'),
        titleFontSize: document.getElementById('cardTitleFontSize'),
        contentFontSize: document.getElementById('cardContentFontSize'),
        textAlign: document.getElementById('cardTextAlign'),
        hoverEffect: document.getElementById('cardHoverEffect')
    };

    // --- Funções para Renderizar os Componentes no Preview ---
    function renderButton() {
        const text = buttonInputs.text.value;
        const bgColor = buttonInputs.bgColor.value;
        const textColor = buttonInputs.textColor.value;
        const paddingY = buttonInputs.paddingY.value + 'px';
        const paddingX = buttonInputs.paddingX.value + 'px';
        const borderRadius = buttonInputs.borderRadius.value + 'px';
        const fontSize = buttonInputs.fontSize.value + 'px';
        const fontWeight = buttonInputs.fontWeight.value;
        const shadow = buttonInputs.shadow.value;
        const useGradient = buttonInputs.gradient.checked;
        const gradientColor1 = buttonInputs.gradientColor1.value;
        const gradientColor2 = buttonInputs.gradientColor2.value;
        const hoverEffect = buttonInputs.hoverEffect.value;

        let bgColorStyle = useGradient ? `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)` : bgColor;

        let hoverClass = '';
        if (hoverEffect === 'lift') hoverClass = 'button-hover-lift';
        else if (hoverEffect === 'shine') hoverClass = 'button-hover-shine';
        else if (hoverEffect === 'darken') hoverClass = 'button-hover-darken';


        componentPreview.innerHTML = `
            <button class="generated-button ${hoverClass}" style="
                background: ${bgColorStyle};
                color: ${textColor};
                padding: ${paddingY} ${paddingX};
                border-radius: ${borderRadius};
                font-size: ${fontSize};
                font-weight: ${fontWeight};
                box-shadow: ${shadow};
                border: none; /* Garante que não tenha borda padrão */
                cursor: pointer;
                transition: all 0.3s ease; /* Transição para suavizar a renderização */
                position: relative; /* Necessário para o efeito shine */
                overflow: hidden; /* Necessário para o efeito shine */
            ">${text}</button>
        `;
    }

    function renderInput() {
        const placeholder = inputInputs.placeholder.value;
        const width = inputInputs.width.value + 'px';
        const padding = inputInputs.padding.value + 'px';
        const borderColor = inputInputs.borderColor.value;
        const borderWidth = inputInputs.borderWidth.value + 'px';
        const borderStyle = inputInputs.borderStyle.value;
        const borderRadius = inputInputs.borderRadius.value + 'px';
        const bgColor = inputInputs.bgColor.value;
        const textColor = inputInputs.textColor.value;
        const fontSize = inputInputs.fontSize.value + 'px';
        const shadow = inputInputs.shadow.value;

        componentPreview.innerHTML = `
            <input type="text" class="generated-input" placeholder="${placeholder}" style="
                width: ${width};
                padding: ${padding};
                border: ${borderWidth} ${borderStyle} ${borderColor};
                border-radius: ${borderRadius};
                background-color: ${bgColor};
                color: ${textColor};
                font-size: ${fontSize};
                box-shadow: ${shadow};
                transition: all 0.3s ease;
            ">
        `;
    }

    function renderCard() {
        const title = cardInputs.title.value;
        const content = cardInputs.content.value;
        const bgColor = cardInputs.bgColor.value;
        const borderRadius = cardInputs.borderRadius.value + 'px';
        const padding = cardInputs.padding.value + 'px';
        const shadow = cardInputs.shadow.value;
        const titleColor = cardInputs.titleColor.value;
        const contentColor = cardInputs.contentColor.value;
        const titleFontSize = cardInputs.titleFontSize.value + 'px';
        const contentFontSize = cardInputs.contentFontSize.value + 'px';
        const textAlign = cardInputs.textAlign.value;
        const hoverEffect = cardInputs.hoverEffect.value;

        let hoverClass = '';
        if (hoverEffect === 'lift') hoverClass = 'card-hover-lift';
        else if (hoverEffect === 'pop') hoverClass = 'card-hover-pop';

        componentPreview.innerHTML = `
            <div class="generated-card ${hoverClass}" style="
                background-color: ${bgColor};
                border-radius: ${borderRadius};
                padding: ${padding};
                box-shadow: ${shadow};
                text-align: ${textAlign};
                transition: all 0.3s ease;
            ">
                <h3 style="
                    color: ${titleColor};
                    font-size: ${titleFontSize};
                    margin-bottom: 10px;
                ">${title}</h3>
                <p style="
                    color: ${contentColor};
                    font-size: ${contentFontSize};
                    line-height: 1.6;
                ">${content}</p>
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
        }
    }

    // Função para alternar as opções de personalização visíveis
    function showComponentOptions(componentId) {
        document.querySelectorAll('.component-options').forEach(optionDiv => {
            optionDiv.classList.remove('active');
        });
        document.getElementById(componentId).classList.add('active');
    }

    // --- Lógica de Event Listeners ---
    componentTypeSelect.addEventListener('change', () => {
        const selectedComponent = componentTypeSelect.value;
        showComponentOptions(selectedComponent + 'Options');
        updatePreview();
    });

    // Adiciona listeners para todos os inputs de personalização
    // Usando destructuring para iterar sobre os objetos de inputs
    Object.values(buttonInputs).forEach(input => {
        if (input.type !== 'checkbox') { // Ignora checkbox temporariamente
            input.addEventListener('input', updatePreview);
        }
    });
    buttonInputs.gradient.addEventListener('change', () => {
        buttonInputs.gradientColorsDiv.style.display = buttonInputs.gradient.checked ? 'block' : 'none';
        updatePreview();
    });


    Object.values(inputInputs).forEach(input => input.addEventListener('input', updatePreview));
    Object.values(cardInputs).forEach(input => input.addEventListener('input', updatePreview));

    // --- Geração de Código HTML, CSS e JS ---
    window.generateCode = function() {
        const selectedComponent = componentTypeSelect.value;
        let html = '';
        let css = '';
        let js = '';
        let className = '';

        const previewElement = componentPreview.querySelector('.generated-' + selectedComponent);
        if (!previewElement) {
            htmlOutput.textContent = 'Nenhum componente para gerar.';
            cssOutput.textContent = '';
            jsOutput.textContent = '';
            return;
        }

        // Definindo o nome da classe CSS para o componente
        className = `my-${selectedComponent}`; // Ex: my-button, my-input, my-card

        // --- Geração de HTML ---
        // Clonar o elemento de preview para remover estilos inline e classes de hover temporárias
        const cleanElement = previewElement.cloneNode(true);
        cleanElement.removeAttribute('style'); // Remove estilos inline
        cleanElement.classList.remove('button-hover-lift', 'button-hover-shine', 'button-hover-darken'); // Remove classes de hover da UI
        cleanElement.classList.remove('card-hover-lift', 'card-hover-pop');
        cleanElement.className = className; // Define a classe final

        // Ajustes específicos para HTML aninhado
        if (selectedComponent === 'card') {
            const h3 = cleanElement.querySelector('h3');
            const p = cleanElement.querySelector('p');
            if (h3) h3.removeAttribute('style'); // Remove estilos inline do h3
            if (p) p.removeAttribute('style'); // Remove estilos inline do p
        }

        html = cleanElement.outerHTML;


        // --- Geração de CSS ---
        const styles = window.getComputedStyle(previewElement);
        css += `.${className} {\n`;

        // Propriedades CSS comuns (copiadas do estilo inline)
        const cssPropsToCopy = [
            'background-color', 'background', 'color', 'padding', 'border-radius', 'font-size', 'font-weight',
            'width', 'height', 'border', 'border-color', 'border-width', 'border-style', 'box-shadow',
            'text-align'
        ];

        cssPropsToCopy.forEach(prop => {
            let value = styles.getPropertyValue(prop);
            if (value && value !== 'auto' && value !== 'initial' && value !== 'unset' && value !== 'normal' && value !== '0px' && value !== '0px none rgb(0, 0, 0)') {
                 // Trata gradiente separadamente se background for um gradiente
                if (prop === 'background-color' && value.startsWith('rgb')) {
                    const useGradient = buttonInputs.gradient.checked;
                    if (useGradient && selectedComponent === 'button') {
                        const gradColor1 = buttonInputs.gradientColor1.value;
                        const gradColor2 = buttonInputs.gradientColor2.value;
                        css += `  background: linear-gradient(135deg, ${gradColor1} 0%, ${gradColor2} 100%);\n`;
                    } else {
                        css += `  ${prop}: ${value};\n`;
                    }
                } else if (prop === 'background' && value.startsWith('linear-gradient')) {
                     // Não adicionar 'background' se já adicionamos 'background-color' ou gradiente específico
                }
                else {
                    css += `  ${prop}: ${value};\n`;
                }
            }
        });

        // Adiciona transições padrão para todos os componentes gerados
        css += `  transition: all 0.3s ease; /* Transição para um visual suave */\n`;

        css += `}\n\n`;

        // CSS específico por componente para efeitos hover ou sub-elementos
        if (selectedComponent === 'button') {
            const hoverEffect = buttonInputs.hoverEffect.value;
            if (hoverEffect === 'lift') {
                css += `.${className}:hover {\n  transform: translateY(-3px);\n  box-shadow: ${buttonInputs.shadow.value.replace('0 8px', '0 12px').replace('0.3', '0.4')};\n}\n`;
            } else if (hoverEffect === 'shine') {
                 // Adiciona a animação de brilho
                css += `.${className} {\n  position: relative;\n  overflow: hidden;\n}\n\n`;
                css += `.${className}::after {\n`;
                css += `  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n`;
                css += `  background: rgba(255, 255, 255, 0.2); /* Brilho branco */\n`;
                css += `  transform: skewX(-20deg);\n  transition: left 0.5s ease;\n`;
                css += `}\n\n`;
                css += `.${className}:hover::after {\n  left: 100%;\n}\n`;
            } else if (hoverEffect === 'darken') {
                css += `.${className}:hover {\n  filter: brightness(0.9);\n}\n`;
            }
            css += `.${className}:active {\n  transform: translateY(0);\n  box-shadow: ${buttonInputs.shadow.value.replace('0 8px', '0 4px').replace('0.3', '0.2')};\n}\n`;

            css += `.${className} {\n  letter-spacing: 0.5px;\n}\n`; // Adiciona espaçamento entre letras
        } else if (selectedComponent === 'input') {
            const placeholderColor = inputInputs.textColor.value; // Usa a cor do texto para o placeholder
            css += `.${className}::placeholder {\n  color: ${placeholderColor};\n  opacity: 0.7;\n}\n\n`;
            css += `.${className}:focus {\n`;
            css += `  border-color: ${inputInputs.borderColor.value};\n`; // Mantém a cor da borda no foco
            css += `  box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.25);\n`; // Sombra de foco
            css += `  outline: none;\n`;
            css += `}\n`;
        } else if (selectedComponent === 'card') {
            const titleColor = cardInputs.titleColor.value;
            const contentColor = cardInputs.contentColor.value;
            const titleFontSize = cardInputs.titleFontSize.value + 'px';
            const contentFontSize = cardInputs.contentFontSize.value + 'px';
            const hoverEffect = cardInputs.hoverEffect.value;

            css += `.${className} h3 {\n`;
            css += `  color: ${titleColor};\n`;
            css += `  font-size: ${titleFontSize};\n`;
            css += `  margin-bottom: 12px;\n`;
            css += `  font-weight: 600;\n`; // Garante peso da fonte
            css += `  border-bottom: 1px solid ${cardInputs.borderColor ? cardInputs.borderColor.value : '#E0E6EF'};\n`; // Adiciona borda no título
            css += `  padding-bottom: 8px;\n`;
            css += `}\n\n`;

            css += `.${className} p {\n`;
            css += `  color: ${contentColor};\n`;
            css += `  font-size: ${contentFontSize};\n`;
            css += `  line-height: 1.7;\n`;
            css += `}\n\n`;

            if (hoverEffect === 'lift') {
                css += `.${className}:hover {\n  transform: translateY(-5px);\n  box-shadow: ${cardInputs.shadow.value.replace('0 15px', '0 20px').replace('0.15', '0.2')};\n}\n`;
            } else if (hoverEffect === 'pop') {
                css += `.${className}:hover {\n  transform: scale(1.02);\n  box-shadow: ${cardInputs.shadow.value.replace('0 15px', '0 25px').replace('0.15', '0.25')};\n}\n`;
            }

            css += `.${className} {\n  cursor: pointer; /* Indicativo de interação */\n}\n`; // Adiciona cursor para o card
        }


        // Atualiza as áreas de código
        htmlOutput.textContent = formatHTML(html);
        cssOutput.textContent = formatCSS(css);
        jsOutput.textContent = js; // Continua vazio, a menos que adicione JS para o componente

        showCodeTab('html');
    };

    // --- Funções Auxiliares para Formatação de Código ---
    function formatHTML(html) {
        // Usa DOMParser para parsear e serializar o HTML de forma limpa
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const serializer = new XMLSerializer();
        let formatted = serializer.serializeToString(doc.body.firstChild || doc.body); // Pega o primeiro filho do body ou o body

        // Remove a tag <body> se ela for serializada
        formatted = formatted.replace(/<\/?body>/g, '').trim();

        // Adiciona indentação básica (você pode usar uma biblioteca como `prettier` para algo mais robusto)
        const indent = '  '; // 2 espaços
        formatted = formatted.replace(/>\s*</g, '><'); // Remove espaços entre tags
        formatted = formatted.split('><').map(line => {
            if (line.startsWith('/')) { // Tag de fechamento
                return line;
            }
            return line;
        }).join('>\n<');

        let indentLevel = 0;
        formatted = formatted.split('\n').map(line => {
            if (line.trim().startsWith('</') || line.trim().startsWith('/>')) {
                indentLevel--;
            }
            const indentedLine = indent.repeat(indentLevel) + line.trim();
            if (line.trim().startsWith('<') && !line.trim().startsWith('</') && !line.trim().endsWith('/>') && !line.includes('=')) { // Tag de abertura que não é vazia
                indentLevel++;
            }
            return indentedLine;
        }).join('\n');


        return formatted;
    }

    function formatCSS(css) {
        // Remove linhas vazias e espaços extras
        css = css.replace(/^\s*\n/gm, '').replace(/\s{2,}/g, ' ');

        let formatted = '';
        let indentLevel = 0;
        const indent = '  ';

        css.split('\n').forEach(line => {
            line = line.trim();
            if (line.endsWith('{')) {
                formatted += indent.repeat(indentLevel) + line + '\n';
                indentLevel++;
            } else if (line.startsWith('}')) {
                indentLevel--;
                formatted += indent.repeat(indentLevel) + line + '\n';
            } else if (line !== '') {
                formatted += indent.repeat(indentLevel) + line + '\n';
            }
        });
        return formatted;
    }

    // --- Funções para as Abas de Código e Copiar ---
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