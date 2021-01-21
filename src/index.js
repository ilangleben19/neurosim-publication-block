import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import './style.scss';

import Edit from './edit';
import save from './save';

registerBlockType('neurosim/neurosim-publication-block', {
    apiVersion: 2,
    attributes: {
        authors: {
            type: 'string',
            source: 'html',
            selector: 'h6.neurosim-publication-authors',
        },
        cite: {
            type: 'string',
            source: 'html',
            selector: 'p.neurosim-publication-cite',
        },
        mediaId: {
            type: 'number',
            default: 0,
        },
        mediaUrl: {
            type: 'string',
            default: '',
        },
        publicationInfo: {
            type: 'string',
            source: 'html',
            selector: 'h5.neurosim-publication-info',
        },
        title: {
            type: 'string',
            source: 'html',
            selector: 'h3.neurosim-publication-title',
        },
        url: {
            type: 'string',
            default: '',
        },
    },
    title: __('Neurosim Publication Block', 'neurosim-publication-block'),
    description: __(
        'Custom publication block designed for the McGill NeuroSim group.',
        'neurosim-publication-block'
    ),
    category: 'widgets',
    icon: 'smiley',
    supports: {
        html: false,
    },
    edit: Edit,
    save,
});
