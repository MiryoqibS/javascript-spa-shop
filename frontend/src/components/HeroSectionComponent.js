import { Constants } from "../common/constants";

import css from "./styles/main.css?raw";

class HeroSectionComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.banners = [
            { title: "Модная обувь для мужчин", href: Constants.routes.men, thumbnail: "/src/assets/heroBanner1.png", class: "hero-item hero-item--big", type: "men" },
            { title: "Спортивная обувь", href: Constants.routes.sport, thumbnail: "/src/assets/heroBanner2.png", class: "hero-item hero-item--small", type: "sport" },
            { title: "Модная обувь", href: Constants.routes.fashion, thumbnail: "/src/assets/heroBanner3.png", class: "hero-item hero-item--small", type: "fashion" },
        ];
        const style = document.createElement("style");
        style.textContent = css;
        const container = document.createElement("div");
        container.setAttribute("class", "hero-body");
        this.banners.forEach(banner => {
            const bannerElement = document.createElement("hero-banner");
            bannerElement.setAttribute("title", banner.title);
            bannerElement.setAttribute("background", banner.thumbnail);
            bannerElement.setAttribute("href", banner.href);
            bannerElement.setAttribute("class", banner.class);
            bannerElement.setAttribute("data-type", banner.type);
            container.appendChild(bannerElement);
        });
        shadow.appendChild(container);
        shadow.appendChild(style);
    }
}

customElements.define("hero-section", HeroSectionComponent);