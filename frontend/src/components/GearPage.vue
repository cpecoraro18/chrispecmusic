<template>
    <div class="container py-5 min-vh-100">
        <h1 class="mb-4 text-center display-4">My Gear</h1>
        <div class="row mb-4 gx-3">
            <!-- Search Bar -->
            <div class="col-lg-6 mb-3">
                <div class="input-group">
                    <span class="input-group-text text-muted" id="basic-addon1">Search</span>
                    <input
                        type="text"
                        v-model="searchQuery"
                        class="form-control"
                        placeholder="Search gear..."
                        aria-label="Search"
                        aria-describedby="basic-addon1"
                    />
                </div>
            </div>

            <!-- Type Filter Dropdown -->
            <div class="col-lg-6 mb-3">
                <select
                    v-model="selectedType"
                    class="form-select"
                >
                    <option value="">All Types</option>
                    <option value="Bass">Bass</option>
                    <option value="Amp">Amp</option>
                    <option value="Cabinet">Cabinet</option>
                    <option value="Preamp">Preamp</option>
                    <option value="Pedal">Pedal</option>
                    <option value="Microphone">Microphone</option>
                </select>
            </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
            <!-- Gear Items -->
            <div v-for="item in filteredGearItems" :key="item.name" class="col">
                <div class="card h-100 shadow-sm">
                    <img :src="item.image" :alt="item.name" class="card-img-top" />
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ item.name }}</h5>
                        <p class="card-text">{{ item.description }}</p>
                        <a :href="item.link" class="btn btn-primary mt-auto" target="_blank">Learn More</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'GearPage',
    data() {
        return {
            searchQuery: '',
            selectedType: '',
            gearItems: [
                // Other items remain unchanged
                {
                    name: 'Aguilar Twin Filter',
                    type: 'Pedal',
                    image: '/img/gear/Aguilar-Filter-Twin.webp',
                    description: 'A dynamic envelope filter pedal that adds funk and character to your bass tone. The Aguilar Twin Filter gives you a wide range of sweeping effects, from subtle modulation to deep, funky growls.',
                    link: 'https://example.com/aguilar_twin_filter'
                },
                {
                    name: 'Audio-Technica AT2038 Microphone',
                    type: 'Microphone',
                    image: '/img/gear/Audio-Technica-AT2038.webp',
                    description: 'A high-performance condenser microphone, the AT2038 offers smooth, detailed sound with excellent clarity. Ideal for studio recording, it’s perfect for vocals and acoustic instruments.',
                    link: 'https://example.com/audio_technica_at2038'
                },
                {
                    name: 'Cioks DC7 Battery',
                    type: 'Pedal',
                    image: '/img/gear/Cioks-DC7.webp',
                    description: 'A high-end power supply that delivers clean, isolated power to your pedals. The Cioks DC7 features multiple voltage options and an ultra-slim design that fits easily under pedalboards.',
                    link: 'https://example.com/cioks_dc7_battery'
                },
                {
                    name: 'Korg Pitchblack Advanced',
                    type: 'Pedal',
                    image: '/img/gear/Kork-Pitchblack-Advanced.png',
                    description: 'A highly accurate and durable pedal tuner, the Korg Pitchblack Advanced offers bright, easy-to-read displays and a wide tuning range, ensuring you stay perfectly in tune on stage or in the studio.',
                    link: 'https://example.com/korg_pitchblack_advanced'
                },
                {
                    name: 'Markbass 4x10 Cab',
                    type: 'Cabinet',
                    image: '/img/gear/Markbass-4x10.webp',
                    description: 'This 4x10 bass cabinet provides full-bodied sound and tight low-end response. Paired with the Little Mark 3, it brings out clarity and power, ideal for live performances in larger venues.',
                    link: 'https://example.com/markbass_4x10_cab'
                },
                {
                    name: 'Markbass Little Mark 3 Amp',
                    type: 'Amp',
                    image: '/img/gear/Markbass-Little-Mark-3.jpg',
                    description: 'Compact and powerful, this 500W bass amp head delivers clean and punchy sound, making it perfect for gigging and studio work alike. Lightweight and reliable, it’s a staple for bassists on the move.',
                    link: 'https://example.com/markbass_little_mark_3_amp'
                },
                {
                    name: 'MXR Bass Compressor',
                    type: 'Pedal',
                    image: '/img/gear/MXR-Bass-Compressor.jpg',
                    description: 'A studio-grade compressor in pedal form, the MXR Bass Compressor smooths out your playing dynamics without sacrificing tone. Essential for a balanced sound in both live and recording environments.',
                    link: 'https://example.com/mxr_bass_compressor'
                },
                {
                    name: 'MXR Octave Deluxe',
                    type: 'Pedal',
                    image: '/img/gear/MXR-Bass-Octave-Delux.jpg',
                    description: 'An octave pedal that adds rich, organic low-end to your bass sound. With simple controls and a robust design, the MXR Octave Deluxe is a favorite for bassists looking to fill out their tone.',
                    link: 'https://example.com/mxr_octave_deluxe'
                },
                {
                    name: 'Pedaltrain Metro 20',
                    type: 'Pedal',
                    image: '/img/gear/Pedaltrain-Metro-20.webp',
                    description: 'A compact, lightweight pedalboard perfect for smaller setups. The Pedaltrain Metro 20 offers plenty of space to organize your essential pedals while remaining easy to transport.',
                    link: 'https://example.com/pedaltrain_metro_20'
                },
                {
                    name: 'Phil Jones Double 4',
                    type: 'Amp',
                    image: '/img/gear/Phil-Jones-Double-Four.jpg',
                    description: 'A compact, ultra-portable amp perfect for practice and small gigs. Despite its size, the Phil Jones Double 4 offers surprisingly clear sound with impressive low-end response.',
                    link: 'https://example.com/phil_jones_double_4'
                },
                {
                    name: 'Tonebone Bass Preamp by Radial',
                    type: 'Preamp',
                    image: '/img/gear/Radial-Bassbone-V2.jpg',
                    description: 'A high-quality bass preamp from Radial, the Tonebone is designed for tone shaping and signal control. With dual-channel functionality and solid EQ options, it’s perfect for live or studio setups.',
                    link: 'https://example.com/tonebone_bass_preamp'
                },
                {
                    name: 'Shure SM57 Microphone',
                    type: 'Microphone',
                    image: '/img/gear/Shure-SM57.jpg',
                    description: 'A legendary dynamic microphone known for its durability and versatility. The Shure SM57 is a go-to mic for capturing instrument sounds, particularly for amps and drums, delivering clear, precise sound.',
                    link: 'https://example.com/shure_sm57'
                },
                {
                    name: 'MIM Jazz Bass',
                    type: 'Bass',
                    image: 'https://example.com/jazz_bass.jpg',
                    description: 'A versatile, budget-friendly Jazz Bass from Fender’s Made in Mexico series. Known for its slim neck and punchy tone, this bass is great for various styles ranging from rock to jazz.',
                    link: 'https://example.com/jazz_bass'
                },
                {
                    name: 'Fender American Standard P Bass',
                    type: 'Bass',
                    image: 'https://example.com/p_bass.jpg',
                    description: 'A classic Precision Bass with a balanced sound that’s ideal for nearly any genre. This American Standard model offers smooth playability, rich tones, and the signature P Bass thump.',
                    link: 'https://example.com/p_bass'
                },
                {
                    name: 'Knilling Bucharest Upright Bass',
                    type: 'Bass',
                    image: 'https://example.com/knilling_bucharest_upright_bass.jpg',
                    description: 'A well-built upright bass known for its deep, resonant tone. The Knilling Bucharest series offers quality craftsmanship, making it a reliable choice for jazz, classical, or folk performances.',
                    link: 'https://example.com/knilling_bucharest_upright_bass'
                },
            ]
        };
    },
    computed: {
        filteredGearItems() {
            return this.gearItems.filter(item => {
                const matchesSearch = item.name.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesType = this.selectedType ? item.type === this.selectedType : true;
                return matchesSearch && matchesType;
            });
        }
    }
};
</script>


<style scoped>
.card-img-top {
    object-fit: cover;
    height: 200px;
}

.card-body {
    display: flex;
    flex-direction: column;
}

.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #004085;
}

.card-img-top {
    object-fit: contain; /* Adjusts the fitting behavior of the image to show it fully */
    height: 200px; /* Keeps the height fixed */
    width: 100%; /* Ensures the image takes up the full width of its container */
    background-color: #f8f9fa; /* Optional: Adds a light background color to better blend letterboxing */
}
</style>
