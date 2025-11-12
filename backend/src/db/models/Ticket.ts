import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
	eventId: { type: Schema.Types.ObjectId, ref: "Event", required: true },
	user: { type: String, required: true },
	createdAt: { type: Date, default: Date.now },
});

ticketSchema.set("toJSON", {
	virtuals: true,
	transform: (doc, ret: any) => {
		delete ret._id;
		delete ret.__v;
	},
});

export const Ticket = model("Ticket", ticketSchema);
