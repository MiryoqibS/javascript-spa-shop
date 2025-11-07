import css from "./styles/main.css?raw";

class ProductSmallCardComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.thumbnailUrl = this.getAttribute("thumbnail");
        this.titleText = this.getAttribute("title");
        this.priceText = this.getAttribute("price");
        const style = document.createElement("style");
        style.textContent = css;

        const container = document.createElement("div");
        this.containerClassName = "product-card";
        container.setAttribute("class", this.containerClassName);

        const thumbnail = document.createElement("img");
        thumbnail.setAttribute("src", this.thumbnailUrl);
        thumbnail.setAttribute("class", `${this.containerClassName}__thumbnail`);

        const body = document.createElement("div");
        body.setAttribute("class", `${this.containerClassName}__body`);

        const title = document.createElement("h3");
        title.textContent = this.titleText;
        title.setAttribute("class", `${this.containerClassName}__title`);

        const price = document.createElement("p");
        price.textContent = this.priceText;
        price.setAttribute("class", `${this.containerClassName}__price`);

        body.appendChild(title);
        body.appendChild(price);

        container.appendChild(thumbnail);

        shadow.appendChild(container);
        shadow.appendChild(style);
    }

    connectedCallback() {

    }

    static get observedAttributes() {
        return ["title", "price", "thumbnail"]
    }

    attributeChangedCallback(name, oldValue, newValue) {

    }
}

customElements.define("product-small-card", ProductSmallCardComponent);