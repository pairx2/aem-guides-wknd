import React, { useEffect, useState } from 'react';

const GoBackArrow = () => {
  const [showGoBackBtn, setShowGoBackBtn] = useState(false);

  const handleGoBackClick = () => {
    history.back();
  };

  useEffect(() => {
    const body = document.querySelector('body');
    const dataSetaArticle = body.dataset.contentCategory === 'article';

    if (dataSetaArticle) {
      setShowGoBackBtn(true);
      body.classList.add('article-page');
    }
  }, []);

  return (
    <>
      {showGoBackBtn && (
        <nav className="m-article-list m-article-list__back-btn">
          <div className="container" onClick={handleGoBackClick}>
            <em className="abt-icon abt-icon-left-arrow" />
          </div>
        </nav>
      )}
    </>
  );
};

export default GoBackArrow;
