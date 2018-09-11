export function extend(){
	var src, copyIsArray, copy, name, options, clone, target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;
	if(typeof target === "boolean") {
		deep = target;
		target = arguments[i] || {};
		i += 1
	}
	if(typeof target !== "object" && !jcy.isFunction(target)) {
		target = {}
	}
	if(i === length) {
		target = this;
		i -= 1
	}
	for(; i < length; i += 1) {
		if((options = arguments[i]) != null) {
			for(name in options) {
				src = target[name];
				copy = options[name];
				if(target === copy) {
					continue
				}
				if(deep && copy && ($.isPlainObject(copy) || (copyIsArray = jcy.isArray(copy)))) {
					if(copyIsArray) {
						copyIsArray = false;
						clone = src && jcy.isArray(src) ? src : []
					} else {
						clone = src && $.isPlainObject(src) ? src : {}
					}
					target[name] = jcy.extend(deep, clone, copy);
				} else if(copy !== undefined) {
					target[name] = copy
				}
			}
		}
	}
	return target
};
