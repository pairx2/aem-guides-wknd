import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import MyRewards from "../container/my-rewards"

var data = window.jsonRewardsData;

const divForPage = document.getElementById('myRewards');
if (divForPage) {
  ReactDOM.render(
    <MyRewards data={data}/>,
    divForPage
  );
}
