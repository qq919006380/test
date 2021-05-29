<template>
  <div class="container">
    <Button elevation="5" class="btn" @click="go"> 快速上手 → </Button>
    <p>
      <hr />
    </p>
   <div class="card-container">
      <Card class="card">
      <template #header>
        <p class="small_title">简明优先</p>
      </template>
      <p>用法简单,构建声明式UI框架,快速完成开发</p>
    </Card>

    <Card class="card">
      <template #header>
        <p class="small_title">Vue 驱动</p>
      </template>
      <p>享用 Vue + webpack 开发环境</p>
    </Card>
    <Card class="card">
      <template #header>
        <p class="small_title">源码易读</p>
      </template>
      <p>源码简单通俗，容易理解看懂</p>
    </Card>
   </div>
    <div class="footer">MIT Licensed | Copyright © 2018-present Mrlgm</div>
  </div>
</template>

<script>
export default {
  mounted() {
    // console.log(this.$page.frontmatter);
  },
  data() {
    return {
      link: "/install/",
    };
  },
  methods: {
    go({ link = "" }) {
      if (/^http/.test(this.link)) {
        window.open(this.link);
      } else {
        this.$router.push(this.link);
      }
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
}
.btn {
  margin: 25px 0;
  padding: 20px 35px;
  font-weight: bold;
  color: #4e6e8e;
  font-size: 24px;
  /* background: #f2ffff; */
}
.btn:hover {
  background: rgba(197, 236, 190, 0.2);
}
.card-container{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.card {
  display: inline-block;
  padding: 13px;
  line-height: 1.7px;
  color: #4e6e8e;
  width: 30%;
}
.card .small_title {
  margin: 0 auto;
  font-size: 26px;
  font-weight: bold;
}
.card p{
  text-align: left;
  font-size: 18px;
}
@media (max-width: 970px) {
  .card {
    display: block;
  }
}
.footer {
  margin-top: 1rem;
  padding: 2.5rem;
  border-top: 1px solid #eaecef;
  text-align: center;
  color: #4e6e8e;
}
</style>
