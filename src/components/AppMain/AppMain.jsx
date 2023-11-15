import styles from "./AppMain.module.css";
import { memo } from "react";
import { Outlet } from "react-router-dom";

function AppMain() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default memo(AppMain);
