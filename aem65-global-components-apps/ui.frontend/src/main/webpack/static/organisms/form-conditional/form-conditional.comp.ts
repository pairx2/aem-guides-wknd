(function () {
  'use strict';

  const conditionalVarAttribute = 'data-conditional-variable';
  const caseVarAttribute = 'data-conditional-case';

  class FormConditional {
    private container: HTMLElement;
    private conditionalId: string;
    private targets: Array<{ value: any, element: Element }>;
    private jsVar: string = '';

    constructor(ele: HTMLElement) {
      this.container = ele;
      this.conditionalId = ele.id;
      this.targets = [];

      /**
       * If this.container has data-edit-mode="true", just return without initializing
       * This prevents authored content from being hidden in edit mode
       */
      if (this.container.getAttribute('data-edit-mode') === 'true') {
        return;
      }

      if (ele.getAttribute(conditionalVarAttribute)) {
        this.initJSVarConditional();
        this.jsVar = ele.getAttribute(conditionalVarAttribute);
      } else {
        this.initCheckboxFormConditional();
      }
    }

    initCheckboxFormConditional() {
      const target = this.container.querySelector(':scope > .a-checkbox ~ .conditional__case');
      this.targets = [{
        value: false,
        element: target
      }]

      const trigger = this.container.querySelector(':scope > .a-checkbox > .a-checkbox__label > .a-checkbox__input');
      trigger.addEventListener('change', this.handleCheckboxChange);

    }

    handleCheckboxChange = (e) => {
      const { checked } = e.target;
      const target = this.targets[0];

      if (checked === false) {
        $(target.element).show();
      } else {
        $(target.element).hide();
      }
    }

    initJSVarConditional() {
      const targets = this.container.querySelectorAll(':scope > div > .conditional__case');

      window.addEventListener('conditional-component-change', this.handleJSVarEvent);

      targets.forEach((target: Element, i) => {
        const caseVariable = target.getAttribute(caseVarAttribute);
        const normalizedVariable = caseVariable === 'true' ? true : caseVariable === 'false' ? false : caseVariable;
        this.targets.push({
          value: normalizedVariable,
          element: target
        });

        if (normalizedVariable === false) {

          const initEvent = new CustomEvent('conditional-component-change', {
            detail: {
              value: false, // The value the event is setting the variable to
              var: this.jsVar // The variable the event is setting
            }
          });
          window.dispatchEvent(initEvent);

        }

        // If this target has a child #show[someConditional], set event listeners to dispatch change event
        target.querySelectorAll('.btn[id^="show"]').forEach(el => {
          el.addEventListener('click', () => {
            const changeEvent = new CustomEvent('conditional-component-change', {
              detail: {
                value: true,
                var: el.id
              }
            });

            window.dispatchEvent(changeEvent);
          });
        });


      });


      /**
       *
       * This component will listen for this event, it is expecting this signature:
       *
       *  new CustomEvent('conditional-component-change', {
       *    detail: {
       *      value: true, // The value the event is setting the variable to
       *      var: 'someVar' // The variable the event is setting
       *    }
       * });
       *
       * Each instance of the Form Conditional component will scope handling of this event to the
       * variable defined in it's configuration.
       *
       */

    }

    handleJSVarEvent = (e) => {

      if (this.jsVar === e.detail.var) {
        this.targets.forEach((target, i) => {

          if (target.value === e.detail.value) {
            $(target.element).show();
          } else {
            $(target.element).hide();
          }

        });
      }

    }

  }


  $(function () {
    const conditionalEles = document.querySelectorAll('.conditional > .conditional-container');
    conditionalEles.forEach(function (ele) {
      new FormConditional(ele as HTMLElement);
    });
  });
})();
