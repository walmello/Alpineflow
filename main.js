document.addEventListener('alpine:init', () => {
    Alpine.directive('alert', (el, {expression}) => {
        alert(expression)
    })

    const setTemplate = (name, action = () => {}) => {
        console.log('calledDirective')
        Alpine.directive(name, (el, {expression}) => {
            let copy = document.createElement('template')
            copy.innerHTML = el.innerHTML;
            [...el.attributes].forEach(attr => {
                copy.setAttribute(attr.nodeName, attr.nodeValue)
            })
            copy.removeAttribute('x-'+name)
            action(el, expression)
            el.parentNode.replaceChild(copy, el)
        })
    }

    setTemplate('template')
    setTemplate('foreach', (el, expression) => {
        el.setAttribute('x-for', expression)
    })

    /*
    Alpine.directive('tag', (el, {expression}) => {
        let copy = setTag(el, expression)
        copy.removeAttribute('x-tag')
        el.parentNode.replaceChild(copy, el)
    })
    */

    /*

    Alpine.directive('template', (el) => {
        let copy = setTemplate(el)
        copy.removeAttribute('x-template')
        el.parentNode.replaceChild(copy, el)
    })

    Alpine.directive('foreach', (el ,{expression}) => {
        let copy = setTemplate(el)
        copy
    })
    */

    Alpine.directive('mods', (el, {expression}) => {
        let attrs = [...el.attributes]
            .filter(item => item.nodeName.split('-')[0] == 'x')
            .map(attr => attr.name)

        let newAttrs = attrs.map(attr => {
            attr = attr.split(':').join('.')
            attr = attr.replace(/\./, ':')

            return attr
        })

        newAttrs.forEach((attr, index) => {
            el.setAttribute(attr,el.getAttribute(attrs[index]))
        })

        attrs.forEach(attr => {
            el.removeAttribute(attr)
        })

        el.removeAttribute('x-mods')            
    })
})