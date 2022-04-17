<template>
    <button @click="add">xxx</button>
    <div>
        {{ products }} <br>
        {{ products2 }}
    </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'
const store = useStore()
function add() {
    store.commit({
        type: 'increment',
        amount: 10
    })
}

const products = computed(() => store.getters.doneTodos)

</script>