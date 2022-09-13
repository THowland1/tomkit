export type vCardPhoto = {
	url?: string;
	mediaType?: string;
	base64: boolean;

	attachFromUrl?: (url: string, mediaType: string) => void;
	embedFromFile?: (fileLocation: string) => void;
	embedFromString?: (base64String: string, mediaType: string) => void;
};

export type vCardMailingAddress = {
	label?: string;
	poBox?: string;
	extendedAddress?: string;
	street?: string;
	city?: string;
	stateProvince?: string;
	postalCode?: string;
	countryRegion?: string;
};

export type vCardAddress = {
	type: vCardAddressType;
	details?: vCardMailingAddress;
};

export enum vCardAddressType {
	HOME = 'HOME',
	WORK = 'WORK'
}

export type vCardFormattingOptions = {
	skipCharset: boolean;
	skipShowAs: boolean;
	skipRevision: boolean;
};
