document.addEventListener('alpine:init', () => {
    Alpine.directive('alert', (el, {exp}) => {
        alert('testing')
    })
})