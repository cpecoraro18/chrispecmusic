<template>
    <div class="container py-5 min-vh-100">
        <h1 class="mb-4 text-center display-4">My Gear</h1>
        <div class="row mb-4 gx-3">
            <div class="col-lg-3 offset-lg-9 mb-3">
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
            <div v-for="item in filteredGearItems" :key="item.name" class="col-12 col-lg-4">
                <div class="card h-100 shadow-sm">
                    <img :src="item.image" :alt="item.name" class="card-img-top" />
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
            gearItems: [
                {
                    name: 'Fender Jazz Bass',
                    type: 'Bass',
                    image: '/img/gear/Fender-J-Bass.png',
                    description: 'My first bass, used for everything from jazz standards to Red Hot Chili Peppers covers.'
                },
                {
                    name: 'Fender American Standard P Bass',
                    type: 'Bass',
                    image: '/img/gear/Fender-P-Bass.png',
                    description: 'Latest addition, delivering classic Precision Bass tones with modern reliability.'
                },
                {
                    name: 'Knilling Bucharest Upright Bass',
                    type: 'Bass',
                    image: '/img/gear/Knilling-Upright.png',
                    description: 'My new upright bass, perfect for jazz and acoustic sessions.'
                },
                {
                    name: 'Markbass Little Mark 3 Amp',
                    type: 'Amp',
                    image: '/img/gear/Markbass-Little-Mark-3.png',
                    description: 'Reliable, lightweight amp head with powerful, transparent sound.'
                },
                {
                    name: 'Markbass 4x10 Cab',
                    type: 'Cabinet',
                    image: '/img/gear/Markbass-4x10.png',
                    description: '4x10 cabinet delivering punchy lows and detailed mids for live performances.'
                },
                {
                    name: 'Phil Jones Double 4',
                    type: 'Amp',
                    image: '/img/gear/Phil-Jones-Double-Four.png',
                    description: 'Compact, high-fidelity practice amp with a surprising amount of power for its size.',
                    link: 'https://amzn.to/3XB42CW'
                },
                {
                    name: 'Tonebone Bass Preamp by Radial',
                    type: 'Preamp',
                    image: '/img/gear/Radial-Bassbone-V2.png',
                    description: 'Versatile DI and preamp for seamless switching between electric and upright basses.',
                    link: 'https://amzn.to/3MDDMBR'
                },
                {
                    name: 'Korg Pitchblack Advanced',
                    type: 'Pedal',
                    image: '/img/gear/Kork-Pitchblack-Advanced.png',
                    description: 'Accurate, easy-to-read tuner with true bypass and multiple tuning modes.',
                    link: 'https://amzn.to/3MHbA0G'
                },
                {
                    name: 'Cioks DC7 Battery',
                    type: 'Pedal',
                    image: '/img/gear/Cioks-DC7.png',
                    description: 'Slim, multi-output power supply to handle all my pedals without noise.',
                    link: 'https://amzn.to/4d9uvMI'
                },
                {
                    name: 'MXR Bass Compressor',
                    type: 'Pedal',
                    image: '/img/gear/MXR-Bass-Compressor.png',
                    description: 'Transparent compression to balance dynamics while retaining punch and clarity.',
                    link: 'https://amzn.to/4cZIqos'
                },
                {
                    name: 'MXR Octave Deluxe',
                    type: 'Pedal',
                    image: '/img/gear/MXR-Bass-Octave-Delux.png',
                    description: 'Adds rich, sub-octave tones for a thicker, fuller sound.',
                    link: 'https://amzn.to/4ekdyjm'
                },
                {
                    name: 'Aguilar Twin Filter',
                    type: 'Pedal',
                    image: '/img/gear/Aguilar-Filter-Twin.png',
                    description: 'Dynamic filter pedal to shape bass tone with vintage-inspired sweeps.',
                    link: 'https://amzn.to/47lap0C'
                },
                {
                    name: 'Pedaltrain Metro 20',
                    type: 'Pedal',
                    image: '/img/gear/Pedaltrain-Metro-20.png',
                    description: 'Compact pedalboard with enough space to keep my essential pedals organized.',
                    link: 'https://amzn.to/3AV2pXQ'
                },
                {
                    name: 'Shure SM57 Microphone',
                    type: 'Microphone',
                    image: '/img/gear/Shure-SM57.png',
                    description: 'Industry-standard dynamic mic, great for miking amps and live performances.',
                    link: 'https://amzn.to/4eguoQe'
                },
                {
                    name: 'Audio-Technica AT2038 Microphone',
                    type: 'Microphone',
                    image: '/img/gear/Audio-Technica-AT2038.png',
                    description: 'High-quality condenser mic, perfect for recording upright bass and vocals.'
                }
            ]
        };
    },
    created() {
        useHead({
            title: 'My Gear - Chris Pecoraro',
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
    background-color: #808080; /* Optional: Adds a light background color to better blend letterboxing */
}
</style>
