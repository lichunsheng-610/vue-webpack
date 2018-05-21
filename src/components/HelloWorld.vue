<template>
    <div class="hello">
        <h1>{{msg}}</h1>
        <!-- <img src="../../static/file/vue.jpg"> -->
    </div>
</template>

<script>
export default {
    name: 'helloWorld',
    data() {
        return {
            msg: 'Welcome, this is "hello world!"'
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    text-align: center;
}
</style>
