<template>
    <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swp-page swiper-slide" v-for='list in lists' :key='list.id'> 
            <a class="js-no-follow" :href='"goods.html?id="+list.id'>
                <img class="goods-main-photo fadeIn" :src='list.img'>
            </a>
            </div>
        </div>
        <div class="swiper-pagination"></div>
    </div>
</template>
<script>
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
export default {
    name:'swiper',
    props:{
        lists:{
            type:Array,
            required:true,
        },
        name:{}
    },
    mounted(){
        new Swiper('.swiper-container', {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: {
                delay: 2000,
                disableOnInteraction: true,
            }
        });
    }
}
</script>

<style>
    .swiper-container img{
        width:100%;
        height: 100%;
    }
</style>



