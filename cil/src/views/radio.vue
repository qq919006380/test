<template>
    <div>
        <button @click="allRemove">批量删除</button>
        <input type="text" v-model="filterData" placeholder="过滤" />
        <div v-for="(item,index) in filterList" :key="index">
            <div class="flex">
                <span>
                    <input @click="checkboxOn(item)" type="checkbox" v-model="item.checked" />
                </span>
                {{ item.text }}
                <span @click="remove(index)">删除</span>
            </div>
        </div>
    </div>
    <input type="text" @keyup.enter="add" v-model="text" />
</template>

<script>
export default {
    computed: {
        filterList() {
            if (this.filterData) {
                return this.list.filter(v => {
                    return v.text.includes(this.filterData)
                })
            } else {
                return this.list

            }

        }
    },
    data() {
        return {
            filterData: "",
            text: "",
            list: [
                { checked: false, text: "a" }
            ]
        }
    },
    methods: {
        checkboxOn(item) {
            this.list.map(val => {
                val.checked = false
            })
            item.checked = true
        },
        add() {
            this.list.push({
                checked: false, text: this.text
            })
            this.text = ""
        },
        remove(index) {
            this.list.splice(index, 1)
        },
        allRemove() {
            this.list = this.list.filter(val => {
                return val.checked != true
            })
        }
    }
}
</script>

<style>
</style>