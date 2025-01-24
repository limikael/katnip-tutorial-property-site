export default class Api {
	constructor(ev) {
		this.ev=ev;
	}

	// Will be callable from the client with:
	// import {useRpc} from "katnip-rpc";
	// let rpc=useRpc();
	// await rpc.myfunc(/*...*/);
	async myfunc(myparam) {
		// ...
	}
}
