import './globals.css';
import { ThemeProvider } from './theme-provider';

export const metadata = {
  title: 'Stock Price Prediction AI',
  description: 'AI-driven stock market prediction platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
