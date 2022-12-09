import React , {useState, useEffect} from 'react';
import News from './newsCard.jsx';
const axios = require('axios');

function Newsfeed(ticker) {


  const [numNews, setNum] = useState(2);
  const [newsArr, setFeed] = useState([]);
  let initialized = false;

  useEffect(()=>{
    var options = {
      method:'get',
      url:  "/newsfeed"
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
    console.log('load more ran');
    if(newsArr.length < numNews + 2) {
      getNews(numNews + 2)
    } else {
      setNum(prevNum => prevNum + 2);
    }
  }

  function collapse(){
    setNum(2);
    console.log('collapse ran', numNews);
  }

  function getNews(){
    var options = {
      method:'get',
      url:  "/newsfeed"
    }
    axios(options).then((result) => {
      console.log('get news ran');
      setFeed(result.data);
    }).catch(err => {
      console.log(err)
    })
  }

  useEffect(() => {
    if(initialized) {
      setNum(numNews + 2);
    }
    console.log('Line 39', numNews, newsArr);
  },[newsArr])

  return (
    <div className="flex flex-col">
        <h3 className="text-4xl text-400 font-bold">Newsfeed</h3>
        <div className="container mx-lg">
          {newsArr.slice(0, numNews).map((article, i) => {
            return <News key = {i} art = {article}/>
          })}
        </div>
        <button onClick = {loadmore}>Load More</button><a> | </a><button onClick = {collapse}>Collapse</button>
    </div>
  );
}

export default Newsfeed;