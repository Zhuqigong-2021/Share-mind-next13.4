import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

import { Providers } from "./redux/provider";

export const metadata = {
  title: "ShareMind",
  description: "Discover & Share AI Prompts",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app relative">
            <Nav />
            <Providers>{children}</Providers>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
