(function() {
  'use strict';

  class ContentSection {
    private container: HTMLElement;
    private hash: string;
    private selectedTabs: NodeListOf<Element>;

    constructor(ele: HTMLElement) {
      this.container = ele;
      this.initContentSection();
    }

    selectHeadingTab() {
      this.hash = window.location.hash;
      
      if(this.hash !== '') {
        this.selectedTabs = document.querySelectorAll(`a[data-element-id="${this.hash}"]`);
        this.selectedTabs.forEach(tab => tab.dispatchEvent(
          new CustomEvent('click', {
          bubbles: true,
          cancelable: true
        })));
      }
    }

    initContentSection() {
      this.selectHeadingTab();
    }
   }

   $(function () {
     const contentSection = document.querySelectorAll('[data-js-component="content-section"]');
     contentSection.forEach(function (ele) {
         new ContentSection(ele as HTMLElement);
     });
   });
})();
