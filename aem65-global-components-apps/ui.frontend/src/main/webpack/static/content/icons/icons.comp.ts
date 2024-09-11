(function () {
  $(async function () {
    const icons = document.querySelector('[data-js-component="icons"]');
    if (!icons) {
      return;
    }

    const iconsHTML = [];
    const response = await fetch('../../../public/resources/icons/selection.json');

    if (response.ok) {
      const iconsObj = await response.json();
      iconsObj.icons.map((icon:any)=>{
        iconsHTML.push(`
        <div class="display-icon-wrap">
          <div class="display-icon-column">
            <span class="abt-icon-${icon.properties.name}"></span>
            <span class="mls">abt-icon-${icon.properties.name}</span>
          </div>
        </div>
      `)
      });
      icons.innerHTML = iconsHTML.join('');
    } else {
      icons.innerHTML = 'Unable to load the icons';
    }

  });
}())
