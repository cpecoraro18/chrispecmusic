<template>
  <div class="container vh-100 d-flex flex-column align-items-center py-5">
    <h1 class="mb-4 text-center">Get In Touch</h1>
    <div class="row w-100 align-items-center justify-content-center">
        <div class="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <div class="w-100">
            <contact-form></contact-form>
            </div>
        </div>
        <div class="col-md-6 text-center mb-4 mb-md-0 d-flex flex-column align-items-center">
            <img src="/img/ChrisPecMusicSmall.jpg" alt="Chris Pecoraro" class="img-fluid rounded shadow mb-4" style="max-height: 320px; object-fit: cover;" />
            <div class="contact-info">
                <p>
                Looking to book an online bass session? Head over to the <router-link to="/book-session">Book Session</router-link> page for a simple step-by-step guide. Have a specific idea or just want to get in touch? Use the form on the left—I’m happy to connect.
                </p>
            </div>
        </div>
    </div>
  </div>
</template>

<script setup>
    useHead({
        title: 'Contact - Chris Pecoraro',
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
</script>
