<template>
    <div class="container py-5 vh-100">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h1 class="mb-4">Contact Information</h1>
                <div class="contact-info mt-5">
                    <p>Email: <a href="mailto:your-email@example.com">chrispecmusic@gmail.com</a></p>
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
            message: ''
        }
    },
    methods: {
        submitForm() {
            alert(`Name: ${this.name}\nEmail: ${this.email}\nMessage: ${this.message}`);
        }
    }
}
</script>