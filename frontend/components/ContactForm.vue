<template>
    <div class="container bg-dark py-5 rounded">
        <h2 class="mb-4 text-center text-white">Contact Me</h2>
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <form @submit.prevent="submitForm" class="mt-4" v-if="!thankYouMessage">
                    <div class="mb-3">
                        <label for="name" class="form-label">Name</label>
                        <input type="text" class="form-control" id="name" v-model="name" placeholder="Your name" required>
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" class="form-control" id="email" v-model="email" placeholder="Your email address" required>
                    </div>
                    <div class="mb-3">
                        <label for="message" class="form-label">Message</label>
                        <textarea class="form-control" id="message" v-model="message" rows="3" placeholder="Your message" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-outline-light">Submit</button>
                </form>
                <div v-if="thankYouMessage" class="mt-4 alert alert-success" role="alert">
                    {{ thankYouMessage }}
                </div>
                <div v-if="errorMessage" class="mt-4 alert alert-danger" role="alert">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </div>
</template> 
<script setup>

const name = ref('');
const email = ref('');
const message = ref('');
const thankYouMessage = ref('');
const errorMessage = ref('');
const submitForm = async () => {
    try {
        if (typeof grecaptcha !== 'undefined') {
            grecaptcha.ready(function() {
                grecaptcha.execute('6LdNJd8pAAAAAH6F9mgoS5xWO-PUMOqlSilpbcdF', { action: 'CONTACT_FORM_SUBMIT' }).then(async function(token) {
                    try {
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

                        const data = JSON.parse(response);

                        // Check if the response indicates failure
                        if (data.status !== 'success') {
                            throw new Error(data.message || 'Failed to send email');
                        }

                        thankYouMessage.value = 'Thank you for your message! I will get back to you as soon as possible.';
                        // Clear the form
                        name.value = '';
                        email.value = '';
                        message.value = '';
                    } catch (error) {
                        console.error('A problem occurred while sending the message.', error);
                        errorMessage.value = 'Something went wrong. Please try again later.';
                    }
                });
            });
        } else {
            throw new Error('reCAPTCHA not loaded');
        }
    } catch (error) {
        console.error('A problem occurred while processing the form.', error);
        errorMessage.value = 'Something went wrong. Please try again later.';
    }
};
</script>

<style scoped>
input.form-control,
textarea.form-control {
  background-color: var(--bg-dark)
}
</style>