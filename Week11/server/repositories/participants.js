// server/repositories/participants.js
import { ObjectId } from "mongodb";
import { getDB } from "../db.js";

const collection = () => getDB().collection("participants");

export async function createParticipant(data) {
  const result = await collection().insertOne({
    ...data,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return result.insertedId;
}

export function listParticipants() {
  return collection().find().sort({ createdAt: -1 }).toArray();
}

export async function listParticipantsPaged(page = 1, limit = 10) {
  const safePage = Math.max(parseInt(page) || 1, 1);
  const safeLimit = Math.max(parseInt(limit) || 10, 1);
  const skip = (safePage - 1) * safeLimit;

  const [items, total] = await Promise.all([
    collection()
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(safeLimit)
      .toArray(),
    collection().countDocuments(),
  ]);

  return { items, total, page: safePage, limit: safeLimit };
}

export async function updateParticipant(id, patch) {
  return collection().updateOne(
    { _id: new ObjectId(id) },
    { $set: { ...patch, updatedAt: new Date() } }
  );
}

export function deleteParticipant(id) {
  return collection().deleteOne({ _id: new ObjectId(id) });
}