<template>
  <div>
    <RadioGroup @on-change="onChange" v-model="flag">
      <Radio label="单选"></Radio>
      <Radio label="多选"></Radio>
    </RadioGroup>
    <Table border ref="selection" :data="data" :columns="columns"></Table>
    <!-- <Button type="primary" @click="test">log</Button> -->
    <h2>{{log}}</h2>
  </div>
</template>
<script>
export default {
  created() {
    setTimeout(() => {
      this.data.map((val, idx, arr) => {
        this.$set(this.data[idx], "select", false);
      });
    }, 300);
  },
  computed: {
    log() {
      var arr = this.data.map(val => {
        return val.select || false;
      });
      return arr;
      console.log(arr);
    }
  },
  data() {
    return {
      flag: "单选",
      data: [
        {
          name: "1"
        },
        {
          name: "2"
        },
        {
          name: "3"
        },
        {
          name: "4"
        }
      ],
      columns: [
        {
          title: "select",
          width: 100,
          render: (h, params) => {
            if (this.flag == "单选") {
              return h("Checkbox", {
                props: {
                  value: params.row.select
                },
                on: {
                  "on-change": val => {
                    this.data.map((x, idx, arr) => {
                      this.$set(this.data[idx], "select", false);
                    });
                    this.$set(this.data[params.index], "select", val);
                  }
                }
              });
            } else {
              return h("Checkbox", {
                props: {
                  value: params.row.select
                },
                on: {
                  "on-change": val => {
                    this.$set(this.data[params.index], "select", val);
                  }
                }
              });
            }
          }
        },
        {
          title: "name",
          key: "name"
        }
      ]
    };
  },
  methods: {
    onChange(val) {
      this.data.map((x, idx, arr) => {
        this.$set(this.data[idx], "select", false);
      });
    }
  },
  created() {}
};
</script>
<style scoped>
</style>