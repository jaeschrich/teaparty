function updateList(container, make, newList, prev = [], keyName = "key") {	
	function insertNode(node, pos) {
		if (pos >= container.children.length) {
			container.appendChild(node);
			prev.push(node.dataset[keyName]);
		} else {
			container.insertBefore(node, container.children[pos]);
			prev.splice(pos, 0, node.dataset[keyName]);
		}
	}
	
	let i = 0;
	for (; i < newList.length; i++) {
		let item = newList[i];
		let oldPos = prev.indexOf(item.key);
		if (oldPos == -1) {
			let node = make(item);
			node.dataset[keyName] = item.key;
			insertNode(node, i);
		} else {
			if (i == oldPos) continue;
			let node = container.children[oldPos];
			container.removeChild(node);
			prev.splice(oldPos, 1);
			if (i < oldPos) insertNode(node, i);
			else insertNode(node, i - 1);
		}
	}
	
	while (i < prev.length) {
		container.removeChild(container.lastChild);
		i++;
	}
	
	return newList.map(x => x.key);
}

export class ListView {
	constructor(container, make, keyName = "key") {
		this.container = container;
		this.make = make;
		this._prev = [];
		this._listeners = [];
		this._state = [];
		this.keyName = "key";
	}
	update(newList) {	
		this._prev = updateList(this.container, this.make, newList, this._prev, this.keyName);
		this._listeners.forEach(f => f(newList, this._state));
		this._state = newList;
	}
	get state() {
		return Array.from(this._state);
	}
	listen(f) {
		this._listeners.push(f);
	}
}