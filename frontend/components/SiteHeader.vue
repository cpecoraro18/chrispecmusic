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
                        <router-link to="/portfolio" class="nav-link" @click="closeNavbar">Videos</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/events" class="nav-link" @click="closeNavbar">Events</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link to="/gear" class="nav-link" @click="closeNavbar">Gear</router-link>
                    </li>
                </ul>
                <button class="btn btn-outline-light ms-lg-2 mb-2 mb-lg-0" type="button"><router-link to="/contact" class="nav-link" @click="closeNavbar">Contact</router-link></button>
                <div class="d-flex justify-content-center justify-self-end align-items-center ms-lg-3 mb-3 mb-lg-0">
                    <a href="https://www.instagram.com/chrispecmusic/" target="_blank" class="nav-link me-2">
                        <img src="/instagram-logo.png" alt="Instagram" class="social-icon"/>
                    </a>          
                    <a href="https://www.youtube.com/channel/UCxZoyuxrCDUY_67PVsGbUDg" target="_blank" class="nav-link">
                        <img src="/youtube-logo.png" alt="Instagram" class="social-icon"/>
                    </a>          
                </div>
            </div>
        </div>
    </header>
</template>

<script setup>
    const route = useRoute()
    const isIndex = computed(() => route.path === '/')
    const navbarOpacity = ref(0);
    const navbarHeight = ref(0); // height in em

    onMounted(() => {
        updateNavbarStyle()
        window.addEventListener('scroll', updateNavbarStyle)
        window.addEventListener('resize', updateNavbarStyle)

        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse) {
            navbarCollapse.addEventListener('show.bs.collapse', () => {
                navbarOpacity.value = 1;
            });
            navbarCollapse.addEventListener('hidden.bs.collapse', () => {
                setNavbarOpacity();
            });
        }
    })

    onBeforeUnmount(() => {
        window.removeEventListener('scroll', updateNavbarStyle)
        window.removeEventListener('resize', updateNavbarStyle)

        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse) {
            navbarCollapse.removeEventListener('show.bs.collapse', () => {
                navbarOpacity.value = 1;
            });
            navbarCollapse.removeEventListener('hidden.bs.collapse', () => {
                setNavbarOpacity();
            });
        }
    })

    watch(() => route.path, () => {
        updateNavbarStyle()
    })

    const updateNavbarStyle = () => {
        const isMenuOpen = document.getElementById('navbarNav').classList.contains('show');
        
        if (isMenuOpen) {
            navbarOpacity.value = 1
            return
        }
        const scrollY = window.scrollY || window.pageYOffset
        const windowHeight = window.innerHeight
        const newHeight = Math.max(8, windowHeight / 100)
        if (isIndex.value) {
            // start fade-in around 30% of the hero height, max at 100%
            const fadeStart = windowHeight * 0.3
            const fadeEnd = windowHeight * 0.8;
            const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1)
            navbarOpacity.value = progress
            navbarHeight.value = progress > 0 ? newHeight : 0 // shrink to 0 height at top
        } else {
            navbarOpacity.value = 1
            navbarHeight.value = newHeight
        }
    }

    const closeNavbar = () => {
        const navbarCollapse = document.getElementById('navbarNav')
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show')
        }
        setNavbarOpacity()
    }

    const setNavbarOpacity = () => {
        // check if the navbar is open
        const navbarCollapse = document.getElementById('navbarNav')

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarOpacity.value = 1
        } else {
            const scrollY = window.scrollY || window.pageYOffset
            const windowHeight = window.innerHeight
            const newHeight = Math.max(8, windowHeight / 100)
            if (isIndex.value) {
                // start fade-in around 30% of the hero height, max at 100%
                const fadeStart = windowHeight * 0.3
                const fadeEnd = windowHeight * 0.8;
                const progress = Math.min(Math.max((scrollY - fadeStart) / (fadeEnd - fadeStart), 0), 1)
                navbarOpacity.value = progress
                navbarHeight.value = progress > 0 ? newHeight : 0 // shrink to 0 height at top
            } else {
                navbarOpacity.value = 1
                navbarHeight.value = newHeight
            }
        }
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

@media only screen and (max-width: 991px) {


    .social-icon {
        margin-left: 0;
        margin-top: 10px;
        margin-bottom: 10px;
    }

}
</style>