const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://portfolio.com';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: "Vakhtangi Sheklashvili - Portfolio",
  description: "Personal portfolio showcasing my projects and skills in software development",
  keywords: ["developer", "portfolio", "full stack", "web development", "React", "Next.js"],
  openGraph: {
    title: "Vakhtangi Sheklashvili - Portfolio",
    description: "Full Stack Developer showcasing projects and skills",
    url: baseUrl,
    siteName: 'Vakhtangi Sheklashvili Portfolio',
    images: [
      {
        url: '/Profile.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};