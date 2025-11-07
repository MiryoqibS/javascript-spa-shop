class FeaturedSectionComponent extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.featuredProducts = [
            {thumbnail: ""}
        ]
    }
}