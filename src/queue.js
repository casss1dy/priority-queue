const MaxHeap = require('./max-heap.js');

class PriorityQueue {
	constructor(maxSize = 30) {
		this.maxSize = maxSize;
		this.heap = new MaxHeap();
	}

	push(data, priority) {
		if (this.size() == this.maxSize) {
			throw new Error('queue has max size');
		}
		this.heap.push(data, priority);
	}

	shift() {
		if (!this.size()) throw new Error('queue is empty');
		let detached = this.heap.pop();
		return detached;
	}

	size() {
		return this.heap.size();
	}

	isEmpty() {
		return !this.size();
	}
}

module.exports = PriorityQueue;
