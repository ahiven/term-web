import { errorHandle } from './utils';

export default class Template {
    constructor(term) {
        this.term = term;

        this.$container = term.options.container;
        errorHandle(
            term.constructor.instances.every(ins => ins.options.container !== this.$container),
            'Cannot mount multiple instances on the same dom element, please destroy the previous instance first.',
        );

        this.$canvas = document.createElement('canvas');
        this.$canvas.classList.add('term-canvas');
        this.$container.appendChild(this.$canvas);

        if (!document.getElementById('term-ui-style')) {
            this.$style = document.createElement('style');
            this.$style.id = 'term-ui-style';
            this.$style.textContent = '.term-canvas:hover{cursor: text}';
            document.head.appendChild(this.$style);
        }

        this.update();
    }

    update() {
        const { width, height, pixelRatio, borderRadius, boxShadow } = this.term.options;
        this.$canvas.style.width = `${width}px`;
        this.$canvas.style.height = `${height}px`;
        this.$canvas.width = width * pixelRatio;
        this.$canvas.height = height * pixelRatio;
        this.$canvas.style.borderRadius = `${borderRadius}px`;
        this.$canvas.style.boxShadow = boxShadow;
    }

    destroy() {
        if (this.$style) {
            document.head.removeChild(this.$style);
        }
        this.$container.innerHTML = '';
    }
}
