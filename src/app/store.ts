export class Store {
    id?: number;
	name?: String;
	type?: String;
	address?: String;
	address2?: String;
	city?: String;
	state?: String;
	zip?: String;
	location?: {lat: number, lon: number};
	hours?: String;
	services?: String[];
}
