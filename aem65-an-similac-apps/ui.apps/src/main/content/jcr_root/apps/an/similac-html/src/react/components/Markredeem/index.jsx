import React from "react";
import moment from "moment";

function  Overlay (props)  {
    
   const {markAsRedeemed} = props.currentOffers;
   let gtmLabelYes=markAsRedeemed.dataGtmLabel + '-yes';
   let gtmLabelNo=markAsRedeemed.dataGtmLabel + '-no';
    return( 
        <>        
        <div className='Fill'>          
            <p className='Do-you-want-to-mark'>
                {markAsRedeemed.redeemSelection}<br/><br/>
                {markAsRedeemed.redeemNote}
            </p>        
           <a className='btn btn-secondary col-12 mt-3' 
              data-gtm={gtmLabelYes}
              style={{background:'#fff',cursor:"pointer"}} 
              onClick={props.offerActivated} >{markAsRedeemed.submitRedeemLabel}
           </a>
           <a href="javscript:void(0)" 
              className='No'
              data-gtm={gtmLabelNo}
              onClick={props.isEnableOffer}>{markAsRedeemed.cancelRedeemLabel}
           </a>
        </div>   
        </>
    )

}

export default Overlay;