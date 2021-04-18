import styles from "./Tabs.module.css";

const Tabs = () => {
    return ( 
        <div>
            <ul className={styles.tabs}>
                <li className={styles.current}>tab1</li>
                <li>tab2</li>
                <li>tab3</li>
            </ul>
        </div>
    );
};

export {Tabs};
