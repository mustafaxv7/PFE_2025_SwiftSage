import con from "../config/db.js";
export const createAuthUser = async (req, res) => {
      try {
            const { name, email, phone, password, isOrganisationMember } = req.body;
    
            if (!name || !email || !phone|| !password) {
                return res.status(400).json({ message: "Please fill all fields" });
            }
    
            
            const hashedPassword = await bcrypt.hash(password, 10);
    
            const query = `INSERT INTO users(username, email, phone_number, password, is_organization_member) VALUES($1, $2, $3, $4,$5);`;
            const values = [name, email, phone, hashedPassword, isOrganisationMember];
    
            try {
                await con.query(query, values);
                return res.status(201).json({ message: "User Created successfully" });
            } catch (err) {
                if (err.code === '23505') { 
                    return res.status(400).json({ message: "User already exists" });
                }
                console.error(err.message);
                return res.status(500).json({ message: "Server error" });
            }
    
        } catch (err) {
            console.error(err.message);
            return res.status(500).json({ message: "Server error" });
        }

}