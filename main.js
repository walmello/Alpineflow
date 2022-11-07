document.addEventListener('alpine:init', () => {
    Alpine.directive('alert', (el, {expression}) => {
        alert(expression)
    })

    const setTag = (el, tag) => {
        let copy = document.createElement(tag)
        copy.innerHTML = el.innerHTML;
        [...el.attributes].forEach(attr => {
            copy.setAttribute(attr.nodeName, attr.nodeValue)
        })
        return copy
    }

    Alpine.directive('tag', (el, {expression}) => {
        let copy = setTag(el, expression)
        copy.removeAttribute('x-tag')
        el.parentNode.replaceChild(copy, el)
    })

    Alpine.directive('template', (el, {expression}) => {
        let copy = document.createElement(expression)
        copy.innerHTML = el.innerHTML;
        [...el.attributes].forEach(attr => {
            copy.setAttribute(attr.nodeName, attr.nodeValue)
        })
        copy.removeAttribute('x-template')
        el.parentNode.replaceChild(copy, el)
    })

    Alpine.directive('mod', (el, {expression}) => {
        let attrs = [...el.attributes]
            .filter(item => item.nodeName.split('-')[0] == 'x')
            .map(attr => attr.name)
            /*
            .map(attr => {
                attr = attr.split(':').join('.')
                attr = attr.replace(/\./, ':')

                return attr
            })
            */

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

        el.removeAttribute('x-mod')            
        console.log(attrs)
    })
})