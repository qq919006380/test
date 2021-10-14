<template>
    <div>
        <!-- 弹窗内容 -->
        <div class="box" v-if="visible">
            <div>
                标题
                <input type="text" v-model="title" />
            </div>
            <div v-for="(item,index)  in list" :key="index">
                内容
                <input type="text" @keyup.enter="add(item.title)" v-model="item.title" />
            </div>
            <div>
                <button @click="save">保存</button>
            </div>
        </div>

        <!-- 列表内容 -->
        <div class="box" v-else>
            <button @click="visible = true">add</button>
            <div v-for="(list,key,index) in obj" :key="index">
                <h2>{{ key }}</h2>
                <div v-for="(data,index) in list" :key="index">{{ data }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: false,
            obj: {
                a: ['asd', 'asddd'],
                we: ['asd', 'asddd']
            },


            title:"",
            list: [
                {title:""}
            ]
        }
    },
    methods: {
        add(v) {
            this.list.push({
                title:v
            })
        },
        save() {
            this.obj[this.title]=this.list.map(v=>{
                return v.title
            })
            this.visible = false
        }
    }
}
</script>

<style>
.box {
    border: solid 1px;
    width: 300px;
}
</style>