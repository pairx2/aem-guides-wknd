/**
 * @function
 * @desc class for the account navigation component
 */

export class AccountNavigation {
  private $toggleDropdownBtn: JQuery;
  private $dropdownOptions: JQuery;

  constructor(element) {
    this.$toggleDropdownBtn = $(element).find(
      '.m-account-navigation__accordion-toggle'
    );
    this.$dropdownOptions = $(element).find(
      '.m-account-navigation__accordion-content'
    );

    this.$toggleDropdownBtn.on('click', this.toggleDropdown);
    this.setDropdownTitle();
  }

  /**
   * @function
   * @desc Toggle dropdown menu visibility
   * @param {Object} event
   */
  toggleDropdown = (e): void => {
    e.preventDefault();
    this.$toggleDropdownBtn.toggleClass('open');
  };

  /**
   * @function
   * @desc sets the title text and icon on dropdown
   */
  setDropdownTitle = (): void => {
    const $currentDropdown: JQuery = this.$dropdownOptions.find(
      '.m-account-navigation__item--active'
    );

    if (!$currentDropdown) {
      return;
    }

    const text: string = $currentDropdown
      .find('.m-account-navigation__text')
      .text();
    const iconClasses: string = $currentDropdown
      .find('.m-account-navigation__icon em')
      .attr('class');

    // Set the dropdown title text and icon:
    this.$toggleDropdownBtn
      .find('.m-account-navigation__accordion-title')
      .text(text);
    this.$toggleDropdownBtn
      .find('.m-account-navigation__accordion-icon em')
      .attr('class', iconClasses);
  };
}

(function () {
  $(document).ready(() => {
    document.querySelectorAll('.js-account-navigation').forEach((ele) => {
      new AccountNavigation(ele);
    });
  });
})();
