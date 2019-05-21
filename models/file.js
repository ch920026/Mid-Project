const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating a schema, sort of like working with an ORM
const FileSchema = new Schema({
	filename: {
		type: String,
		required: [true, 'File name is required.']
	},
	url: {
		type: String,
		required: [true, 'url is required.']
	}
})

// Creating a table within database with the defined schema
const File = mongoose.model('file', FileSchema)

// Exporting table for querying and mutating
module.exports = File
