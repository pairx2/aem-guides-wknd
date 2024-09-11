export class Pagination {
  container: HTMLElement;
  pageCount: number;
  currentPage: number;
  subscribers: Array<any> = [];
  /**
   *
   */
  constructor(ele: HTMLElement) {
    this.container = ele;
    this.attachEvents();
    if (this.container.dataset.autoLoadQueryParam === 'true') {
      this.currentPage = this.getPageQueryParam();
    }

  }

  private attachEvents() {
    var clickHandler = ('ontouchstart' in document.documentElement ? "touchstart" : "click");
    this.container.addEventListener( clickHandler, function (evt: MouseEvent) {
      evt.preventDefault();
      let target = evt.target as HTMLElement;
      if (!evt.target || evt.target === evt.currentTarget || target.tagName === 'UL') {
        return;
      }
      if (target.tagName !== 'A') {
        target = target.closest('a');
      }
      this.render(this.pageCount, +target.dataset.page || 1);
      this.publish(this.currentPage);

    }.bind(this));
  }

  private getPageQueryParam() {
    const url = new URL(window.location.href);
    const p = +url.searchParams.get('p');
    return p ? p : 1;
  }

  private publish(data: any) {
    this.subscribers.forEach((callback) => {
      callback(data);
    });
  }

  public onPageClick(handler: Function) {
    this.subscribers.push(handler);
  }

  public getCurrentPage() {
    return +this.currentPage;
  }

  public render(pages: number, page: any = 1) {
    if (page > pages) {
      page = pages;
    } else if (page < 0) {
      page = 1;
    }

    const str = ['<ul class="a-pagination__pages">'];
    this.pageCount = pages;
    let pageCutLow = page - 1;
    let pageCutHigh = page + 1;
    this.currentPage = page;

    if (pages === 1) {
      this.container.classList.add('a-pagination--hide');
    } else {
      this.container.classList.remove('a-pagination--hide');
    }

    // Previous arrow
    if (page > 1) {
      str.push('<li class="a-pagination__page a-pagination--previous">');
      str.push('<a class="a-pagination__link" data-page="' + (page - 1) + '" href="#">');
      str.push('<em class="abt-icon abt-icon-left-arrow u-ltr"></em>');
      str.push('<em class="abt-icon abt-icon-right-arrow u-rtl"></em>');
      str.push('</a></li>');
    } else {
      str.push('<li class="a-pagination__page a-pagination--previous">');
      str.push('<a class="a-pagination__link no-click" data-page="1" href="#">');
      str.push('<em class="abt-icon abt-icon-left-arrow u-ltr"></em>');
      str.push('<em class="abt-icon abt-icon-right-arrow u-rtl"></em>');
      str.push('</a></li>');
    }

    // Show all the pagination elements if there are less than 6 pages total
    if (pages < 5) {
      for (let p = 1; p <= pages; p++) {
        const activeClass = (page === p) ? ' a-pagination--active' : '';
        str.push('<li class="a-pagination__page' + activeClass + '">');
        str.push('<a class="a-pagination__link" data-page="' + p + '" href="#">' + p + '</a>');
        str.push('</li>');
      }
    }
    // Use "..." to collapse pages outside of a certain range
    else {

      // Show the last four pages preceded by a "..." at the beginning of the
      // pagination section (after the Previous button)
      if (page >= pages - 2) {
        str.push('<li class="a-pagination__page">');
        str.push('<a class="a-pagination__link" data-page="1" href="#">1</a>');
        str.push('</li>');
        str.push('<li class="a-pagination__page a-pagination--out-of-range">');
        str.push('<a class="a-pagination__link" data-page="' + (page - 2) + '" href="#">...</a>');
        str.push('</li>');
      }
      // Determine how many pages to show after the current page index
      if (page === 1) {
        pageCutHigh += 2;
      } else if (page === 2) {
        pageCutHigh += 1;
      } else if (page >= 3 && page < pages - 3) {
        pageCutHigh += 1;
      }
      // Determine how many pages to show before the current page index
      if (page === pages) {
        pageCutLow -= 2;
      } else if (page === pages - 1) {
        pageCutLow -= 1;
      }
      // Output the indexes for pages that fall inside the range of pageCutLow
      // and pageCutHigh
      for (let p = pageCutLow; p <= pageCutHigh; p++) {
        if (p === 0) {
          p += 1;
        }
        if (p > pages) {
          continue;
        }
        const activeClass = (page === p) ? ' a-pagination--active' : '';
        str.push('<li class="a-pagination__page' + activeClass + '">');
        str.push('<a class="a-pagination__link" data-page="' + p + '" href="#">' + p + '</a>');
        str.push('</li>');
      }
      // Show the very last page preceded by a "..." at the end of the pagination
      // section (before the Next button)
      if (page < pages - 1) {
        if (page < pages - 2) {
          str.push('<li class="a-pagination__page a-pagination--out-of-range">');
          str.push('<a class="a-pagination__link" data-page="' + (page + 2) + '" href="#">...</a>');
          str.push('</li>');
        }
        str.push('<li class="a-pagination__page">');
        str.push('<a class="a-pagination__link" data-page="' + (pages) + '" href="#">' + pages + '</a>');
        str.push('</li>');
      }
    }
    // Next arrow
    if (page < pages) {
      str.push('<li class="a-pagination__page a-pagination--next">');
      str.push('<a class="a-pagination__link" data-page="' + (page + 1) + '" href="#">');
      str.push('<em class="abt-icon abt-icon-right-arrow u-ltr"></em>');
      str.push('<em class="abt-icon abt-icon-left-arrow u-rtl"></em>');
      str.push('</a></li>');
    } else {
      str.push('<li class="a-pagination__page a-pagination--next">');
      str.push('<a class="a-pagination__link no-click" data-page="' + (pages) + '" href="#">');
      str.push('<em class="abt-icon abt-icon-right-arrow u-ltr"></em>');
      str.push('<em class="abt-icon abt-icon-left-arrow u-rtl"></em>');
      str.push('</a></li>');
    }

    str.push('</ul>');
    this.container.innerHTML = str.join('');
  }

}
