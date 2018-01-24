<template>
    <div class="video_panel">
        <video id="my-video" class="video-js" autoplay preload="auto" width="" height="" poster="" data-setup="{}" :src="url">
            <source type="video/mp4" :src="url">
        </video>
    </div>
</template>

<script>
import 'video.js/dist/lang/zh-CN';
import 'video.js/dist/video-js.css';

let my_player;
export default {
    data() {
        return {
            url: "../../static/file/oceans.mp4"
        }
    },
    mounted() {
        my_player = videojs("my-video", {
            "controls": true,
            "autoplay": true,
            "preload": "auto",
            "loop": true
        });
    },
    destroyed() {
        my_player.dispose();
    },
    methods: {

    }
};

</script>
<style>
.video_panel {
  width: 960px;
  height: 400px;
}

.video-js {
  width: 100%;
  height: 100%;
}
</style>
