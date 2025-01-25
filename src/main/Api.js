export default class Api {
	constructor(ev) {
		this.ev=ev;
	}

	async increaseLikes(property_id) {
		let qql=this.ev.appData.qql;
		console.log("increaseLikes called for id: "+property_id);

		let property=await qql({
			oneFrom: "properties", 
			where: {id: property_id}
		});

		if (!property.likes)
			property.likes=0;

		property.likes++;

		await qql({
			update: "properties",
			set: {likes: property.likes},
			where: {id: property.id}
		});

		return property.likes;
	}
}
