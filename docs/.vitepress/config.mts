import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "🍲 Cook",
  description: "Ứng dụng nấu ăn tiện lợi",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'cook', link: 'https://cook-livid.vercel.app/'},
      { text: 'Trang chủ', link: '/trang-chu' },
      { text: 'Ăn gì', link: '/an-gi' },
      { text: 'Câu hỏi thường gặp', link: '/cau-hoi-thuong-gap' },
      { text: 'Của tôi', link: '/cua-toi' },
      { text: 'Cộng đồng', link: 'https://cookcommunity.vercel.app/' }
    ],

    sidebar: [
      {
        text: 'Hướng dẫn',
        items: [
          { text: 'Trang chủ', link: 'https://cook-livid.vercel.app/' },
          { text: 'Ăn gì', link: '/an-gi' },
          { text: 'Câu hỏi thường gặp', link: '/cau-hoi-thuong-gap' },
          { text: 'Của tôi', link: '/cua-toi' },
          { text: 'Cộng đồng', link: 'https://cookcommunity.vercel.app/' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'facebook', link: '#' }
    ],

    footer: {
      copyright: 'Bản quyền © 2024 <a href="https://cook-livid.vercel.app/">Cook</a>'
    }    
  }
})
