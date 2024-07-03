<template>
    <div class="gear-page">
        <div class="container">
            <h1 class="text-center my-5">My Gear</h1>
            <div class="row">
                <div class="col-md-4" v-for="item in gearList" :key="item.name">
                    <div class="card mb-4">
                        <img :src="item.image" class="card-img-top" :alt="item.name">
                        <div class="card-body">
                            <h5 class="card-title">{{ item.name }}</h5>
                            <p class="card-text">{{ item.description }}</p>
                            <a :href="item.affiliateLink" target="_blank" class="btn btn-primary">Check it out on Amazon</a>
                        </div>
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
            gearList: [
                {
                    name: 'Fender Jazz Bass MIM',
                    description: 'A versatile bass guitar with a rich tone, made in Mexico.',
                    image: 'path/to/fender-jazz-bass-mim.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link'
                },
                {
                    name: 'Fender Pbass American Professional II',
                    description: 'The American Professional II Precision Bass delivers instant familiarity and sonic versatility.',
                    image: 'path/to/fender-pbass-american-pro-ii.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link-2'
                },
                {
                    name: 'Knilling Upright Bass',
                    description: 'A high-quality upright bass known for its deep, warm tones.',
                    image: 'path/to/knilling-upright-bass.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link-3'
                },
                {
                    name: 'Little Mark III',
                    description: 'A compact, powerful bass amplifier head known for its clarity and punch.',
                    image: 'path/to/little-mark-iii.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link-4'
                },
                {
                    name: 'Rearported 4x10 Barkbass Cab',
                    description: 'A powerful bass cabinet designed for maximum low-end punch.',
                    image: 'path/to/rearported-4x10-barkbass-cab.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link-5'
                },
                {
                    name: 'Filter Pedal Bass Filter Twin',
                    description: 'A versatile filter pedal that offers a wide range of sound shaping options.',
                    image: 'path/to/filter-pedal-bass-filter-twin.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link-6'
                },
                {
                    name: 'MXR Bass Octave Deluxe',
                    description: 'A dual-voice octave pedal that offers smooth, organic tone.',
                    image: 'path/to/mxr-bass-octave-deluxe.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link-7'
                },
                {
                    name: 'Korg Pitchblack Tuner',
                    description: 'A high precision, easy-to-use chromatic tuner designed for bass.',
                    image: 'path/to/korg-pitchblack-tuner.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link-8'
                },
                {
                    name: 'Ernie Ball Regular Slinky Bass Strings',
                    description: 'A popular choice for bass players, offering a bright, balanced tone.',
                    image: 'path/to/ernie-ball-regular-slinky-bass-strings.jpg',
                    affiliateLink: 'https://www.amazon.com/example-affiliate-link-9'
                }
            ]
        }
    }
}
</script>

<style scoped>
/* Add your CSS styling here */
.gear-page .container {
    max-width: 960px;
    margin: auto;
}
.card-img-top {
    max-height: 200px; /* Adjust based on your needs */
    object-fit: cover;
}
</style>