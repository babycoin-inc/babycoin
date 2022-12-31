import React , {useState, useEffect} from 'react';
import News from './newsCard.jsx';
const axios = require('axios');

function Newsfeed(ticker) {

  const [coinState, setCoin] = useState(ticker.coin);
  const [numNews, setNum] = useState(3);
  const [newsArr, setFeed] = useState([]);
  let initialized = false;

  // const tickers = {
  //   'BTC': 'BTC',
  //   'Bitcoin': 'BTC',
  //   'eth': 'ETH',
  //   'Tether': 'USDT',
  //   'BNB': 'BNB',
  //   'Cardano': 'ADA',
  //   'XRP': 'XRP',
  //   'Solana': 'SOL',
  //   'Dogecoin': 'DOGE',
  //   'Polygon': 'MATIC',
  //   'Polkadot': 'DOT'
  // };

//  console.log(coinState, tickers[coinState]);


  useEffect(()=>{
    console.log(ticker.coin.toUpperCase());
    var options = {
      method:'get',
      url:  `/newsfeed/${ticker.coin.toUpperCase()}?n=10`
    }
    axios(options).then((result) => {
      initialized = true;
      setFeed(result.data);
      setNum(3);
    }).catch(err => {
      console.log(err);
    })
  }, [ticker])


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
    // console.log(n);
    var options = {
      method:'get',
      url:  `/newsfeed/${ticker.coin.toUpperCase()}?n=${n}`
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

  const colbut = numNews>3?<div><a className="mr-2">|</a><button onClick = {collapse}>Collapse</button></div>:null

  return (
    <div className="flex flex-col">
        <h3 className="text-4xl font-extrabold dark:text-white pl-7">Newsfeed</h3>
        <div className="w-full max-h-96 px-2 py-1 overflow-y-auto">
          {newsArr.slice(0, numNews).map((article, i) => {
            return <News key = {i} art = {article} achievementsStatus={ticker.achievementsStatus} grantUserAchievement={ticker.grantUserAchievement} />
          })}
        </div>
        <div className="flex justify-center">
          <button className="mr-2" onClick = {loadmore}>Load More</button> {colbut}
        </div>
    </div>
  );
}

export default Newsfeed;