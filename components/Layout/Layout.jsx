import i18nextConfig from "../../next.config";
import Head from "next/head";
import Script from "next/script";
import { Footer, Header, Scripts } from "../../components";
import useSWR from "swr";
import fetcher from "../../utils/fetcher";
import { useRouter } from "next/router";
import SideBar from "./sidebar";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  // const { data: settings } = useSWR("/settings", fetcher);
  const router = useRouter();
  const { offcanvas } = useSelector((state) => state.settings);

  const isSidebar =
    router.asPath.startsWith("/login") || router.asPath.startsWith("/register");

  return (
    <>
      <Head>
        {/* meta tags */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="author" content="darstop.uz" />
        <meta name="robots" content="index, follow, noodp" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google" content="notranslate" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* favicon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/img/icons/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/img/icons/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/img/icons/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/img/icons/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/img/icons/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/img/icons/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <meta
          name="msapplication-config"
          content="/img/icons/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff"></meta>

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap"
          rel="stylesheet"
        ></link>

        {/* href lang */}
        {/* {i18nextConfig.i18n.locales.map((locale, i) => {
          return (
            <link
              key={i}
              rel="alternate"
              hrefLang={locale}
              href="https://api.idea.inweb.uz"
            />
          );
        })} */}
      </Head>

      {/* Sprites */}
      {/* <Sprites /> */}

      {/* Body */}
      <div className="wrapper">
        <div className="app">
          {/* Header */}
          <Header />

          <div className="content-wrapper container flex items-start">
            {isSidebar ? (
              <></>
            ) : (
              <>
                <SideBar />
              </>
            )}
            <div
              className={` ${
                isSidebar ? "w-full" : "lg:ml-auto lg:w-4/5 lg:px-5 w-full"
              }`}
            >
              {children}
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>

      {/* Nav Bottom */}
      {/* <NavBottom /> */}

      {/* Scripts */}
      {/* <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.5/dist/umd/popper.min.js"></Script> */}
      {/* <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.min.js"></Script> */}

      {/* {settings && <Scripts settings={settings} />} */}
    </>
  );
};

export default Layout;
