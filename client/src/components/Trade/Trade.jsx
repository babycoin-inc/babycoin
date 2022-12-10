import React, { useState } from 'react';
import Order from './Order.jsx';
import Newsfeed from '../Newsfeeds/newsfeed.jsx'

function Trade() {

  return (
    //first element needs to be flex in order to organize containers on trade page
    <div className="flex flex-col justify-between gap-8">
      <div className="flex justify-between">
        <div className="flex w-3/5 p-5">
          Graph
        </div>
        <Order />
      </div>
      <Newsfeed/>
    </div>
  )
}

export default Trade;