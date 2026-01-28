import "./styles/global.scss";

import { MainLayout, Sidebar, Topbar } from "@components/layout";
import { ScrollToTop } from "@components/utils";
import { ConnectionPage, UnsupportedBrowser } from "@pages";
import { WheelApi } from "@shubham0x13/ffbeast-wheel-webhid-api";
import { HashRouter } from "react-router-dom";
import { Toaster } from "sonner";

const App = () => {
  if (!WheelApi.isSupported()) {
    return <UnsupportedBrowser />;
  }

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            toast: "toast",
            icon: "toast_icon",
            title: "toast_title",
            description: "toast_description",
            actionButton: "toast_action_button",
            cancelButton: "toast_cancel_button",
            closeButton: "toast_close_button",
          },
        }}
      />

      <ConnectionPage />

      <HashRouter>
        <ScrollToTop />
        <div className="canvas">
          <Topbar />
          <div className="canvas_bottom">
            <Sidebar />
            <MainLayout />
          </div>
        </div>
      </HashRouter>
    </>
  );
};

export default App;
