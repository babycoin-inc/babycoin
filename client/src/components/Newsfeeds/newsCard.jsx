import React from 'react';

const News = function (props) {
  console.log(props);
  let fdate = new Date(props.art.publish_date).toDateString();

  const grantAchievement = () => {
    if (!props.achievementsStatus[8]) {
      props.grantUserAchievement(8);
    }
  };

  if(props.art.type === "Article") {
    return (
      <div class=" flex w-full border rounded-lg shadow-md bg-gray-800 border-gray-700 my-2">
      <img class=" w-full h-96 md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg mr-2" src={props.art.image_url} alt="" />
      <div class="mr-2 my-2">
        <h2 class="mb-3 text-1xl font-extrabold tracking-tight text-white"><a href={props.art.url} target="_blank" onClick={grantAchievement} >{props.art.title}</a></h2>
        <p class="mb-3 text-gray-400 text-l">{props.art.description}</p>
        <div class="flex">
          <p class="text-gray-500 text-xs mr-3">{props.art.arthur}</p>
          <p class="text-gray-600 text-xs mr-3">{fdate}</p>
          <div class="flex text-gray-600 text-xs mr-0.5">{props.art.tickers.map(val => {
                return <div class="mr-1">{val}</div>
              })}</div>
          </div>
        </div>
      </div>
    )
  } else if(props.art.type === "Video") {
    const url = new URL(props.art.url);
    //console.log(url.searchParams.get('v'));
    let youtube = "https://www.youtube.com/embed/" + url.searchParams.get('v');
    return (
      <div class="flex w-full border rounded-lg shadow-md bg-gray-800 border-gray-700 my-2">
      <div class="w-1/2 mr-3">
        <iframe class="w-full aspect-video" src={youtube} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <div class="w-1/2 mr-2 my-2">
        <h2 class="mb-3 text-1xl font-extrabold tracking-tight text-white"><a href={props.art.url} target="_blank">{props.art.title}</a></h2>
        <p class="mb-3 text-gray-400 text-l">{props.art.description}</p>
        <div class="flex">
          <p class="text-gray-500 text-xs mr-3">{props.art.arthur}</p>
          <p class="text-gray-600 text-xs mr-3">{fdate}</p>
          <div class="flex text-gray-600 text-xs mr-0.5">{props.art.tickers.map(val => {
                return <div class="mr-1">{val}</div>
              })}</div>
          </div>
        </div>
      </div>
    )
  }

};


// let sample = {
//   arthur:"AMBCrypto",
//   description:"The number of Cardano wallets increased along with rising development activity. TVL witnessed a spike while Cardano's NFT market took a hit.",
//   image_url:"https://crypto.snapi.dev/images/v1/r/c/cardanoo-e1670590826746-234129.png",
//   publish_date:"2022-12-10T02:30:02.000Z",
//   sentiment:"Positive",
//   tickers:['ADA'],
//   title:"Cardano wallets move northwards, but what does it mean for ADA in short term?",
//   topics:[],
//   type:"Article",
//   url:"https://ambcrypto.com/cardano-wallets-move-northwards-but-what-does-it-mean-for-ada-in-short-term/"
// }
export default News;