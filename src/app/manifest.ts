import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mahmudul Ahsan Portfolio',
    short_name: 'Mahmudul Ahsan',
    description: 'Mahmudul Ahsan - Software Engineer Portfolio (Windows XP Theme)',
    start_url: '/',
    display: 'standalone',
    background_color: '#245EDC',
    theme_color: '#245EDC',
    icons: [
      {
        src: '/mycomputer.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/icon-192.png', // Assuming these might be added later or user has them
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
