import { RichText } from '@wordpress/block-editor';

function TextAttribute(props) {
    const {
        attributeName, attributes, setAttributes,
        allowedFormats,
        className,
        editing,
        extraProps,
        placeholder,
        tagName,
    } = props;
    const value = attributes[attributeName];

    const commonProps = { className, tagName, value, ...extraProps, };

    return (
        editing
            ? <RichText
                {...commonProps}
                allowedFormats={allowedFormats}
                keepPlaceholderOnFocus={true}
                multiline={false}
                onChange={newValue => setAttributes({ [attributeName]: newValue })}
                placeholder={placeholder}
            />
            : <RichText.Content {...commonProps} />
    );
}

export default function Publication(props) {
    const {
        authors,
        cite,
        doi,
        image,
        pubinfo,

        attributes,
        editing,
        setAttributes
    } = props;
    const { mediaUrl, url } = attributes;


    return (
        <div className="neurosim-publication-block-container">
            <div className="neurosim-publication-block-card">
                <a href={(editing || !url) ? null : url} target="_blank" rel="noopener">
                    {mediaUrl ? <img src={mediaUrl} /> : <></>}
                    <div className="neurosim-publication-block-text">
                        <TextAttribute
                            attributeName="title"
                            className="neurosim-publication-title"
                            placeholder="Title"
                            tagName="h3"
                            {...props}
                        />
                        <TextAttribute
                            attributeName="publicationInfo"
                            className="neurosim-publication-info"
                            placeholder="Publication info"
                            tagName="h5"
                            {...props}
                        />
                        <TextAttribute
                            attributeName="authors"
                            className="neurosim-publication-authors"
                            placeholder="Authors"
                            tagName="h6"
                            {...props}
                        />
                        <TextAttribute
                            attributeName="cite"
                            className="neurosim-publication-cite"
                            placeholder="Cite"
                            tagName="p"
                            {...props}
                        />
                    </div>
                </a>
            </div>
        </div>
    )
}