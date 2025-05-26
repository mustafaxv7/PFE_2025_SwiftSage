import con from '../config/db.js';
import dotenv from 'dotenv';

dotenv.config();

export const deleteAlert = async (req, res) => {
  const { id } = req.params;
  
  if (!id) {
    return res.status(400).json({ error: 'Alert ID is required' });
  }

  try {
    
    const checkQuery = 'SELECT id FROM alerts WHERE id = $1';
    const checkResult = await con.query(checkQuery, [id]);
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({ error: 'Alert not found' });
    }
    
    const deleteQuery = 'DELETE FROM alerts WHERE id = $1 RETURNING id';
    const deleteResult = await con.query(deleteQuery, [id]);
    
    res.status(200).json({ 
      success: true, 
      message: 'Alert deleted successfully',
      id: deleteResult.rows[0].id
    });
    
  } catch (error) {
    console.error('Error deleting alert:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
