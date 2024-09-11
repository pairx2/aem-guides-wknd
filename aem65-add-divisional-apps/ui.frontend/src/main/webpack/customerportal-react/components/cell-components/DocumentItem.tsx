export const DocumentItem = (props) => {
    
    const { fileName} = props.value;
    const {linkLabel} = props;

    return (
        <>
        <div className="link button a-link a-link--icon">
            <div className="a-link">
                <a href={"#"} className="a-link__text">
                    <span className="a-link__inner-text" >
                        {linkLabel ?? fileName}
                    </span>
                </a>
            </div>
        </div>
        </>
       );

}