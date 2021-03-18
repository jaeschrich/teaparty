export const $ = (x, root = document) => root.querySelector(x);
export const cancelEvent = (ev) => { ev.stopPropagation(); ev.preventDefault(); }

export function $make(element, attributes = {}, parent = null) {
	let node = document.createElement(element);
	for (let key of Object.keys(attributes)) {
		node[key] = attributes[key];
	}
	return node;
}

export const $append = (parent, element, attributes = {}) => { 
	let node = $make(element, attributes);
	parent.appendChild(node);
	return node;
};

export const $bindEvent = (eventName, cb, cancel = true) => node => {
	node.addEventListener(eventName, (ev) => {
		if (cancel) cancelEvent(ev);
		cb(ev);
	});
	return node;
}

export const TemplateRoot = Symbol();
export class Template {
    constructor(node) {
        this._templateNode = node;
    }
    make(map) {
        let node = this._templateNode.content.cloneNode(true).firstElementChild;
		let keys = Object.keys(map);
		keys.forEach((key) => {
			if (map[key].call) map[key](node.querySelector(key));
		});

        if (map[TemplateRoot]) {
            map[TemplateRoot](node);
        }

		return node;
    }
    append(parent, map) {
        const content = this.make(map);
        parent.appendChild(content)
        return content;
    }
}

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