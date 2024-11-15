const express = require("express");
const router = express.Router();

// Controllers
const patientController = require("../controllers/patients");
const doctorController = require("../controllers/doctors");
const appointmentController = require("../controllers/appointments");
const adminController = require("../controllers/admin");

// Patient Routes
router.post("/patients/register", patientController.register); // Register new patient
router.post("/patients/login", patientController.login); // Patient login
router.put("/patients/profile", patientController.updateProfile); // Update profile

// Doctor Routes (Admin only)
router.post("/doctors", doctorController.createDoctor); // Create new doctor
router.get("/doctors", doctorController.getDoctors); // Get all doctors
router.put("/doctors", doctorController.updateDoctor); // Update doctor details
router.delete("/doctors/:id", doctorController.deleteDoctor); // Delete a doctor

// Appointment Routes
router.post("/appointments", appointmentController.createAppointment); // Book an appointment
router.get("/appointments", appointmentController.getPatientAppointments); // Get patient appointments
router.get(
  "/appointments/doctor/:doctor_id",
  appointmentController.getDoctorAppointments
); // Get doctor appointments
router.put(
  "/appointments/cancel/:appointment_id",
  appointmentController.cancelAppointment
); // Cancel an appointment

// Admin Routes
router.get("/admin/appointments", adminController.getAllAppointments); // View all appointments
router.post("/admin/doctors", adminController.createDoctor); // Admin creates new doctor

module.exports = router;
