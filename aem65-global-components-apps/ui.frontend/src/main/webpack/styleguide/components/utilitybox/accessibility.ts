import config from './accessbility-rules';

let a11yValidator: any;

a11yValidator = () => {
  let accessibilityHTML: any ='';

  let fragment = document.createDocumentFragment();
  let para = document.createElement('p');
  para.className = 'alert alert-success';
  let icon = document.createElement('i');
  icon.className = 'mdi mdi-information';
  icon.setAttribute('aria-hidden', 'true');
  para.appendChild(icon);
  para.textContent = 'Congratulations! No Error Found.';
  fragment.appendChild(para);

  if (config.hasDocumentType() !== undefined) {
    accessibilityHTML += config.hasDocumentType();
  }
  if (config.hasDocumentTitle() !== undefined) {
    accessibilityHTML += config.hasDocumentTitle();
  }
  if (config.hasDocumentMetaCharset() !== undefined) {
    accessibilityHTML += config.hasDocumentMetaCharset();
  }
  if (config.hasDocumentLanguage() !== undefined) {
    accessibilityHTML += config.hasDocumentLanguage();
  }
  if(config.hasHeadingOnce() !== undefined) {
    accessibilityHTML += config.hasHeadingOnce();
  }
  if(config.hasEmptyElement() !== undefined) {
    accessibilityHTML += config.hasEmptyElement();
  }
  if(config.hasImagesAlt() !== undefined) {
    accessibilityHTML += config.hasImagesAlt();
  }
  if(config.hasEmptyAttr() !== undefined) {
    accessibilityHTML += config.hasEmptyAttr();
  }
  if(config.hasLinksText() !== undefined) {
    accessibilityHTML += config.hasLinksText();
  }
  if(config.hasLinksHref() !== undefined) {
    accessibilityHTML += config.hasLinksHref();
  }
  if(config.hasLinksRole() !== undefined) {
    accessibilityHTML += config.hasLinksRole();
  }
  if(config.hasLinksAriaLabel() !== undefined) {
    accessibilityHTML += config.hasLinksAriaLabel();
  }
  if(config.hasIframeTitle() !== undefined) {
    accessibilityHTML += config.hasIframeTitle();
  }
  if(config.hasDuplicateIds() !== undefined) {
    accessibilityHTML += config.hasDuplicateIds();
  }
  if (config.hasForLabel() !== undefined) {
    accessibilityHTML += config.hasForLabel();
  }
  if (config.hasSVGRole() !== undefined) {
    accessibilityHTML += config.hasSVGRole();
  }
  if (config.hasTabRole() !== undefined) {
    accessibilityHTML += config.hasTabRole();
  }
  if (config.hasButtonsText() !== undefined) {
    accessibilityHTML += config.hasButtonsText();
  }
  if (config.hasInlineElementSpan() !== undefined) {
    accessibilityHTML += config.hasInlineElementSpan();
  }
  if (config.hasModalRole() !== undefined) {
    accessibilityHTML += config.hasModalRole();
  }
  if (config.hasAlertRole() !== undefined) {
    accessibilityHTML += config.hasAlertRole();
  }
  if(accessibilityHTML !== undefined && accessibilityHTML !== '') {
    $('#stg-util-b-accessibility').html(accessibilityHTML);
  } else {
    $('#stg-util-b-accessibility').html(fragment);
  }
};

export { a11yValidator };
