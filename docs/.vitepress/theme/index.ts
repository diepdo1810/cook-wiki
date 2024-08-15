// .vitepress/theme/index.ts

import DefaultTheme from "vitepress/theme"
import vitepressMusic from 'vitepress-plugin-music'
import 'vitepress-plugin-music/lib/css/index.css'

async function fetchSongList() {
    const ids = '1987660367,1977983298,2144492937,1955720485,1455452759,1943498394,1403213631,1479174227'
    const response = await fetch(`https://chiaser-music.vercel.app/api/song/detail?ids=${ids}&realIP=211.161.244.70`);
    const data = await response.json();
    return data.songs.map(song => ({
        id: song.id,
        name: song.name,
        artist: song.ar[0].name,
        cover: song.al.picUrl,
        theme: '#ebd0c2'
    }));
}

async function fetchSongDetails(id) {
    const response = await fetch(`https://chiaser-music.vercel.app/api/song/url?id=${id}&br=320000&realIP=211.161.244.70`);
    const data = await response.json();
    return data.data[0].url;
}

async function createAudioList() {
    const songList = await fetchSongList();
    const audioList = await Promise.all(songList.map(async song => {
        const url = await fetchSongDetails(song.id);
        return {
            name: song.name,
            author: song.artist,
            file: url,
        };
    }));

    return audioList;
}

export default {
  ...DefaultTheme,
  enhanceApp: async (ctx) => {
    const playlist = await createAudioList();
    vitepressMusic(playlist);
  }
}