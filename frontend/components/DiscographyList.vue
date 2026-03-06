<template>
    <div class="container-fluid py-5">
        <div class="row">
            <h3 class="mx-auto fw-bold h2 mb-5">Discography</h3>
        </div>
        <div class="row">
            <div class="col-6 col-xl-3 col-sm-4" v-for="(album, index) in discography" :key="album.name">
                <div class="album" @click="toggleAlbumMenu(index)" :class="{ 'menu-active': activeAlbumIndex === index }">
                    <div class="album-container">
                        <img :src="album.image" :alt="album.name" class="img-fluid album-image mb-3">
                        <div class="album-info d-none" :title="album.name + ' - ' + album.artist + ' (' + album.year + ')'">
                            <h5 class="album-name">{{ album.name }}</h5>
                            <p class=" mb-0">{{ album.artist }}</p>
                            <p class="small">{{ album.year }}</p>
                        </div>
                        
                        <!-- Platform Selection Popup -->
                        <div v-if="activeAlbumIndex === index" class="platform-popup" @click.stop>
                            <div class="platform-options">
                                <a 
                                    v-for="platform in platforms" 
                                    :key="platform.name"
                                    :href="album.links[platform.name]" 
                                    target="_blank"
                                    class="platform-option"
                                    :class="{ 'disabled': album.links[platform.name] === '#' }"
                                    @click="album.links[platform.name] !== '#' ? null : $event.preventDefault()"
                                >
                                    <img :src="platform.icon" :alt="platform.name" class="platform-option-icon">
                                    <span>{{ platform.name }}</span>
                                    <span v-if="album.links[platform.name] === '#'" class="coming-soon">Coming Soon</span>
                                </a>
                            </div>
                        </div>
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
            activeAlbumIndex: null,
            platforms: [
                { name: 'Spotify', icon: '/img/spotify-logo.svg' },
                { name: 'Apple Music', icon: '/img/apple-music-logo.svg' },
                { name: 'YouTube', icon: '/youtube-logo.png' }
            ],
            discography: [
                { 
                    name: "Haunted Houses", 
                    artist: "Tyler Nail", 
                    image: "/img/albums/HauntedHouses.jpeg", 
                    year: "2025", 
                    links: {
                        'Spotify': 'https://open.spotify.com/track/27bVwMOxai0M5oGX7GfGLb?si=4e45518e92534d58',
                        'Apple Music': 'https://music.apple.com/us/album/haunted-houses-single/1846783765',
                        'YouTube': 'https://www.youtube.com/watch?v=cj9yoAB-8vc&list=RDcj9yoAB-8vc&start_radio=1'
                    }
                },
                { 
                    name: 'Family Pt. 2', 
                    artist: 'Tyler Nail', 
                    image: '/img/albums/FamilyPt2.jpg', 
                    year: "2025", 
                    links: {
                        'Spotify': 'https://open.spotify.com/album/5Kg1EusZf3DbtTxqcdL6on?si=Dru1ZG5PSsGXv27v04_biA',
                        'Apple Music': 'https://music.apple.com/us/album/family-pt-2-single/1788765824',
                        'YouTube': 'https://www.youtube.com/watch?v=73sHQNnWxX8&list=OLAK5uy_l_XeJ7DGSKq-YWPIgi1z_laLpDoFosHVI'
                    }
                },
                { 
                    name: 'Family Pt. 1', 
                    artist: 'Tyler Nail', 
                    image:  '/img/albums/Family.jpg', 
                    year: "2025", 
                    links: {
                        'Spotify': 'https://open.spotify.com/album/087F8TL4iU2i9R6M9kQLRk?si=chERu7rITpaeAfBMro1tNw',
                        'Apple Music': 'https://music.apple.com/us/album/family-pt-1-single/1788141490',
                        'YouTube': 'https://www.youtube.com/watch?v=BLvS-tL1hPE&list=OLAK5uy_kkQuCtZX-gQZfwK-4XmUq-sl7VqkcDR_M'
                    }
                },
                { 
                    name: 'Advent of the Symphonina: Spreading the Joy of Symphonic Music to Young Audiences Around the World',  
                    artist: 'The 2024 International Symphonina Orchestra', 
                    image:'/img/albums/AdventoftheSymphonina.jpeg', 
                    year: '2024', 
                    links: {
                        'Spotify': 'https://open.spotify.com/album/6qyRRoHPScyfYQcoqSkQnH?si=YpAMZ2SbQo6JBGbPr3L8Zg&nd=1&dlsi=cb332c81c38042c9',
                        'Apple Music': 'https://music.apple.com/us/album/advent-of-the-symphonina-spreading-the-joy/1752538603',
                        'YouTube': '#'
                    }
                },
                { 
                    name: 'In This Life', 
                    artist: 'Sean Mckee Band', 
                    image: '/img/albums/InThisLife.jpeg', 
                    year: "2023", 
                    links: {
                        'Spotify': 'https://open.spotify.com/album/0X0u012zBrFq1537i174tL?si=Ne2uSNhVRxCpsnXgcaFbrQ',
                        'Apple Music': 'https://music.apple.com/us/album/in-this-life-ep/1724110519',
                        'YouTube': 'https://www.youtube.com/watch?v=v3QdME_ZCkQ&list=OLAK5uy_mx-fdqkQbdbJRGyz9epJcCEFIuEQlNWbM'
                    }
                },
                { 
                    name: 'So Long My Queen', 
                    artist: 'Sean Mckee Band', 
                    image: '/img/albums/SoLongMyQueen.jpeg', 
                    year: "2022", 
                    links: {
                        'Spotify': 'https://open.spotify.com/album/0khwm9sod28mcfP46kTtLe?si=NG2pyAYARjC_jGA6XkXizA',
                        'Apple Music': 'https://music.apple.com/us/album/so-long-my-queen-ep/1606473575',
                        'YouTube': 'https://www.youtube.com/watch?v=xjNzCIJnm7I&list=OLAK5uy_nMsFgpzWSVpTnYerATa-dUNL662FaYMTI'
                    }
                },
                { 
                    name: 'Poison Ivy', 
                    artist: 'Sean Mckee Band', 
                    image: '/img/albums/PoisonIvy.jpeg', 
                    year: "2021", 
                    links: {
                        'Spotify': 'https://open.spotify.com/album/5xNhmtFlAey1zwkky6c5b0?si=l2mWBcGSRE6v1WA2Eu2n6A',
                        'Apple Music': 'https://music.apple.com/us/album/poison-ivy-single/1588077087',
                        'YouTube': 'https://www.youtube.com/watch?v=_sUEwDyL70w&list=OLAK5uy_lflNt4oOsohmcl1CtF97Z1PZPDT1e7dHo'
                    }
                }
            ],
        }
    },
    methods: {
        toggleAlbumMenu(index) {
            this.activeAlbumIndex = this.activeAlbumIndex === index ? null : index;
        },
        closeAlbumMenu() {
            this.activeAlbumIndex = null;
        }
    },
    mounted() {
        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.album')) {
                this.activeAlbumIndex = null;
            }
        });
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
  position: relative;
}

