export default function TemplatePlugin() {
    return {
        name: "template-loader-plugin",
        enforce: "pre",
        transform(src, id = "") {
            if (id.endsWith(".template")) {
                return {
                    code: `
                    export default function template(props={}) {
                        return \`${src}\`
                    }`,
                    map: null,
                };
            };
        },
    };
};