const Sume = require("../src");
const assert = require("assert");


let templateSource = `
    <tag href="{{ url }}">
        <tag>{{ content.description }}</tag>
    </tag>
`;
let expectedOutput = `
    <tag href="https://github.com/jackdalton2/Sume.js">
        <tag>Sume.js</tag>
    </tag>
`;

let template = Sume.compile(templateSource);

let html = template({
    url: "https://github.com/jackdalton2/Sume.js",
    content: {
        description: "Sume.js"
    }
});


describe("Output", function() {
    describe("Sume.compile()", function() {
        it("should return a function", function() {
            assert.equal(typeof template, "function");
        });
        it("should not fail when no delimiters are present", function() {
            assert.equal(Sume.compile("No delimiters here!")(), "No delimiters here!");
        });
    });
    describe("Sume.compile() => t() ", function() {
        it("should render a compiled template", function() {
            assert.equal(html, expectedOutput);
        });
        it("should ignore escaped delimiters and remove escape character", function() {
            assert.equal(Sume.compile("\\{{}}")(), "{{}}");
        });
    });
    describe("Error Checks", function() {
        it("should throw an error on missing opening tags", function() {
            assert.throws(() => {Sume.compile("test }}")({test: "test text"})}, SyntaxError);
        });
        it("should throw an error on missing closing tags", function() {
            assert.throws(() => {Sume.compile("{{ test")({test: "test text"})}, SyntaxError);
        });
        it("should throw an error on empty tags", function() {
            assert.throws(() => {Sume.compile("{{ }}")({test: "test text"})}, SyntaxError);
        });
        it("should throw an error on missing context variables", function() {
            assert.throws(() => {Sume.compile("{{ a }}")({b: "test text"})}, ReferenceError);
        });
    });
});
