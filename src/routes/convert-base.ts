export function toBaseN(num: number, charset: string) {
	if (num === 0) {
		return '0';
	}
	const base = charset.length;
	let result = '';
	while (num > 0) {
		result = charset[num % base] + result;
		num = parseInt(String(num / base), 10);
	}

	return result;
}

export function fromBaseN(str: string, charset: string) {
	if (str === null || str.length === 0) {
		return 0;
	}
	let result = 0;
	const base = charset.length;
	for (let i = 0; i < str.length; i++) {
		const p = charset.indexOf(str[i]);
		if (p < 0 || p >= base) {
			return NaN;
		}
		result += p * Math.pow(base, str.length - i - 1);
	}
	return result;
}

// function toBase62(n: number) {
// 	if (n === 0) {
// 		return '0';
// 	}
// 	const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// 	let result = '';
// 	while (n > 0) {
// 		result = digits[n % digits.length] + result;
// 		n = parseInt(String(n / digits.length), 10);
// 	}

// 	return result;
// }

// function fromBase62(s: string) {
// 	const digits = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
// 	let result = 0;
// 	for (let i = 0; i < s.length; i++) {
// 		const p = digits.indexOf(s[i]);
// 		if (p < 0) {
// 			return NaN;
// 		}
// 		result += p * Math.pow(digits.length, s.length - i - 1);
// 	}
// 	return result;
// }
