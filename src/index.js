const parser = require("./parser.js");
const compiler = require("./compiler.js")

Sume = module.exports = {
    compile: function(template) {
        let t = parser(template);
        return function(context) {
            return compiler(t.template, t.blocks, context);
        }
    }
}
