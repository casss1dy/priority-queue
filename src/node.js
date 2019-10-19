class Node {
	constructor(data, priority) {
		this.data = data;
		this.priority = priority;
		this.parent = null;
		this.left = null;
		this.right = null;
	}

	appendChild(node) {
		if (!this.left) {
			this.left = node;
			node.parent = this;
		} else if (!this.right) {
			this.right = node;
			node.parent = this;
		}
	}

	removeChild(node) {
		if (node.data === this.left.data) {
			this.left = null;
			node.parent = null;
		} else if (node.data === this.right.data) {
			this.right = null;
			node.parent = null;
		} else {
			throw new Error('passed node is not a child of this node');
		}
	}

	remove() {
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	swapWithParent() {
		if (this.parent === null) return;

		//копия ссылок родителя
		let parentTmp = {
			parent: this.parent.parent,
			left: this.parent.left,
			right: this.parent.right,
		};

		const child = this;
		const parent = this.parent;

		//parent
		parent.parent = child;
		parent.left = child.left;
		parent.right = child.right;

		if (parent.left !== null) {
			parent.left.parent = parent;
		}
		if (parent.right !== null) {
			parent.right.parent = parent;
		}

		// child
		child.parent = parentTmp.parent;
		if (child.parent != null) {
			if (child.parent.left === parent) {
				child.parent.left = child;
			} else if (child.parent.right === parent) {
				child.parent.right = child;
			}
		}

		if (child === parentTmp.left) { 	// swaped элемент - это левый элемент
			child.right = parentTmp.right;
			child.left = parent;
			if (child.right !== null) {
				child.right.parent = child;
			}
		} else {   // swaped элемент - это правый элемент
			child.left = parentTmp.left;
			child.right = parent;
			if (child.left !== null) {
				child.left.parent = child;
			}
		}
	}
}

module.exports = Node;
