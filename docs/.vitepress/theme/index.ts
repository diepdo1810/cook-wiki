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
    try {
        const response = await fetch(`https://chiaser-music.vercel.app/api/song/url?id=${id}&br=320000&realIP=211.161.244.70`);
        const data = await response.json();

        // Kiểm tra xem data và data.data có tồn tại và không phải là null
        if (data && data.data && data.data.length > 0) {
            return data.data[0].url;
        } else {
            console.error(`No data found for song ID: ${id}`);
            return null;
        }
    } catch (error) {
        console.error(`Error fetching details for song ID: ${id}`, error);
        return null;
    }
}

async function createAudioList() {
    try {
        const songList = await fetchSongList();
        const audioList = await Promise.all(songList.map(async song => {
            const url = await fetchSongDetails(song.id);
            if (url) {
                return {
                    name: song.name,
                    author: song.artist,
                    file: url,
                };
            } else {
                return null;
            }
        }));

        return audioList.filter(item => item !== null);
    } catch (error) {
        console.error('Error creating audio list', error);
        return [];
    }
}

export default {
  ...DefaultTheme,
  enhanceApp: async (ctx) => {
    const playlist = await createAudioList();
    vitepressMusic(playlist);
  }
}