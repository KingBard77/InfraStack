(function attachExampleCommandsPattern(global) {
    const patterns = global.InfraStackScaffoldSectionPatterns || {};

    function flashButton(button, label) {
        if (!button) {
            return;
        }

        const original = button.textContent;
        button.textContent = label;
        global.setTimeout(function restoreLabel() {
            button.textContent = original;
        }, 1200);
    }

    function fallbackClipboardWriteText(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-9999px';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();

        const didCopy = document.execCommand('copy');
        textarea.remove();

        if (!didCopy) {
            throw new Error('Clipboard copy failed.');
        }
    }

    async function writeClipboardText(text) {
        if (navigator.clipboard && global.isSecureContext) {
            try {
                await navigator.clipboard.writeText(text);
                return;
            } catch (error) {
                fallbackClipboardWriteText(text);
                return;
            }
        }

        fallbackClipboardWriteText(text);
    }

    /**
     * Binds baseline copy buttons to command example blocks.
     *
     * @param {HTMLElement|Document} root Scoped root that contains command examples.
     * @returns {Function} Cleanup function that removes listeners.
     */
    function initMarkdownCopyButtons(root) {
        const scope = root || document;
        const commandBlocks = Array.from(scope.querySelectorAll('.markdown-content pre.__PREFIX__-command-pre'));
        const commandCopyButtons = Array.from(scope.querySelectorAll('.__PREFIX__-command-copy-btn'));
        const unbinders = [];

        commandCopyButtons.forEach(function bindButton(button) {
            const commandIndex = Number.parseInt(button.dataset.commandCopyIndex || '', 10);
            const commandBlock = Number.isFinite(commandIndex) ? commandBlocks[commandIndex] : null;
            const code = commandBlock ? commandBlock.querySelector('code') : null;

            if (!code) {
                button.disabled = true;
                return;
            }

            async function handleClick(event) {
                event.preventDefault();
                event.stopPropagation();

                try {
                    await writeClipboardText(code.textContent.trim());
                    flashButton(button.querySelector('span') || button, 'Copied');
                    button.classList.add('copied');
                    global.setTimeout(function clearCopied() {
                        button.classList.remove('copied');
                    }, 1400);
                } catch (error) {
                    flashButton(button.querySelector('span') || button, 'Failed');
                }
            }

            button.addEventListener('click', handleClick);
            unbinders.push(function unbindButton() {
                button.removeEventListener('click', handleClick);
            });
        });

        return function unbindMarkdownCopyButtons() {
            unbinders.forEach(function callUnbinder(unbind) {
                unbind();
            });
        };
    }

    patterns.exampleCommands = {
        initMarkdownCopyButtons
    };

    global.InfraStackScaffoldSectionPatterns = patterns;
}(window));
