<template>
    <div class="portfolio py-5">
        <div class="container">
            <h1 class="text-center mb-5">Portfolio</h1>
            <div class="text-center mb-5">
                <p>Check out some of my performances below. If you like what you see and want to discuss a project or booking, don't hesitate to reach out.</p>
                <router-link to="/contact" class="nav-link">
                    <button class="btn btn-primary">Contact Me</button>
                </router-link>
            </div>
            <div class="row">
                <div class="col-md-6 mb-4" v-for="video in videos" :key="video.id">
                    <div class="card bg-light-blue">
                        <div class="card-body">
                            <h2 class="card-title">{{ video.title }}</h2>
                            <div class="embed-responsive embed-responsive-16by9">
                                <iframe class="embed-responsive-item" :src="video.url" allowfullscreen></iframe>
                            </div>
                            <p class="card-text mt-3">{{ video.description }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <discography-list></discography-list>
</template>

<script>

export default {
    name: 'PortfolioPage',
    data() {
        return {
            videos: [
            {
                    id: 1,
                    title: 'Sean McKee Band - Got to Get Better in a Little While Cover',
                    url: 'https://www.youtube.com/embed/53Vx75OUEQw?si=gM0xiImyhF59Mqzs',
                    description: 'Watch the Sean McKee Band\'s cover of "Got to Get Better in a Little While." This rendition showcases the band\'s ability to bring new life to classic tunes with their distinct style.'
                },
                {
                    id: 2,
                    title: 'Sean McKee Band - Color Outside the Lines',
                    url: 'https://www.youtube.com/embed/xjNzCIJnm7I?si=rVDUIRxabTValGlt',
                    description: 'Enjoy the Sean McKee Band\'s performance of their original song "Color Outside the Lines." This track highlights the band\'s creative approach and strong musical chemistry.'
                },
                {
                    id: 3,
                    title: 'Sean McKee Band - Live at Madcats',
                    url: 'https://www.youtube.com/embed/u-lH9EmIN_o?si=B9FS9ooxKwxLu2Gl',
                    description: 'Join the Sean McKee Band for a live performance at Madcats. This video captures the band\'s sound and stage presence, offering an engaging musical experience.'
                },
                {
                    id: 4,
                    title: 'University of Minnesota Jazz Ensemble I 2019 Spring Concert',
                    url: 'https://www.youtube.com/embed/VwqKnToOPik?si=cKkhHEbjdgcKHF4B',
                    description: 'University of Minnesota Jazz Ensemble I\'s 2019 Spring Concert. Featuring a diverse repertoire and exceptional musicianship, this concert highlights the ensemble\'s dedication to jazz.'
                },
                {
                    id: 5,
                    title: '2018 University of Minnesota Jazz Festival - Jazz Ensemble 1',
                    url: 'https://www.youtube.com/embed/pZdC1mELkto?si=lwapEuwtZ2o0NtNd',
                    description: 'Watch Jazz Ensemble 1 perform at the 2018 University of Minnesota Jazz Festival. This video captures their skillful arrangements and impressive solos, showcasing the talents of the university\'s top jazz musicians.'
                },
                {
                    id: 6,
                    title: 'University of Minnesota Jazz Festival 2018 - 12:20 Jazz Combo',
                    url: 'https://www.youtube.com/embed/AQ_slt8-i5o?si=3X9Yahu7iaj_h9Sx',
                    description: 'Check out the 12:20 Jazz Combo\'s performance at the 2018 University of Minnesota Jazz Festival. This group delivers a set that blends classic and contemporary jazz elements in a memorable way.'
                },
            ]
        }
    }
}
</script>

<style scoped>
.btn-primary {
    background-color: var(--primary);
    border-color: var(--primary);
}

.bg-light-blue {
    background-color: var(--bg-light-blue);
}

.embed-responsive-item {
    height: 40vh;
    width: 100%;
}
</style>