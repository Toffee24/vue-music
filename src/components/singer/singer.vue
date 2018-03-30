<template>
  <div class="singer" ref="singer">
    <list-view :data="singers" @select="selectSinger" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSingerList} from 'api/singer.js'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import listView from 'base/listview/listview'
  import {mapMutations} from 'vuex'
  import {playListMixin} from "common/js/mixin";

  const HOT_NAME = '热门'
  const HOT_SINGER_LENGTH = 10

  export default {
    mixins: [playListMixin],
    data() {
      return {
        singers: []
      }
    },
    created() {
      this._getSingerList()
    },
    methods: {
      _getSingerList() {
        getSingerList().then((res) => {
          if (res.code === ERR_OK) {
            this.singers = this._normalizeSinger(res.data.list)
          }
        })
      },
      _normalizeSinger(list) {
        let map = {
          hot: {
            title: HOT_NAME,
            items: []
          }
        }
        //组成数据结构
        list.forEach((item, index) => {
          if (index < HOT_SINGER_LENGTH) {
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name
            }))
          }
          const key = item.Findex
          if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        })
        //为了得到有序列表，处理map
        let hot = []
        let ret = []
        for (let key in map) {
          let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === HOT_NAME) {
            hot.push(val)
          }
        }
        //排序ret
        ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      },
      selectSinger(item){
        this.$router.push({
          path:`/singer/${item.id}`
        })
        this.setSinger(item)
      },
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
      },
      ...mapMutations({
        setSinger:'SET_SINGER'
      })
    },
    components:{
      listView
    }
  }
</script>

<style lang="stylus" scoped rel='stylesheet/stylus'>
  singer
    position: fixed;
    top: 88px;
    bottom: 0;
    width: 100%
</style>
