// contact.js

(function () {
    'use strict';

    function initContactForm() {
        const form = document.getElementById('contact-email-form');
        const status = document.getElementById('contact-form-status');

        if (!form || !status) {
            return;
        }

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            if (!form.reportValidity()) {
                status.textContent = 'Complete the required fields before preparing the email.';
                return;
            }

            const data = new FormData(form);
            const recipient = form.dataset.recipient;
            const name = String(data.get('name') || '').trim();
            const email = String(data.get('email') || '').trim();
            const topic = String(data.get('topic') || '').trim();
            const message = String(data.get('message') || '').trim();
            const subject = `InfraStack: ${topic}`;
            const body = [
                `Name: ${name}`,
                `Reply email: ${email}`,
                `Topic: ${topic}`,
                '',
                message,
            ].join('\n');

            status.textContent = 'Opening your email application with the prepared message.';
            window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        });
    }

    window.addEventListener('DOMContentLoaded', initContactForm, { once: true });
}());
