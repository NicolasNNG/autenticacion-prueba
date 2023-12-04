// import "./globals.css";

// export const metadata = {
//   title: "Next.js",
//   description: "Generated by Next.js",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body>
//         {children}
//         </body>
//     </html>
//   );
// }


//CAMBIOS PARA AUTH 
import { Nunito } from 'next/font/google'
import { Providers } from "@/redux/provider";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Toaster } from "react-hot-toast";
import './globals.css'

export const metadata = {
  title: 'ShoesOnTrack',
  description: 'ShoesOnTrack',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <UserProvider>
          <Providers>
            {children}
            <Toaster />
          </Providers>
        </UserProvider>
      </body>
    </html>
  );
}