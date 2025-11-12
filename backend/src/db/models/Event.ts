import { Schema, model } from "mongoose";

const eventSchema = new Schema({
	code: { type: String, required: true, unique: true },
	name: { type: String, required: true },
	logoUrl: { type: String },
	description: { type: String },
});

// Middleware para transformar _id a id (para compatibilidad con GraphQL)
eventSchema.set("toJSON", {
	virtuals: true,
	transform: (doc, ret: any) => {
		delete ret._id;
		delete ret.__v;
	},
});

export const Event = model("Event", eventSchema);
