class Node {
  constructor(value) {
    this.value = value;
    (this.isTarget = false), (this.children = {});
  }
}

export class Trie {
  constructor() {
    this.root = new Node('');
  }

  insert(string, id) {
    let currentNode = this.root;

    string += ` - ID : ${id}`;
    string.split('').forEach((char, index) => {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new Node();
        currentNode.children[char].value = currentNode.value + char;
      }
    });
  }
}
