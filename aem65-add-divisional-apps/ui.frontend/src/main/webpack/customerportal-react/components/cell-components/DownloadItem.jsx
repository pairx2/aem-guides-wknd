import React from 'react';
import {useTranslation} from "react-i18next";

export const DownloadItem = (props) => {
  const { t, i18n } = useTranslation();
  
  const {url} = props;
  
  const getParamFromUrl = (name, url) => {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(url);
    return results === null ? '' : decodeURIComponent(results[1]);
  }
  
  const parseDocumentsFromUrl = (url) => {
    const responseContentDisposition = getParamFromUrl("response-content-disposition", url);
    if (responseContentDisposition) {
      // expecting 'attachment; filename="[FILENAME]"'
      // based on spec: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Disposition
      const filename = responseContentDisposition?.split('"')[1];
      return {
        filename : filename,
        url : url
      }
    } else {
      // not a vidori link
      return null;
    }
  }
  
  const vidoriDocument = parseDocumentsFromUrl(url);
  
  return (
    <>
      <div className="link button a-link a-link--icon">
        <div className="a-link">
          {vidoriDocument && (<a href={vidoriDocument.url}
              className="a-link__text"
              download={vidoriDocument.filename}
              target={'_blank'}>
                <span className="a-link__inner-text">
                    {vidoriDocument.filename}
                </span>
          </a>)}
          {!vidoriDocument && (
            <a href={url} className="a-link__text"
               download
               target={'_blank'}>
                <span className="a-link__inner-text">
                    {`${t('click-to-begin-download')}`}
                </span>
            </a>
          )}
        </div>
      </div>
    </>
  );
  
}