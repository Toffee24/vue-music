<template>
  <div class="recommend">
    <Scroll class="recommend-content" :data="discList" ref="scroll">
      <div>
        <div v-if="recommends.length" class="slider-wrapper">
          <Slider>
            <div v-for="item in recommends">
              <a :href="item.linkUrl">
                <img :src="item.picUrl">
              </a>
            </div>
          </Slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in discList" class="item">
              <div class="icon">
                <img @load="loadImage" v-lazy="item.imgurl" width="60" height="60">
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="loading-container" v-show="!discList.length">
        <Loading></Loading>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import Slider from 'base/slider/slider'
  import {getRecommend, getDiscList} from 'api/recommend.js'
  import {ERR_OK} from 'api/config'
  import axios from 'axios'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'

  export default {
    data() {
      return {
        recommends: [],
        discList: []
      }
    },
    created() {
      this._getRecommend()
      this._getDiscList()
    },
    methods: {
      _getRecommend() {
        getRecommend().then((res) => {
          if (res.code == ERR_OK) {
            this.recommends = res.data.slider
          }
        })
      },
      _getDiscList() {
        this.ajaxRequest('/api/getDiscList', {
          platform: 'yqq',
          format: 'json',
          needNewCode: 0,
          hostUin: 0,
          picmid: 1,
          rnd: Math.random(),
          categoryId: 10000000,
          sortId: 5,
          sin: 0,
          ein: 29
        }).then((res) => {
          this.discList = res.data.data.list
        })
      },
      loadImage() {
        if (!this.checkLoaded) {
          this.$refs.scroll.refresh()
          this.checkLoaded = true
        }
      }
    },
    components: {
      Slider,
      Scroll,
      Loading
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
