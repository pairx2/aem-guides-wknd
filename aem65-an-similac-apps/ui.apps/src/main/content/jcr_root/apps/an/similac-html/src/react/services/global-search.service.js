function siteSearch(data) {
  let query = {
    q: data.searchTerm,
    sort: [
      {
        title: data.sortType,
      },
    ],
    firstresult: data.currentPage,
    numberofresults: data.pageSize,
    autocorrect: "true",
    searchtype: "sitesearch",
  };
  let filterParams =   {
    divisionname: "an",
    site: "similac",
    contentcategory: data.category,
  };
  if(data.language){
    filterParams['countrylanguage'] = data.language;
  }
  query.filters = [
    filterParams
  ];
  return query;
}
let globalSearchService = {
  siteSearch,
};

export default globalSearchService;
