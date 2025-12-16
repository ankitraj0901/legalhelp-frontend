import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import "./UserDashboard.css";
import axios from "axios";

const UserDashboard = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  // api to get user details and related data
  const user = {
    name: "Ankit",
    nextAction: { label: "Review Draft ITR", status: "Pending Action" },
    ca: {
      assigned: true,
      name: "CA Rahul Verma",
      photo: "https://via.placeholder.com/60",
      lastUpdate: "Nov 5, 2025",
      summary: "Reviewed your FY 2024 ITR draft.",
    },
    recentDocs: [
      "Form 16.pdf",
      "Aadhaar Card.pdf",
      "Filed ITR-1 Acknowledgement.pdf",
    ],
  };

  //getting assigned assignment to the user

  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
    serviceType: "",
  });

  const serviceTypes = [
    "ITR_Filing",
    "GST_Return",
    "Property_Case",
    "Legal_Notice",
    "Divorce_Consultation",
  ];

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    const res = await axios.get(
      `http://localhost:8080/assignments/assigned-professional/${userId}`
    );
    setAssignments(res.data);
    console.log(res);
  };

  const openForm = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const submitDetails = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/assignments/submit-details/${selectedAssignment.assignmentId}`,
        formData
      );
      console.log(response);
      await fetchAssignments();
      setSelectedAssignment(null);
    } catch (err) {
      console.error(err);
    }
  };

  const [files, setFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    const fileNames = Array.from(files).map((file) => file.name);
    setUploadedFiles((prev) => [...prev, ...fileNames]);
    setFiles([]);
    alert("Files uploaded successfully!");
  };

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (role === "CA") {
      navigate("/dashboard/ca");
    } else if (role === "USER") {
      navigate("/user/dashboard");
    } else if (role === "LAWYER") {
      navigate("/dashboard/lawyer");
    } else if (role === "CONSULTANT") {
      navigate("/dashboard/consultant");
    }
  }, []);

  return (
    <>
      <Header></Header>
      <div className="dashboard-container">
        {/* A. Header */}
        <header className="dashboard-header">
          <h1>Welcome back! {name}</h1>
          <p>Here's what's happening today 👇</p>
        </header>

        {/* B. Quick Status Widget */}
        <section className="status-widget">
          <div className="status-info">
            <h2>Next Action:</h2>
            <p className="status-label">{user.nextAction.label}</p>
          </div>
          <span
            className={`status-badge ${
              user.nextAction.status === "Pending Action"
                ? "badge-red"
                : "badge-blue"
            }`}
          >
            {user.nextAction.status}
          </span>
        </section>

        {/* C. Primary CTAs */}
        <section className="cta-section">
          {/* Opening Income tax website iin new tab  */}

          <button
            className="cta-btn cta-blue"
            onClick={() => {
              window.open(
                "https://www.incometax.gov.in/iec/foportal/",
                "_blank"
              );
            }}
          >
            File My Taxes Now
          </button>

          {/* Button for CA List */}
          <button
            className="cta-btn cta-green"
            onClick={() => {
              navigate("/user/dashboard/caList");
            }}
          >
            {user.ca.assigned ? "Connect with My CA" : "Find a CA"}
          </button>

          {/* Button for Lawyer List */}
          <button
            className="cta-btn cta-green"
            onClick={() => {
              navigate("/user/dashboard/lawyerList");
            }}
          >
            {/* Button for Consultant List */}
            {user.ca.assigned ? "Connect with My Lawyer" : "Find a CA"}
          </button>
          <button
            className="cta-btn cta-green"
            onClick={() => {
              navigate("/user/dashboard/consultantList");
            }}
          >
            {user.ca.assigned ? "Connect with My Consultant" : "Find a CA"}
          </button>
        </section>

        {/* D. Service Timeline */}
        <section className="timeline-section">
          <h2>ITR Filing Progress</h2>
          <div className="timeline">
            {["Docs Uploaded", "Verification", "E-Filing"].map(
              (step, index) => (
                <div key={index} className="timeline-step">
                  <div className={`circle ${index < 2 ? "completed" : ""}`}>
                    {index < 2 ? "✓" : index + 1}
                  </div>
                  <p>{step}</p>
                  {index < 2 && <div className="line"></div>}
                </div>
              )
            )}
          </div>
        </section>

        {/* E. CA Support Status */}
        {/* all the assignments are stored in assignment i am using map to extract assignment one by one and print them on the user dashboard */}
        <div className="p-6 space-y-4">
          {assignments.map((assignment) => (
            <section
              key={assignment.assignmentId}
              className="flex items-center gap-4 p-4 bg-white shadow-md rounded-lg border"
            >
              {/* Avatar */}
              <img
                src="/default-photo.png"
                alt="Professional"
                className="w-14 h-14 rounded-full object-cover"
              />

              {/* Professional Info */}
              <div className="flex-1">
                <h3 className="text-lg font-semibold flex items-center">
                  {assignment.name}
                  <span className="ml-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded-full">
                    {assignment.role}
                  </span>
                </h3>

                <p className="text-sm text-gray-600">
                  Status: {assignment.assignmentStatus}
                </p>
              </div>

              {/* ⭐ Conditional Button (Submit or Chat) */}
              <div>
                {assignment.assignmentStatus === "AWAITING_DETAILS" ? (
                  <button
                    onClick={() => openForm(assignment)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Submit Details
                  </button>
                ) : (
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                    Chat
                  </button>
                )}
              </div>
            </section>
          ))}

          {selectedAssignment && (
            <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex justify-center items-center z-50">
              <div className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl animate-fadeIn">
                <h2 className="text-xl font-bold mb-4 text-gray-800">
                  Submit Case Details
                </h2>

                <div className="space-y-4">
                  {/* Title */}
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />

                  {/* Description */}
                  <textarea
                    placeholder="Description"
                    rows="3"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                  />

                  {/* Due Date */}
                  <div>
                    <label className="text-sm font-medium text-gray-700">
                      Due Date
                    </label>
                    <input
                      type="date"
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData({ ...formData, dueDate: e.target.value })
                      }
                    />
                  </div>

                  {/* Service Type Dropdown */}
                  <select
                    className="w-full p-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 outline-none"
                    value={formData.serviceType}
                    onChange={(e) =>
                      setFormData({ ...formData, serviceType: e.target.value })
                    }
                  >
                    <option value="">Select Service Type</option>

                    {serviceTypes.map((service) => (
                      <option key={service} value={service}>
                        {service.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    onClick={() => setSelectedAssignment(null)}
                    className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={submitDetails}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* F. AI Tool Access */}
        <section className="ai-tools">
          <h2>AI Tool Access</h2>

          <div className="tool-cards">
            <div className="tool-card blue">
              <Link to="./tax-prediction" className="no-underline text-inherit">
              <h3>Tax Predictor</h3>
              <p>Explore now →</p>
              </Link>
            </div>
            <div className="tool-card green">
              <Link to="./tax-optimizer" className="no-underline text-inherit">
              <h3>Deduction Optimizer</h3>
              <p>Explore now →</p>
              </Link>
            </div>
            <div className="tool-card yellow">
              <Link to="./investment" className="no-underline text-inherit">
              <h3>Compliance Check</h3>
              <p>Explore now →</p>
              </Link>
            </div>
          </div>
        </section>

        {/* === Document Upload Section === */}
        <div className="document-upload">
          <h2>Upload Documents</h2>
          <form className="upload-form" onSubmit={handleUpload}>
            <input
              type="file"
              multiple
              onChange={(e) => setFiles(e.target.files)}
              className="file-input"
            />
            <button type="submit" className="upload-btn">
              Upload
            </button>
          </form>

          <div className="uploaded-files">
            {/* <h3>Uploaded Files</h3> */}
            <ul>
              {uploadedFiles.map((file, index) => (
                <li key={index}>{file}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* G. Recent Documents */}
        <section className="recent-docs">
          <h2>Recent Documents</h2>
          <ul>
            {user.recentDocs.map((doc, i) => (
              <li key={i}>
                <span>{doc}</span>
                <button className="view-btn">View</button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
};

export default UserDashboard;
