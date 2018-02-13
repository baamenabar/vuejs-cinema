const tooltipOverHandler = function(eve) {
    const tt = eve.target.parentNode.getElementsByTagName('span')[0];
    tt.classList.add('tooltip-show');
}

const tooltipOutHandler = function(eve) {
    const tt = eve.target.parentNode.getElementsByTagName('span')[0];
    tt.classList.remove('tooltip-show');
}

export default {
    install(Vue) {
        Vue.directive('tooltip', {
            bind(el, bindings) {
                const span = document.createElement('span');
                const text = document.createTextNode('Asientos disponibles: ' + bindings.value.seats);
                span.classList.add('tooltip');
                span.appendChild(text);
                el.appendChild(span);
                const div = el.querySelector('.session-time');
                div.addEventListener('mouseover', tooltipOverHandler);
                div.addEventListener('mouseout', tooltipOutHandler);
            },
            unbind(el) {
                div.removeEventListener('mouseover', tooltipOverHandler);
                div.removeEventListener('mouseout', tooltipOutHandler);
            }
        });
    }
}