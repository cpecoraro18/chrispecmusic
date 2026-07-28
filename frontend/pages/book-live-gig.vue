<template>
  <div class="py-5">
    <div class="container mb-5 pb-5">
      <!-- HERO -->
      <section class="mb-lg-5">
        <h1 class="text-center mb-3">Book a Live Gig</h1>
        <p class="lead text-center mb-1">
          Hire a professional bassist for your next live show, event, or tour—reliable, versatile, and ready to bring your music to life on stage.
        </p>
      </section>
      <!-- MAIN ROW: IMAGE + CTA -->
      <section class="row g-5 align-items-stretch flex-column-reverse flex-lg-row">
        <div class="col-lg-6 d-flex flex-column gap-4 order-lg-1">
          <div class="card border-0 flex-grow-1">
            <div class="p-4 rounded-3">
              <h2 class="mb-4 border-bottom pb-3 text-center">How It Works</h2>
              <ol class="list-group list-group-numbered my-4 bg-transparent">
                <li class="list-group-item bg-transparent border-0">
                  <strong>Contact Me:</strong> Reach out with your event details and music needs.
                </li>
                <li class="list-group-item bg-transparent border-0">
                  <strong>Share Info:</strong> Send your setlist, charts, or recordings, and event details.
                </li>
                <li class="list-group-item bg-transparent border-0">
                  <strong>Performance:</strong> I’ll arrive prepared and ready to play.
                </li>
              </ol>
            </div>
          </div>
        </div>
        <div class="col-lg-6 order-lg-2">
          <contact-form></contact-form>
        </div>
      </section>
    </div>

    <div class="container mb-5">
      <section class="row g-5 mb-5">
        <div class="p-4 rounded-3 mb-5 bg-light color-dark">
          <h2 class="mb-4 border-bottom pb-3 text-center text-dark">Events</h2>
          <div class="row text-center g-4 justify-content-center">
            <div class="col-md-4">
              <div class="p-3 border rounded shadow-sm bg-light text-dark h-100">
                <h3 class="mb-2 text-dark">Clubs & Venues</h3>
                <p class="mb-0">Jazz, rock, pop, and more—bars, music clubs, and listening rooms.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 border rounded shadow-sm bg-light text-dark h-100">
                <h3 class="mb-2 text-dark">Weddings & Private Events</h3>
                <p class="mb-0">Ceremonies, receptions, parties, and corporate events.</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="p-3 border rounded shadow-sm bg-light text-dark h-100">
                <h3 class="mb-2 text-dark">Festivals & Tours</h3>
                <p class="mb-0">Regional festivals, touring acts, and multi-date runs.</p>
              </div>
            </div>
          </div>
          <p class="text-muted text-center mt-3 small">
            All bookings are custom quoted. Contact me to discuss your event and get a personalized rate.
          </p>
        </div>
      </section>
      <!-- FAQ -->
      <section class="row g-5 mb-5">
        <div class="col-12">
          <div class="faq-list mx-auto" style="max-width: 700px;">
            <div v-for="(faq, i) in faqs" :key="i" class="faq-item mb-3">
              <button class="faq-question btn btn-link w-100 text-start px-0" @click="toggleFaq(i)">
                <strong>{{ faq.q }}</strong>
                <span class="float-end"><i :class="openedFaq === i ? 'fa fa-chevron-up' : 'fa fa-chevron-down'"></i></span>
              </button>
              <div v-if="openedFaq === i" class="faq-answer bg-white text-dark p-3 rounded shadow-sm mt-2">
                {{ faq.a }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- GET IN TOUCH CTA -->
    <div class="container-fluid py-3">
      <div class="row text-center">
        <h3 class="mx-auto mb-4 fw-bold h2">Get in Touch</h3>
        <p class="lead">Ready to book or have questions? Let’s connect!</p>
      </div>
      <div class="row">
        <div class="col-lg-6 mx-auto text-center">
          <p class="lead d-flex justify-content-center align-items-center">
            <i class="fa fa-envelope me-2"></i>
            <a href="mailto:contact@chrispecmusic.com" class="fw-bold">contact@chrispecmusic.com</a>
          </p>
        </div>
      </div>
      <div class="row mt-2 mb-4">
        <div class="col-lg-6 mx-auto text-center">
          <nuxt-link class="btn btn-outline-light mt-3 rounded-lg" to="/contact">Contact Me</nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const faqs = [
  {
    q: 'What styles do you play live?',
    a: 'Jazz, rock, pop, soul, funk, folk, blues, and more. I adapt quickly to different genres and band settings.'
  },
  {
    q: 'Do you travel for gigs?',
    a: 'Yes! I’m available for out-of-town shows, tours, and festivals.'
  },
  {
    q: 'Can you fill in last minute?',
    a: 'Often, yes. Contact me ASAP for availability.'
  },
  {
    q: 'Can you read charts or play by ear?',
    a: 'Yes, I’m comfortable with both. Send charts, lead sheets, or recordings—whatever you have.'
  },
  {
    q: 'Can you provide a full band?',
    a: 'I can recommend and coordinate with other pro musicians if you need a full group.'
  },
  {
    q: 'What gear do you bring?',
    a: 'I bring pro-level basses and amps suitable for any venue. Let me know if you have specific backline needs.'
  },
  {
    q: 'How do rehearsals work?',
    a: 'We’ll schedule rehearsals as needed—either in person or virtually. I’ll come prepared so we use time efficiently.'
  },
  {
    q: 'How is payment handled?',
    a: 'Payment is due after the gig, via cash, check, or secure online payment.'
  },
  {
    q: 'Do you play upright and electric bass?',
    a: 'Yes, I play both upright and electric bass. Let me know your preference for your event.'
  },
  {
    q: 'Can you help with song selection or arrangements?',
    a: 'Absolutely! I’m happy to help with setlist planning, arrangements, and musical direction if needed.'
  },
  {
    q: 'Do you play private/corporate events?',
    a: 'Yes, I regularly play weddings, private parties, and corporate events.'
  },
  {
    q: 'How far in advance should I book?',
    a: 'The sooner the better, but I can sometimes accommodate last-minute requests.'
  }
];

const openedFaq = ref(null);
function toggleFaq(i) {
  openedFaq.value = openedFaq.value === i ? null : i;
}

useHead({
  title: 'Book Live Gig - Chris Pecoraro',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Hire a professional bassist for your next live show, event, or tour—experienced, reliable, and ready to bring your music to life on stage.'
    }
  ]
});
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
.img-fluid {
  max-height: 260px;
  object-fit: cover;
  width: 100%;
}
.list-group-item {
  border: none;
  padding: 1rem;
  font-size: 1.05rem;
}
.faq-question {
  font-size: 1.1rem;
  color: var(--bs-body-color, #222);
  text-decoration: none;
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
  transition: color 0.2s;
}
.faq-question:hover {
  color: var(--grey);
}
.faq-answer {
  font-size: 1rem;
}
</style>