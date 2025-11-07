import { Constants } from "../common/constants";
import Route from "route-parser";

// == Шаблоны страниц ==
import Layout from "../pages/Layout.template";
import MainPage from "../pages/MainPage.template";
import MensPage from "../pages/MensPage.template";
import WomensPage from "../pages/WomensPage.template";
import SportPage from "../pages/SportPage.template";
import FashionPage from "../pages/FashionPage.template";

const appContainer = document.getElementById("app");

// == Пути ==
export const Routes = {
    Main: new Route(Constants.routes.index),
    Mens: new Route(Constants.routes.men),
    Womens: new Route(Constants.routes.women),
    Sport: new Route(Constants.routes.sport),
    Fashion: new Route(Constants.routes.fashion),
};

// == Рендеринг страницы по URL ==
export const render = (path) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = Layout();
    const content = wrapper.querySelector("#content");

    let result = "<h1>404</h1>";
    if (Routes.Main.match(path)) {
        result = MainPage();
    } else if (Routes.Mens.match(path)) {
        result = MensPage();
    } else if (Routes.Womens.match(path)) {
        result = WomensPage();
    } else if (Routes.Sport.match(path)) {
        result = SportPage();
    } else if (Routes.Fashion.match(path)) {
        result = FashionPage();
    };

    content.innerHTML = result;
    const container = wrapper.querySelector(".container");
    appContainer.innerHTML = "";
    appContainer.appendChild(container);
};

// == Переходить на другую функцию ==
export const goTo = (path) => {
    window.history.pushState({ path }, path, path);
    render(path);
};

// == Инициализирует роутер ==
const initRouter = () => {
    window.addEventListener("popstate", () => {
        render(new URL(window.location.href).pathname);
    });
    document.querySelectorAll('a[href^="/"]').forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const { pathname: path } = new URL(e.currentTarget.href);
            render(path);
        });
    });
    render(new URL(window.location.href).pathname);
};

export default initRouter;