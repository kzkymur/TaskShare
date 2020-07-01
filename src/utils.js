import {css, keyframes} from 'styled-components';

function isArray (item) {
	return Object.prototype.toString.call(item) === '[object Array]';
}
function isObject (item) {
	return typeof item === 'object' && item !== null && !isArray(item);
}

export const objectJoiner = function () {
	let returnObject = Object.assign({},arguments[0]);
	for(let i=1; i<arguments.length; i++){
		for(let key in arguments[i]){
			if (key in returnObject & isObject(returnObject[key])){
				returnObject[key] = objectJoiner(returnObject[key], arguments[i][key])
			} else {
				returnObject[key] = arguments[i][key]
			}
		}
	}
	return returnObject;
}

export const retNum = string => Number(string.replace(/[^0-9,\.]/g, ''));

export const retKF = (kF, percent) => {
	let keyframesText = kF.stringifyArgs[0].replace(/[^0-9,\.,^a-z,^A-Z,:,;,{,},%,-]/g, '');
	keyframesText = keyframesText.split(percent+'%{')[1].split('}')[0];
	return css`${keyframesText}`;
}
export const copyKF = (kF) => {
	let keyframesText = kF.stringifyArgs[0].replace(/[^0-9,\.,^a-z,^A-Z,:,;,{,},%,-]/g, '');
	let zeroPercentText = keyframesText.split('0%{')[1].split('}')[0];
	zeroPercentText = 0.0000001+'%{'+zeroPercentText+'}';
	let newKeyframesText = keyframesText+zeroPercentText;
	return keyframes`${newKeyframesText}`;
}

export const objectKeyCheck = function (target, object) {
	let hasTarget;
	for(let key in object){
		if (key == target){
			return true;
		} else if (isObject(object[key])){
			hasTarget = objectKeyCheck(target, object[key]);
			if(hasTarget) {
				return true;
			}
		}
	}
	return false;
}


