module.exports = function(template, blocks, context) {
    if (blocks == false) {
        return template;
    }

    let length = blocks.length;
    let stop = blocks.length - 1;

    for (let i = 0; i < length; i++) {
        let path = blocks[i].flag.split(".");
        let val = context;

        for (let i in path) {
            val = val[path[i]];
        }

        if (i < stop) {
            let lenDifference = val.length - (4 + blocks[i].flag.length) - blocks[i].stripped;
            let next = i + 1;
            blocks[next].indices[0] += lenDifference;
            blocks[next].indices[1] += lenDifference;
        }
        
        template = template.substring(0, blocks[i].indices[0]) + val + template.substring(blocks[i].indices[1]);
    }

    length = null;

    return template;
}
