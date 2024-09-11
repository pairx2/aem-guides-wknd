
import React from "react";

const OfferCardHori = ({title,description, href,imgUrl, buttonLabel, dataGtmLabel="", onClick=()=>null}) => {
    return (
        <>
            <div className="row bg-alice-blue py-1_25 mb-4 mx-0">
                <div className="col-5 d-none d-lg-flex w-255-h-204">
                    <img src={imgUrl} className="w-auto mx-auto" />
                </div>
                <div className="col-12 col-lg-7 set-max-65 pl-xl-0">
                <div class="mr-1">
                    <h3 className="font-brandon-bold text-smalt mb-1_375" dangerouslySetInnerHTML={{__html:title}}>
                        </h3>
                    <div className="font-roboto-reg text-smalt" dangerouslySetInnerHTML={{__html:description}}>
                        </div>
                    <a href={href} className="btn btn-primary col-12 col-lg-8 mt-3" onClick={onClick}
                    data-gtm ={dataGtmLabel}>
                        {buttonLabel}
                    </a>
                    </div>
                </div>
            </div>
        </>
    );
}
export default OfferCardHori;