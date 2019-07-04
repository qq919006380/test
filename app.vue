<template>
  <div class="cotent">
    <DatePicker @on-change='on'	 @on-open-change='change' id='pick_week' type="date" placeholder="Select date" style="width: 200px"></DatePicker>
  </div>
</template>

<script>
export default {
  methods:{
    on(){
      console.log('asd')
    },
    change(){
        for(var i=1;i<=7;i++){
          document.querySelectorAll('#pick_week>.ivu-select-dropdown .ivu-date-picker-cells .ivu-date-picker-cells-cell')[i].onmouseenter=()=>{        
          this.addClass(1,7)
          }
          document.querySelectorAll('#pick_week>.ivu-select-dropdown .ivu-date-picker-cells .ivu-date-picker-cells-cell')[i].onmouseleave =()=>{        
            this.clearClass(1,7)
          }
        }

        for(var i=7;i<=14;i++){
          document.querySelectorAll('#pick_week>.ivu-select-dropdown .ivu-date-picker-cells .ivu-date-picker-cells-cell')[i].onmouseenter=()=>{        
          this.addClass(8,14)
          }
          document.querySelectorAll('#pick_week>.ivu-select-dropdown .ivu-date-picker-cells .ivu-date-picker-cells-cell')[i].onmouseleave =()=>{        
            this.clearClass(8,14)
          }
        }
    },
    addClass(a,b){
      for(let i=a;i<=b;i++){
        document.querySelectorAll('#pick_week .ivu-date-picker-cells-cell')[i].classList.add('add')
      }
    },
    clearClass(a,b){
      for(let i=a;i<=b;i++){
        document.querySelectorAll('#pick_week .ivu-date-picker-cells-cell')[i].classList.remove('add')
      }
    }
  },
  mounted(){
    
  }
};
</script>

<style lang='less'>
  #pick_week{
    .ivu-date-picker-cells-cell.add{
      background: #e1f0fe;
    }
  }
</style>
