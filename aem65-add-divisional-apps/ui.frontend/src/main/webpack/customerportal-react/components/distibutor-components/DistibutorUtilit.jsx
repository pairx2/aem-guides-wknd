import React, { useMemo, useRef, useState } from "react";
import { LoadingIndicator, Modal, XFDisplay } from "@abbott/add-platform";
import { useSharedDistibutor } from "../shared/Distibutor";
import { distibutorService } from "../services/DistibutorService";
import { useTranslation } from "react-i18next";

export const DistibutorUtilit = (props) => {
  const { t, i18n } = useTranslation();
  const { approveOrRejectUser } =
    distibutorService();

  const [popupDesc, setPopupDesc] = useState({});
  const [actionCall, setActionCall] = useState("");
  const [formData, setFormData] = useState({});
  const [isLoadingUser, setIsLoadingUser] = useState(false);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  const currentTableData = () => {
    var firstPageIndex =
      (props.currentPage - 1) *
      parseInt(document.querySelector("#distibutorLength").value);
    var lastPageIndex =
      firstPageIndex +
      parseInt(document.querySelector("#distibutorLength").value);
    return props.itemsProperty.slice(firstPageIndex, lastPageIndex);
  };

  const showModal = (id, product, action) => {
    document.querySelector(id).classList.add("show-modal");
    document.querySelector(".a-container").style.zIndex = "auto";
    document.querySelector("body").style.overflow = "hidden";
    setIsBtnVisible(false);
    if (action === "approve") {
      setPopupDesc({
        title:
          "Would you like to approve this Distributor/Distributor customer account?",
        btnProceedTxt: "Confirm",
        btnCloseText: "Cancel",
      });
      setActionCall("approve");
      var username = product.userName;
      username.split(",")[1];
      var approveData = {
        action: "approveuser",
        email: product.userEmail,
        uid: product.uid,
        firstName: username,
        languages: product.languages,
      };
      setFormData(approveData);
    } else {
      setPopupDesc({
        title:
          "Would you like to reject this distributor/distributor customer account?",
        btnProceedTxt: "Confirm",
        btnCloseText: "Cancel",
      });
      setActionCall("reject");
      var username = product.userName;
      username.split(",")[1];
      var rejectData = {
        action: "rejectuser",
        email: product.userEmail,
        uid: product.uid,
        firstName: username,
        languages: product.languages,
      };
      setFormData(rejectData);
    }
  };

  const proceedApicall = () => {
    setIsLoadingUser(true);
    if (actionCall === "approve") {
      approveOrRejectUser(formData, successCallBack);
    } else if (actionCall === "reject") {
      approveOrRejectUser(formData, successCallBack);
    }
  };

  const successCallBack = (data) => {
    setIsLoadingUser(false);
    if (actionCall === "approve") {
      setPopupDesc({
        title:
          "Distributor/Distributor customer account has been approved successfully.",
        btnProceedTxt: "Confirm",
        btnCloseText: "Cancel",
      });
    } else if (actionCall === "reject") {
      setPopupDesc({
        title:
          "Distributor/Distributor customer account has been rejected successfully.",
        btnProceedTxt: "Confirm",
        btnCloseText: "Cancel",
      });
    }
    setIsBtnVisible(true);
  };
  const closeModal = () => {
    document.querySelector(".show-modal").classList.remove("show-modal");
    document.querySelector(".a-container").style.zIndex = "0";
    document.querySelector("body").style.overflow = "auto";
  };

  const closeModalUpdate = () => {
    window.location.reload(false);
  };

  return (
    <>
      {currentTableData().map((product) => {
        return (
          <tr key={product.index} data-uid={`${product.uid}`}>
            <td data-th="Request Date">
              <a title={product.date?.substring(0, 10)}>{product.date?.substring(0, 10)}</a>
            </td>
            <td data-th="User Name">
              <a title={product.userName}>{product.userName}</a>
            </td>
            <td data-th="Company Name">
              <a
                title={
                  product.companyName != undefined && product.companyName != ""
                    ? product.companyName
                    : "-"
                }
              >
                {product.companyName != undefined && product.companyName != ""
                  ? product.companyName
                  : "-"}
              </a>
            </td>
            <td data-th="Distributor Name">
              <a
                title={
                  product.distributorName != undefined &&
                  product.distributorName != ""
                    ? product.distributorName
                    : "-"
                }
              >
                {product.distributorName != undefined &&
                product.distributorName != ""
                  ? product.distributorName
                  : "-"}
              </a>
            </td>
            <td data-th="User Email">
              <a title={product.userEmail}>{product.userEmail}</a>
            </td>
            <td data-th="Country">
              <a title={product.country}>{t(product.country.toLowerCase())}</a>
            </td>
            <td>
              <button
                class="distibutor-success-btn"
                onClick={() =>
                  showModal("#distibutor-modal", product, "approve")
                }
              >
                Approve
              </button>
              <button
                class="distibutor-failuer-btn"
                onClick={() =>
                  showModal("#distibutor-modal", product, "reject")
                }
              >
                Reject
              </button>
            </td>
          </tr>
        );
      })}

      <Modal id={`distibutor-modal`}>
        <h4>{popupDesc.title}</h4>

        {isLoadingUser ? (
          <div class="a-spinner">
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        {isBtnVisible ? (
          <div className="distibutor-btn">
            <div className="button profile-button link a-button a-button--primary">
              <a className="btn " onClick={closeModalUpdate} target="_blank">
                <span>Close</span>
              </a>
            </div>
          </div>
        ) : (
          <div className="distibutor-btn">
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
