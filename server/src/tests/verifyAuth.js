import userRepository from '../repositories/userRepository.js';
import authService from '../services/authService.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

async function runTests() {
    console.log("Starting Authentication Verification Tests...");

    try {
        // Test 1: findById with non-existent role
        console.log("\nTest 1: Verifying findById query fix...");
        try {
            const user = await userRepository.findById(1); 
            if (user && user.role === 'user') {
                console.log("✅ Success: findById correctly injects 'user' role.");
            } else {
                console.log("❌ Failure: findById did not return correct user or role.");
                console.log("Debug user:", user);
            }
        } catch (err) {
            console.log("❌ Failure: Repository findById threw an error.");
            console.error(err.message);
        }

        // Test 2: Repository create mapping
        console.log("\nTest 2: Verifying repository create mapping...");
        const testUser = {
            name: `testuser_${Date.now()}`,
            email: `test_${Date.now()}@example.com`,
            phone: `07${Math.floor(Math.random() * 100000000)}`,
            password: 'hashedpassword123',
            isOrganisationMember: true,
            community: 'Test Community'
        };
        try {
            const newUserId = await userRepository.create(testUser);
            console.log(`✅ Success: User created with ID ${newUserId}`);
            
            // Clean up
            await userRepository.delete(newUserId);
            console.log("✅ Success: Test user deleted.");
        } catch (err) {
            console.log("❌ Failure: Could not create user.");
            console.error(err);
        }

        // Test 3: JWT Generation
        console.log("\nTest 3: Verifying JWT generation...");
        const payload = { id: 1, role: 'user' };
        const token = authService.generateToken(payload);
        if (token) {
            console.log("✅ Success: Access token generated.");
        } else {
            console.log("❌ Failure: Access token generation failed.");
        }

        console.log("\nVerification Tests Completed.");
    } catch (err) {
        console.error("Critical Test Error:", err);
    } finally {
        process.exit();
    }
}

runTests();
