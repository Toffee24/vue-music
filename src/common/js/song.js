export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id
    this.singer = singer
    this.name = name
    this.mid = mid
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

export function createSong(musicData) {
  return new Song({
    id:musicData.songid,
    mid:musicData.songmid,
    singer:filterSinger(musicData.singer),
    name:musicData.songname,
    album:musicData.albumname,
    duration:musicData.interval,
    image:`https://y.gtimg.cn/music/photo_new/T002R150x150M000${musicData.albummid}.jpg?max_age=2592000`,
    url:`http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=C969D11FF613B545D4B98CA5C75101F494EB89374EDD3F885A845FB5E739008E1CBEC02E2EC22581C79959FE7E01C1B49B8B4F16AAD5E2AD&guid=1199580704&uin=0&fromtag=66`
  })
}

function filterSinger(singer) {
  let ret = []
  if(!singer){
    return ''
  }
  singer.forEach((s)=>{
    ret.push(s.name)
  })
  return ret.join('/')
}
