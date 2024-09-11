// my freestyle libre-3 multi select
const customClassName = "a-dropdown__field__custom";
const selectedValue = [];
(function () {
  const form = document.querySelectorAll('[data-js-component="formcontainer"]');
  form.forEach((ell) => {
    const formContainerElm = ell;
    const multiDropDown = formContainerElm.querySelectorAll(
      '[data-select="multi"]'
    );
    multiDropDown.forEach((multiElm, index) => {
      selectedValue.push({
        [multiElm?.getAttribute("name") ?? `${index}`]: [],
      });

      multiElm?.classList?.add("op-zero", "p-absolute");
      const element = multiElm?.closest(".multi-drop-down");

      const RDClass = ["multi-drop-down--redesign", "drop-down"];
      const selectEml = element.querySelector("select");
      const selectLabel = element.querySelector(".a-dropdown__title");
      const inputClass = ["a-input-field", "form-group"];
      element?.classList?.add(...RDClass);
      selectLabel?.classList?.add('a-input-label');
      element
        .querySelector(".multi-drop.a-dropdown")
        ?.classList?.add(...inputClass);
      selectEml?.classList?.add("a-dropdown__field");
      selectEml.setAttribute("size", "1");
      selectEml.setAttribute("tabIndex", "-1");
      selectEml
        .querySelectorAll("option")
        .forEach((opt) => opt.classList.add("op-zero"));

      const selectedOptions = Array.from(selectEml?.querySelectorAll("option"));
      const listItems = selectedOptions?.reduce((acc, optionValue) => {
        return (
          acc +
          `<li data-optionvalue="${optionValue.value}" ${
            optionValue.selected ? "Selected" : ""
          } data-selected="${optionValue.selected ? true : false}">
            <span class="a-dropdown__option-text">${
              optionValue.innerHTML
            }</span>
           </li>`
        );
      }, ``);

      const customDropdown = `<div class="${customClassName}" tabindex="0">
        <span class="a-dropdown__placeholder" role="button" aria-labelledby="field_label_${
          selectEml.name
        } dropdown_label_${selectEml.name}" id="dropdown_label_${
        selectEml.name
      }" aria-haspopup="listbox">${"Select"}</span>
        <ul class="a-dropdown__menu"  name="${
          selectEml.name
        }"> ${listItems} </ul> </div>`;

      const appendUl = selectEml?.closest(".a-dropdown__container");
      appendUl.innerHTML += customDropdown;
      if (multiDropDown.length == index + 1) {
        setTimeout(() => addEventCustom(), 600);
      }
    });
  });
})();

const addEventCustom = () => {
  document.querySelectorAll(`.${customClassName}`).forEach((elm) => {
    elm.addEventListener("click", toggleEvent);
    const liList = elm.querySelectorAll(`.a-dropdown__menu > li`);
    liList.forEach((li) => li.addEventListener("click", toggleData));
  });

  document.addEventListener("click", function (event) {
    const dropdowns = document.querySelectorAll(`.multi-drop`);
    dropdowns.forEach(function (dropdown) {
      const content = dropdown.querySelector(`.${customClassName}`);
      const atomEml =  content.closest(".a-dropdown");
      const dataRequired =
      atomEml.hasAttribute('data-required') && atomEml?.getAttribute("data-required") == "true"
          ? true
          : false;
          toggleActiveClass(dropdown,event,dataRequired,content,atomEml);
    });
  });
};
function toggleActiveClass(dropdown,event,dataRequired,content,atomEml) {
  if (!dropdown.contains(event.target)) {
    // close
    if (dataRequired) {
      const liList =
        content.querySelectorAll(`.a-dropdown__menu > li.selected`)
          ?.length == 0
          ? true
          : false;
      if (liList) {
        atomEml.classList.add("validation-require");
      } else if (
        content
          .closest(".a-dropdown")
          .classList.contains("validation-require") && !liList
      ) {
        atomEml.classList.remove("validation-require");
      }
    }
    content.classList.remove("active");
  }
}
function toggleEvent(evn) {
  const elmTarget = evn.target;
  const ariaTarget = evn.target.querySelector(".a-dropdown__menu");
  const target = elmTarget.closest(`.${customClassName}`);
  const hasClass = !target?.classList?.contains("active");
  if (hasClass) {
    target?.classList.add("active");
    ariaTarget?.setAttribute("aria-expanded", "true");
  } else {
    target.classList.remove("active");
    ariaTarget?.setAttribute("aria-expanded", "false");
  }
}
function toggleData(e) {
  e.preventDefault();
  e.stopImmediatePropagation();

  const options = $(this);
  this.val = options.text();
  this.index = options.index();
  const optionAttVale = options?.attr("data-optionvalue");

  const filterVal = options.filter(':contains("' + this.val + '")');
  !filterVal.hasClass("selected")
    ? filterVal.addClass("selected selectedColor")
    : filterVal.removeClass("selected selectedColor");
  // Trigger the change event when a dropdown value is selected
  const nearCustom = options.closest(`.${customClassName}`);
  const topContainer = $(this).closest(".a-dropdown__container");
  const optionEml = topContainer.find(
    `[data-select="multi"] > option[value="${optionAttVale}"]`
  );
  const selectNear = topContainer
    .children('[data-select="multi"]')
    .attr("name");
  const placeholder = nearCustom?.children("span");
  addIfNotExist(selectedValue, optionAttVale, selectNear);
  optionEml.prop("selected", !optionEml.is(":selected") ? true : false);

  const selectedCount = selectedValue.find((item) => item[selectNear])[selectNear] ?? [];
  placeholder.html(
    `${
        selectedCount.length == 0
        ? "Select"
        : selectedCount.map(item => item.innerText).toString()
    } `
  );
  updateEvent(e);
  selectedCount?.length == 0  ?  $(placeholder)?.removeClass('value_selected') :  $(placeholder)?.addClass('value_selected');
}

const uniqueValues = (array) => [...new Set(array)];
const addIfNotExist = (array, val, name) => {
  const getIndex = array.find((item) => item[name])[name] ?? [];
  const indexVal = getIndex.length > 0 ? getIndex.findIndex(item => item.value === val) : -1;
  if (indexVal !== -1) {
    getIndex.splice(indexVal, 1);
  } else {
    const text = document.querySelector(`ul[name="${name}"]`).querySelector(`[data-optionvalue="${val}"]`)?.innerText?.trim();
    getIndex.push({value: val, innerText : text });
  }
  return array;

};


const updateEvent = (e) => {
  const evt = new Event("change", { bubbles: true, cancelable: false });
  e.target.closest(".a-dropdown").dispatchEvent(evt);
  
};


const toggleFormDropdown = (e) => {
  e.preventDefault();
  e.stopImmediatePropagation();
  if ($(e).length) {
    if ($(`.${customClassName}.active`).hasClass("active")) {
      $(`.${customClassName}.active`)
        .find(".a-dropdown__menu")
        .attr("aria-expanded", "true");
    } else {
      $(`.${customClassName}.active`)
        .find(".a-dropdown__menu")
        .attr("aria-expanded", "false");
    }
    $(`.${customClassName}`).toggleClass("active");
  }
};
