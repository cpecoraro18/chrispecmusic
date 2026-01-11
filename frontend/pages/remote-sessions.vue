<template>
  <div class="service-details py-5">
    <div class="container">
      <!-- Hero Section -->
      <section class="mb-5">
        <h1 class="text-center mb-3">Studio Recordings</h1>
        <p class="lead text-center mb-0">
          Getting a custom bass track for your music is easy and stress-free. Whether you’re new to remote sessions or have done this before, I’ll guide you every step of the way.
        </p>
        <p class="text-center text-muted mt-2">
          Reach out by email, the contact form below, or schedule a remote call to discuss your project and get started.
        </p>
      </section>

      <!-- Main Content Row: Contact + Image/FAQ -->
      <section class="row g-5 align-items-stretch mb-5">
        <!-- Contact Form Card -->
        <div class="col-lg-6 mb-4 mb-lg-0">
          <div class="card shadow-sm h-100 bg-dark">
            <div class="card-body p-4">
              <h2 class="card-title mb-3 text-primary">Get In Touch</h2>
              <p class="mb-3">Ready to start or have questions? Fill out the form below, email <a href="mailto:contact@chrispecmusic.com">contact@chrispecmusic.com</a>, or <a href="#">schedule a remote call</a> to chat about your project.</p>
              <form @submit="submitForm" v-if="!thankYouMessage">
                <div class="mb-3">
                  <label for="name" class="form-label">Your Name <span class="text-danger">*</span></label>
                  <input type="text" class="form-control" id="name" v-model="name" required>
                </div>
                <div class="mb-3">
                  <label for="email" class="form-label">Your Email <span class="text-danger">*</span></label>
                  <input type="email" class="form-control" id="email" v-model="email" required>
                </div>
                <div class="mb-3">
                  <label for="subject" class="form-label">Subject</label>
                  <input type="text" class="form-control" id="subject" v-model="subject">
                </div>
                <div class="mb-3">
                  <label for="message" class="form-label">Your Message</label>
                  <textarea class="form-control" id="message" rows="4" v-model="message"></textarea>
                </div>
                <button type="submit" class="btn btn-primary w-100">Send Message</button>
              </form>
              <div v-if="thankYouMessage" class="mt-4 text-center">
                <div class="alert alert-success py-4 shadow-sm">
                  <i class="bi bi-check-circle-fill display-5 text-success mb-2"></i>
                  <h4 class="mb-2">Thank you!</h4>
                  <p class="mb-0">Your message has been sent. I’ll get back to you as soon as possible.</p>
                </div>
              </div>
              <div v-if="errorMessage" class="mt-4 text-center">
                <div class="alert alert-danger py-4 shadow-sm">
                  <i class="bi bi-x-circle-fill display-5 text-danger mb-2"></i>
                  <h4 class="mb-2">Oops!</h4>
                  <p class="mb-0">{{ errorMessage }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Image + FAQ Card -->
        <div class="col-lg-6 d-flex flex-column gap-4">
          <div class="card shadow-sm flex-grow-1">
            <img class="img-fluid rounded-top" src="/img/studio.jpg" alt="Professional Studio Setup" style="object-fit:cover; max-height:260px; width:100%;">
            <div class="card-body">
              <h3 class="card-title mb-3 text-primary">Frequently Asked Questions</h3>
              <ul class="list-unstyled mb-3">
                <li class="mb-3">
                  <strong>How do I book a remote session?</strong><br>
                  Just fill out the form, email me, or schedule a remote call. I’ll reply quickly to discuss your project.
                </li>
                <li class="mb-3">
                  <strong>What files do I need to send?</strong><br>
                  An MP3 or WAV of your song, and any notes or reference tracks. A guide bass line is helpful but not required.
                </li>
                <li class="mb-3">
                  <strong>How fast is turnaround?</strong><br>
                  Most projects are completed within a few days. Rush delivery is available if you’re on a deadline.
                </li>
                <li class="mb-3">
                  <strong>Can I request changes?</strong><br>
                  Absolutely! I want you to be 100% happy. Revisions are included.
                </li>
                <li class="mb-3">
                  <strong>How do I pay?</strong><br>
                  Once you’re satisfied, I’ll send a payment link.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- How It Works Section -->
      <section class="mb-5">
        <h2 class="text-center mb-4 border-bottom pb-3">How It Works</h2>
        <div class="row justify-content-center">
          <div class="col-lg-10">
            <ol class="list-group list-group-numbered my-4">
              <li class="list-group-item"><span class="fw-bold">Reach Out:</span> Contact me by email, the form above, or schedule a remote call. Tell me about your project and what you need.</li>
              <li class="list-group-item"><span class="fw-bold">Share Your Music:</span> Send your song (MP3 or WAV) and any notes or reference tracks. If you have a guide bass line, great—if not, that’s fine too.</li>
              <li class="list-group-item"><span class="fw-bold">Details & Preferences:</span> Let me know the tempo (BPM) and any style or sound preferences. Not sure? I’m happy to make suggestions.</li>
              <li class="list-group-item"><span class="fw-bold">Recording:</span> I’ll record 2–3 takes with different feels or approaches, so you have options. You can mix and match or pick your favorite.</li>
              <li class="list-group-item"><span class="fw-bold">Review & Feedback:</span> I’ll send you the tracks to review. Need changes? Just ask—revisions are part of the process.</li>
              <li class="list-group-item"><span class="fw-bold">Final Delivery & Payment:</span> Once you’re happy, you’ll receive the final files and a payment link. Fast turnaround is always available if you’re on a deadline.</li>
            </ol>
          </div>
        </div>
      </section>

      <!-- Reviews Section -->
      <section>
        <h2 class="text-center mb-4 border-bottom pb-3">Reviews</h2>
        <p class="lead text-muted text-center mx-3">Read what my clients have to say about working with me.</p>
        <div class="mb-5">
          <review-list></review-list>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

useHead({
  title: 'Remote Bass Recording - Chris Pecoraro',
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
      content: 'Get top-quality custom bass tracks for your music from bassist Chris Pecoraro. Perfect for any genre, remotely or in-studio.'
    }
  ]
});

const name = ref('');
const email = ref('');
const subject = ref('');
const message = ref('');
const thankYouMessage = ref('');
const errorMessage = ref('');

const submitForm = async (e) => {
  e.preventDefault();
  thankYouMessage.value = '';
  errorMessage.value = '';
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
                subject: subject.value,
                message: message.value,
                recaptcha: token
              })
            });

            const data = typeof response === 'string' ? JSON.parse(response) : response;

            if (data.status !== 'success') {
              throw new Error(data.message || 'Failed to send email');
            }

            thankYouMessage.value = 'Thank you for your message! I will get back to you as soon as possible.';
            name.value = '';
            email.value = '';
            subject.value = '';
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
.card-title {
  color: var(--primary-color, #0d6efd);
}
.card {
  border-radius: 1rem;
}
.card-body {
  padding: 2rem;
}
.list-group-item {
  background-color: var(--bg-light-blue, #f8fafd);
  color: var(--text-color-dark, #222);
  border: none;
  padding: 1em;
  font-size: 1.08em;
}
.img-fluid {
  height: auto;
  max-height: 260px;
  object-fit: cover;
}
.btn-primary, .btn-outline-primary {
  border-radius: 2rem;
  font-weight: 600;
  padding-left: 2rem;
  padding-right: 2rem;
}
.btn-outline-secondary {
  border-radius: 2rem;
  font-weight: 500;
}
.alert-success, .alert-danger {
  border-radius: 1rem;
  font-size: 1.1em;
}
</style>
