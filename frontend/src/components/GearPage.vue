<template>
    <div class="container py-5 vh-100">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <h1 class="mb-4">My Gear</h1>
                <div v-for="item in gearItems" :key="item.name" class="gear-item mt-5">
                    <h2>{{ item.name }}</h2>
                    <img :src="item.image" :alt="item.name" class="img-fluid">
                    <p>{{ item.description }}</p>
                    <a :href="item.link">Learn More</a>
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
            gearItems: [
                {
                    name: 'Jazz Bass',
                    image: 'https://example.com/jazz_bass.jpg',
                    description: 'Description for Jazz Bass.',
                    link: 'https://example.com/jazz_bass'
                },
                {
                    name: 'P Bass',
                    image: 'https://example.com/p_bass.jpg',
                    description: 'Description for P Bass.',
                    link: 'https://example.com/p_bass'
                },
                {
                    name: 'Markbass Little Mark 3 Amp',
                    image: 'https://example.com/markbass_little_mark_3_amp.jpg',
                    description: 'Description for Markbass Little Mark 3 Amp.',
                    link: 'https://example.com/markbass_little_mark_3_amp'
                },
                {
                    name: 'Knilling Bucharest Upright Bass',
                    image: 'https://example.com/knilling_bucharest_upright_bass.jpg',
                    description: 'Description for Knilling Bucharest Upright Bass.',
                    link: 'https://example.com/knilling_bucharest_upright_bass'
                },
                {
                    name: 'Markbass 4x10 Cab',
                    image: 'https://example.com/markbass_4x10_cab.jpg',
                    description: 'Description for Markbass 4x10 Cab.',
                    link: 'https://example.com/markbass_4x10_cab'
                },
                {
                    name: 'Phil Jones Double 4',
                    image: 'https://example.com/phil_jones_double_4.jpg',
                    description: 'Description for Phil Jones Double 4.',
                    link: 'https://example.com/phil_jones_double_4'
                }
            ]
        }
    }
}
</script>

<style scoped>
.gear-item {
    /* Add your styles here */
}
</style>