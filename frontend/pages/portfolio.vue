<template>
    <div>
        <div class="container">
            <div class="my-5">
                <h1 class="text-center">Portfolio</h1>
                <p class="text-center">Checkout some of my work below.</p>
            </div>
        </div>

        <div class="mb-3">
            <discography-list></discography-list>
        </div>

        <div class="container-fluid">
            <h3 class="mx-auto fw-bold h2 my-5">Videos</h3>
            <div class="row">
                <div class="col-md-3 mb-4" v-for="video in videos" :key="video.url">
                    <div class="embed-responsive embed-responsive-16by9">
                        <iframe class="embed-responsive-item" :src="video.url" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
        </div>



    </div>
</template>

<script>
export default {
    name: 'PortfolioPage',
    created() {
        useHead({
            title: 'Videos - Chris Pecoraro',
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
                    title: "Alright Maybes - Come and Get Your Love",
                    url: "https://www.youtube.com/embed/-1akA4BaSkc?si=KDkcxETpf_iaQ6Z6"
                },
                {
                    title: "Alright Maybes - Misery Business Cover",
                    url: "https://www.youtube.com/embed/NJOk4imcY50?si=1z7Ehn35ZN_nzRfi"
                },
                {
                    title: "Alright Maybes - Paradise City Cover",
                    url: "https://www.youtube.com/embed/I_nMxVfUFpM?si=5wQghRdnomj9_l6u"
                },
                {
                    title: "Alright Maybes - Red Wine Supernova Cover",
                    url: "https://www.youtube.com/embed/A5KX41GrZsc?si=34Pa7rQ-0XTte_wt"
                },
                {
                    title: "Alright Maybes - Ain't It Fun Cover",
                    url: "https://www.youtube.com/embed/UevnkOhMo2o?si=ipygWPGdKI0rqH9O"
                },
                {
                    title: "Sean's Guitar Lounge Ft Brandon Simmons - Sweet Little Angel Cover",
                    url: "https://www.youtube.com/embed/4dWC3QAfFyY?si=Gb6jWZif7R_f89nz"
                },
                {
                    title: "Sean's Guitar Lounge - Suburban Glory Cover",
                    url: "https://www.youtube.com/embed/8d3lh_wB8Zk?si=V-A1PNsEe9q9Xo7-"
                },
                {
                    title: 'Sean\'s Guitar Lounge Ft. Sophie Hafer - Got to Get Better in a Little While Cover',
                    url: 'https://www.youtube.com/embed/OFJ75eQKOlc?si=qs_fROpyNnZkR5uX',
                    description: 'Enjoy this cover of "Got to Get Better in a Little While" by Sean\'s Guitar Lounge featuring Sophie Hafer. This performance showcases the band\'s talent and creativity in the studio, delivering a fresh take on a classic track.'
                },
                {
                    title: 'Sean McKee Band - Got to Get Better in a Little While Cover',
                    url: 'https://www.youtube.com/embed/53Vx75OUEQw?si=gM0xiImyhF59Mqzs',
                    description: 'Watch the Sean McKee Band\'s cover of "Got to Get Better in a Little While." This rendition showcases the band\'s ability to bring new life to classic tunes with their distinct style.'
                },
                {
                    title: 'Sean McKee Band - Color Outside the Lines',
                    url: 'https://www.youtube.com/embed/xjNzCIJnm7I?si=rVDUIRxabTValGlt',
                    description: 'Enjoy the Sean McKee Band\'s performance of their original song "Color Outside the Lines." This track highlights the band\'s creative approach and strong musical chemistry.'
                },
                {
                    title: 'Sean McKee Band - Monester - Live at Madcats',
                    url: 'https://www.youtube.com/embed/u-lH9EmIN_o?si=B9FS9ooxKwxLu2Gl',
                    description: 'Join the Sean McKee Band for a live performance at Madcats. This video captures the band\'s sound and stage presence, offering an engaging musical experience.'
                },
                {
                    title: "Sean McKee Band - Ain't talkin about love",
                    url: "https://www.youtube.com/embed/h2jR9AGe0yI?si=MGbckEkR2MWq140-"
                },
                {
                    title: "Sean McKee Band - Live at Madcats - Fragile",
                    url: "https://www.youtube.com/embed/5e3GEKrsUnc?si=HkDcvv5sKU_bWoJO"
                },
                {
                    title: "Sean McKee Band - Poison Ivy",
                    url: "https://www.youtube.com/embed/_sUEwDyL70w?si=fOH6MAVO0AZMRWkf"
                },
                {
                    title: 'University of Minnesota Jazz Ensemble I 2019 Spring Concert',
                    url: 'https://www.youtube.com/embed/VwqKnToOPik?si=cKkhHEbjdgcKHF4B',
                    description: 'University of Minnesota Jazz Ensemble I\'s 2019 Spring Concert. Featuring a diverse repertoire and exceptional musicianship, this concert highlights the ensemble\'s dedication to jazz.'
                },
                {
                    title: '2018 University of Minnesota Jazz Festival - Jazz Ensemble 1',
                    url: 'https://www.youtube.com/embed/pZdC1mELkto?si=lwapEuwtZ2o0NtNd',
                    description: 'Watch Jazz Ensemble 1 perform at the 2018 University of Minnesota Jazz Festival. This video captures their skillful arrangements and impressive solos, showcasing the talents of the university\'s top jazz musicians.'
                },
                {
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