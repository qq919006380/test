<template>
    <div class="container-draggable">
        <div class="draggable">
            xxx
            <div class="drag-icon">图标</div>
        </div>
    </div>
</template>

<script>
// import enableDrag from "easy-drag";
import drag from '../utils/drag';
export default {
    mounted() {
        // this.easyDrag()

        drag('.draggable')
    },
    methods: {
        // easyDrag() {
        //     enableDrag(document.querySelector(".draggable"), {
        //         outerElement: document.querySelector(".container-draggable"),
        //         innerElement: document.querySelector(".drag-icon"),
        //         onDragStart: (v) => {
        //             console.log(v)
        //         },
        //         onDrag: (v) => { console.log(v) },
        //         onDragEnd: (v) => { console.log(v) },
        //     });
        // }
    }
}
</script>

<style>
.container-draggable {
    width: 300px;
    height: 300px;
    background: #3ee;
}
.draggable {
    display: inline-block;
}
</style>