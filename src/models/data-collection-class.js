'use strict';

class GenericCollection {
	constructor(schema) {
		this.model = schema;
	}

	create(record) {
		let newRecord = new this.model(record);
		return newRecord.save();
	}

	read(_id) {
		return _id ? this.model.findById(_id) : this.model.find({});
	}

	update(_id, record) {
		return this.model.findByIdAndUpdate(_id, record, { new: true });
	}

	delete(_id) {
		return this.model.findByIdAndDelete(_id);
	}
}

module.exports = GenericCollection;
