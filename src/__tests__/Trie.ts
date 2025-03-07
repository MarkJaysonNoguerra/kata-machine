import Trie from "@code/Trie";

test("Trie", function () {
    const trie = new Trie();
    trie.insert("foo");
    trie.insert("fool");
    trie.insert("foolish");
    trie.insert("bar");

    expect(trie.find("fo").sort()).toEqual([
        "foo",
        "fool",
        "foolish",
    ]);

    trie.delete("fool");
    trie.delete("fo");

    expect(trie.find("ba")).toEqual([
        "bar"
    ])

    trie.delete("bar");
    expect(trie.find("ba")).toEqual([]);

    expect(trie.find("fo").sort()).toEqual([
        "foo",
        "foolish",
    ]);
});

