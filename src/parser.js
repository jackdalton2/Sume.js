module.exports = {
    parse: function(template) {
        const delimiterStart = "{{";
        const delimiterEnd = "}}";
        let blocks = [];
        let blockBegin, blockEnd = null;
        let length = template.length - 1;

        for (let i = 0, j = 1; i < length; i++, j++) {
            let scan = template[i] + template[j];
            if (scan == delimiterStart) {
                blockBegin = i + 2;
            }
            if (scan == delimiterEnd) {
                blockEnd = i;
            }
            if (blockBegin != null && blockEnd != null) {
                blocks.push({
                    indices: [blockBegin - 2, blockEnd + 2],
                    flag: template.slice(blockBegin, blockEnd)
                });
                blockBegin, blockEnd = null;
            }
        }

        length = null;

        return blocks.length > 0 ? blocks : false;
    },
    compile: function(template, blocks, context) {
        if (blocks == false) {
            return template;
        }
        let length = blocks.length;
        let stop = blocks.length - 1;
        for (let i = 0; i < length; i++) {
            let val = context[blocks[i].flag];
            if (i < stop) {
                let lenDifference = (val.length) - (4 + blocks[i].flag.length);
                let next = i + 1;
                blocks[next].indices[0] += lenDifference;
                blocks[next].indices[1] += lenDifference;
            }
            template = template.substring(0, blocks[i].indices[0]) + val +  template.substring(blocks[i].indices[1]);
        }
        blocks.length = null;
        return template;
    }
};