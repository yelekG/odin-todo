import { format, parseISO, isValid } from 'date-fns';
import { tr } from 'date-fns/locale';
import { toggleTaskCompletion } from './data.js';

// Görevleri render etmek için fonksiyon
function renderTasks(tasks) {
    const rightMain = document.getElementById('right-main');
    
    // Mevcut görevleri temizle
    rightMain.innerHTML = '';
    
    // Görev yoksa bilgi mesajı göster
    if (tasks.length === 0) {
        const emptyMessage = document.createElement('div');
        emptyMessage.classList.add('empty-tasks-message');
        emptyMessage.textContent = 'Bu listede henüz görev bulunmuyor. Yeni görev ekleyin!';
        rightMain.appendChild(emptyMessage);
        return;
    }
    
    // Görevleri render et
    tasks.forEach(task => {
        const taskCard = createTaskCard(task);
        rightMain.appendChild(taskCard);
    });
}

// Görev kartı oluşturmak için yardımcı fonksiyon
function createTaskCard(task) {
    const taskCard = document.createElement('div');
    taskCard.classList.add('task-card');
    taskCard.dataset.taskId = task.id;
    
    // Eğer görev tamamlandıysa, completed sınıfını ekle
    if (task.completed) {
        taskCard.classList.add('completed');
    }
    
    // Başlık elementi
    const titleElement = document.createElement('h3');
    titleElement.classList.add('task-card-title');
    titleElement.textContent = task.title;
    
    // Notlar elementi (eğer varsa)
    let notesElement = null;
    if (task.notes && task.notes.trim() !== '') {
        notesElement = document.createElement('p');
        notesElement.classList.add('task-card-notes');
        notesElement.textContent = task.notes;
    }
    
    // Tarih ve saat elementi
    const dateTimeElement = document.createElement('div');
    dateTimeElement.classList.add('task-card-datetime');
    
    let dateTimeText = '';
    if (task.date && isValid(parseISO(task.date))) {
        const parsedDate = parseISO(task.date);
        dateTimeText = format(parsedDate, 'd MMMM yyyy', { locale: tr });
        
        if (task.time) {
            dateTimeText += ` - ${task.time}`;
        }
    }
    
    dateTimeElement.textContent = dateTimeText;
    
    // Tamamlandı checkbox'ı
    const checkboxContainer = document.createElement('div');
    checkboxContainer.classList.add('task-checkbox-container');
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('task-checkbox');
    checkbox.checked = task.completed;
    
    checkbox.addEventListener('change', () => {
        // Veri yapısında görevi güncelle
        toggleTaskCompletion(task.id);
        
        // UI'ı güncelle
        if (checkbox.checked) {
            taskCard.classList.add('completed');
        } else {
            taskCard.classList.remove('completed');
        }
    });
    
    const checkboxLabel = document.createElement('label');
    checkboxLabel.textContent = 'Tamamlandı';
    
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);
    
    // Elementleri task kartına ekle
    taskCard.appendChild(titleElement);
    if (notesElement) {
        taskCard.appendChild(notesElement);
    }
    taskCard.appendChild(dateTimeElement);
    taskCard.appendChild(checkboxContainer);
    
    return taskCard;
}

export { renderTasks, createTaskCard }; 