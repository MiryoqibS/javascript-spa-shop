import { goTo } from "../router";

import css from "./styles/main.css?raw";

class HeroBannerComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        this.titleText = this.getAttribute("title");
        this.backgroundUrl = this.getAttribute("background");
        this.linkHref = this.getAttribute("href");
        this.type = this.getAttribute("data-type");

        const style = document.createElement("style");
        style.textContent = css;

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "hero-card");
        wrapper.setAttribute("data-type", this.type);

        const backgroundImage = document.createElement("img");
        backgroundImage.src = this.backgroundUrl;
        backgroundImage.setAttribute("class", "hero-card__background");

        const title = document.createElement("h2");
        title.textContent = this.titleText;
        title.setAttribute("class", "hero-card__title");

        const link = document.createElement("a");
        link.textContent = "посмотреть другие";
        link.href = this.linkHref;
        link.setAttribute("class", "hero-card__link link");

        wrapper.appendChild(backgroundImage);
        wrapper.appendChild(title);
        wrapper.appendChild(link);
        shadow.appendChild(wrapper);
        shadow.appendChild(style);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const link = shadow.querySelector("a");
        const href = link.getAttribute("href");
        link.addEventListener("click", (e) => {
            e.preventDefault();
            goTo(href);
        });
    }

    static get observedAttributes() {
        return ["title", "background", "href"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        const shadow = this.shadowRoot;

        switch (name) {
            case "title": { }
                this.titleText = newValue;
                const title = shadow.querySelector("h2");
                title.textContent = newValue;
                break;
            case "background":
                this.backgroundUrl = newValue;
                const backgroundImage = shadow.querySelector("img");
                backgroundImage.src = newValue;
                break;
            case "href":
                this.linkHref = newValue;
                const link = shadow.querySelector("a");
                link.href = newValue;
                break;
        }
    }
}

customElements.define("hero-banner", HeroBannerComponent);