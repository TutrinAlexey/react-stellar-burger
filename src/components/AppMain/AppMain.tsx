import styles from "./AppMain.module.css";
import { FC, memo } from "react";
import { Outlet } from "react-router-dom";

const AppMain: FC = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default memo(AppMain);
