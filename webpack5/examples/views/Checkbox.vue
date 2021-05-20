<template>
    <div>
        flag：{{flag}}
        <Checkbox v-model="flag">x</Checkbox>
        <Checkbox v-model="flag">x</Checkbox>
    </div>
</template>
<script>
export default {
    data() {
        return {
            flag:true
        }
    },
}
</script>