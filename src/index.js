const parser = require("./parser.js");
const compiler = require("./compiler.js")

Sume = module.exports = {
    compile: function(template) {
        const t = parser(template);
        return (context) => compiler(t.template, t.blocks, context);
    },
    version: "1.2.1"
};
