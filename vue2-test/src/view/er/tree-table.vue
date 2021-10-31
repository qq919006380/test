<template>
    <div>
        <el-tree default-expand-all :data="data" :props="defaultProps">
            <span slot-scope="{ node, data }">
                <span
                    :class="{ move: node.isLeaf }"
                    @mousedown="node.isLeaf ? handleNodeMove(data, node, $event) : null"
                >{{ node.label }}</span>
            </span>
        </el-tree>
    </div>
</template>

<script>
export default {
    data() {
        return {
            data: [{
                label: '表分类一',
                children: [{
                    label: '表分类',
                    children: [{
                        label: '表1241223'
                    }]
                }]
            }, {
                label: '表分类二',
                children: [{
                    label: '表分类',
                    children: [{
                        label: '表16233'
                    }]
                }, {
                    label: '二级 2-2',
                    children: [{
                        label: '表53435'
                    }]
                }]
            }, {
                label: '表分类三',
                children: [{
                    label: '表分类',
                    children: [{
                        label: '表312'
                    }]
                }, {
                    label: '表分类',
                    children: [{
                        label: '表123'
                    }]
                }]
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
        }
    }
}
</script>

<style scoped>
.move {
  cursor: move;
}
</style>