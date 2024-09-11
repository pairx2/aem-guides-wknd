import React, { useContext, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import 'slick-carousel';
import {
  lessThanMinutesAgo,
  touchDirectionDetection,
} from '../../utils/common';
import { fetchESLservice } from '../../services/eslService';
import Button from '../atoms/Button';
import ESL_EPT from '../../data/eslEndpoints';
import { SiteContext } from '../../context/SiteContext';

const ArticleList = ({ categories, useGetRequest }) => {
  const usingGETRequest = useGetRequest === 'true';
  const [siteContext, setSiteContext] = useContext(SiteContext);
  const [activeCategory, setActiveCategory] = useState(
    siteContext?.articleList?.activeCategory || 0
  );
  const [articlesList, setArticlesList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const articleListRef = useRef(null);
  const parsedCategories = categories && JSON.parse(categories);
  const categoriesArray = parsedCategories?.categories;
  const NUMBER_RESULTS_CATEGORY = 8;
  const NUMBER_RESULTS_LOAD_MORE = 10;
  const [articleCount, setArticleCount] = useState({
    total: {},
    visible: 0,
  });
  const getAllCategoriesTags = () => {
    let allTags = '';
    categoriesArray.forEach((element, index) => {
      if (element?.tag?.tagId) {
        allTags += element?.tag?.tagId;

        if (index + 1 != categoriesArray.length) {
          allTags += ',';
        }
      }
    });
    return allTags;
  };
  const [filterData, setFilterData] = useState({
    q: '',
    filters: [
      {
        tag:
          categoriesArray[activeCategory - 1]?.tag?.tagId ||
          getAllCategoriesTags(),
      },
    ],
    sort: [
      {
        authoreddate: 'descending',
      },
    ],
    firstresult: 1,
    numberofresults: NUMBER_RESULTS_CATEGORY,
    autocorrect: 'true',
    searchtype: 'blogsearch',
  });
  const isApp = document
    .querySelector('body')
    .classList.contains('ab-mobile-app');

  const scrollTop = () => {
    const stickyHeight =
      document.querySelector('.o-header__sticky-section.sticky')
        ?.offsetHeight || document.querySelector('.o-header-v2-global__sticky-section.sticky')
        ?.offsetHeight || 0;
        const navPosition = articleListRef.current.getBoundingClientRect().top + window.scrollY - stickyHeight;
    if (window.pageYOffset > navPosition) {
      window.scrollTo({
        top: navPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleCategoryClick = (index) => {
    scrollTop();
    setActiveCategory(index);
  };

  const handleSwip = (direction) => {
    setActiveCategory((activeCategory) => {
      const categoriesLength = categoriesArray.length;
      let currentCategory = activeCategory;

      // Only scroll to top when horizontal scroll happens
      if (direction === 'right' || direction === 'left') {
        scrollTop();
      }

      if (direction === 'right') {
        currentCategory++;
      } else if (direction === 'left') {
        currentCategory--;
      }

      if (!(currentCategory < 0) && !(currentCategory > categoriesLength)) {
        return currentCategory;
      } else {
        return activeCategory;
      }
    });
  };

  // If Primary article is in search result, remove it from it
  const findPrimaryArticle = (categoriesData, primaryArticle, maxAmount) => {
    let primaryRemoved = false;
    categoriesData = categoriesData?.filter((item) => {
      return item.uri != primaryArticle?.path;
    });

    if (categoriesData.length === maxAmount) {
      categoriesData.pop();
    } else {
      primaryRemoved = true;
    }
    return { data: categoriesData, primaryRemoved };
  };

  const handleOnLoadMore = async () => {
    // Creating array for loader skeleton
    setLoadMoreLoading(Array(9).fill({}));
    try {
      let primaryArticle = categoriesArray[activeCategory - 1]?.primary;
      const hasPrimary = primaryArticle?.title && primaryArticle?.path;
      const parameters = { ...filterData };
      parameters.firstresult = articleCount.visible + 1;
      parameters.numberofresults = NUMBER_RESULTS_LOAD_MORE;

      // Query string params for GET request:
      const queryStringParams = {
        filters: JSON.stringify(parameters.filters),
        searchtype: parameters.searchtype,
        numberofresults: parameters.numberofresults,
        firstresult: parameters.firstresult,
      };

      const loadMoreArticlesParams = {
        service: usingGETRequest ? ESL_EPT.siteSearchGET : ESL_EPT.siteSearch,
        ...(usingGETRequest
          ? {
              params: queryStringParams,
            }
          : {
              data: parameters,
            }),
        withRecaptcha: false,
      };

      let loadMoreArticles = await fetchESLservice(loadMoreArticlesParams);
      let newArticles = loadMoreArticles?.data?.response?.results;
      const { data, primaryRemoved } = findPrimaryArticle(
        newArticles,
        primaryArticle,
        NUMBER_RESULTS_LOAD_MORE
      );
      let articlesToSet = [...articlesList, ...data];

      setArticlesList(articlesToSet);
      setArticleCount({
        ...articleCount,
        visible:
          hasPrimary && !primaryRemoved
            ? articlesToSet.length - 1
            : articlesToSet.length,
      });
    } catch (error) {
      setArticlesList([]);
      throw new Error('Error: ' + error);
    } finally {
      setLoadMoreLoading(false);
    }
  };

  /**
   * Handles article click in the app version
   *
   * @param {element} e: Element to prevent click default
   * @param {string} url: Url where {.app} is needed in order to make it look like the app version
   */
  const handleArticleClick = (e, url) => {
    const extensionLessPage = !window.location.href.includes('.html');
    e.preventDefault();
    let newUrl = url;
    if (url.includes('.html')) {
      newUrl = url.replace('.html', '.app.html');
    } else if (!url.includes('.app')) {
      let urlEnding = '.app';
      if (!extensionLessPage) {
        urlEnding = '.app.html';
      }
      newUrl = url + urlEnding;
    }
    document.location.href = newUrl;
  };

  const scrollToNavItem = () => {
    const activeCategoryEle = articleListRef.current.querySelector(
      '.m-article-list__nav-item--active'
    );
    const leftPosition = activeCategoryEle?.offsetLeft;
    const navList = articleListRef.current.querySelector(
      '.m-article-list__nav-list'
    );
    $(navList).animate({ scrollLeft: leftPosition }, 300, 'linear');
  };

  const onCategoryChange = async (
    activeCategoryIndex,
    articleCountData,
    siteContextData
  ) => {
    try {
      let categoriesData;

      const parameters = { ...filterData };
      parameters.filters[0].tag =
        categoriesArray[activeCategoryIndex - 1]?.tag?.tagId ||
        getAllCategoriesTags();
      let primaryArticle = categoriesArray[activeCategoryIndex - 1]?.primary;
      const hasPrimary = primaryArticle?.title && primaryArticle?.path;
      const isCategoryCached =
        siteContextData?.articleList?.cachedArticles?.[
          `cat_${activeCategoryIndex}`
        ]?.articles?.length > 0;
      let articlesToSet;
      let response;
      let primaryWasRemoved;

      if (!isCategoryCached) {
        // Query string params for GET request:
        const queryStringParams = {
          filters: JSON.stringify(parameters.filters),
          searchtype: parameters.searchtype,
          numberofresults: parameters.numberofresults,
          firstresult: parameters.firstresult,
        };

        const getCategoryListParams = {
          service: usingGETRequest ? ESL_EPT.siteSearchGET : ESL_EPT.siteSearch,
          ...(usingGETRequest
            ? {
                params: queryStringParams,
              }
            : {
                data: parameters,
              }),
          withRecaptcha: false,
        };

        let categoriesResponse = await fetchESLservice(getCategoryListParams);

        response = categoriesResponse?.data?.response;
        categoriesData = response?.results;
        if (hasPrimary) {
          primaryArticle.uri = primaryArticle?.path;

          const { data, primaryRemoved } = findPrimaryArticle(
            categoriesData,
            primaryArticle,
            NUMBER_RESULTS_CATEGORY
          );
          categoriesData = data;
          primaryWasRemoved = primaryRemoved;

          articlesToSet = [primaryArticle, ...categoriesData];
        } else {
          articlesToSet = categoriesData;
        }

        setSiteContext({
          ...siteContextData,
          articleList: {
            ...siteContextData?.articleList,
            activeCategory: activeCategoryIndex,
            timeStamp: siteContextData?.articleList?.timeStamp || Date.now(),
            cachedArticles: {
              ...siteContextData?.articleList?.cachedArticles,
              [`cat_${activeCategoryIndex}`]: {
                articles: articlesToSet,
                total: response?.totalCount,
              },
            },
          },
        });
      } else {
        articlesToSet =
          siteContextData?.articleList?.cachedArticles[
            `cat_${activeCategoryIndex}`
          ]?.articles;

        setSiteContext({
          ...siteContextData,
          articleList: {
            ...siteContextData?.articleList,
            activeCategory: activeCategoryIndex,
          },
        });
      }

      const articlesCountToSet = { ...articleCountData };
      articlesCountToSet.visible =
        !isCategoryCached && hasPrimary && !primaryWasRemoved
          ? articlesToSet.length - 1
          : articlesToSet.length;

      articlesCountToSet.total = {
        ...articleCountData?.total,
        [`cat_${activeCategoryIndex}`]: !isCategoryCached
          ? response?.totalCount
          : siteContextData?.articleList?.cachedArticles[
              `cat_${activeCategoryIndex}`
            ]?.total,
      };

      setArticleCount(articlesCountToSet);
      setFilterData(parameters);
      setArticlesList(articlesToSet);
    } catch (error) {
      setArticlesList([]);
      throw new Error('Error: ' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const categoryDebounce = useRef(debounce(onCategoryChange, 250));

  // Remove domain from url and make path relative
  const formatUrl = (url) => {
    let newUrl = url;

    if (Array.isArray(url) && url.length > 0) {
      url = url[0];
    }

    if (url) {
      newUrl = url.replace(/.*\/\/[^\/]*/, '');
    }
    return newUrl;
  };

  useEffect(() => {
    setIsLoading(true);
    scrollToNavItem();

    const timeStamp = siteContext?.articleList?.timeStamp;
    let cachedMoreThanOneDay;

    if (timeStamp) {
      cachedMoreThanOneDay = !lessThanMinutesAgo(timeStamp, 24 * 60);
    }

    if (cachedMoreThanOneDay) {
      setSiteContext({});
    }

    // If articles aren't cached for that category, do the debounce
    // otherwise, show cached articles
    const catPropertyName = `cat_${activeCategory}`;

    if (
      articlesList != null &&
      (cachedMoreThanOneDay ||
        !siteContext?.articleList?.cachedArticles?.[catPropertyName]?.articles
          ?.length > 0)
    ) {
      categoryDebounce.current(
        activeCategory,
        articleCount,
        !cachedMoreThanOneDay ? siteContext : null
      );
    } else {
      onCategoryChange(
        activeCategory,
        articleCount,
        !cachedMoreThanOneDay ? siteContext : null
      );
    }
  }, [activeCategory]);

  useEffect(() => {
    if (isLoading) {
      // Creating array for loader skeleton
      setArticlesList(Array(8).fill({}));
    }
  }, [isLoading]);

  useEffect(() => {
    touchDirectionDetection(articleListRef.current, handleSwip);
  }, []);

  return (
    <div className="m-article-list__container container" ref={articleListRef}>
      <nav className="m-article-list__nav">
        <ul className="m-article-list__nav-list">
          <li>
            <span
              className={`m-article-list__nav-item ${
                0 === activeCategory && 'm-article-list__nav-item--active'
              }`}
              onClick={() => handleCategoryClick(0)}
            >
              {parsedCategories?.latestCategoryTitle}
            </span>
          </li>
          {categoriesArray?.map((item, index) => (
            <li>
              <span
                className={`m-article-list__nav-item ${
                  index + 1 === activeCategory &&
                  'm-article-list__nav-item--active'
                }`}
                onClick={() => handleCategoryClick(index + 1)}
              >
                {item?.tag?.tagTitle}
              </span>
            </li>
          ))}
        </ul>
      </nav>

      <div
        className={`m-article-list__content ${
          isLoading && !loadMoreLoading && 'is-loading'
        }`}
      >
        {articlesList?.length > 0 && (
          <ul className="m-article-list__content-list m-article-list__content-list--grid">
            {articlesList.slice(0, 5).map((item) => (
              <li className="m-article-list__article">
                <a
                  onClick={
                    isApp && ((e) => handleArticleClick(e, formatUrl(item.uri)))
                  }
                  className="m-article-list__article-link"
                  href={formatUrl(item.uri)}
                >
                  <div className="m-article-list__article-img">
                    <img
                      src={
                        !isLoading &&
                        (item.image ||
                          item.ogimage ||
                          parsedCategories?.defaultImage)
                      }
                    />
                  </div>
                  <div className="m-article-list__article-content">
                    <h2 className="m-article-list__article-title">
                      {item.title}
                    </h2>
                    <p className="m-article-list__article-para">
                      {item.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}
        {articlesList?.length > 5 && (
          <ul className="m-article-list__content-list">
            {articlesList.slice(5, articlesList?.length).map((item) => (
              <li className="m-article-list__article">
                <a
                  onClick={
                    isApp && ((e) => handleArticleClick(e, formatUrl(item.uri)))
                  }
                  className="m-article-list__article-link"
                  href={formatUrl(item.uri)}
                >
                  <div className="m-article-list__article-img">
                    <img
                      src={
                        !isLoading &&
                        (item.image ||
                          item.ogimage ||
                          parsedCategories?.defaultImage)
                      }
                      alt={item.title}
                    />
                  </div>
                  <div className="m-article-list__article-content">
                    <h2 className="m-article-list__article-title">
                      {item.title}
                    </h2>
                    <p className="m-article-list__article-para">
                      {item.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {loadMoreLoading && (
          <ul className="m-article-list__content-list is-loading">
            {loadMoreLoading.map((item, index) => (
              <li className="m-article-list__article">
                <a className="m-article-list__article-link" href="#">
                  <div className="m-article-list__article-img">
                    <img src={item.image} />
                  </div>
                  <div className="m-article-list__article-content">
                    <h2 className="m-article-list__article-title">
                      {item.title}
                    </h2>
                    <p className="m-article-list__article-para">
                      {item.description}
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        )}

        {articlesList?.length === 0 && (
          <p className="mt-3">{parsedCategories?.noResultsFound}</p>
        )}
      </div>
      {!isLoading &&
        !loadMoreLoading &&
        articleCount.total[`cat_${activeCategory}`] > articleCount.visible && (
          <div className="m-article-list__load-more-btn">
            <Button
              text={parsedCategories?.loadMoreButtonText}
              buttonStyle="secondary"
              onClick={handleOnLoadMore}
            />
          </div>
        )}
    </div>
  );
};

ArticleList.defaultProps = {
  categories: '',
};

ArticleList.propTypes = {
  categories: PropTypes.string,
};

export default ArticleList;
