<template>
  <h2>普通插槽</h2>
  <Card>
    <template #header>
      <div>头</div>
    </template>
    <template #default>
      <div>内容</div>
    </template>
    <template #footer>
      <div>底部</div>
    </template>
  </Card>

  <div>
    <h2>作用域插槽</h2>
    <todoList>
      <!-- #default="props" 和 v-slot="props"是一样的-->
      <template v-slot="{item,index}">
        <i class="fas fa-check">{{ index }}__</i>
        <span class="green">{{ item }}__</span>
        <!-- <span>{{ props.anotherAttribute }}</span> -->
      </template>
    </todoList>
  </div>
</template>
<script>
import Card from "./card";
import todoList from "./scope";
export default {
  components: { Card, todoList },
};
</script>