(function attachFaqPattern(global) {
    const patterns = global.InfraStackScaffoldSectionPatterns || {};

    /**
     * Binds optional FAQ details behavior inside a scoped markdown card.
     *
     * @param {HTMLElement|Document} root Scoped root that contains FAQ items.
     * @param {Object} options Binding options.
     * @param {boolean} options.singleOpen Whether opening one FAQ closes the others.
     * @returns {Function} Cleanup function that removes listeners.
     */
    function bindFaqDetails(root, options) {
        const scope = root || document;
        const bindOptions = options || {};
        const items = Array.from(scope.querySelectorAll('.faq-item'));
        const unbinders = [];

        items.forEach(function bindItem(item) {
            function handleToggle() {
                if (!bindOptions.singleOpen || !item.open) {
                    return;
                }

                items.forEach(function closeOther(otherItem) {
                    if (otherItem !== item) {
                        otherItem.open = false;
                    }
                });
            }

            item.addEventListener('toggle', handleToggle);
            unbinders.push(function unbindItem() {
                item.removeEventListener('toggle', handleToggle);
            });
        });

        return function unbindFaqDetails() {
            unbinders.forEach(function callUnbinder(unbind) {
                unbind();
            });
        };
    }

    patterns.faq = {
        bindFaqDetails
    };

    global.InfraStackScaffoldSectionPatterns = patterns;
}(window));
