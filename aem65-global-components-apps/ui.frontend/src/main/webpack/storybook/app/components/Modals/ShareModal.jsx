import React, { useState } from 'react'
import QueryParams from '../../models/QueryParams';
import Modal from './Modal';

const ShareModal = (props) => {
  const {show, onClose} = props;
  const [showCopied, setShowCopied] = useState(false);
  const url = QueryParams.getPreviewURL();
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(()=>{
      setShowCopied(true);
      setTimeout (()=>{
        onClose && onClose();
        setShowCopied(false)
      }, 3000)
    })
  }

  return (
    <Modal show={show} hideCancel={true} okTitle='Copy' heading='Share URL' onOk={handleCopy} onClose={()=>{onClose && onClose()}}>
      <input type="text" value={url} readOnly={true}></input>
      {showCopied && <p className="copied-text">Share URL copied! Modal closing in 3 secs</p>}
    </Modal>
  )
}

export default ShareModal
