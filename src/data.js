// Uygulama verilerini saklayacak nesne
const appData = {
    lists: [],
    tasks: [],
    activeListId: null
};

// Benzersiz ID oluşturmak için yardımcı fonksiyon
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Yeni liste eklemek için fonksiyon
function addList(listData) {
    const newList = {
        id: generateId(),
        title: listData.title,
        description: listData.description,
        dueDate: listData.dueDate,
        priority: listData.priority,
        createdAt: new Date()
    };
    
    appData.lists.push(newList);
    return newList;
}

// Yeni görev eklemek için fonksiyon
function addTask(taskData, listId) {
    const newTask = {
        id: generateId(),
        listId: listId,
        title: taskData.title,
        notes: taskData.notes,
        date: taskData.date,
        time: taskData.time,
        completed: false,
        createdAt: new Date()
    };
    
    appData.tasks.push(newTask);
    return newTask;
}

// Aktif listeyi ayarlamak için fonksiyon
function setActiveList(listId) {
    appData.activeListId = listId;
}

// Belirli bir listeye ait görevleri getirmek için fonksiyon
function getTasksByListId(listId) {
    return appData.tasks.filter(task => task.listId === listId);
}

// Görevi tamamlandı olarak işaretlemek için fonksiyon
function toggleTaskCompletion(taskId) {
    const task = appData.tasks.find(task => task.id === taskId);
    if (task) {
        task.completed = !task.completed;
        return task;
    }
    return null;
}

// Tüm listeleri getirmek için fonksiyon
function getAllLists() {
    return appData.lists;
}

// Aktif listeyi getirmek için fonksiyon
function getActiveList() {
    if (!appData.activeListId) return null;
    return appData.lists.find(list => list.id === appData.activeListId);
}

export {
    addList,
    addTask,
    setActiveList,
    getTasksByListId,
    toggleTaskCompletion,
    getAllLists,
    getActiveList
}; 