import { goTo } from "../router/index";

import css from "./styles/main.css?raw";

class NavLinkComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const link = document.createElement("a");
        link.setAttribute("class", "link");
        const style = document.createElement("style");
        style.textContent = css;
        this.selected = false;
        shadow.appendChild(link);
        shadow.appendChild(style);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const href = this.getAttribute("href");
        const text = this.getAttribute("text");
        const link = shadow.querySelector("a");
        link.href = href;
        link.textContent = text;
        link.addEventListener("click", this.onClick);
    }

    onClick(e) {
        e.preventDefault();
        if (!this.selected) {
            const { pathname: path } = new URL(e.currentTarget.href);
            goTo(path);
        };
    }

    static get observedAttributes() {
        return ["selected"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === "selected") {
            this.updateStyle(JSON.parse(newValue));
        }
    }

    updateStyle(selected) {
        if (selected) {
            const shadow = this.shadowRoot;
            const link = shadow.querySelector("a");
            link.classList.add("active");
        };
    }
}

customElements.define("nav-link", NavLinkComponent);