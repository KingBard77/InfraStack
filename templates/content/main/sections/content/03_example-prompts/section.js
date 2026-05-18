(function attachExamplePromptsPattern(global) {
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
     * Binds baseline copy buttons to prompt example blocks.
     *
     * @param {HTMLElement|Document} root Scoped root that contains prompt examples.
     * @returns {Function} Cleanup function that removes listeners.
     */
    function initMarkdownCopyButtons(root) {
        const scope = root || document;
        const promptBlocks = Array.from(scope.querySelectorAll('.markdown-content pre.__PREFIX__-prompt-pre'));
        const promptCopyButtons = Array.from(scope.querySelectorAll('.__PREFIX__-prompt-copy-btn'));
        const unbinders = [];

        promptCopyButtons.forEach(function bindButton(button) {
            const promptIndex = Number.parseInt(button.dataset.promptCopyIndex || '', 10);
            const promptBlock = Number.isFinite(promptIndex) ? promptBlocks[promptIndex] : null;
            const code = promptBlock ? promptBlock.querySelector('code') : null;

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

    patterns.examplePrompts = {
        initMarkdownCopyButtons
    };

    global.InfraStackScaffoldSectionPatterns = patterns;
}(window));
