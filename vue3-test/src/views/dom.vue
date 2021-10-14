<template>
    <div class="box">
        <virtualList :listData="data" :itemSize="30"></virtualList>
    </div>
</template>

<script>
import virtualList from '../components/virtualList.vue';
let i = 0
let data = []
while (i < 2000) {
    i++
    data.push({
        id: i,
        value: i
    })
}
export default {
    components: { virtualList },
    data() {
        return {
            data
        }
    },
    mounted() {

    }
}
</script>

<style>
.box {
    height: 200px;
    width: 200px;
}
</style>