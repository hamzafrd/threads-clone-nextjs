export interface Iuser {
	_id: string;
	id: string;
	username: string;
	name: string;
	image: string;
	bio: string;
	threads: Ithread[];
	onboarded: boolean;
	communities: [];
}

export interface Iauthor {
	id: string;
	name: string;
	image: string;
}

export interface Ithread {
	_id: string;
	id: string;
	text: string;
	author: Iuser;
	community: Icommunity;
	createdAt: string;
	parentId: string;
	children: Ithread[];
}

export interface Icommunity {
	id: string;
	name: string;
	image: string;
}
