<template>
    <div class="container-fluid mt-5">
        <div class="container py-5">
            <div class="row">
                <h2 class="mx-auto mb-5">Discography</h2>
            </div>
            <div class="row">
                <div class="col-lg-4" v-for="album in discography" :key="album.name">
                    <div class="album">
                        <a :href="album.link" target="_blank" class="album-link">
                            <img :src="album.image" :alt="album.name" class="img-fluid album-image mb-3">
                            <div class="album-info">
                                <h3>{{ album.name }}</h3>
                                <p>{{ album.artist }}</p>
                                <p>{{ album.year }}</p>
                            </div>
                        </a>
                    </div>
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
                { name: 'In This Life', artist: 'Sean Mckee Band', image: '/img/albums/InThisLife.jpeg', year: "2023", link: 'https://open.spotify.com/album/0X0u012zBrFq1537i174tL?si=Ne2uSNhVRxCpsnXgcaFbrQ' },
                { name: 'So Long My Queen', artist: 'Sean Mckee Band', image: '/img/albums/SoLongMyQueen.jpeg', year: "2022", link: 'https://open.spotify.com/album/0khwm9sod28mcfP46kTtLe?si=NG2pyAYARjC_jGA6XkXizA' },
                { name: 'Poison Ivy', artist: 'Sean Mckee Band', image: '/img/albums/PoisonIvy.jpeg', year: "2021", link: 'https://open.spotify.com/album/5xNhmtFlAey1zwkky6c5b0?si=l2mWBcGSRE6v1WA2Eu2n6A' },
                { name: 'Advent of the Symphonina: Spreading the Joy of Symphonic Music to Young Audiences Around the World',  artist: 'The 2024 International Symphonina Orchestra', image:'/img/albums/AdventoftheSymphonina.jpeg', year: '2024', link: 'https://open.spotify.com/album/6qyRRoHPScyfYQcoqSkQnH?si=YpAMZ2SbQo6JBGbPr3L8Zg&nd=1&dlsi=cb332c81c38042c9'}
            ],
        }
    }
}
</script>

<style scoped>
.container-fluid {
    background-color: var(--bs-gray);
}

.album {
  transition: box-shadow .3s;
  border-radius: 5px;
  cursor: pointer;
}

.album-image:hover, .album:hover .album-image {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
}

.album-image {
  width: 300px;
  height: 300px;
  object-fit: cover;
}
</style>
