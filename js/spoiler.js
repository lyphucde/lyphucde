document.addEventListener('DOMContentLoaded', () => {
document.body.addEventListener('click', function(event) {
if (event.target.classList.contains('spoiler-text')) {
const spoiler = event.target;
const realContent = spoiler.getAttribute('data-content');
spoiler.textContent = realContent; 
spoiler.classList.add('revealed');
}
});
});