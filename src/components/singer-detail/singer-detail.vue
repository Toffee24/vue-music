<template>
  <transition name="slide">
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer.js'
  import {createSong} from "common/js/song";
  import {ERR_OK} from "../../api/config";
  import MusicList from 'components/music-list/music-list'

  export default {
    name: "singer-detail",
    created(){
      this._getDetail()
    },
    data(){
      return {
        songs:[]
      }
    },
    computed:{
      ...mapGetters([
        'singer'
      ]),
      title(){
        return this.singer.name
      },
      bgImage(){
        return this.singer.avatar
      }
    },
    methods:{
      _getDetail(){
        if(!this.singer.id){
          this.$router.push('/singer')
        }
        getSingerDetail(this.singer.id).then((res)=>{
          if(res.code === ERR_OK){
            this.songs = this._normalizeSongs(res.data.list)
          }
        })
      },
      _normalizeSongs(list){
        let ret = []
        list.forEach((item)=>{
          let {musicData} = item
          if(musicData.songid && musicData.albummid){
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
    },
    components:{
      MusicList
    }
  }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  .singer-detail
    position: fixed
    z-index 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background $color-background
  .slide-enter-active,.slide-leave-active
    transition all .3s;
  .slide-enter,.slide-leave-to
    transform:translate3d(100%,0,0)
</style>
