import type { Metadata } from 'next';
import './globals.css';
import './teacher.css';
export const metadata:Metadata={title:'Ashab Al Khaimah · Teacher dashboard',description:'Ashab Al Khaimah teacher dashboard. Quizzes, grades and Sunday homework.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" dir="ltr"><body>{children}</body></html>}
