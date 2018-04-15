/*jshint esversion: 6 */
class Node 
{
  constructor(data) {
    this.data = data;
    this.previous = null;
    this.next = null;
  }
}

class LinkedList
{
	constructor(...node) {
    this.first = null;
    this.last = null;
    if (node.length > 0) {
      for (let i = 0; i < node.length; i++)
        this.addLast(node[i]);
    }
	}
  addFirst(node) {
    if (this.count() >= 2) {
      let temp = this.first;
      this.first = new Node(node);
      this.first.next = temp;
      temp.previous = this.first;
    }
    else if (this.first == null) {
      this.first = new Node(node);
    }
    else {
      this.last = this.first;
      this.first = new Node(node);
      this.first.next = this.last;
      this.last.previous = this.first;
    }
  }
  addLast(node) {
    if (this.count() >= 2) {
      let temp = this.last;
      this.last = new Node(node);
      this.last.previous = temp;
      temp.next = this.last;
    }
    else if (this.first == null) {
      this.first = new Node(node);
    }
    else if (this.last == null) {
      this.last = new Node(node);
      this.last.previous = this.first;
      this.first.next = this.last;
    }
  }
  count() {
    if (this.first != null)
      return this.countRecur(this.first);
    else
      return 0;
  }
  countRecur(node) {
    if (node.next != null)
      return 1 + (this.countRecur(node.next));
    if (node.next == null)
      return 1;
  }
  contains(value) {
    if (this.first != null)
      return this.containsRecur(this.first, value);
    else
      return false;
  }
  containsRecur(node, value) {
    if (node.data == value) return true;
    else if (node.next != null) {
      if (this.containsRecur(node.next, value)) return true;
    }
    else return false;
  }
}

let list = new LinkedList(2, 3);
    list.addFirst(1);
let empty = new LinkedList();
let one = new LinkedList();
one.addLast(1);
console.assert(empty.count() == 0);
console.assert(one.count() == 1);
console.assert(list.count() == 3);
console.assert(list.first.data == 1);
console.assert(list.first.next.data == 2);
console.assert(list.last.data == 3);
