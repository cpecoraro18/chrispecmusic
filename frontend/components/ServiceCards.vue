<template>
<div class="services py-5">
    <div class="container">
        <div class="row">
        <div class="col-12 col-lg-6 mb-4">
          <router-link to="/services/gig" class="text-decoration-none">
            <div class="card text-center h-100 custom-card">
              <div class="card-body">
                <h4 class="card-title">Live Performances</h4>
                <p class="text-muted">Experienced bassist for live performances, concerts, and tours. Available for local and international gigs.</p>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary">Learn More</button>
              </div>
            </div>
          </router-link>
        </div>
        <div class="col-12 col-lg-6 mb-4">
          <router-link to="/services/studio" class="text-decoration-none">
            <div class="card text-center h-100 custom-card">
              <div class="card-body">
                <h4 class="card-title">Studio Recordings</h4>
                <p class="text-muted">Professional bass tracks for your music project. Available for local studio sessions in Chicago or remote recordings.</p>
              </div>
              <div class="mb-3">
                <button class="btn btn-primary">Learn More</button>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.custom-card {
  background-color: var(--bg-light-blue);
  color: var(--text-color-dark);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.custom-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  color: var(--primary);
}

.card-title {
  font-weight: bold;
}

.card-body {
  padding: 2rem;
}

</style>