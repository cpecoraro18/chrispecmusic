import{u as d}from"./vue.-sixQ7xP-CqfUZzXS.js";import{_ as c,c as i,a as e,g as m,j as g,e as h,F as u,k as y,o as s,t as o,h as b}from"./entry-ChjqiSv8.js";const v={name:"GearPage",data(){return{searchQuery:"",selectedType:"",gearItems:[{name:"Lakland 5501",type:"Bass",image:"/img/gear/Lakland5501.png",description:"Versatile 5-string bass with a bright, punchy tone and smooth playability. Upgraded with Bartolini pickups and a Lakland LH3 preamp."},{name:"Fender Jazz Bass",type:"Bass",image:"/img/gear/Fender-J-Bass.png",description:"My first bass, used for everything from jazz standards to Red Hot Chili Peppers covers."},{name:"Fender American Standard P Bass",type:"Bass",image:"/img/gear/Fender-P-Bass.png",description:"Delivering classic Precision Bass tones with modern reliability."},{name:"Knilling Bucharest Upright Bass",type:"Bass",image:"/img/gear/Knilling-Upright.png",description:"Upright bass, perfect for jazz and acoustic sessions."},{name:"Markbass Little Mark 3 Amp",type:"Amp",image:"/img/gear/Markbass-Little-Mark-3.png",description:"Reliable, lightweight amp head with powerful, transparent sound."},{name:"Markbass 4x10 Cab",type:"Cabinet",image:"/img/gear/Markbass-4x10.png",description:"4x10 cabinet delivering punchy lows and detailed mids for live performances."},{name:"Markbass New York 121 Cab",type:"Cabinet",image:"/img/gear/Markbass-NewYork-121.png",description:"Compact, lightweight cab with a warm, full sound for small venues and rehearsals."},{name:"Phil Jones Double 4",type:"Amp",image:"/img/gear/Phil-Jones-Double-Four.png",description:"Compact, high-fidelity practice amp with a surprising amount of power for its size.",link:"https://amzn.to/3XB42CW"},{name:"Tonebone Bass Preamp by Radial",type:"Pedal",image:"/img/gear/Radial-Bassbone-V2.png",description:"Versatile DI and preamp for seamless switching between electric and upright basses.",link:"https://amzn.to/3MDDMBR"},{name:"Origin Effects Bass Rig Super Vintage",type:"Pedal",image:"/img/gear/Origin-Effects-BassRig-Super-Vintage.png",description:"Vintage-inspired SVT simulator with tube-like warmth and harmonics."},{name:"JHS Colour Box V2",type:"Pedal",image:"/img/gear/JHS-ColorBox.webp",description:"Versatile preamp pedal with a wide range of tones, from clean to overdriven."},{name:"Korg Pitchblack Advanced",type:"Pedal",image:"/img/gear/Kork-Pitchblack-Advanced.png",description:"Accurate, easy-to-read tuner with true bypass and multiple tuning modes.",link:"https://amzn.to/3MHbA0G"},{name:"Cioks DC7 Battery",type:"Power Supply",image:"/img/gear/Cioks-DC7.png",description:"Slim, multi-output power supply to handle all my pedals without noise.",link:"https://amzn.to/4d9uvMI"},{name:"Cali76 Bass Compressor",type:"Pedal",image:"/img/gear/Cali76-Bass-Compressor.png",description:"Studio-grade compression with a vintage sound, perfect for bass solos and slap lines."},{name:"MXR Bass Compressor",type:"Pedal",image:"/img/gear/MXR-Bass-Compressor.png",description:"Transparent compression to balance dynamics while retaining punch and clarity.",link:"https://amzn.to/4cZIqos"},{name:"MXR Octave Deluxe",type:"Pedal",image:"/img/gear/MXR-Bass-Octave-Delux.png",description:"Adds rich, sub-octave tones for a thicker, fuller sound.",link:"https://amzn.to/4ekdyjm"},{name:"Aguilar Twin Filter",type:"Pedal",image:"/img/gear/Aguilar-Filter-Twin.png",description:"Dynamic filter pedal to shape bass tone with vintage-inspired sweeps.",link:"https://amzn.to/47lap0C"},{name:"Electro-Harmonix Pico Pog",type:"Pedal",image:"/img/gear/PicoPog.png",description:"Octave pedal with polyphonic tracking, used mainly for soloing and Thundercat tones."},{name:"Pedaltrain Metro 20",type:"Pedalboard",image:"/img/gear/Pedaltrain-Metro-20.png",description:"Compact pedalboard with enough space to keep my essential pedals organized.",link:"https://amzn.to/3AV2pXQ"},{name:"Shure SM57 Microphone",type:"Microphone",image:"/img/gear/Shure-SM57.png",description:"Industry-standard dynamic mic, great for miking amps and live performances.",link:"https://amzn.to/4eguoQe"},{name:"Audio-Technica AT2038 Microphone",type:"Microphone",image:"/img/gear/Audio-Technica-AT2038.png",description:"High-quality condenser mic, perfect for recording upright bass and vocals."}]}},created(){d({title:"My Gear - Chris Pecoraro",meta:[{hid:"description",name:"description",content:"Learn more about the gear Chris Pecoraro uses, including basses, amps, pedals, and microphones."}]})},computed:{filteredGearItems(){return this.gearItems.filter(n=>{const a=n.name.toLowerCase().includes(this.searchQuery.toLowerCase()),r=this.selectedType?n.type===this.selectedType:!0;return a&&r})}}},f={class:"container py-5 min-vh-100"},k={class:"row mb-4 gx-3"},w={class:"col-lg-3 offset-lg-9 mb-3"},P={class:"row row-cols-1 row-cols-md-3 g-4"},B={class:"card h-100 shadow-sm bg-light-blue text-dark border-0"},M=["src","alt"],C={class:"card-body d-flex flex-column"},_={class:"card-title"},A={class:"badge bg-secondary mb-2"},S={class:"card-text"},z=["href"];function x(n,a,r,T,p,l){return s(),i("div",f,[a[2]||(a[2]=e("h1",{class:"mb-4 text-center"},"My Gear",-1)),a[3]||(a[3]=e("p",{class:"lead"}," Learn more about the gear I use for live performances, studio recordings, and practice sessions. ",-1)),e("div",k,[e("div",w,[m(e("select",{"onUpdate:modelValue":a[0]||(a[0]=t=>p.selectedType=t),class:"form-select"},a[1]||(a[1]=[h('<option value="" data-v-6b4a985e>Filter by Type</option><option value="" data-v-6b4a985e>All</option><option value="Bass" data-v-6b4a985e>Bass</option><option value="Amp" data-v-6b4a985e>Amp</option><option value="Cabinet" data-v-6b4a985e>Cabinet</option><option value="Pedal" data-v-6b4a985e>Pedal</option><option value="Pedalboard" data-v-6b4a985e>Pedalboard</option><option value="Power Supply" data-v-6b4a985e>Power Supply</option><option value="Microphone" data-v-6b4a985e>Microphone</option>',9)]),512),[[g,p.selectedType]])])]),e("div",P,[(s(!0),i(u,null,y(l.filteredGearItems,t=>(s(),i("div",{key:t.name,class:"col-12 col-lg-4"},[e("div",B,[e("img",{src:t.image,alt:t.name,class:"card-img-top m-0"},null,8,M),e("div",C,[e("h5",_,o(t.name),1),e("div",null,[e("span",A,o(t.type),1)]),e("p",S,o(t.description),1),t.link?(s(),i("a",{key:0,href:t.link,target:"_blank"},"Buy on Amazon",8,z)):b("",!0)])])]))),128))])])}const L=c(v,[["render",x],["__scopeId","data-v-6b4a985e"]]);export{L as default};