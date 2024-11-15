const bcrypt = require("bcryptjs");
const db = require("../config/db");

// Patient Registration
exports.register = async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    password,
    phone,
    date_of_birth,
    gender,
    address,
  } = req.body;
  const password_hash = await bcrypt.hash(password, 10);

  const query = `INSERT INTO patients (first_name, last_name, email, password_hash, phone, date_of_birth, gender, address)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  try {
    await db.execute(query, [
      first_name,
      last_name,
      email,
      password_hash,
      phone,
      date_of_birth,
      gender,
      address,
    ]);
    res.status(201).json({ message: "Patient registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error registering patient", error: err });
  }
};

// Patient Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM patients WHERE email = ?";
  try {
    const [rows] = await db.execute(query, [email]);
    if (rows.length === 0)
      return res.status(404).json({ message: "Patient not found" });

    const patient = rows[0];
    const isMatch = await bcrypt.compare(password, patient.password_hash);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    req.session.patientId = patient.id; // Store patient ID in session
    res.json({ message: "Login successful" });
  } catch (err) {
    res.status(500).json({ message: "Error logging in", error: err });
  }
};

// Patient Profile Management
exports.updateProfile = async (req, res) => {
  const { first_name, last_name, phone, date_of_birth, gender, address } =
    req.body;
  const patientId = req.session.patientId;

  const query = `UPDATE patients SET first_name = ?, last_name = ?, phone = ?, date_of_birth = ?, gender = ?, address = ?
                 WHERE id = ?`;

  try {
    await db.execute(query, [
      first_name,
      last_name,
      phone,
      date_of_birth,
      gender,
      address,
      patientId,
    ]);
    res.json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error updating profile", error: err });
  }
};
