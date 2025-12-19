import { getDB } from '../db.js';
import { ObjectId } from 'mongodb';


export async function findAll() {
return getCollection('participants').find().toArray();
}


export async function findByOwner(ownerId) {
return getCollection('participants').find({ ownerId }).toArray();
}


export async function createParticipant(data) {
return getCollection('participants').insertOne(data);
}


export async function findById(id) {
return getCollection('participants').findOne({ _id: new ObjectId(id) });
}


export async function deleteById(id) {
return getCollection('participants').deleteOne({ _id: new ObjectId(id) });
}