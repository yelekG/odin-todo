import { format, parseISO, isValid } from 'date-fns';
import { tr } from 'date-fns/locale';
import { addList, setActiveList, getTasksByListId } from './data.js';
import { renderTasks } from './taskRenderer.js';

function initializeModal() {
    const modal = document.getElementById('list-modal');
    const newListBtn = document.getElementById('left-bottom-left');
    const closeBtn = document.querySelector('.close');
    const listForm = document.getElementById('list-form');
    const taskMain = document.getElementById('task-main');
    const rightTitle = document.querySelector('#right > h1');
    const titleInput = document.getElementById('title');
    
    // Başlık için maksimum karakter sınırı
    const MAX_TITLE_LENGTH = 20;
    
    // Başlık input alanına karakter sınırı ekle
    titleInput.setAttribute('maxlength', MAX_TITLE_LENGTH);
    
    // Başlık input alanına açıklama ekle
    titleInput.setAttribute('placeholder', `Maksimum ${MAX_TITLE_LENGTH} karakter`);

    newListBtn.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Form gönderildiğinde
    listForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = {
            title: titleInput.value.trim(),
            description: document.getElementById('description').value,
            dueDate: document.getElementById('dueDate').value,
            priority: document.getElementById('priority').value
        };
        
        // Başlık boşsa veya çok uzunsa kontrol et
        if (!formData.title) {
            alert('Lütfen bir başlık girin.');
            return;
        }
        
        if (formData.title.length > MAX_TITLE_LENGTH) {
            alert(`Başlık ${MAX_TITLE_LENGTH} karakterden uzun olamaz.`);
            return;
        }
        
        console.log('Yeni Liste:', formData);
        
        // Listeyi veri yapısına ekle
        const newList = addList(formData);
        
        // Task-main bölümüne yeni liste öğesi ekle
        const listItem = createListItem(newList);
        
        // Yeni liste öğesini task-main'e ekle
        taskMain.appendChild(listItem);
        
        // Yeni oluşturulan listeyi aktif liste olarak ayarla
        setActiveList(newList.id);
        
        // Sağ taraftaki başlığı güncelle - TASKS yazısını kaldır, sadece başlık göster
        rightTitle.textContent = newList.title;
        
        // Görevleri temizle (yeni liste olduğu için görev yok)
        renderTasks([]);
        
        // Formu temizle ve modal'ı kapat
        listForm.reset();
        modal.style.display = 'none';
    });
    
    // Liste öğesi oluşturmak için yardımcı fonksiyon
    function createListItem(listData) {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        listItem.dataset.listId = listData.id;
        
        // Başlık ve tarih bilgisini içeren bir yapı oluştur
        const titleElement = document.createElement('div');
        titleElement.classList.add('list-title');
        titleElement.textContent = listData.title;
        
        // Tarih formatlaması
        let dateText = '';
        if (listData.dueDate && isValid(parseISO(listData.dueDate))) {
            const parsedDate = parseISO(listData.dueDate);
            dateText = format(parsedDate, 'd MMMM yyyy', { locale: tr });
        }
        
        const dateElement = document.createElement('div');
        dateElement.classList.add('list-date');
        dateElement.textContent = dateText;
        
        // Elementleri liste öğesine ekle
        listItem.appendChild(titleElement);
        listItem.appendChild(dateElement);
        
        // Öncelik seviyesine göre renk sınıfı ekle
        if (listData.priority === 'high') {
            listItem.classList.add('high-priority');
        } else if (listData.priority === 'medium') {
            listItem.classList.add('medium-priority');
        } else {
            listItem.classList.add('low-priority');
        }
        
        // Tıklama olayı ekle
        listItem.addEventListener('click', () => {
            // Tüm liste öğelerinden active sınıfını kaldır
            document.querySelectorAll('.list-item').forEach(item => {
                item.classList.remove('active');
            });
            // Tıklanan öğeye active sınıfı ekle
            listItem.classList.add('active');
            
            // Aktif listeyi ayarla
            setActiveList(listData.id);
            
            // Sağ taraftaki başlığı güncelle - TASKS yazısını kaldır, sadece başlık göster
            rightTitle.textContent = listData.title;
            
            // Bu listeye ait görevleri göster
            const tasks = getTasksByListId(listData.id);
            renderTasks(tasks);
        });
        
        return listItem;
    }
} 

export default initializeModal;