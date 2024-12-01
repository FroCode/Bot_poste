import "./globals.css";
import { Jaldi } from "next/font/google";

const jaldi = Jaldi({
  subsets: ["latin"],
  variable: "--font-jaldi",
  weight: ["400", "700"],
});

export const metadata = {
  title: "ChatBot",
  description: "this App was made by Fro Code team",
  icons: {
    icon: "/algeriePostLogo.svg",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${jaldi.variable} bg-gray`}>
       
         
          {children}
        
      </body>
    </html>
  );
}
