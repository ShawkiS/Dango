import './App.css';
import './buttons.scss'
import DangoConnect from 'dango/DangoConnect';
import { useEffect, useState } from 'react';

function App() {
  let dc;

  const [p, setP] = useState({});

  useEffect(() => {
   dc = new DangoConnect();
  }, [])


  const connect = async () => {
    const result = await dc.connect();
  }


  const get = async () => {
    const result = await dc.getAccountData();
    console.log(result)
  }

  const sign = async () => {
    const d = new DangoConnect();
    const result = await d.signCast({
      "type": "text-short",
  "publishedAt": 1657668635910,
  "sequence": 386,
  "username": "shawki",
  "address": "0xe483f40326364D20c33C76ddAF2660fb623B24B7",
  "data": {
  "text": "🍡"
  },
  "prevMerkleRoot": "0xd69be4b7852ba17917cb73cf8b2b462005c02ff52d3233a98d599d0cdb1eaae6"
    });
    console.log(result);
  }

  return (
    <>
    <h1 style={{fontSize: '90px', marginLeft: "260px"}}>Dango 🍡</h1>

    <div>
   <button onClick={() => connect()} >Connect</button>
   <button onClick={() => get()} >Read Profile</button>
   <button onClick={() => sign()}>Sign Cast</button>

    </div>
      </>
  );
}

export default App;