<template>
    <p>
        <span style="color:red">{{ item.id }}</span>
        {{ item.value }}
    </p>
</template>


<script>
export default {
    props: {
        item: {
            type: Object,
            default: () => { }
        }
    },

   
    data() {
        return {

        };
    },
    
};
</script>


<style scoped>
</style>