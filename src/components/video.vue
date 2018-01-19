<template>
    <div class="video_panel">
        <video id="my-video" class="video-js" autoplay preload="auto" width="" height="" poster="" data-setup="{}" :src="url">
            <source type="video/mp4" :src="url">
        </video>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export default {
    data() {
        return {
            url: "http://vjs.zencdn.net/v/oceans.mp4"
        }
    },
    created() {
        videojs("my-video", {
            "controls": true,
            "autoplay": true,
            "preload": "auto"
        });
    },
    methods: {

    }
};
</script>
<style>

</style>
