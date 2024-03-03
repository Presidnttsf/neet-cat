import { Cat } from './components/Cat'
import { Neet } from './components/Neet'
import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'

function App() {

  const [activeTab, setActiveTab] = useState("");

  const handleTabClick = (tab) => {
    // console.log(tab)
    setActiveTab(tab);
  }

  return (
    <>
      {activeTab === "neet" && <Neet setActiveTab={setActiveTab} />}
      {activeTab === "cat" && <Cat setActiveTab={setActiveTab} />}


      {!activeTab ? <div className='catContainer'>

        <div onClick={() => handleTabClick("neet")} className="catogory">
          <h1>NEET</h1>
        </div >
        <div onClick={() => handleTabClick("cat")} className="catogory">
          <h1>CET</h1>
        </div>

      </div> : null
      }
    </>
  )
}

export default App
