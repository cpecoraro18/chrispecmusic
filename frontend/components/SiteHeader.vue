<template>
    <div class="navbar-spacer" :style="spacerStyle"></div>
    <header class="navbar navbar-expand-lg navbar-dark" :style="{ backgroundColor: `rgba(46,46,46, ${navbarOpacity})` }">
        <div class="container">
            <nuxt-link to="/" @click="closeNavbar">
                <img src="/img/CPMusic-Logo-White.png" alt="Chris Pec Music" class="navbar-brand logo">
            </nuxt-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse justify-content-between" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li
                        v-for="item in primaryNav"
                        :key="item.label"
                        class="nav-item"
                        :class="{ dropdown: item.children }"
                    >
                        <template v-if="item.children">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                :id="dropdownId(item)"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {{ item.label }}
                            </a>
                            <ul class="dropdown-menu" :aria-labelledby="dropdownId(item)">
                                <li v-for="child in item.children" :key="child.to">
                                    <nuxt-link :to="child.to" class="dropdown-item" @click="closeNavbar">
                                        {{ child.label }}
                                    </nuxt-link>
                                </li>
                            </ul>
                        </template>
                        <nuxt-link v-else :to="item.to" class="nav-link" @click="closeNavbar">
                            {{ item.label }}
                        </nuxt-link>
                    </li>
                </ul>
                <!-- Previously a <router-link> nested inside a <button>, which is
                     invalid HTML and left the link unreachable for some screen
                     readers. A link styled as a button is the correct element. -->
                <nuxt-link
                    :to="navCta.to"
                    class="btn btn-outline-light ms-lg-2 my-2 my-lg-0"
                    @click="closeNavbar"
                >
                    {{ navCta.label }}
                </nuxt-link>
                <social-links class="ms-0 ms-lg-3 my-3 my-lg-0"></social-links>
            </div>
        </div>
    </header>
</template>

<script setup>
    import { primaryNav, navCta } from '~/data/navigation'

    // Bootstrap needs a stable id to tie a dropdown menu to its toggle.
    const dropdownId = (item) => `nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`

    const route = useRoute()
    const isIndex = computed(() => route.path === '/')
    const navbarOpacity = ref(0);
    const navbarHeight = ref(0); // height in em

    // The spacer offsets the fixed header. Everywhere but the homepage the
    // header is already at its resting size on first paint, so the height is
    // left to CSS — driving it from JS meant the server rendered 0 and
    // hydration then pushed the whole page down by ~130px, which is a large
    // layout shift on every non-home route. Only the homepage, where the
    // header genuinely grows from nothing as it fades in over the hero, still
    // needs an inline height.
    const spacerStyle = computed(() =>
        isIndex.value ? { height: `${navbarHeight.value}em` } : undefined
    )

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

        if (!isIndex.value) {
            navbarOpacity.value = 1
            // navbarHeight is deliberately not touched here — the spacer is
            // sized by CSS on these routes. See spacerStyle above.
            return
        }

        const scrollY = window.scrollY || window.pageYOffset
        const windowHeight = window.innerHeight
        // Mirrors the CSS `max(8em, 16vh)` below, so the homepage spacer grows
        // to exactly the height every other route starts at.
        const restingHeight = Math.max(8, windowHeight / 100)

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

/* Resting height of the fixed header, expressed so the server-rendered HTML
   already reserves the right space. Equivalent to the Math.max(8, innerHeight
   / 100) em the script uses once mounted: 8em is the floor, and (innerHeight
   / 100)em resolves to 16vh at a 16px root. */
.navbar-spacer {
    height: max(8em, 16vh);
}

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