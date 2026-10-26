import type { Metadata } from 'next';
import './globals.css';
import './teacher.css';
export const metadata:Metadata={title:'أصحاب الخيمة | Teacher dashboard',description:'Ashab Al Khaimah teacher dashboard. Quizzes, grades and Sunday homework.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
