module.exports = function(template) {
    const delimiterStart = "{{";
    const delimiterEnd = "}}";
    const escapeChar = "\\";

    let blocks = [];
    let blockBegin = null
    let blockEnd = null;
    let length = template.length - 1;
    let escaped = false;

    for (let i = 0, j = 1; i < length; i++, j++) {
        let scan = template[i] + template[j];
        if (template[i - 1] == escapeChar) {
            template = template.slice(0, i - 1) + template.slice(i);
            escaped = true;
        }
        if (scan == delimiterStart && !escaped) {
            blockBegin = i + 2;
        }
        if (scan == delimiterEnd && !escaped) {
            if (blockBegin == null) {
                throw new SyntaxError("Unexpected delimiter \"" + delimiterEnd + "\" at position " + i);
            }
            blockEnd = i;
        }
        if (scan == delimiterEnd && escaped) {
            escaped = false;
        }
        if (blockBegin != null && blockEnd != null) {
            let flag = template.slice(blockBegin, blockEnd);
            let spaces = flag.split(" ").length - 1;
            flag = flag.replace(/\s+/g, "");
            if (flag == "") {
                throw new SyntaxError("Empty tags at position " + (blockBegin - 2));
            }
            blocks.push({
                indices: [blockBegin - 2, blockEnd + 2],
                flag: flag,
                stripped: spaces
            });
            blockBegin = null;
            blockEnd = null;
        }
        if (j == length && blockBegin != null && blockEnd == null) {
            throw new SyntaxError("Unexpected delimiter \"" + delimiterStart + "\" at position " + (blockBegin - 2));
        }
    }

    length = null;
    
    return {
        blocks: blocks.length > 0 ? blocks : false,
        template: template
    };
};
