import React , {useState, useEffect} from 'react';
import News from './newsCard.jsx';
const axios = require('axios');

function Newsfeed(ticker) {

  const [coinState, setCoin] = useState(ticker.coin);
  const [numNews, setNum] = useState(3);
  const [newsArr, setFeed] = useState([]);
  let initialized = false;

  const tickers = {
    'BTC': 'BTC',
    'Bitcoin': 'BTC'
    'Ethereum': 'ETH',
    'Tether': 'USDT',
    'BNB': 'BNB',
    'Cardano': 'ADA',
    'XRP': 'XRP',
    'Solana': 'SOL',
    'Dogecoin': 'DOGE',
    'Polygon': 'MATIC',
    'Polkadot': 'DOT'
  };

  console.log(coinState, tickers[coinState]);
  useEffect(()=>{
    var options = {
      method:'get',
      url:  `/newsfeed/${tickers[coinState]}?n=10`
    }
    if(!initialized){
      axios(options).then((result) => {
        initialized = true;
        setFeed(result.data);
      }).catch(err => {
        console.log(err);
      })
    }
  }, [])

  function loadmore () {
    //console.log('load more ran');
    if(newsArr.length < numNews + 2) {
      getNews(numNews + 2);
    } else {
      setNum(prevNum => prevNum + 2);
    }
  }

  function collapse(){
    setNum(3);
    //console.log('collapse ran', numNews);
  }

  function getNews(n){
    console.log(n);
    var options = {
      method:'get',
      url:  `/newsfeed/${tickers[coinState]}?n=${n}`
    }
    axios(options).then((result) => {
      // console.log('get news ran');
      setFeed(result.data);
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(initialized) {
      //console.log('got more news');
      setNum(prevNum => prevNum + 2);
    }
  },[newsArr])

  return (
    <div class="flex flex-col">
        <h3 class="text-4xl font-extrabold dark:text-white">Newsfeed</h3>
        <div class="w-full h-100 px-2 py-1 overflow-auto">
          {newsArr.slice(0, numNews).map((article, i) => {
            return <News key = {i} art = {article}/>
          })}
        </div>
        <div class="flex justify-center">
          <button class="mr-2" onClick = {loadmore}>Load More</button><a class="mr-2"> | </a><button onClick = {collapse}>Collapse</button>
        </div>

    </div>
  );
}

export default Newsfeed;