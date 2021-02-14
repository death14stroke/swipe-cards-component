import { useEffect, useRef } from 'react';

export const useComponentWillUpdate = (callback = () => {}) => {
	const willUpdate = useRef(false);

	if (willUpdate.current) {
		callback();
	} else {
		willUpdate.current = true;
	}
};

export const useComponentWillReceiveProps = (callback, props) => {
	useEffect(callback, props);
};
