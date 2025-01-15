<template>
    <div class="container py-5">
        <h1 class="text-cente mb-4">Portfolio</h1>
        <h2 class="pb-1 mb-4">Videos</h2>

        <div class="row">
            <div class="col-md-4 mb-4" v-for="video in videos" :key="video.id">
                <div class="card bg-light-blue">
                    <div class="card-body">
                        <h3 class="card-title">{{ video.title }}</h3>
                        <div class="embed-responsive embed-responsive-16by9">
                            <iframe class="embed-responsive-item" :src="video.url" allowfullscreen></iframe>
                        </div>
                        <p class="card-text mt-3">{{ video.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <discography-list></discography-list>


    <div class="bg-light-blue py-5">
      <h3 class="text-dark">Reviews</h3>
      <p class="text-center text-muted mb-3">Read what my clients have to say about working with me.</p>
      <review-list></review-list>
    </div>


    <div class="container-fluid py-3 mt-5">
        <div class="row text-center">
            <h2 class="mx-auto mb-4 fw-bold">Get in Touch</h2>
            <p>Have questions or want to book a session? <a href="mailto:contact@chrispecmusic.com">Reach Out!</a></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PortfolioPage',
    created() {
        useHead({
            title: 'Portfolio - Chris Pecoraro',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Watch videos of Chris Pecoraro performing with the Sean McKee Band and more.'
                }
            ]
        })
    },
    data() {
        return {
            videos: [
                {
                    id: 0,
                    title: 'Sean\'s Guitar Lounge Ft. Sophie Hafer - Got to Get Better in a Little While Cover',
                    url: 'https://www.youtube.com/embed/OFJ75eQKOlc?si=qs_fROpyNnZkR5uX',
                    description: 'Enjoy this cover of "Got to Get Better in a Little While" by Sean\'s Guitar Lounge featuring Sophie Hafer. This performance showcases the band\'s talent and creativity in the studio, delivering a fresh take on a classic track.'
                },
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
.embed-responsive-item {
    height: 30vh;
    width: 100%;
}
</style>