import "./globals.css";

export const metadata = {
  title: "F1 车手人格测试",
  description: "回答 40 道比赛情境题，匹配你的 F1 车手人格。"
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hans">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;700;800&family=Noto+Sans+SC:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="f1-page">{children}</body>
    </html>
  );
}
