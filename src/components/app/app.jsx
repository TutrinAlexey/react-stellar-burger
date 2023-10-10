import styles from "./app.module.css";
import { data } from "../../utils/data";
import AppHeader from "../AppHeader/AppHeader";
import AppMain from "../AppMain/AppMain";

function App() {
  return (
    <div className={styles.app}>
      <AppHeader></AppHeader>
      <AppMain></AppMain>
    </div>
  );
}

export default App;
