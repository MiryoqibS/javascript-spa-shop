import { Constants } from "../common/constants";
import { goTo } from "../router/index";

import css from "./styles/main.css?raw";

class LogoComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const title = document.createElement("h1");
        title.textContent = Constants.logo.title;
        const description = document.createElement("p");
        description.textContent = Constants.logo.description;
        const style = document.createElement("style");
        style.textContent = css;

        shadow.append(title);
        shadow.append(description);
        shadow.append(style);
    }

    connectedCallback() {
        const shadow = this.shadowRoot;
        shadow.addEventListener("click", () => goTo("/"));
    }
}

customElements.define("main-logo", LogoComponent);