<template>
    <header class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
            <router-link to="/" class="navbar-brand">Chris Pec Music</router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link">Home</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/about" class="nav-link">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/services" class="nav-link">Services</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/contact" class="nav-link">Contact</router-link>
                    </li>
                </ul>
                <div class="justify-self-end">
                    <a href="https://www.instagram.com/chrispecmusic/" target="_blank" class="nav-link">
                        <img src="/instagram-logo.png" alt="Instagram" class="social-icon"/>
                    </a>                
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'SiteHeader',
}
</script>

<style scoped>
.social-icon {
    width: 1em;;
    height: 1em;
    margin-left: 10px;
}

@media only screen and (max-width: 991px) {
    .social-icon {
        margin-left: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }

}

</style>