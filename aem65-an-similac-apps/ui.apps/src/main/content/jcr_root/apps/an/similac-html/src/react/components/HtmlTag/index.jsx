import * as React from "react";

const HtmlTag = (props) => {
  const { tagName: TagName = "p", className, id } = props;
  return (
    <TagName className={className}>
      {isPWA() ?
        <span id={id} dangerouslySetInnerHTML={{ __html: props.label }}></span> :
        <span dangerouslySetInnerHTML={{ __html: props.label }}></span>
      }
      {" "}{props.help}
    </TagName>
  );
};

export default React.memo(HtmlTag);
