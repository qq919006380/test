<template>
    <div id="container"></div>
</template>

<script>
import '@antv/x6-vue-shape'
import Count from '../components/Count.vue';
import { Graph } from '@antv/x6';

export default {
    mounted() {
        const data = { num: 0 }
        const graph = new Graph({
            container: document.getElementById('container'),
            width: 600,
            height: 600,
            grid: true,
        });

        graph.addNode({
            shape: 'vue-shape',
            width: 200,
            height: 200,
            x: 100,
            y: 100,
            attrs: {
                body: {
                    width: 200,
                    height: 200,
                    stroke: 'red',
                }
            },
            component: {
                template: `<count :num="num" @add="add()"></count>`,
                data() {
                    return data
                },
                methods: {
                    add: () => {
                        data.num += 1
                    }
                },
                components: {
                    Count,
                }
            }
        });
    }
}
</script>

<style>
</style>