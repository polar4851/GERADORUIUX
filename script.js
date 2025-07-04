document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Referências para os elementos do DOM
    // ----------------------------------------------------
    const componentTypeSelect = document.getElementById('componentType');
    const componentPreview = document.getElementById('componentPreview');
    const htmlOutput = document.querySelector('#htmlCode code');
    const cssOutput = document.querySelector('#cssCode code');
    const jsOutput = document.querySelector('#jsCode code'); // Para futuro uso, se houver JS do componente

    // Contêineres de opções por componente
    const buttonOptions = document.getElementById('buttonOptions');
    const inputOptions = document.getElementById('inputOptions');
    const cardOptions = document.getElementById('cardOptions');

    // Mapeamento de elementos de entrada para o componente de preview
    // Botão
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

    // Campo de Texto
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

    // Card
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

    // ----------------------------------------------------
    // 2. Funções para Renderizar os Componentes no Preview
    //    (Estilos aplicados via style="" para garantir dinamismo)
    // ----------------------------------------------------
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

        let backgroundStyle = useGradient ? `linear-gradient(135deg, ${gradientColor1} 0%, ${gradientColor2} 100%)` : bgColor;

        // Adiciona classes de hover para que os efeitos CSS funcionem no preview
        let hoverClass = '';
        if (hoverEffect === 'lift') hoverClass = 'button-hover-lift';
        else if (hoverEffect === 'shine') hoverClass = 'button-hover-shine';
        else if (hoverEffect === 'darken') hoverClass = 'button-hover-darken';

        componentPreview.innerHTML = `
            <button class="generated-button ${hoverClass}" style="
                background: ${backgroundStyle};
                color: ${textColor};
                padding: ${paddingY} ${paddingX};
                border-radius: ${borderRadius};
                font-size: ${fontSize};
                font-weight: ${fontWeight};
                box-shadow: ${shadow};
                transition: all 0.3s cubic-bezier(0.0, 0.0, 0.2, 1); /* Transição suave para todas as propriedades */
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
                transition: all 0.3s ease; /* Transição para foco */
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

        // Adiciona classes de hover para que os efeitos CSS funcionem no preview
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
                ">${title}</h3>
                <p style="
                    color: ${contentColor};
                    font-size: ${contentFontSize};
                ">${content}</p>
            </div>
        `;
    }

    // ----------------------------------------------------
    // 3. Lógica Principal: Atualiza Preview e Opções Visíveis
    // ----------------------------------------------------
    function updatePreview() {
        const selectedComponent = componentTypeSelect.value;
        switch (selectedComponent) {
            case 'button':
                renderButton();
                // Controla a visibilidade das cores do gradiente
                buttonInputs.gradientColorsDiv.style.display = buttonInputs.gradient.checked ? 'block' : 'none';
                break;
            case 'input':
                renderInput();
                break;
            case 'card':
                renderCard();
                break;
        }
    }

    function showComponentOptions(componentId) {
        document.querySelectorAll('.component-options').forEach(optionDiv => {
            optionDiv.classList.remove('active');
        });
        document.getElementById(componentId).classList.add('active');
    }

    // ----------------------------------------------------
    // 4. Event Listeners para Interatividade
    // ----------------------------------------------------
    componentTypeSelect.addEventListener('change', () => {
        const selectedComponent = componentTypeSelect.value;
        showComponentOptions(selectedComponent + 'Options');
        updatePreview();
    });

    // Adiciona listeners para todos os inputs de personalização
    // A cada mudança, o preview é atualizado
    Object.values(buttonInputs).forEach(input => {
        if (input.type === 'checkbox') {
            input.addEventListener('change', updatePreview); // 'change' para checkboxes
        } else {
            input.addEventListener('input', updatePreview); // 'input' para texto, números, cor
        }
    });

    Object.values(inputInputs).forEach(input => input.addEventListener('input', updatePreview));
    Object.values(cardInputs).forEach(input => input.addEventListener('input', updatePreview));

    // ----------------------------------------------------
    // 5. Geração de Código HTML, CSS e JS
    // ----------------------------------------------------
    window.generateCode = function() {
        const selectedComponent = componentTypeSelect.value;
        let html = '';
        let css = '';
        let js = ''; // Continua vazio, a menos que você adicione JS de componente

        // Pega o elemento do preview para extrair propriedades
        const previewElement = componentPreview.querySelector('.generated-' + selectedComponent);
        if (!previewElement) {
            htmlOutput.textContent = 'Nenhum componente para gerar.';
            cssOutput.textContent = '';
            jsOutput.textContent = '';
            return;
        }

        // Define o nome da classe CSS para o componente gerado
        const className = `my-${selectedComponent}`;

        // --- Geração de HTML ---
        // Clona o elemento de preview para manipular sem afetar o DOM original
        const cleanElement = previewElement.cloneNode(true);
        cleanElement.removeAttribute('style'); // Remove todos os estilos inline

        // Remove as classes de hover usadas apenas na UI do gerador
        if (selectedComponent === 'button') {
            cleanElement.classList.remove('generated-button', 'button-hover-lift', 'button-hover-shine', 'button-hover-darken');
        } else if (selectedComponent === 'input') {
            cleanElement.classList.remove('generated-input');
        } else if (selectedComponent === 'card') {
            cleanElement.classList.remove('generated-card', 'card-hover-lift', 'card-hover-pop');
        }
        cleanElement.classList.add(className); // Adiciona a classe final

        // Ajustes específicos para HTML aninhado (Card)
        if (selectedComponent === 'card') {
            const h3 = cleanElement.querySelector('h3');
            const p = cleanElement.querySelector('p');
            if (h3) {
                h3.removeAttribute('style');
                h3.className = `${className}__title`; // Ex: my-card__title
            }
            if (p) {
                p.removeAttribute('style');
                p.className = `${className}__content`; // Ex: my-card__content
            }
        }
        html = cleanElement.outerHTML;

        // --- Geração de CSS ---
        css += `.${className} {\n`;
        if (selectedComponent === 'button') {
            const useGradient = buttonInputs.gradient.checked;
            if (useGradient) {
                const gradColor1 = buttonInputs.gradientColor1.value;
                const gradColor2 = buttonInputs.gradientColor2.value;
                css += `  background: linear-gradient(135deg, ${gradColor1} 0%, ${gradColor2} 100%);\n`;
            } else {
                css += `  background-color: ${buttonInputs.bgColor.value};\n`;
            }
            css += `  color: ${buttonInputs.textColor.value};\n`;
            css += `  padding: ${buttonInputs.paddingY.value}px ${buttonInputs.paddingX.value}px;\n`;
            css += `  border-radius: ${buttonInputs.borderRadius.value}px;\n`;
            css += `  font-size: ${buttonInputs.fontSize.value}px;\n`;
            css += `  font-weight: ${buttonInputs.fontWeight.value};\n`;
            css += `  box-shadow: ${buttonInputs.shadow.value};\n`;
            css += `  border: none;\n`;
            css += `  cursor: pointer;\n`;
            css += `  letter-spacing: 0.5px;\n`;
            css += `  transition: all 0.3s cubic-bezier(0.0, 0.0, 0.2, 1); /* Curva de animação suave */\n`;
            if (buttonInputs.hoverEffect.value === 'shine') { // Apenas se o efeito shine for selecionado
                css += `  position: relative;\n  overflow: hidden;\n`;
            }
        } else if (selectedComponent === 'input') {
            css += `  width: ${inputInputs.width.value}px;\n`;
            css += `  padding: ${inputInputs.padding.value}px;\n`;
            css += `  border: ${inputInputs.borderWidth.value}px ${inputInputs.borderStyle.value} ${inputInputs.borderColor.value};\n`;
            css += `  border-radius: ${inputInputs.borderRadius.value}px;\n`;
            css += `  background-color: ${inputInputs.bgColor.value};\n`;
            css += `  color: ${inputInputs.textColor.value};\n`;
            css += `  font-size: ${inputInputs.fontSize.value}px;\n`;
            css += `  box-shadow: ${inputInputs.shadow.value};\n`;
            css += `  transition: all 0.3s ease;\n`;
        } else if (selectedComponent === 'card') {
            css += `  background-color: ${cardInputs.bgColor.value};\n`;
            css += `  border-radius: ${cardInputs.borderRadius.value}px;\n`;
            css += `  padding: ${cardInputs.padding.value}px;\n`;
            css += `  box-shadow: ${cardInputs.shadow.value};\n`;
            css += `  text-align: ${cardInputs.textAlign.value};\n`;
            css += `  transition: all 0.3s ease;\n`;
            css += `  cursor: pointer;\n`;
        }
        css += `}\n\n`;

        // CSS para sub-elementos (Card)
        if (selectedComponent === 'card') {
            css += `.${className}__title {\n`;
            css += `  color: ${cardInputs.titleColor.value};\n`;
            css += `  font-size: ${cardInputs.titleFontSize.value}px;\n`;
            css += `  margin-top: 0;\n`;
            css += `  margin-bottom: 12px;\n`;
            css += `  font-weight: 600;\n`;
            css += `  border-bottom: 1px solid #E0E6EF; /* Usar uma cor fixa ou variável para borda do título */\n`;
            css += `  padding-bottom: 8px;\n`;
            css += `}\n\n`;

            css += `.${className}__content {\n`;
            css += `  color: ${cardInputs.contentColor.value};\n`;
            css += `  font-size: ${cardInputs.contentFontSize.value}px;\n`;
            css += `  line-height: 1.7;\n`;
            css += `  margin-bottom: 0;\n`;
            css += `}\n\n`;
        }

        // CSS para efeitos hover (adicionado ao CSS gerado)
        if (selectedComponent === 'button') {
            const hoverEffect = buttonInputs.hoverEffect.value;
            if (hoverEffect === 'lift') {
                css += `.${className}:hover {\n  transform: translateY(-3px);\n  box-shadow: ${buttonInputs.shadow.value.replace('0 8px', '0 12px').replace('0.3', '0.4')};\n}\n\n`;
                css += `.${className}:active {\n  transform: translateY(0);\n  box-shadow: ${buttonInputs.shadow.value.replace('0 8px', '0 4px').replace('0.3', '0.2')};\n}\n`;
            } else if (hoverEffect === 'shine') {
                 css += `.${className}::after {\n`;
                 css += `  content: '';\n  position: absolute;\n  top: 0;\n  left: -100%;\n  width: 100%;\n  height: 100%;\n`;
                 css += `  background: rgba(255, 255, 255, 0.2); /* Brilho branco */\n`;
                 css += `  transform: skewX(-20deg);\n  transition: left 0.5s ease;\n`;
                 css += `}\n\n`;
                 css += `.${className}:hover::after {\n  left: 100%;\n}\n`;
            } else if (hoverEffect === 'darken') {
                css += `.${className}:hover {\n  filter: brightness(0.9);\n}\n`;
            }
        } else if (selectedComponent === 'input') {
            css += `.${className}::placeholder {\n  color: ${inputInputs.textColor.value};\n  opacity: 0.7;\n}\n\n`;
            css += `.${className}:focus {\n`;
            css += `  border-color: ${inputInputs.borderColor.value};\n`;
            css += `  box-shadow: 0 0 0 4px rgba(108, 99, 255, 0.25);\n`;
            css += `  outline: none;\n`;
            css += `}\n`;
        } else if (selectedComponent === 'card') {
            const hoverEffect = cardInputs.hoverEffect.value;
            if (hoverEffect === 'lift') {
                css += `.${className}:hover {\n  transform: translateY(-5px);\n  box-shadow: ${cardInputs.shadow.value.replace('0 15px', '0 20px').replace('0.15', '0.2')};\n}\n`;
            } else if (hoverEffect === 'pop') {
                css += `.${className}:hover {\n  transform: scale(1.02);\n  box-shadow: ${cardInputs.shadow.value.replace('0 15px', '0 25px').replace('0.15', '0.25')};\n}\n`;
            }
        }

        // Atualiza as áreas de código
        htmlOutput.textContent = formatHTML(html);
        cssOutput.textContent = formatCSS(css);
        jsOutput.textContent = js; // Por enquanto, vazio para a maioria dos componentes

        showCodeTab('html');
    };

    // ----------------------------------------------------
    // 6. Funções Auxiliares: Formatação de Código e Abas
    // ----------------------------------------------------
    function formatHTML(html) {
        // Implementação do DOMParser para formatação mais robusta
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        let formatted = '';
        let indentLevel = 0;
        const indent = '  '; // 2 espaços por nível de indentação

        function processNode(node) {
            let line = '';
            if (node.nodeType === Node.ELEMENT_NODE) {
                const tagName = node.tagName.toLowerCase();
                const attributes = Array.from(node.attributes).map(attr => `${attr.name}="${attr.value}"`).join(' ');

                if (node.children.length === 0 && !node.textContent.trim()) { // Elemento vazio (ex: <input />, <img />)
                    line = `${indent.repeat(indentLevel)}<${tagName}${attributes ? ' ' + attributes : ''}/>`;
                } else {
                    line = `${indent.repeat(indentLevel)}<${tagName}${attributes ? ' ' + attributes : ''}>`;
                    if (node.textContent.trim() && node.children.length === 0) { // Contém apenas texto
                        line += node.textContent.trim();
                        line += `</${tagName}>`;
                    } else { // Contém outros elementos ou texto e elementos
                        formatted += line + '\n';
                        indentLevel++;
                        for (let i = 0; i < node.childNodes.length; i++) {
                            processNode(node.childNodes[i]);
                        }
                        indentLevel--;
                        line = `${indent.repeat(indentLevel)}</${tagName}>`;
                    }
                }
            } else if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
                line = `${indent.repeat(indentLevel)}${node.textContent.trim()}`;
            }
            if (line) formatted += line + '\n';
        }

        processNode(doc.body.firstElementChild); // Processa o primeiro elemento dentro do body

        return formatted.trim();
    }


    function formatCSS(css) {
        // Remove linhas vazias e múltiplos espaços, adiciona quebras de linha para regras
        css = css.replace(/;\s*}/g, ';\n}').replace(/{\s*/g, ' {\n  ').replace(/;(?!\s*$)/g, ';\n');
        css = css.replace(/^\s*\n/gm, '').replace(/\s{2,}/g, ' ');

        let formatted = '';
        let indentLevel = 0;
        const indent = '  '; // 2 espaços

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

    // ----------------------------------------------------
    // 7. Inicialização da Página
    // ----------------------------------------------------
    // Inicializa a página: mostra as opções do botão e renderiza o botão padrão
    showComponentOptions('buttonOptions');
    updatePreview();
});