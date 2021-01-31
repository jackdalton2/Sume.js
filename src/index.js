const parser = require('./parser.js');

Sume = module.exports = {
    compile: function(template) {
        let blocks = parser.parse(template);
        return function(context) {
            return parser.compile(template, blocks, context);
        }
    }
}
