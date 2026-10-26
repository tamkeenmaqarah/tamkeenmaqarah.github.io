import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'خيمة ياسين | The Sunday tent',description:'The Sunday-morning circle in Yasin Naseri’s tent. A subset of Tamkeen, committed to the Quran, quizzing the halaqas.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
