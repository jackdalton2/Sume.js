module.exports = function(template, blocks, context) {
    if (blocks == false) {
        return template;
    }

    let length = blocks.length;
    let stop = blocks.length - 1;
    let totalLenDifference = 0;
    let shift = [[0, 0]];

    for (let i = 0; i < length; i++) {
        let path = blocks[i].flag.split(".");
        let val = context;

        for (let j in path) {
            val = val[path[j]];
        }

        if (val != undefined) {
            val = String(val);
        }

        try {
            val = val.replace(/\&/g, '&amp;')
                .replace(/\</g, '&lt;')
                .replace(/\>/g, '&gt;')
                .replace(/\"/g, '&quot;')
                .replace(/\'/g, '&#x27');
        } catch (e) {
            throw new ReferenceError("Unknown context key \"" + blocks[i].flag + "\"");
        }

        if (i < stop) {
            totalLenDifference += val.length - 4 - blocks[i].flag.length - blocks[i].stripped;
            let next = i + 1;
            shift.push([
                totalLenDifference,
                totalLenDifference
            ]);
        }
        template = template.substring(0, blocks[i].indices[0] + shift[i][0]) + val + template.substring(blocks[i].indices[1] + shift[i][1]);
    }

    length = null;

    return template;
}
