import html from '../../shared/html';
import viewItem from './view-item';

export default function(items) {
    return items.map(item => viewItem(item)).join('\n');
}