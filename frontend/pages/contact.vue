<template>
    <div class="container py-5 vh-100">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h1 class="mb-4">Contact Information</h1>
                <div class="contact-info mt-5">
                    <p>Email: <a href="mailto:contact@chrispecmusic.com">contact@chrispecmusic.com</a></p>
                </div>
                <!---
                <h2 class="mt-5">Send me a message</h2>
                <form @submit.prevent="submitForm" class="mt-4">
                    <div class="mb-3">
                        <label for="email" class="form-label">Your Email Address</label>
                        <input type="email" class="form-control" id="email" v-model="email" placeholder="Your email" required>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" id="message" v-model="message" rows="3" placeholder="Your message" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
                <div v-if="thankYouMessage" class="mt-4 alert alert-success" role="alert">
                    {{ thankYouMessage }}
                </div>
            -->
            </div>
        </div>
    </div>
</template>

<script setup>

const name = ref('');
const email = ref('');
const message = ref('');
const thankYouMessage = ref('');


useHead({
    title: 'Contact Me - Chris Pecoraro',
    script: [
        {
            src: 'https://www.google.com/recaptcha/api.js?render=6LdNJd8pAAAAAH6F9mgoS5xWO-PUMOqlSilpbcdF',
            async: true,
            defer: true
        },
    ],
    meta: [
        {
            hid: 'description',
            name: 'description',
            content: 'Contact Chris Pecoraro by email at contact@chrispecmusic.com.'
        }
    ]
});

const submitForm = async () => {
    try {
        if (typeof grecaptcha !== 'undefined') {
            grecaptcha.ready(function() {
                grecaptcha.execute('6LdNJd8pAAAAAH6F9mgoS5xWO-PUMOqlSilpbcdF', { action: 'CONTACT_FORM_SUBMIT' }).then(async function(token) {
                    const response = await $fetch('https://api.chrispecmusic.com/contact', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: name.value,
                            email: email.value,
                            message: message.value,
                            recaptcha: token
                        })
                    });
                                        
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
        
                    thankYouMessage.value = 'Thank you for your message!';
                    // Clear the form
                    name.value = '';
                    email.value = '';
                    message.value = '';
                });
            });
        } else {
            throw new Error('reCAPTCHA not loaded');
        }
    } catch (error) {
        console.error('A problem occurred while sending the message.', error);
        thankYouMessage.value = 'Something went wrong. Please try again.';
    }
};
</script>