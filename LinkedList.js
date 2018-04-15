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
    this.count = 0;
	}
  addLast(node) {
    if (this.count >= 2) {
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
    this.count++;
  }
}

let list = new LinkedList();
list.addLast(1);
list.addLast(2);
list.addLast(3);