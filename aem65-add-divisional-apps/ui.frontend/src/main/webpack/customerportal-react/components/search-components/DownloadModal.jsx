import React, {
  useImperativeHandle,
  forwardRef,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  DOWNLOAD_JOB_STATUS,
  downloadService,
} from "../services/DownloadService";
import { useInterval } from "../shared/Utils";
import { DownloadItem } from "../cell-components/DownloadItem";
import { Modal } from "@abbott/add-platform";
import { useSharedDownloadJobs } from "../shared/DownloadJobs";
import { useAnalyticsUtils } from "../shared/AnalyticsUtils";
import { useTranslation } from "react-i18next";
import { DownloadItemPi } from "../cell-components/DownloadItemPi";

export const DownloadModal = forwardRef((props, ref) => {
  const { id } = props;
  const { t, i18n } = useTranslation();
  const { requestDownloads, requestStatus } = downloadService();
  const {
    downloadJob,
    setSharedDownloadJob,
    isSharedDownloadError,
    setSharedDownloadJobsIsError,
    setSharedDownloadJobID,
  } = useSharedDownloadJobs();
  const [isDownloading, setIsDownloading] = useState(false);
  const [activeDownloadJob, setActiveDownloadJob] = useState(null);
  const [completedDownloadJob, setCompletedDownloadJob] = useState(null);
  const [failedDownloadJob, setFailedDownloadJob] = useState(null);
  const [currentDownloadUrl, setCurrentDownloadUrl] = useState(null);
  const [downloadErrorMessage, setDownloadErrorMessage] = useState(null);
  const {
    analyticsUserAndLabObject,
    fireAnalyticsEvent,
    analyticsActiveDownloads,
  } = useAnalyticsUtils();

  const publicRef = {
    initiateDownload: (selectedDocuments) => {
      setCompletedDownloadJob(null);
      setActiveDownloadJob(false);
      setFailedDownloadJob(false);
      setSharedDownloadJobsIsError(false);
      setCurrentDownloadUrl(false);
      setDownloadErrorMessage(null);
      setIsDownloading(true);
      showModal();
      requestDownloads(selectedDocuments);
    },
  };

  useImperativeHandle(ref, () => publicRef);

  const handleDownloadError = (ev) => {
    const { errorResponse, errorCode } = ev.detail;
    setIsDownloading(false);
    let errorMessage = errorResponse;
    if (typeof errorResponse != "string") {
      // this is probably an else error response
      // get content from authored text
      const error = document.querySelector("#" + errorResponse?.i18nMessageKey);
      if (error) {
        errorMessage = error.innerText;
      } else {
        errorMessage = errorResponse?.statusReason ?? "unknown error";
      }
    }
    setDownloadErrorMessage(errorMessage);

    const eventObj = {
      file: analyticsActiveDownloads,
      error: {
        errorCode: errorCode,
        errorMessage: errorMessage,
      },
      ...analyticsUserAndLabObject,
    };
    // fire analytics event
    fireAnalyticsEvent("file_download_fail", eventObj);
  };

  // component initialization
  React.useEffect(() => {
    // Handle #labProfile
    document.addEventListener(
      "add-customerportal:download-error",
      handleDownloadError,
      false
    );
  }, []);


  const downloadTextPopupShow = () => {
    var downloadContent = document.querySelector(
      `#modal_document-download-active_${id}`
    );
    var downloadContentText =
      downloadContent.querySelector("#doc-download-text");
      var downloadContentTextLength =
      downloadContent.querySelector("#doc-download-text")?.children.length;
    var downloadPopup = document.getElementById("download-content-popup");
    var downloadPopupText = downloadPopup.querySelector("p");
    var downloadPopupClone = downloadPopupText.cloneNode(true);
    if(downloadContentTextLength == 0) {
      downloadContentText?.appendChild(downloadPopupClone);
    }
    if(downloadContentTextLength == undefined) {
      downloadContentText?.appendChild(downloadPopupClone);
    }
  }

  // handle newly added download jobs
  React.useEffect(() => {
    // if a download job is active, we want to long-poll the service until it's done
    if (isDownloading) {
      setSharedDownloadJobsIsError(false);
      setDownloadErrorMessage(null);
      // set up long-polling job
      if (downloadJob) {
        // test if any jobs have completed and move them to completed jobs
        switch (downloadJob.status) {
          case DOWNLOAD_JOB_STATUS.INITIATED:
            setActiveDownloadJob(downloadJob);
            break;
          case DOWNLOAD_JOB_STATUS.COMPLETED:
            setCompletedDownloadJob(downloadJob);
            setActiveDownloadJob(null);
            setSharedDownloadJob(null);
            break;
          case DOWNLOAD_JOB_STATUS.FAILED:
            setActiveDownloadJob(null);
            setFailedDownloadJob(downloadJob);
            setIsDownloading(false);
            setDownloadErrorMessage(t("doc-download-job-failed"));
            setSharedDownloadJobsIsError(true);
            setSharedDownloadJob(null);
            // fire analytics
            const eventObj = {
              file: analyticsActiveDownloads,
              ...analyticsUserAndLabObject,
            };
            // fire analytics event
            fireAnalyticsEvent("file_download_fail", eventObj);
            break;
        }
      }
    }
  }, [downloadJob]);

  const delay = 3000; // 3 seconds
  const timeout = 300000; // 5 minutes
  // long polling active jobs
  useInterval(
    () => {
      // for each download in the activeDownloads list, poll the api
      const jobsToRemove = [];
      if (activeDownloadJob) {
        // add timeout on the job
        // difference in miliseconds between now and then
        const age =
          new Date().getTime() -
          new Date(activeDownloadJob.created_at).getTime();
        if (age > timeout) {
          // remove job from active downloads
          setSharedDownloadJobsIsError(true);
          setIsDownloading(false);
          setDownloadErrorMessage(t("request-timed-out"));
          setActiveDownloadJob(null);
        } else {
          requestStatus(activeDownloadJob.jobId);
        }
      }
    },
    isDownloading ? delay : null
  );

  const handleDownloadClick = (e) => {
    e.stopPropagation();
    e.currentTarget.removeEventListener("click", handleDownloadClick);
  };

  const saveFile = (url) => {
    setCurrentDownloadUrl(url);
  };

  // Handle completed download jobs
  React.useEffect(() => {
    if (completedDownloadJob && isDownloading) {
      // initiate downloads for completed download job and clear out the completedDownloadJobs collection
      const url = completedDownloadJob.downloadLink;
      // fire analytics
      const eventObj = {
        file: analyticsActiveDownloads,
        ...analyticsUserAndLabObject,
      };
      // fire analytics event
      fireAnalyticsEvent("file_download_complete", eventObj);

      saveFile(url);

      // clear queue
      setCompletedDownloadJob(null);
      setIsDownloading(false);
    }
  }, [completedDownloadJob]);

  const showModal = () => {
    document
      .querySelector(`#modal_document-download-active_${id}`)
      .classList.add("show-modal");
    document.querySelector(".a-container")["style"].zIndex = "auto";
    document.querySelector("body").style.overflow = "hidden";
    var hash = window.location.hash;
    if(hash == "#pi_search") {
      setTimeout(() => {
        downloadTextPopupShow();
      },3000);
    }
  };

  const fireStopAnalytics = () => {
    if (isDownloading) {
      const eventObj = {
        file: analyticsActiveDownloads,
        ...analyticsUserAndLabObject,
      };
      // fire analytics event
      fireAnalyticsEvent("file_download_stop", eventObj);
    }
  };

  const closeModal = () => {
    fireStopAnalytics();
    resetState();
    document.querySelector(".show-modal").classList.remove("show-modal");
    document.querySelector("body").style.overflow = "auto";
    document.querySelector(".a-container")["style"].zIndex = "0";
  };

  const resetState = () => {
    setActiveDownloadJob(null);
    setSharedDownloadJobID(null);
    setCompletedDownloadJob(null);
    setCurrentDownloadUrl(null);
    setDownloadErrorMessage(null);
    setSharedDownloadJob(false);
    setIsDownloading(false);
  };
  var hash = window.location.hash;
  var lotClass = document.querySelector("body").classList.contains("general");
  return (
    <Modal
      id={`modal_document-download-active_${id}`}
      onCloseCallback={fireStopAnalytics}
    >
      <div className={`${hash == "#pi_search" && lotClass ? "download-container" : ""}`}>
        {!isSharedDownloadError && (
          <>
            <h4>
              {currentDownloadUrl
                ? t("download-ready")
                : t("preparing-download")}
            </h4>
            {isDownloading && <p>{t("doc-download-prepared-instructions")}</p>}
            {(() => {
              if(hash == "#pi_search" && lotClass) { 
                return (<div id="doc-download-text"
                  className={` ${!isDownloading ? "" : "d-none"}`}
                ></div>)
              } else {
                return(
                  !isDownloading && (<p>{t('doc-download-ready-instructions')}</p>)
                );                
              }
            })()}
            {(()=>{
              if(hash == "#pi_search" && lotClass) {
                return (
                  currentDownloadUrl && (
                    <ul className={"download-list-links"}>
                      {currentDownloadUrl.split(",").map((docUrl, index) => {
                        return (
                          <li key={`docItem_${index}`}>
                            <DownloadItemPi url={docUrl} />
                          </li>
                        );
                      })}
                    </ul>
                  )
                );
              } else {
                return(
                  currentDownloadUrl && (
                    <ul className={"download-list-links"}>
                      {currentDownloadUrl.split(",").map((docUrl, index) => {
                        return (
                          <li key={`docItem_${index}`}>
                            <DownloadItem url={docUrl} />
                          </li>
                        );
                      })}
                    </ul>
                  )
                )
                
              }
            })()}
          </>
        )}

        {isSharedDownloadError && (
          <>
            <h4>{t("error")}</h4>
            <p>
              <strong>
                {t("doc-download-problem-intro")}
                <br />
              </strong>
              {downloadErrorMessage}
            </p>
          </>
        )}

        <div className="button profile-button link a-button  a-button--secondary">
          <a onClick={closeModal} className="btn " target="_blank">
            <span>{hash == "#pi_search" && !isDownloading && lotClass ? t("close-exit-modal") : t("close")}</span>
          </a>
        </div>  
      </div>
    </Modal>
  );
});
