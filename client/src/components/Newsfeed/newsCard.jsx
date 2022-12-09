import React from 'react';

const News = function (props) {
  return (
    <div>
      {props.art.article} - {props.art.title}
    </div>
  )
};

export default News;