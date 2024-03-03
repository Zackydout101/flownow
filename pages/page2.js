import styles from "./page.module.css";
import ClassServer from "./components/server.js";
import Navbar from "./components/navbar.js";
import Sidebar from "./components/sidebar.js";
import {serverList} from './data.js'

export default function Home() {
    const classServers = []

    for(let i =0;i<3;i++){
        classServers.push(<classServer serverInfo={serverList[i]}/>)
    }

    return (
    <main className={styles.main}>
        <Navbar />
        <Sidebar />
       <h1>4School</h1>
        <h6>Choose the Server you want to enter</h6>
            {/* {{classServers}} */}
        {serverList.map((serv,index) =>(
            <ClassServer serverInfo={serv}/>
        ))}

    </main>
  );
}
