const Node = require('./node');

class MaxHeap {
	constructor() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	push(data, priority) {
		const node = new Node(data, priority);
		this.insertNode(node);
		this.shiftNodeUp(node);
		this.heapSize++;
	}

	pop() {
		if (this.root === null) return;
		const detached = this.detachRoot();
		this.restoreRootFromLastInsertedNode(detached);
		if (this.root !== null) this.shiftNodeDown(this.root);
		this.heapSize--;
		return detached.data;
	}

	detachRoot() {
		let detached = this.root;
		if (this.parentNodes[0] === detached) {
			this.parentNodes.shift();
		}
		this.root = null;
		return detached;
	}

	restoreRootFromLastInsertedNode(detached) {

		if (this.parentNodes.length < 1 || (this.parentNodes.length == 1 && this.parentNodes[0] == this.root)) {
			this.parentNodes = [];
			return this.root = null;
		}

		let last = this.parentNodes[this.parentNodes.length-1];

		// если последний вставленный элемент - child от root
		if (detached.right === last || detached.left === last) {
			this.swapParentNodes(last);
			last.swapWithParent();
			detached.remove();
			this.parentNodes.pop();
			if (!(~this.parentNodes.indexOf(last))) {
				this.parentNodes.unshift(last);
			}
		} else {
			// если последний элемент - любой другой
			last.appendChild(detached.left);
			last.appendChild(detached.right);
			this.parentNodes.pop();
			if (!(~this.parentNodes.indexOf(last.parent))) {
				this.parentNodes.unshift(last.parent);
			}
			last.parent.removeChild(last);
		}

		last.parent = null;
		return this.root = last;
	}

	size() {
		return this.heapSize;
	}

	isEmpty() {
		return !this.root;
	}

	clear() {
		this.root = null;
		this.parentNodes = [];
		this.heapSize = 0;
	}

	insertNode(node) {
		if (this.root === null) {
			this.root = node;
		} else {
			this.parentNodes[0].appendChild(node);
			if (this.parentNodes[0].left !== null && this.parentNodes[0].right !== null) {
				this.parentNodes.shift();
			}
		}
		this.parentNodes.push(node);
	}

	shiftNodeUp(node) {
		if (node.parent == null) {
			this.root = node;
			return node;
		}
		if (node.priority > node.parent.priority) {
			this.swapParentNodes(node);
			node.swapWithParent();
			this.shiftNodeUp(node);
		}
	}

	swapParentNodes(node) {
		let indexParent = this.parentNodes.indexOf(node.parent);
		let indexNode = this.parentNodes.indexOf(node);
		if (~indexParent && ~indexNode) {
			let temp = this.parentNodes[indexNode];
			this.parentNodes[indexNode] = this.parentNodes[indexParent];
			this.parentNodes[indexParent] = temp;
		} else if (~indexNode && !(~indexParent)) {
			this.parentNodes[indexNode] = node.parent;
		}
	}

	shiftNodeDown(node) {
		let child;

		// выбираем в какую сторону пойдем - определяем child элемент
		if (node.left !== null && node.right !== null) {
			child = (node.left.priority > node.right.priority) ? node.left : node.right;
		} else if (node.left !== null || node.right !== null) {
			child = node.left !== null ? node.left : node.right;
		} else {
			child = null;
		}

		if (child == null) {
			return node;
		}

		if (node.priority < child.priority) {
			this.root = (node === this.root) ? child : this.root;
			this.swapParentNodes(child);
			child.swapWithParent();
			this.shiftNodeDown(node);
		}
	}
}

module.exports = MaxHeap;
