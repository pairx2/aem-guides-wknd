import React from 'react'

const SpacingsBlock = (props) => {

  const {top, bottom} = props;

  const onMouseEnter  = (e)=>{
    e.target.classList.add('active');
  }

  const onMouseLeave  = (e)=>{
    e.target.classList.remove('active');
  }


  return (
    <div className="spacing-container preview">
      <div className="spacer spacer--margin" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} >
        <span className="bottom-num" style={{bottom: `calc(${bottom}/2)`, top:'auto'}}>{bottom}</span>
        <span className="top-num" style={{top: `calc(${top}/2)`, bottom:'auto'}}>{top}</span>
        <span className="title">Margin</span>
      </div>
      <div className="spacer spacer--padding" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{top:top, bottom: bottom }}>
        <span className="title">Padding</span>
      </div>
      <div className="spacer spacer--content" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{top: `calc(${top} + 40px)`, bottom: `calc(${bottom} + 40px)`}}>
        Aliquam erat dui, gravida at turpis quis, mattis condimentum erat.
        Nulla a laoreet urna. Proin consequat sem eget orci ultrices, in luctus tortor rutrum.
        Sed nisi felis, dignissim quis magna at, ultrices posuere neque. Vestibulum quis quam dolor.
      </div>
      <div className="spacing-content" style={{marginTop:top, marginBottom: bottom }}>
        Aliquam erat dui, gravida at turpis quis, mattis condimentum erat.
      Nulla a laoreet urna. Proin consequat sem eget orci ultrices, in luctus tortor rutrum.
      Sed nisi felis, dignissim quis magna at, ultrices posuere neque. Vestibulum quis quam dolor.
      </div>
    </div>
  )
}

export default SpacingsBlock;
