import React, { useMemo, useRef, useState } from "react";
import { LoadingIndicator, Modal, XFDisplay } from "@abbott/add-platform";
import { distibutorService } from "../services/DistibutorService";
import {useTranslation} from "react-i18next";

export const DistibutorApproveTableUtilit = (props) => {

  const { t, i18n } = useTranslation();

  const { approveOrRejectUser, getdistibutor,getdistibutorApproved } = distibutorService();

  const [popupDesc, setPopupDesc] = useState({});
  const [formData, setFormData] = useState({});
  const [isLoadingUserApprove, setIsLoadingUserApprove] = useState(false);
  const [isBtnVisibleApprove, setIsBtnVisibleApprove] = useState(false);

  const showModal = (id, product) => {
    document.querySelector(id).classList.add("show-modal");
    document.querySelector(".a-container").style.zIndex = "auto";
    document.querySelector("body").style.overflow = "hidden";
    setIsBtnVisibleApprove(false);
    setPopupDesc({ title: "Would you like to remove this approved distributor/distributor customer account?", btnProceedTxt: "Confirm", btnCloseText: "Cancel" });
    var username = product.userName;
    username.split(",")[1];
    var approveData = {
      action: "deleteuser",
      email: product.userEmail,
      uid: product.uid,
      firstName: username,
      languages: product.languages,
    };
    setFormData(approveData);
  };

  const proceedApicall = () => {
    setIsLoadingUserApprove(true);
    approveOrRejectUser(formData, successCallBack);
  };

  const successCallBack = (data) => {
    setIsLoadingUserApprove(false);
    setPopupDesc({ title: "Distributor/Distributor customer account has been removed successfully.", btnProceedTxt: "Confirm", btnCloseText: "Cancel" });
    setIsBtnVisibleApprove(true);
  };

  const closeModal = () => {
    document.querySelector(".show-modal").classList.remove("show-modal");
    document.querySelector(".a-container").style.zIndex = "0";
    document.querySelector("body").style.overflow = "auto";
  };

  const closeModalUpdate = () => {
    window.location.reload(false);
  }


  const currentTableData = () => {
    var firstPageIndex = (props.currentPage - 1) * parseInt(document.querySelector("#distibutorLength").value);
    var lastPageIndex = firstPageIndex + parseInt(document.querySelector("#distibutorLength").value);
    return props.itemsProperty.slice(firstPageIndex, lastPageIndex);
  };
  return (
    <>
      {currentTableData().map((product) => {
        return (
          <tr key={product.index} data-uid={`${product.uid}`} >
            <td data-th="User Name" ><a title={product.userName} >{product.userName}</a></td>
            <td data-th="Company Name" ><a title={product.companyName != undefined && product.companyName != "" ? product.companyName : "-"} >{product.companyName != undefined && product.companyName != "" ? product.companyName : "-"}</a></td>
            <td data-th="Distributor Name" ><a title={product.distributorName != undefined && product.distributorName != "" ? product.distributorName : "-"} >{product.distributorName != undefined && product.distributorName != "" ? product.distributorName : "-"}</a></td>
            <td data-th="User Email" ><a title={product.userEmail} >{product.userEmail}</a></td>
            <td data-th="Country" ><a>{t(product.country.toLowerCase())}</a></td>
            <td data-th="Remove" >
              <div className="distibutor-icon" onClick={() =>
                  showModal("#distibutor-approve-modal", product)
                } >
                <em class="abt-icon abt-icon-freestyle-delete"></em>
              </div>
            </td>
          </tr>
        );
      })}
      <Modal id={`distibutor-approve-modal`}>
        <h4>{popupDesc.title}</h4>
        
          {isLoadingUserApprove ? (
            <div class="a-spinner">
              <div class="spinner-border" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div></div>
          )}

          {isBtnVisibleApprove ? (
            <div className="distibutor-btn" >
              <div className="button profile-button link a-button a-button--primary">
              <a className="btn " onClick={closeModalUpdate} target="_blank">
                <span>Close</span>
              </a>
            </div>
          </div>
          ) : (
            <div className="distibutor-btn" >
              <div className="button profile-button link a-button a-button--primary">
              <a className="btn " target="_blank">
                <span onClick={proceedApicall}>{popupDesc.btnProceedTxt}</span>
              </a>
              </div>
              <div className="button profile-button link a-button a-button--primary">
              <a className="btn " onClick={closeModal} target="_blank">
                <span>{popupDesc.btnCloseText}</span>
              </a>
              </div>
            </div>
          )}

      </Modal>
    </>
  );
};
