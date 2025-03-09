import './style.css';
import updateIcons from './updateIcons.js';
import plusIcon from './images/plus.png';
import trashIcon from './images/trash.png';
import initializeModal from './listModal.js';
import initializeTaskModal from './taskModal.js';

const icons = {
    "plus.png": plusIcon,
    "trash.png": trashIcon,
}

updateIcons(icons);


document.addEventListener('DOMContentLoaded', () => {
    initializeModal();
    initializeTaskModal();
});
