const parser = require('./parser.js');

Sume = module.exports = {
    compile: function(template) {
        let t = parser.parse(template);
        return function(context) {
            return parser.compile(t.template, t.blocks, context);
        }
    }
}
