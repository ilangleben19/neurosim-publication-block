import { useBlockProps } from '@wordpress/block-editor';

import Publication from './Publication';
import publication from './test-publication';

export default function save(props) {
    return (
        <div {...useBlockProps.save()}>
            <Publication editing={false} {...publication} {...props} />
        </div>
    );
}