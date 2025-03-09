function updateIcons(icon) {
    document.addEventListener('DOMContentLoaded', () => {
        Object.keys(icon).forEach(key => {
            document.querySelectorAll(`img[src*="${key}"]`).forEach(img => {
                img.src = icon[key];
            });
        });
    });
}

export default updateIcons;
