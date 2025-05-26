// EXPLANATION ONLY - NO CODE CHANGES
/*
Changes made to getAuthUsers.js:

1. Improved database query to exclude sensitive information:
   - SELECT statement now explicitly lists columns (user_id, username, email, etc.) rather than using SELECT *
   - Password field is excluded from the results for security reasons
   - Added ORDER BY created_at DESC to show newest users first

2. Added error handling:
   - More detailed error message with error.message to help with debugging
   - Better error logging for tracking issues

3. Simplified response structure:
   - Direct return of query results through res.json(result.rows)
   - No unnecessary data transformation that might cause field mismatches

4. Added console logging for debugging:
   - Log when request is received
   - Log the number of users found
*/

import con from "../config/db.js";

export const getAuthUsers = async (req, res) => {
    try {
        // Log the request to help with debugging
        console.log('Fetching users - auth check passed');
        
        const query = `
            SELECT 
                user_id, 
                username, 
                email, 
                phone_number, 
                is_organization_member,
                community,
                created_at
            FROM users
            ORDER BY created_at DESC;
        `;
        
        const result = await con.query(query);
        console.log(`Found ${result.rows.length} users`);
        
        // Return the raw data directly without transformation
        return res.status(200).json(result.rows);
    } catch (err) {
        console.error('Error fetching users:', err);
        return res.status(500).json({ message: "Server error: " + err.message });
    }
};
