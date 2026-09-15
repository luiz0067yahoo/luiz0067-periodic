/**
 * @fileoverview Periodic Form Builder
 * @module Periodic.FormBuilder
 * Renders and validates declarative form schemas dynamically.
 */

class PeriodicFormBuilder {
    constructor(container, schema = {}) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.schema = schema;
        if (this.container && this.schema.fields) {
            this.render();
        }
    }

    render() {
        const form = document.createElement('form');
        form.className = 'periodic-form-builder';
        form.noValidate = true;

        if (this.schema.title) {
            const h = document.createElement('h3');
            h.className = 'periodic-form-builder__title';
            h.textContent = this.schema.title;
            form.appendChild(h);
        }

        this.schema.fields.forEach(field => {
            const group = document.createElement('div');
            group.className = 'periodic-form-builder__group';

            const label = document.createElement('label');
            label.className = 'periodic-form-builder__label';
            label.textContent = field.label + (field.required ? ' *' : '');
            group.appendChild(label);

            let input;
            if (field.type === 'textarea') {
                input = document.createElement('textarea');
                input.rows = 4;
            } else {
                input = document.createElement('input');
                input.type = field.type || 'text';
            }
            input.name = field.name;
            input.className = 'periodic-form-builder__input';
            input.placeholder = field.placeholder || '';
            if (field.required) input.required = true;
            group.appendChild(input);

            form.appendChild(group);
        });

        const btn = document.createElement('button');
        btn.type = 'submit';
        btn.className = 'periodic-form-builder__submit';
        btn.textContent = this.schema.submitText || 'Submit';
        form.appendChild(btn);

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = new FormData(form);
            const obj = Object.fromEntries(data.entries());
            if (this.schema.onSubmit) this.schema.onSubmit(obj);
            alert('Form submitted successfully!');
        });

        this.container.innerHTML = '';
        this.container.appendChild(form);
    }
}

window.PeriodicFormBuilder = PeriodicFormBuilder;
