<template>
    <div class="container-fluid py-5">
        <div class="row">
            <h3 class="mx-auto fw-bold h2 mb-5">Discography</h3>
        </div>
        <div class="row">
            <div class="col-6 col-xxl-2 col-xl-3 col-sm-4" v-for="album in discography" :key="album.name">
                <div class="album">
                    <a :href="album.link" target="_blank" class="album-link">
                        <img :src="album.image" :alt="album.name" class="img-fluid album-image mb-3">
                        <div class="album-info d-none" :title="album.name + ' - ' + album.artist + ' (' + album.year + ')'">
                            <h5 class="album-name">{{ album.name }}</h5>
                            <p class=" mb-0">{{ album.artist }}</p>
                            <p class="small">{{ album.year }}</p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DiscographyList',
    data() {
        return {
            discography: [
                { name: 'Family Pt. 2', artist: 'Tyler Nail', image: '/img/albums/FamilyPt2.jpg', year: "2025", link: 'https://open.spotify.com/album/5Kg1EusZf3DbtTxqcdL6on?si=Dru1ZG5PSsGXv27v04_biA' },
                { name: 'Family', artist: 'Tyler Nail', image:  '/img/albums/Family.jpg', year: "2025", link: 'https://open.spotify.com/album/087F8TL4iU2i9R6M9kQLRk?si=chERu7rITpaeAfBMro1tNw' },
                { name: 'Advent of the Symphonina: Spreading the Joy of Symphonic Music to Young Audiences Around the World',  artist: 'The 2024 International Symphonina Orchestra', image:'/img/albums/AdventoftheSymphonina.jpeg', year: '2024', link: 'https://open.spotify.com/album/6qyRRoHPScyfYQcoqSkQnH?si=YpAMZ2SbQo6JBGbPr3L8Zg&nd=1&dlsi=cb332c81c38042c9'},
                { name: 'In This Life', artist: 'Sean Mckee Band', image: '/img/albums/InThisLife.jpeg', year: "2023", link: 'https://open.spotify.com/album/0X0u012zBrFq1537i174tL?si=Ne2uSNhVRxCpsnXgcaFbrQ' },
                { name: 'So Long My Queen', artist: 'Sean Mckee Band', image: '/img/albums/SoLongMyQueen.jpeg', year: "2022", link: 'https://open.spotify.com/album/0khwm9sod28mcfP46kTtLe?si=NG2pyAYARjC_jGA6XkXizA' },
                { name: 'Poison Ivy', artist: 'Sean Mckee Band', image: '/img/albums/PoisonIvy.jpeg', year: "2021", link: 'https://open.spotify.com/album/5xNhmtFlAey1zwkky6c5b0?si=l2mWBcGSRE6v1WA2Eu2n6A' }            ],
        }
    }
}
</script>

<style scoped>
.container-fluid {
    background-color: var(--bg-dark);
}

.album {
  transition: box-shadow .3s;
  border-radius: 0.3125em; /* 5px / 16 */
  cursor: pointer;
}

.album-name {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.album-image:hover, .album:hover .album-image {
    box-shadow: 0 0.625em 1.875em rgba(0, 0, 0, 0.5); /* 10px / 16 and 30px / 16 */
    transform: scale(1.05);
}

.album-image {
  width: 12.75em; /* 300px / 16 */
  height: 12.75em; /* 300px / 16 */
  object-fit: cover;
  transition: transform .3s, box-shadow .3s;
}

@media only screen and (max-width: 1400px) {
    .album-image {
        width: 16em;
        height: 16em;
    }
}

@media only screen and (max-width: 991px) {
    .album-image {
        width: 12em;
        height: 12em;
    }
}
</style>