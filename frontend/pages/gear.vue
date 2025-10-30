<template>
    <div class="container py-5 min-vh-100">
        <h1 class="mb-4 text-center">Gear</h1>

        <div class="row mb-4 gx-3">
            <div class="col-lg-12 mb-3 d-none d-lg-block">
                <div class="d-flex flex-wrap gap-2 justify-content-end">
                    <button
                        v-for="type in gearTypes"
                        :key="type"
                        @click="selectedType = type"
                        :class="['btn', 'btn-outline-light', 'rounded-pill', { active: selectedType === type }]"
                    >
                        {{ type || 'All' }}
                    </button>
                </div>
            </div>
            <div class="col-lg-3 offset-lg-9 mb-3 d-lg-none">
                <select
                    v-model="selectedType"
                    class="form-select"
                >
                    <option value="">Filter by Type</option>
                    <option value="">All</option>
                    <option value="Bass">Bass</option>
                    <option value="Amp">Amp</option>
                    <option value="Cabinet">Cabinet</option>
                    <option value="Pedal">Pedal</option>
                    <option value="Pedalboard">Pedalboard</option>
                    <option value="Power Supply">Power Supply</option>
                    <option value="Microphone">Microphone</option>
                </select>
            </div>
        </div>

        <div class="row row-cols-1 row-cols-md-3 g-4">
            <!-- Gear Items -->
            <div v-for="item in filteredGearItems" :key="item.name" class="col-12 col-lg-4">
                <div class="card h-100 shadow-sm bg-light-blue text-dark border-0">
                    <img :src="item.image" :alt="item.name" class="card-img-top m-0" />
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">{{ item.name }}</h5>
                         <div>
                            <span class="badge bg-secondary mb-2">{{ item.type }}</span>
                         </div>
                        <p class="card-text">{{ item.description }}</p>
                        <a v-if="item.link" :href="item.link" target="_blank">Buy on Amazon</a>
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
            gearTypes: ['', 'Bass', 'Amp', 'Cabinet', 'Pedal', 'Pedalboard', 'Power Supply', 'Microphone'],
            gearItems: [
                {
                    name: 'Lakland 5501',
                    type: 'Bass',
                    image: '/img/gear/Lakland5501.png',
                    description: 'Upgraded with Bartolini pickups and a Lakland LH3 preamp. A bright, punchy 5-string that plays smooth and fits any mix.'
                },
                {
                    name: 'Fender American Standard P Bass',
                    type: 'Bass',
                    image: '/img/gear/Fender-P-Bass.png',
                    description: 'Classic Precision Bass tone with the reliability to match.'
                },
                {
                    name: 'Fender Jazz Bass',
                    type: 'Bass',
                    image: '/img/gear/Fender-J-Bass.png',
                    description: 'My first bass—used for everything from jazz gigs to rock covers.'
                },
                {
                    name: 'Knilling Bucharest Upright Bass',
                    type: 'Bass',
                    image: '/img/gear/Knilling-Upright.png',
                    description: 'Go-to for jazz sessions and acoustic sets.'
                },
                {
                    name: 'Markbass Little Mark 3 Amp',
                    type: 'Amp',
                    image: '/img/gear/Markbass-Little-Mark-3.png',
                    description: 'Lightweight, powerful head with a clean, punchy sound.'
                },
                {
                    name: 'Phil Jones Double 4',
                    type: 'Amp',
                    image: '/img/gear/Phil-Jones-Double-Four.png',
                    description: 'Small practice amp with a clear, surprisingly big sound.',
                    link: 'https://amzn.to/3XB42CW'
                },
                {
                    name: 'Markbass 4x10 Cab',
                    type: 'Cabinet',
                    image: '/img/gear/Markbass-4x10.png',
                    description: 'Big, punchy lows and clean mids for live shows.'
                },
                {
                    name: 'Markbass New York 121 Cab',
                    type: 'Cabinet',
                    image: '/img/gear/Markbass-NewYork-121.png',
                    description: 'Compact cab that still brings the warmth and punch. I own two of these for a flexible live sound options.'
                },
                {
                    name: 'Tonebone Bass Preamp by Radial',
                    type: 'Pedal',
                    image: '/img/gear/Radial-Bassbone-V2.png',
                    description: 'DI and preamp for fast switching between upright and electric bass.',
                    link: 'https://amzn.to/3MDDMBR'
                },
                {
                    name: 'Origin Effects Bass Rig Super Vintage',
                    type: 'Pedal',
                    image: '/img/gear/Origin-Effects-BassRig-Super-Vintage.png',
                    description: 'SVT-style tones with tube-like feel and grit.'
                },
                {
                    name: 'JHS Colour Box V2',
                    type: 'Pedal',
                    image: '/img/gear/JHS-ColorBox.webp',
                    description: 'Flexible preamp that goes from clean to driven tones easily.'
                },
                {
                    name: 'Cali76 Bass Compressor',
                    type: 'Pedal',
                    image: '/img/gear/Cali76-Bass-Compressor.png',
                    description: 'Smooth, studio-style compression with a touch of vintage vibe.'
                },
                {
                    name: 'MXR Bass Compressor',
                    type: 'Pedal',
                    image: '/img/gear/MXR-Bass-Compressor.png',
                    description: 'Clean, transparent compression that keeps your attack intact.',
                    link: 'https://amzn.to/4cZIqos'
                },
                {
                    name: "HX Stomp",
                    type: "Pedal",
                    image: "/img/gear/HX-Stomp.png",
                    description: "Compact multi-effects processor with extensive routing options."
                },
                {
                    name: 'MXR Octave Deluxe',
                    type: 'Pedal',
                    image: '/img/gear/MXR-Bass-Octave-Delux.png',
                    description: 'Fat sub-octave sounds that thicken your tone.'
                },
                {
                    name: 'Electro-Harmonix Pico Pog',
                    type: 'Pedal',
                    image: '/img/gear/PicoPog.png',
                    description: 'Polyphonic octave pedal—great for solos and layering.'
                },
                {
                    name: 'Aguilar Twin Filter',
                    type: 'Pedal',
                    image: '/img/gear/Aguilar-Filter-Twin.png',
                    description: 'Dual filter pedal for funky sweeps and vintage textures.',
                    link: 'https://amzn.to/47lap0C'
                },
                {
                    name: 'Damnation Audio MBD',
                    type: 'Pedal',
                    image: '/img/gear/MBD.png',
                    description: 'Bass distortion with depth and blend knob to maintain lowend'
                },
                {
                    name: 'Korg Pitchblack Advanced',
                    type: 'Pedal',
                    image: '/img/gear/Kork-Pitchblack-Advanced.png',
                    description: 'Reliable tuner with true bypass and clear visibility.',
                    link: 'https://amzn.to/3MHbA0G'
                },
                {
                    name: 'Pedaltrain Metro 20',
                    type: 'Pedalboard',
                    image: '/img/gear/Pedaltrain-Metro-20.png',
                    description: 'Compact pedalboard that keeps the essentials tight and tidy.',
                    link: 'https://amzn.to/3AV2pXQ'
                },
                {
                    name: 'Cioks DC7 Battery',
                    type: 'Power Supply',
                    image: '/img/gear/Cioks-DC7.png',
                    description: 'Quiet, low-profile power supply that handles a full board with ease.',
                    link: 'https://amzn.to/4d9uvMI'
                },
                {
                    name: 'Shure SM57 Microphone',
                    type: 'Microphone',
                    image: '/img/gear/Shure-SM57.png',
                    description: 'Classic dynamic mic—works anywhere, sounds great.',
                    link: 'https://amzn.to/4eguoQe'
                },
                {
                    name: "Electro-Voice RE20 Microphone",
                    type: 'Microphone',
                    image: '/img/gear/EV-RE20.png',
                    description: 'Versatile dynamic mic perfect for bass amps and vocals.'
                },
                {
                    name: 'Audio-Technica AT2038 Microphone',
                    type: 'Microphone',
                    image: '/img/gear/Audio-Technica-AT2038.png',
                    description: 'Solid condenser mic for upright bass, vocals, and more.'
                }
            ]
        };
    },
    created() {
        useHead({
            title: 'Gear - Chris Pecoraro',
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: 'Learn more about the gear Chris Pecoraro uses, including basses, amps, pedals, and microphones.'
                }
            ]
        });
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

.card-img-top {
    object-fit: contain; /* Adjusts the fitting behavior of the image to show it fully */
    height: 200px; /* Keeps the height fixed */
    width: 100%; /* Ensures the image takes up the full width of its container */
    background-color: #808080; /* Optional: Adds a light background color to better blend letterboxing */
}
</style>
