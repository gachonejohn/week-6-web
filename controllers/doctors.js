const db = require("../config/db");

// Create a new doctor
exports.createDoctor = async (req, res) => {
  const { first_name, last_name, specialization, email, phone, schedule } =
    req.body;

  const query = `INSERT INTO doctors (first_name, last_name, specialization, email, phone, schedule)
                 VALUES (?, ?, ?, ?, ?, ?)`;

  try {
    await db.execute(query, [
      first_name,
      last_name,
      specialization,
      email,
      phone,
      schedule,
    ]);
    res.status(201).json({ message: "Doctor created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating doctor", error: err });
  }
};

// Get all doctors
exports.getDoctors = async (req, res) => {
  const query = "SELECT * FROM doctors";

  try {
    const [rows] = await db.execute(query);
    res.status(200).json(rows);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors", error: err });
  }
};

// Update doctor information
exports.updateDoctor = async (req, res) => {
  const { id, first_name, last_name, specialization, email, phone, schedule } =
    req.body;

  const query = `UPDATE doctors SET first_name = ?, last_name = ?, specialization = ?, email = ?, phone = ?, schedule = ?
                 WHERE id = ?`;

  try {
    await db.execute(query, [
      first_name,
      last_name,
      specialization,
      email,
      phone,
      schedule,
      id,
    ]);
    res.status(200).json({ message: "Doctor updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating doctor", error: err });
  }
};

// Delete a doctor (or deactivate)
exports.deleteDoctor = async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM doctors WHERE id = ?`;

  try {
    await db.execute(query, [id]);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting doctor", error: err });
  }
};
