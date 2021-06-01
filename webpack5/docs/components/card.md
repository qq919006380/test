## 基础用法
<Card header="卡片名称">
<div v-for="item in 3">列表内容{{ item }}</div>
</Card>

```html
<Card header="卡片名称">
<div v-for="item in 3">列表内容{{ item }}</div>
</Card>
```

## 标题可配置标题
<cardDemo></cardDemo>

<script setup>
  import cardDemo from '../.vitepress/components/card-demo.vue'
</script>

<<< @\.vitepress/components/card-demo.vue
