import { AppProps } from "next/app";
import RootLayout from "../app/layout";
import "../app/global.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}
