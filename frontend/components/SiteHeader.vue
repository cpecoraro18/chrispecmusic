<template>
    <div :style="{ height: navbarHeight + 'em'}"></div>
    <header class="navbar navbar-expand-lg navbar-dark" :style="{ backgroundColor: `rgba(46,46,46, ${navbarOpacity})` }">
        <div class="container">
            <router-link to="/">
                <img src="/img/CPMusic-Logo-White.png" alt="Chris Pec Music" class="navbar-brand logo">
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <router-link to="/" class="nav-link" @click="closeNavbar">Home</router-link>
                    </li>
                     <li class="nav-item">
                        <router-link to="/about" class="nav-link" @click="closeNavbar">About</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/portfolio" class="nav-link" @click="closeNavbar">Portfolio</router-link>
                    </li>
                    <li class="nav-item dropdown">
                      <a class="nav-link dropdown-toggle" href="#" id="hireMeDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Hire Me
                      </a>
                      <ul class="dropdown-menu" aria-labelledby="hireMeDropdown">
                        <li>
                          <router-link to="/book-session" class="dropdown-item" @click="closeNavbar">Recording Session</router-link>
                        </li>
                        <li>
                          <router-link to="/book-live-gig" class="dropdown-item" @click="closeNavbar">Live Gig</router-link>
                        </li>
                      </ul>
                    </li>
                    <li class="nav-item">
                        <router-link to="/photos" class="nav-link" @click="closeNavbar">Photos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/events" class="nav-link" @click="closeNavbar">Events</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/gear" class="nav-link" @click="closeNavbar">Gear</router-link>
                    </li>
                </ul>
                <button class="btn btn-outline-light ms-lg-2 my-2 my-lg-0" type="button"><router-link to="/contact" class="nav-link" @click="closeNavbar">Contact</router-link></button>
                <social-links class="ms-0 ms-lg-3 my-3 my-lg-0"></social-links>
            </div>
        </div>
    </header>
</template>

<script setup>
    const route = useRoute()
    const isIndex = computed(() => route.path === '/')
    const navbarOpacity = ref(0);
    const navbarHeight = ref(0); // height in em

    const getNavbarCollapse = () => document.getElementById('navbarNav')

    // Single source of truth for the header's opacity and the height of the
    // spacer that sits under it. This was previously two near-identical
    // functions that had already drifted apart in how they set the height.
    const updateNavbarStyle = () => {
        // While the mobile menu is open the header is a solid panel, whatever
        // the scroll position is.
        if (getNavbarCollapse()?.classList.contains('show')) {
            navbarOpacity.value = 1
            return
        }

        const scrollY = window.scrollY || window.pageYOffset
        const windowHeight = window.innerHeight
        const restingHeight = Math.max(8, windowHeight / 100)

        if (!isIndex.value) {
            navbarOpacity.value = 1
            navbarHeight.value = restingHeight
            return
        }

        // start fade-in around 30% of the hero height, max at 100%
        const fadeStart = windowHeight * 0.3
        const fadeEnd = windowHeight * 0.8
        const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1)
        navbarOpacity.value = progress
        navbarHeight.value = restingHeight * progress
    }

    // Scroll fires far more often than the screen refreshes, and the handler
    // reads layout, so coalesce to one update per frame.
    let pendingFrame = 0
    const onScrollOrResize = () => {
        if (pendingFrame) return
        pendingFrame = requestAnimationFrame(() => {
            pendingFrame = 0
            updateNavbarStyle()
        })
    }

    // Named rather than inline: passing a fresh arrow function to
    // removeEventListener removes nothing, so the previous inline handlers
    // accumulated on every mount.
    const onCollapseShow = () => {
        navbarOpacity.value = 1
    }
    const onCollapseHidden = () => {
        updateNavbarStyle()
    }

    onMounted(() => {
        updateNavbarStyle()
        window.addEventListener('scroll', onScrollOrResize, { passive: true })
        window.addEventListener('resize', onScrollOrResize, { passive: true })

        const navbarCollapse = getNavbarCollapse()
        navbarCollapse?.addEventListener('show.bs.collapse', onCollapseShow)
        navbarCollapse?.addEventListener('hidden.bs.collapse', onCollapseHidden)
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', onScrollOrResize)
        window.removeEventListener('resize', onScrollOrResize)
        if (pendingFrame) cancelAnimationFrame(pendingFrame)

        const navbarCollapse = getNavbarCollapse()
        navbarCollapse?.removeEventListener('show.bs.collapse', onCollapseShow)
        navbarCollapse?.removeEventListener('hidden.bs.collapse', onCollapseHidden)
    })

    watch(() => route.path, () => {
        updateNavbarStyle()
    })

    const closeNavbar = () => {
        const navbarCollapse = getNavbarCollapse()
        if (navbarCollapse?.classList.contains('show')) {
            navbarCollapse.classList.remove('show')
        }
        updateNavbarStyle()
    }
</script>

<style scoped>

.navbar {
    z-index: 1000;
    position: fixed;
    top: 0;
    width: 100%;
}

.logo {
        width: 9em;
        height: auto; /* maintain aspect ratio */
}

.nav-link {
    font-size: 1.2em;
}

.social-icon {
    width: 1em;
    height: auto;
    margin-left: 10px;
}

.router-link-active {
  text-decoration: underline;
  font-weight: bold;
}

@media only screen and (max-width: 991px) {


    .social-icon {
        margin-left: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }

}
</style>