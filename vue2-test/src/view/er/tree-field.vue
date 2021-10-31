<template>
    <div>
        <el-tree default-expand-all :data="data" :props="defaultProps">
            <span slot-scope="{ node, data }">
                <!-- @mousedown="node.isLeaf ? handleNodeMove(data, node, $event) : null" -->
                <span draggable="true" @dragstart='onDragstart' :class="{ move: node.isLeaf }">{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [
                {
                    label: '一级 1',
                    children: [
                        { label: '二级 1-1' },
                        { label: '三级 1-1-1' },
                        { label: '三级 1-1-1' },
                        { label: '三级 1-1-1' }
                    ]
                },
                {
                    label: '一级 2',
                    children: [
                        { label: '二级 1-1' },
                        { label: '三级 1-1-1' },
                        { label: '三级 1-1-1' },
                        { label: '三级 1-1-1' }
                    ]
                },
                {
                    label: '一级 3',
                    children: [
                        { label: '二级 1-1' },
                        { label: '三级 1-1-1' },
                        { label: '三级 1-1-1' },
                        { label: '三级 1-1-1' }
                    ]
                }],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        };
    },
    methods: {
        handleNodeMove(data, node, e) {
            this.$emit('mousedown', data, e)
        },
        onDragstart(e){
            console.log(e)
        }
    }
}
</script>

<style scoped>
.move {
    cursor: move;
}
</style>