import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, sepolia } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar/Sidebar";
import store from "../store";
import { Provider } from "react-redux";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const { chains, provider } = configureChains(
  [mainnet, polygon, sepolia],
  [alchemyProvider({ apiKey: "KM1Kv-cqY7LlaPsoximQwOASxTzExuR5" }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "SimpleFluid",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <Sidebar />
            </div>
            <div style={{ width: "75%" }}>
              <Navbar />
              <Component {...pageProps} />
            </div>
          </div>
        </RainbowKitProvider>
      </WagmiConfig>
    </Provider>
  );
}
