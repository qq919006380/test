
### 基础用法


包含标题，内容和操作。

:::demo Card 组件包括`header`和`body`部分，`header`部分需要有显式具名 slot 分发，同时也是可选的。
```html
<Card class="box-card">
  <template #header>
    <div class="card-header">
      <span>卡片名称</span>
      <Button class="button" type="text">操作按钮</Button>
    </div>
  </template>
  <div v-for="o in 4" :key="o" class="text item">
    {{'列表内容 ' + o }}
  </div>
</Card>

<style>
  .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
    
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .box-card {
    width: 480px;
  }
</style>
```
:::

