import ScrollTop from "@/components/ScrollTop";
import SearchModal from "@/components/SearchModal";
import config from "@/config/config.json";
import theme from "@/config/theme.json";
import TwSizeIndicator from "@/helpers/TwSizeIndicator";
import Footer from "@/partials/Footer";
import Header from "@/partials/Header";
import Providers from "@/partials/Providers";
import SidebarDrawerMenu from "@/partials/SidebarDrawerMenu";
import "@/styles/main.scss";
import { FathomAnalytics } from './fathom';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Import Google Font CSS
  const pf = theme.fonts.font_family.primary;

  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* Responsive Meta */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />

        {/* Favicon */}
        <link rel="shortcut icon" href={config.site.favicon} />

        {/* Theme Meta */}
        <meta name="theme-name" content="nextplate" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />

        {/* Google Font CSS */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true} className="antialiased">
        <TwSizeIndicator />
        <SearchModal />
        <Providers>
          <SidebarDrawerMenu />
          <Header />
          <main>
            {children}
            <FathomAnalytics />
          </main>
          {config.settings.scroll_to_top && <ScrollTop />}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}