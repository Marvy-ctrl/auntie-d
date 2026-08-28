// app/fonts/fonts.ts
import localFont from 'next/font/local';

export const myCustomFont = localFont({
  src: [
    {
      path: './georgia.ttf',
      weight: '400',
      style: 'normal',
    },
  
  ],
  display: 'swap',
  variable: '--font-georgia',
});
