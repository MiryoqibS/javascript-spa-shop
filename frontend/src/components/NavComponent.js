import { Constants } from "../common/constants";

import css from "./styles/main.css?raw";

class NavComponent extends HTMLElement {
    constructor() {
        super();
        this.links = [
            { href: Constants.routes.index, name: "Главная", class: "home-link" },
            { href: Constants.routes.men, name: "Мужские", class: "men-link" },
            { href: Constants.routes.women, name: "Женские", class: "women-link" },
            { href: Constants.routes.sport, name: "Спортивные", class: "sport-link" },
            { href: Constants.routes.fashion, name: "Модные", class: "fashion-link" },
        ];

        const shadow = this.attachShadow({ mode: "open" });
        const navbar = document.createElement("nav");
        navbar.setAttribute("class", "navbar");
        const logo = document.createElement("main-logo")
        const links = document.createElement("div");
        links.setAttribute("class", "navbar-links");
        const style = document.createElement("style");
        style.textContent = css;

        this.links.forEach(link => {
            const LinkElement = document.createElement("nav-link");
            LinkElement.setAttribute("href", link.href);
            LinkElement.setAttribute("text", link.name);
            LinkElement.setAttribute("class", `link ${link.class}`);
            links.appendChild(LinkElement);
        });

        navbar.appendChild(logo);
        navbar.appendChild(links);
        shadow.appendChild(navbar);
        shadow.appendChild(style);
    }

    connectedCallback() {
        const currentPath = window.location.pathname;
        const active = this.shadowRoot.querySelector(`[href="${currentPath}"]`);
        if (active) active.setAttribute("selected", "true");
    }
}

customElements.define("main-nav", NavComponent);