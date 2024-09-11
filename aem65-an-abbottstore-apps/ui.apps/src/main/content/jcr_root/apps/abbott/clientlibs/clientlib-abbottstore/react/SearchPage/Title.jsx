import React from 'react';

const Title = (props) => {
    let plpName = props.plpName.match(/search/gi) ? `Search Results For: '${props.query || ''}'` : props.plpName;
    return (<h1 className="search-page__title">{plpName}</h1>)
}

export default Title;