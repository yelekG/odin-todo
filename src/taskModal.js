import { format, parseISO, isValid } from 'date-fns';
import { tr } from 'date-fns/locale';
import { addTask, getActiveList, getTasksByListId } from './data.js';
import { renderTasks } from './taskRenderer.js';

function initializeTaskModal() {
    const taskModal = document.getElementById('task-modal');
    const newTaskBtn = document.getElementById('right-bottom-left');
    const closeBtn = document.querySelector('.task-close');
    const taskForm = document.getElementById('task-form');

    // New Task butonuna tıklandığında modalı aç
    newTaskBtn.addEventListener('click', () => {
        // Aktif liste kontrolü
        const activeList = getActiveList();
        if (!activeList) {
            alert('Lütfen önce bir liste seçin veya oluşturun!');
            return;
        }
        
        taskModal.style.display = 'block';
    });

    // Kapat butonuna tıklandığında modalı kapat
    closeBtn.addEventListener('click', () => {
        taskModal.style.display = 'none';
    });

    // Modal dışına tıklandığında modalı kapat
    window.addEventListener('click', (e) => {
        if (e.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });

    // Form gönderildiğinde
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aktif liste kontrolü
        const activeList = getActiveList();
        if (!activeList) {
            alert('Lütfen önce bir liste seçin veya oluşturun!');
            return;
        }
        
        const formData = {
            title: document.getElementById('task-title').value,
            notes: document.getElementById('task-notes').value,
            date: document.getElementById('task-date').value,
            time: document.getElementById('task-time').value
        };
        
        console.log('Yeni Task:', formData);
        
        // Görevi veri yapısına ekle
        addTask(formData, activeList.id);
        
        // Aktif listeye ait görevleri yeniden render et
        const tasks = getTasksByListId(activeList.id);
        renderTasks(tasks);
        
        // Formu temizle ve modalı kapat
        taskForm.reset();
        taskModal.style.display = 'none';
    });
}

export default initializeTaskModal;
