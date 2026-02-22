import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import ChatPage from "../chat/chat";
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

  const [docRequests, setDocRequests] = useState([]);
  // const [uploadFile, setUploadFile] = useState(null);
  // 🔹 CHANGE #0: replaced single uploadFile with map-based state
  const [uploadFiles, setUploadFiles] = useState({});

  /*Requesting Documents backend api*/
  useEffect(() => {
    fetchDocumentRequests();
  }, []);

  const fetchDocumentRequests = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/documents/requests/user/${userId}`,
    );
    setDocRequests(res.data);
  };

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
      `${
        import.meta.env.VITE_API_URL
      }/assignments/assigned-professional/${userId}`,
    );
    setAssignments(res.data);
    console.log(res.data);
  };

  const openForm = (assignment) => {
    setSelectedAssignment(assignment);
  };

  const submitDetails = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/assignments/submit-details/${
          selectedAssignment.assignmentId
        }`,
        formData,
      );
      //console.log(response);
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
          <h1>Welcome back, {name}</h1>
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
                "_blank",
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
              ),
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
                  // chat Button
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                    onClick={() => {
                      navigate(
                        `/user/dashboard/chat?conv_id=${
                          assignment.assignmentId
                        }&id=${assignment.clientId}&role=${
                          assignment.role
                        }&name=${encodeURIComponent(assignment.name)}`,
                      );
                    }}
                  >
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
        {docRequests.map((req) => (
          <div
            key={req.id} //  FIX
            className="flex items-center justify-between bg-white p-3 rounded-lg border mb-2"
          >
            <div>
              <p className="font-semibold">
                {req.documentType.replace("_", " ")}
              </p>
              <small className="text-gray-500">
                Requested by {req.professionalName}
              </small>
            </div>

            <input
              type="file"
              onChange={(e) =>
                setUploadFiles((prev) => ({
                  ...prev,
                  [req.id]: e.target.files[0], //
                }))
              }
            />

            <button
              onClick={async () => {
                const file = uploadFiles[req.id]; // 

                if (!file) {
                  alert("Please select a file first");
                  return;
                }

                const formData = new FormData();
                formData.append("file", file);
                formData.append("requestId", req.id);

                await axios.post(
                  `${import.meta.env.VITE_API_URL}/documents/upload`,
                  formData,
                  {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                  },
                );

                alert("Document uploaded");
                fetchDocumentRequests();
              }}
              className="upload-btn"
            >
              Upload
            </button>
          </div>
        ))}

        {/* G. Recent Documents */}

        {/* <section className="recent-docs">
          <h2>Client Documents</h2>

          {documents.length === 0 ? (
            <p className="text-gray-500">No documents uploaded yet</p>
          ) : (
            <ul>
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex justify-between items-center border-b py-2"
                >
                  <span>{doc.documentType.replace("_", " ")}</span>

                  {doc.status === "UPLOADED" ? (
                    <a
                      href={`${import.meta.env.VITE_API_URL}/documents/download/${doc.id}`}
                      target="_blank"
                      className="view-btn"
                    >
                      Download
                    </a>
                  ) : (
                    <span className="text-gray-400 text-sm">Pending</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </section> */}
      </div>
    </>
  );
};

export default UserDashboard;

