import "@/styles/globals.css";
import Layout from "@/layout/Layout";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
