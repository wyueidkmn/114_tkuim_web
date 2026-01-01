import 'dotenv/config';
import { connectDB, getCollection } from './db.js';
import bcrypt from 'bcrypt';
import { generateToken } from './generateToken.js';

async function test() {
    console.log("1. Checking Environment Variables...");
    if (!process.env.MONGODB_URI) console.error("❌ MONGODB_URI is missing");
    else console.log("✅ MONGODB_URI is set");

    if (!process.env.JWT_SECRET) console.error("❌ JWT_SECRET is missing");
    else console.log("✅ JWT_SECRET is set");

    console.log("\n2. Testing DB Connection...");
    try {
        await connectDB();
        console.log("✅ DB Connected");
    } catch (e) {
        console.error("❌ DB Connection Failed:", e.message);
        process.exit(1);
    }

    console.log("\n3. Testing User Query...");
    try {
        const users = getCollection('users');
        const count = await users.countDocuments();
        console.log(`✅ Users collection accessible. Count: ${count}`);
    } catch (e) {
        console.error("❌ User Query Failed:", e.message);
    }

    console.log("\n4. Testing Token Generation...");
    try {
        const fakeUser = { _id: '123', email: 'test@test.com', role: 'student' };
        const token = generateToken(fakeUser);
        console.log("✅ Token Generated:", token ? "Success" : "Failed");
    } catch (e) {
        console.error("❌ Token Generation Failed:", e.message);
    }

    process.exit(0);
}

test();
