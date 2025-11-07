import { goTo } from "../router/index";

import css from "./styles/main.css?raw";

class BannerComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.titleText = this.getAttribute("title");
        this.descriptionText = this.getAttribute("description");
        this.href = this.getAttribute("href");
        this.buttonText = this.getAttribute("buttonText");
        this.backgroundText = this.getAttribute("data-background-text");

        const style = document.createElement("style");
        style.textContent = css;

        const wrapper = document.createElement("div");
        wrapper.setAttribute("class", "banner");
        wrapper.setAttribute("data-background-text", this.backgroundText);

        const button = document.createElement("button");
        button.setAttribute("class", "banner__button");
        button.textContent = this.buttonText;

        const title = document.createElement("h1");
        title.textContent = this.titleText;
        title.setAttribute("class", "banner__description");

        const description = document.createElement("p");
        description.textContent = this.descriptionText;
        description.setAttribute("class", "banner__description");

        const body = document.createElement("div");
        body.setAttribute("class", "banner__body");
        body.appendChild(title);
        body.appendChild(description);

        wrapper.appendChild(body);
        wrapper.appendChild(button);
        shadow.appendChild(wrapper);
        shadow.appendChild(style);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        const button = shadow.querySelector("button");
        button.addEventListener("click", () => {
            goTo(this.href);
        });
    }

    static get observedAttributes() {
        return ["title", "description", "href"];
    }
}

customElements.define("main-banner", BannerComponent);