import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Tamkeen Maqra’ah | Quizzes',description:'Take a quiz, keep learning, and see your progress with Tamkeen Maqra’ah.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
