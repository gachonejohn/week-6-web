const db = require("../config/db");

// View all appointments
exports.getAllAppointments = async (req, res) => {
  const query =
    "SELECT * FROM appointments ORDER BY appointment_date, appointment_time";

  try {
    const [appointments] = await db.execute(query);
    res.status(200).json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: err });
  }
};

// Create a new doctor (admin only)
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
