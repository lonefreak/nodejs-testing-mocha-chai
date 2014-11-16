var expect = require("chai").expect;
var tags = require("../lib/tags.js");

describe("Tags", function() {
    describe("#parse()", function() {

        it("should parse long formed tags", function() {
            var args = ["--depth=4","--hello=world"];
            var results = tags.parse(args);

            expect(results).to.have.a.property("depth", 4);
            expect(results).to.have.a.property("hello", "world");
        });

        it("should fallback to default values", function() {
            var args = [];
            var results = tags.parse(args);

            var expected = {
                depth: 1,
                path: ".",
                query: "",
            }

            expect(results).to.deep.equal(expected);
        });

        it("should parse boolean tags", function() {
            var args = ["--searchContents"];
            var results = tags.parse(args);

            expect(results).to.have.a.property("searchContents", true);
        });

        it("should parse short tags", function() {
            var short = {
                d: "depth",
                h: "hello",
                f: "foo",
                s: "searchContents",
                r: "recursive",
                i: "iteractive",
            }

            var args = ["-d=4","-h=world","-is" ,"-r"];
            var results = tags.parse(args,short);

            var expected = {
                depth: 4,
                hello: "world",
                path: ".",
                query: "",
                iteractive: true,
                recursive: true,
                searchContents: true,
            }

            expect(results).to.deep.equal(expected);
        });
    });
});