.album-container {
  position: relative;
}

.album.menu-active .album-image {
  transform: scale(1.05);
  box-shadow: 0 0.625em 1.875em rgba(0, 0, 0, 0.7);
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

.platform-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: rgba(20, 20, 20, 0.95);
    backdrop-filter: blur(10px);
    border: 1px solid #333;
    border-radius: 0.75rem;
    padding: 0;
    z-index: 1000;
    min-width: 250px;
    box-shadow: 0 0.5rem 2rem rgba(0, 0, 0, 0.8);
    animation: popupFadeIn 0.2s ease-out;
}

@keyframes popupFadeIn {
    from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.9);
    }
    to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
    }
}

.platform-popup-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.25rem;
    border-bottom: 1px solid #333;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 0.75rem 0.75rem 0 0;
}

.popup-title {
    font-weight: 600;
    color: #fff;
    font-size: 0.9rem;
}

.close-btn {
    background: none;
    border: none;
    color: #999;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: all 0.2s ease;
}

.close-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: #fff;
}

.platform-options {
    padding: 0.5rem;
}

.platform-option {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    text-decoration: none;
    color: #fff;
    border-radius: 0.5rem;
    transition: all 0.2s ease;
    margin-bottom: 0.25rem;
    position: relative;
}

.platform-option:hover:not(.disabled) {
    background-color: rgba(255, 255, 255, 0.1);
    transform: translateX(4px);
}

.platform-option.disabled {
    color: #666;
    cursor: not-allowed;
    opacity: 0.6;
}

.platform-option-icon {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
}

.coming-soon {
    margin-left: auto;
    font-size: 0.75rem;
    color: #888;
    font-style: italic;
}

@media only screen and (max-width: 576px) {
    .platform-popup {
        min-width: 200px;
        transform: translate(-50%, -50%) scale(0.95);
    }
    
    .platform-popup-header {
        padding: 0.75rem 1rem;
    }
    
    .popup-title {
        font-size: 0.8rem;
    }
    
    .platform-option {
        padding: 0.6rem 0.8rem;
    }
    
    .platform-option-icon {
        width: 18px;
        height: 18px;
    }
}
</style>