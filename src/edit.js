import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import { Button, PanelBody, ResponsiveWrapper, Spinner, TextControl } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

import Publication from './Publication';
import publication from './test-publication';

import './editor.scss';

const Editor = withSelect((select, props) => {
    const { getMedia } = select('core');
    const { mediaId } = props.attributes;
    return { media: mediaId ? getMedia(mediaId) : null };
})(props => {
    const { attributes, setAttributes, media } = props;
    const { mediaId } = attributes;

    const allowedMediaTypes = ['image'];

    const onSelectImage = newMedia => setAttributes({ mediaId: newMedia.id, mediaUrl: newMedia.url, });

    return (
        <InspectorControls>
            <PanelBody
                title={__('Publication information', 'neurosim-publication-block')}
                initialOpen={true}
            >
                <TextControl
                    label="Article URL"
                    onChange={newUrl => setAttributes({ url: newUrl })}
                    value={attributes.url}
                />
            </PanelBody>
            <PanelBody
                title={__('Select publication media', 'neurosim-publication-block')}
                initialOpen={true}
            >
                <div className="neurosim-publication-image-selector">
                    <MediaUploadCheck fallback={(
                        <p>
                            {__('To edit the publication media, you need permission to upload media.', 'neurosim-publication-block')}
                        </p>
                    )}>
                        <MediaUpload
                            allowedType={allowedMediaTypes}
                            onSelect={onSelectImage}
                            render={({ open }) => (
                                <Button
                                    className={
                                        !mediaId
                                            ? 'editor-post-featured-image__toggle'
                                            : 'editor-post-featured-image__preview'
                                    }
                                    onClick={open}
                                >
                                    {!mediaId && __('Select publication media', 'neurosim-publication-block')}
                                    {(!!mediaId && !media) ? <Spinner /> : <></>}
                                    {(!!mediaId && media) ? (
                                        <ResponsiveWrapper
                                            naturalHeight={media.media_details.height}
                                            naturalWidth={media.media_details.width}
                                        >
                                            <img
                                                src={media.source_url}
                                                alt={__('Publication media', 'neurosim-publication-block')}
                                            />
                                        </ResponsiveWrapper>
                                    ) : <></>}
                                </Button>
                            )}
                            title={__('Publication media', 'neurosim-publication-block')}
                            value={mediaId}
                        />
                    </MediaUploadCheck>
                    {(!!mediaId && media) ? (
                        <MediaUploadCheck>
                            <MediaUpload
                                allowedTypes={allowedMediaTypes}
                                onSelect={onSelectImage}
                                render={({ open }) => (
                                    <Button onClick={open}>
                                        {__('Replace publication media', 'neurosim-publication-block')}
                                    </Button>
                                )}
                                title={__('Publication media', 'neurosim-publication-block')}
                                value={mediaId}
                            />
                        </MediaUploadCheck>
                    ) : <></>}
                    {!!mediaId ? (
                        <MediaUploadCheck>
                            <Button
                                isDestructive
                                isLink
                                onClick={() => setAttributes({ mediaId: undefined })}
                            >
                                {__('Remove publication media', 'neurosim-publication-block')}
                            </Button>
                        </MediaUploadCheck>
                    ) : <></>}
                </div>
            </PanelBody>
        </InspectorControls>
    )
});

export default function Edit(props) {
    return (
        <Fragment>
            <Editor {...props} />

            <div {...useBlockProps()}>
                <Publication editing={true} {...publication} {...props} />
            </div>
        </Fragment>
    );
}