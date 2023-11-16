import styles from "./Tabs.module.css";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import { useState, useEffect, FC } from "react";

type TabsProps = {
  value: number;
};

const Tabs: FC<TabsProps> = ({ value }) => {
  const [current, setCurrent] = useState("Булки");
  useEffect(() => {
    if (value <= 315) {
      setCurrent("Булки");
    } else if (value <= 845) {
      setCurrent("Соусы");
    } else {
      setCurrent("Начинки");
    }
  }, [value]);

  return (
    <ul className={`${styles.tabs}`}>
      <li>
        <a href="#buns" className={styles.link}>
          <Tab
            value="Булки"
            active={current === "Булки"}
            onClick={() => {
              setCurrent("Булки");
            }}
          >
            Булки
          </Tab>
        </a>
      </li>
      <li>
        <a href="#sauce" className={styles.link}>
          <Tab
            value="Соусы"
            active={current === "Соусы"}
            onClick={() => {
              setCurrent("Соусы");
            }}
          >
            Соусы
          </Tab>
        </a>
      </li>
      <li>
        <a href="#main" className={styles.link}>
          <Tab
            value="Начинки"
            active={current === "Начинки"}
            onClick={() => {
              setCurrent("Начинки");
            }}
          >
            Начинки
          </Tab>
        </a>
      </li>
    </ul>
  );
};

export default Tabs;
