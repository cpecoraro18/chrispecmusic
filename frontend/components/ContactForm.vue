<template>
    <div class="contact-card">
        <h2 class="h3 mb-2">{{ heading }}</h2>
        <p v-if="intro" class="contact-intro mb-4">{{ intro }}</p>

        <form @submit.prevent="submitForm" v-if="!thankYouMessage" novalidate>
            <div class="mb-3 text-start">
                <label for="name" class="form-label">Name</label>
                <input
                    type="text"
                    class="form-control"
                    id="name"
                    v-model="name"
                    autocomplete="name"
                    placeholder="Your name"
                    required
                    :disabled="isLoading"
                >
            </div>
            <div class="mb-3 text-start">
                <label for="email" class="form-label">Email address</label>
                <input
                    type="email"
                    class="form-control"
                    id="email"
                    v-model="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                    required
                    :disabled="isLoading"
                >
            </div>
            <div class="mb-4 text-start">
                <label for="message" class="form-label">{{ messageLabel }}</label>
                <textarea
                    class="form-control"
                    id="message"
                    v-model="message"
                    rows="5"
                    :placeholder="messagePlaceholder"
                    required
                    :disabled="isLoading"
                ></textarea>
                <p v-if="messageHint" class="form-hint mb-0">{{ messageHint }}</p>
            </div>
            <button type="submit" class="btn btn-cta w-100" :disabled="isLoading">
                <span v-if="isLoading">
                    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    Sending...
                </span>
                <span v-else>{{ submitLabel }}</span>
            </button>
            <p class="form-reassurance mb-0">{{ reassurance }}</p>
        </form>

        <div aria-live="polite">
            <div v-if="thankYouMessage" class="alert alert-success mb-0" role="status">
                {{ thankYouMessage }}
            </div>
            <div v-if="errorMessage" class="alert alert-danger mt-3 mb-0" role="alert">
                {{ errorMessage }}
            </div>
        </div>
    </div>
</template>

<script setup>
const RECAPTCHA_SITE_KEY = '6LdNJd8pAAAAAH6F9mgoS5xWO-PUMOqlSilpbcdF';

const props = defineProps({
    heading: { type: String, default: 'Get in touch' },
    intro: { type: String, default: '' },
    messageLabel: { type: String, default: 'Message' },
    messagePlaceholder: {
        type: String,
        default: 'Tell me a bit about what you need.',
    },
    messageHint: { type: String, default: '' },
    submitLabel: { type: String, default: 'Send Message' },
    reassurance: {
        type: String,
        default: "I read every message and usually reply within a day.",
    },
});

useHead({
    script: [
        {
            src: `https://www.google.com/recaptcha/api.js?render=${RECAPTCHA_SITE_KEY}`,
            async: true,
            defer: true
        },
    ],
});

const name = ref('');
const email = ref('');
const message = ref('');
const thankYouMessage = ref('');
const errorMessage = ref('');
const isLoading = ref(false);

const api = useApi();

const sendMessage = async (token) => {
    const data = await api.post('/contact', {
        name: name.value,
        email: email.value,
        message: message.value,
        recaptcha: token
    });

    if (data?.status !== 'success') {
        throw new Error(data?.message || 'Failed to send email');
    }

    // The conversion. page_path comes along automatically, which is what
    // separates a lead from /book-session from one from /contact.
    trackEvent('generate_lead', { form_heading: props.heading });

    thankYouMessage.value = "Thanks, your message is on its way. I'll get back to you as soon as I can.";
    name.value = '';
    email.value = '';
    message.value = '';
};

const submitForm = async () => {
    if (isLoading.value) return;
    isLoading.value = true;
    errorMessage.value = '';
    thankYouMessage.value = '';

    try {
        if (typeof grecaptcha === 'undefined') {
            throw new Error('reCAPTCHA not loaded');
        }

        // grecaptcha.ready takes a callback, so wrap it to keep the error
        // handling in one place instead of nesting a second try/catch inside.
        const token = await new Promise((resolve, reject) => {
            grecaptcha.ready(() => {
                grecaptcha
                    .execute(RECAPTCHA_SITE_KEY, { action: 'CONTACT_FORM_SUBMIT' })
                    .then(resolve)
                    .catch(reject);
            });
        });

        await sendMessage(token);
    } catch (error) {
        console.error('A problem occurred while sending the message.', error);
        // A lead that failed to send is worth more attention than one that
        // succeeded — a console error nobody is looking at is how a broken form
        // stays broken for a month.
        trackEvent('form_error', {
            form_heading: props.heading,
            error_message: error?.message,
        });
        errorMessage.value =
            'Something went wrong sending your message. Please try again, or email contact@chrispecmusic.com directly.';
    } finally {
        isLoading.value = false;
    }
};
</script>

<style scoped>
.contact-card {
    background-color: var(--bg-dark);
    border-radius: var(--radius-lg);
    padding: 2rem;
    box-shadow: var(--shadow-lg);
}

.contact-intro {
    color: var(--text-muted-on-dark);
}

.form-label {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.35rem;
}

input.form-control,
textarea.form-control {
    background-color: var(--bg-black);
    border: 1px solid rgba(var(--text-color-rgb), 0.22);
    color: var(--text-color);
    padding: 0.7rem 0.85rem;
    border-radius: var(--radius-sm);
}

input.form-control:focus,
textarea.form-control:focus {
    background-color: var(--bg-black);
    color: var(--text-color);
    border-color: var(--blue);
    box-shadow: none;
}

input.form-control::placeholder,
textarea.form-control::placeholder {
    color: rgba(var(--text-color-rgb), 0.42);
}

.form-hint,
.form-reassurance {
    font-size: 0.82rem;
    color: var(--text-muted-on-dark);
}

.form-hint {
    margin-top: 0.4rem;
}

.form-reassurance {
    margin-top: 0.85rem;
    text-align: center;
}

@media (max-width: 575px) {
    .contact-card {
        padding: 1.5rem;
    }
}
</style>
