const db = require("../config/db");

// Book an appointment
exports.createAppointment = async (req, res) => {
  const { doctor_id, appointment_date, appointment_time } = req.body;
  const patient_id = req.session.patientId; // Get the logged-in patient's ID

  const query = `INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status)
                 VALUES (?, ?, ?, ?, 'scheduled')`;

  try {
    await db.execute(query, [
      patient_id,
      doctor_id,
      appointment_date,
      appointment_time,
    ]);
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error booking appointment", error: err });
  }
};

// Get a list of upcoming appointments for a patient
exports.getPatientAppointments = async (req, res) => {
  const patientId = req.session.patientId; // Get the logged-in patient's ID
  const query = `SELECT * FROM appointments WHERE patient_id = ? AND status != 'canceled' ORDER BY appointment_date, appointment_time`;

  try {
    const [appointments] = await db.execute(query, [patientId]);
    res.status(200).json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: err });
  }
};

// Get a list of upcoming appointments for a doctor
exports.getDoctorAppointments = async (req, res) => {
  const doctorId = req.params.doctor_id;
  const query = `SELECT * FROM appointments WHERE doctor_id = ? AND status != 'canceled' ORDER BY appointment_date, appointment_time`;

  try {
    const [appointments] = await db.execute(query, [doctorId]);
    res.status(200).json(appointments);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching appointments", error: err });
  }
};

// Cancel an appointment
exports.cancelAppointment = async (req, res) => {
  const { appointment_id } = req.params;
  const query = `UPDATE appointments SET status = 'canceled' WHERE id = ?`;

  try {
    await db.execute(query, [appointment_id]);
    res.status(200).json({ message: "Appointment canceled successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error canceling appointment", error: err });
  }
};
