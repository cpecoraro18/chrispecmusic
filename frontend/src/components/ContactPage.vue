<template>
    <div class="container py-5 vh-100">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h1 class="mb-4">Contact Information</h1>
                <div class="contact-info mt-5">
                    <p>Email: <a href="contact@chrispecmusic.com">contact@chrispecmusic.com</a></p>
                </div>
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ContactPage',
    data() {
        return {
            name: '',
            email: '',
            message: '',
            thankYouMessage: '',
            recaptcha: ''
        }
    },
    created() {
        // Dynamically add the reCAPTCHA script to the head
        const script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=6LdNJd8pAAAAAH6F9mgoS5xWO-PUMOqlSilpbcdF';
        document.head.appendChild(script);
    },
    methods: {
        async submitForm() {
            var self = this;
            try {
                // eslint-disable-next-line
                grecaptcha.ready(function() {
                    // eslint-disable-next-line
                    grecaptcha.execute('6LdNJd8pAAAAAH6F9mgoS5xWO-PUMOqlSilpbcdF', { action: 'CONTACT_FORM_SUBMIT' }).then(async function(token) {
                        const response = await fetch('https://api.chrispecmusic.com/contact', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                name: self.name,
                                email: self.email,
                                message: self.message,
                                recaptcha: token
                            })
                        });
                                                
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
            
                        self.thankYouMessage = 'Thank you for your message!';
                        // Clear the form
                        self.name = '';
                        self.email = '';
                        self.message = '';
                    });
                });
            } catch (error) {
                console.error('A problem occurred while sending the message.', error);
                this.thankYouMessage = 'Something went wrong. Please try again.';
            }
        }
    }
}
</script>