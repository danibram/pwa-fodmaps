import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import Head from "next/head";
import Router from "next/router";
import { useEffect } from "react";
import * as gtag from "../src/lib/gtag";
import theme from "../src/theme";

const A2HSProvider: any = dynamic(() => import("../src/hocs/a2hs"), {
  ssr: false,
});

export function reportWebVitals({ id, name, label, value }) {
  gtag.eventNi({
    action: name,
    category: label,
    label: id,
    value: Math.round(name === "CLS" ? value * 1000 : value),
  });
}

export default function MyApp(props: AppProps) {
  let { Component, pageProps } = props;

  useEffect(() => {
    const registerWB = async (w) => {
      const wb = w.workbox as any;

      const showSkipWaitingPrompt = function (event) {
        if (
          confirm(
            "Nueva versión de la página en marcha. ¡No esperes más a actualizarla!"
          )
        ) {
          wb.addEventListener("controlling", (event) => {
            window.location.reload();
          });
          wb.messageSW({ type: "SKIP_WAITING" });
        }
      };

      wb.addEventListener("waiting", showSkipWaitingPrompt);
      wb.addEventListener("externalwaiting", showSkipWaitingPrompt);

      wb.addEventListener("message", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
        if (event.data && event.data.type === "SKIP_WAITING") {
          wb.messageSkipWaiting();
        }
      });
      wb.addEventListener("installed", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("controlling", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      wb.addEventListener("activated", (event) => {
        console.log(`Event ${event.type} is triggered.`);
        console.log(event);
      });

      await wb.register();
    };
    // // Detects if device is on iOS
    // const isIos = () => {
    //     const userAgent = window.navigator.userAgent.toLowerCase();
    //     return /iphone|ipad|ipod/.test(userAgent);
    // };
    // // Detects if device is in standalone mode
    // const isInStandaloneMode = () =>
    //     'standalone' in window.navigator && window.navigator.standalone;

    // // Checks if should display install popup notification:
    // if (isIos() && !isInStandaloneMode()) {
    //     this.setState({ showInstallMessage: true });
    // }

    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }

    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      registerWB(window);
    }

    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    Router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      Router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);

  return (
    <>
      <Head>
        <title>FODMAPs</title>
        <meta charSet="utf-8"></meta>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <meta name="description" content="FODMAPs! Guia rapida de alimentos" />
        <meta name="keywords" content="chino, aprender, tarjetas" />
        <meta
          property="og:image"
          content="https://fodmaps.dbr.io/icons/android/android-launchericon-512-512.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta property="og:title" content="FODMAPs! Guia rapida de alimentos" />
        <meta
          property="og:description"
          content="Guia rapida de alimentos FODMAPs"
        />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="/icons/android/android-launchericon-192-192.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/firefox/firefox-general-32-32.png"
        ></link>
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/firefox/firefox-general-16-16.png"
        ></link>
        <meta name="apple-mobile-web-app-title" content="Jiayou!" />
        <meta name="application-name" content="Jiayou!" />
        <link
          rel="apple-touch-icon"
          sizes="150x150"
          href="/icons/windows/windowsphone-mediumtile-150-150.png"
        />
        {/* <!-- place this in a head section --> */}
        {/* <link rel="apple-touch-icon" href="touch-icon-iphone.png" />

                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="touch-icon-iphone-retina.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="167x167"
                    href="touch-icon-ipad-retina.png"
                /> */}

        {/* <!-- place this in a head section --> */}
        {/* <meta name="apple-mobile-web-app-capable" content="yes" />
                <link
                    href="/apple_splash_2048.png"
                    sizes="2048x2732"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/apple_splash_1668.png"
                    sizes="1668x2224"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/apple_splash_1536.png"
                    sizes="1536x2048"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/apple_splash_1125.png"
                    sizes="1125x2436"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/apple_splash_1242.png"
                    sizes="1242x2208"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/apple_splash_750.png"
                    sizes="750x1334"
                    rel="apple-touch-startup-image"
                />
                <link
                    href="/apple_splash_640.png"
                    sizes="640x1136"
                    rel="apple-touch-startup-image"
                /> */}

        {/* PWA primary color */}
        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta
          name="msapplication-TileColor"
          content={theme.palette.secondary.main}
        />
      </Head>
      <A2HSProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </A2HSProvider>
    </>
  );
}
