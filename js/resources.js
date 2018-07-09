(function () {
	var resourceCache = {};
	var loading = [];
	var readyCallback = [];

	//loading single or an array of image
	function load(urlOrArr) {
		if(urlOrArr instanceof Array) {
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        }
		else {
			_load(urlOrArr);
		}
	}

	//load image from its url
	function _load(url) {
		if (resourceCache[url]) {
			return resourceCache[url];
		}else {
			var img = new Image();
			img.onLoad = function() {
				resourceCache[url] = img;

				if(isReady()) {
					readyCallback.forEach(function(func) {func();});
				}
			};
			resourceCache[url] = false;
			img.src = url;
		}
	}

	//get the image from the cache
	function get(url) {
		return resourceCache[url];
	}

	function isReady() {
		var ready = true;

		for (var i in resourceCache) {
			if(resourceCache.hasOwnProperty(i) && !resourceCache[i]) {
				ready = false;
			}
		}

		return ready;
	}

	function onReady(func) {
		readyCallback.push(func);
	}

	window.resources = {
		load: load,
		get: get,
		onReady: onReady,
		isReady: isReady
	};
})();