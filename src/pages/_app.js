import { createContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { wrapper } from "../store/store";

import "../styles/globals.css";
import "../styles/app.css";
import "../styles/loading.css";

import Navbar from "../components/navbar";
import { PersistGate } from "redux-persist/integration/react";
import { useDispatch } from "react-redux";
import { setAuthState } from "../store/slices/authSlice";
import { store, persistor } from "../store/store";
import Footer from "../components/newfooter";
import Messages from "./messages";
import CometChatWidget from "../components/cometchatwidgettwo";
export const AuthContext = createContext();

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { useRouter } from "next/router";

config.autoAddCss = false

function MyApp({ Component, pageProps }) {

  const Loading = ()=>{

    const router = useRouter();
    const [loading,setLoading] = useState(false);

    useEffect(()=>{
      const handleLoadStart = (url)=>(url !== router.asPath) && setLoading(true);

      const handleLoadComplete = (url)=>(url === router.asPath) && setTimeout(()=> setLoading(false),3000);


      router.events.on('routeChangeStart',handleLoadStart);
      router.events.on('routeChangeComplete',handleLoadComplete);
      router.events.on('routeChangeError',handleLoadComplete);

      return ()=>{
        router.events.off('routeChangeStart',handleLoadStart);
        router.events.off('routeChangeComplete',handleLoadComplete);
        router.events.off('routeChangeError',handleLoadComplete);
      }
    });

    return loading && (
      <div className="grid w-full h-screen items-center justify-center">
        <span class="loader"></span>
      </div>
    )

  }
  
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Loading/>
        <Navbar />
        <Component {...pageProps} />
        <CometChatWidget />
        <Footer />
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
