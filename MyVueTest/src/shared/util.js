export function noop(a, b, c) {
}

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
export function isUndef(v) {
	return v === undefined || v === null
}

export function isDef(v) {
	return v !== undefined && v !== null
}

export function isTrue(v) {
	return v === true
}


// 原始数据类型
export function isPrimitive(value) {
	return (
		typeof value === 'string' ||
		typeof value === 'number' ||
		// $flow-disable-line
		typeof value === 'symbol' ||
		typeof value === 'boolean'
	)
}


export const no = (a, b, c) => {
	return (a === 'div' || a === 'h1')
}

export const identity = (_) => _

const hasOwnProperty = Object.prototype.hasOwnProperty

export function hasOwn(obj, key) {
	return hasOwnProperty.call(obj, key)
}

export function isObject(obj) {
	return obj !== null && typeof obj === 'object'
}
