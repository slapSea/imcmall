<template>
    <div class="GoodLists">
      <nav-header></nav-header>
      <nav-bread>
        <span slot="bread">Goods</span>
        <span slot="B">B</span>
      </nav-bread>
      <div class="accessory-result-page accessory-page">
        <div class="container">
          <div class="filter-nav">
            <span class="sortby">Sort by:</span>
            <a href="javascript:void(0)" class="default cur">Default</a>
            <a href="javascript:void(0)" class="price" @click="sortGoods" >Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
            <a href="javascript:void(0)" class="filterby stopPop" @click="showFileterPop">Filter by</a>
          </div>
          <div class="accessory-result">
            <!-- filter -->
            <div class="filter stopPop" id="filter" v-bind:class="{'filterby-show':filterBy}">
              <dl class="filter-price">
                <dt>Price:</dt>
                <dd><a href="javascript:void(0)" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked='all'">All</a></dd>
                <dd v-for="(price,index) in priceFilter" >
                  <a href="javascript:void(0)" v-bind:class="{'cur':priceChecked==index}" @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
                </dd>
              </dl>
            </div>

            <!-- search result accessories list -->
            <div class="accessory-list-wrap">
              <div class="accessory-list col-4">
                <ul>
                  <li v-for="(item,index) in goodList">
                    <div class="pic">
                      <a href="#"><img v-lazy="'./static/'+item.productImage" alt=""></a>
                    </div>
                    <div class="main">
                      <div class="name">{{item.productName}}</div>
                      <div class="price">{{item.salePrice}}</div>
                      <div class="btn-area">
                        <a href="javascript:;" class="btn btn--m">加入购物车</a>
                      </div>
                    </div>
                  </li>
                </ul>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
                  加载中...
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
      <nav-footer></nav-footer>
    </div>
</template>

<script>
  import '../assets/css/base.css'
  import '../assets/css/product.css'
  import '../assets/css/login.css'
  import NavHeader from '../components/NavHeader'
  import NavFooter from '../components/NavFooter'
  import NavBread from '../components/NavBread'
  import axios from 'axios'

    export default {
        data(){
          return{
            goodList:[],
            priceFilter:[{
              startPrice:0,
              endPrice:500
            },{
              startPrice:500,
              endPrice:1000
            },{
              startPrice:1000,
              endPrice:2000
            }],
            priceChecked:'all',
            filterBy:false,
            overLayFlag:false,
            sortFlag:true,
            page:1,
            pageSize:8,
            //默认是禁用
            busy:true
          }
        },
        components:{
          NavBread,
            NavHeader,
            NavFooter
        },
        mounted:function(){
          this.getGoodLists()
        },
        methods:{
          getGoodLists(flag){
            let param={
              page:this.page,
              pageSize:this.pageSize,
              sort:this.sortFlag?1:-1
            }
            axios.get('/goods',{params:param}).then(result=>{
              var res = result.data
              if(res.status==="0"){
                //flag判断是否是加载更多
                if(flag){
                  this.goodList = this.goodList.concat(res.result.list)
                  if(res.result.count ===0){
                    this.busy = true
                  }else {
                    this.busy = false
                  }
                }else {
                  this.goodList = res.result.list
                  this.busy = false
                }

              }
              console.log(`goodList ${this.goodList}`);
            }).catch(function (error) {
              console.log(error.response);
            });
          },
          showFileterPop(){
            this.filterBy=true
            this.overLayFlag=true
          },
          setPriceFilter(index){
            this.priceChecked = index
            this.closePop()
          },
          closePop(){
            this.filterBy=false
            this.overLayFlag=false
          },
          sortGoods(){
            this.sortFlag = !this.sortFlag
            this.page = 1
            this.getGoodLists()
          },
          loadMore(){
            this.page++
            this.busy = true
            setTimeout(() => {
              this.getGoodLists(true)
            }, 500);
          }
      }
    }
</script>

<style scoped>

</style>
