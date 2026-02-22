import { useEffect, useState, useMemo } from "react";
import Header from "../../components/Header";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "@talkjs/react-components/default.css";

const CADashboard = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [assignmentCount, setAssignmentCount] = useState(null);
  const [selectedCase, setSelectedCase] = useState(null);

  // ===== ADD BELOW EXISTING useState =====
  const [uploadedDocs, setUploadedDocs] = useState([]);
  const [showDocsModal, setShowDocsModal] = useState(false);
  const [documents, setDocuments] = useState([]);

  const [docRequest, setDocRequest] = useState({
    assignmentId: null,
    documentType: "",
  });

  const professionalId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  const kpis = {
    revenue: "₹1,20,000",
    completionRate: "92%",
  };

  /* ---------------- API Calls ---------------- */

  useEffect(() => {
    fetchClients();
    fetchClientCount();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ca/clients-list/${professionalId}`,
      );
      setAssignments(response.data);
    } catch (error) {
      toast.error("Error while fetching clients");
      console.error(error);
    }
  };

  const fetchClientCount = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/ca/clients-count/${professionalId}`,
      );
      setAssignmentCount(response.data);
    } catch (error) {
      toast.error("Error while fetching client count");
    }
  };

  /* ---------------- Helpers ---------------- */

  const filteredClients = useMemo(() => {
    return assignments.filter((a) =>
      a.name?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [assignments, searchTerm]);

  const handleStatusChange = async (assignmentId, status) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/ca/update-status`, {
        assignmentId,
        status,
      });

      setAssignments((prev) =>
        prev.map((a) =>
          a.assignmentId === assignmentId
            ? { ...a, assignmentStatus: status }
            : a,
        ),
      );

      toast.success("Status updated");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const askPayment = (assignmentId) => {
    navigate(`/dashboard/lawyer/payment/${assignmentId}`);
  };

  const cases = assignments.filter((a) => a.title);

  // ===== ADD: Fetch uploaded documents for an assignment =====
  useEffect(() => {
    fetchClients();
    fetchClientCount();
    fetchUploadedDocuments();
  }, []);

  const fetchUploadedDocuments = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/documents/ca/${professionalId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      setDocuments(res.data);
    } catch (e) {
      toast.error("Failed to load documents");
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <>
      <Header />

      <div className="font-[Poppins] bg-slate-50 px-6 md:px-14 py-10 text-gray-900">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold">Welcome, CA {name}</h1>
          <p className="text-gray-600 mt-1">
            Welcome back! Here’s an overview of your current performance.
          </p>
        </header>

        {/* KPI Section */}
        <section className="flex flex-wrap gap-5 my-10">
          <div className="flex-1 bg-white p-6 rounded-xl text-center shadow-md">
            <h3 className="text-gray-600 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-blue-600">{kpis.revenue}</p>
            <small className="text-gray-500">for this month</small>
          </div>

          <div className="flex-1 bg-white p-6 rounded-xl text-center shadow-md">
            <h3 className="text-gray-600 mb-2">Active Clients</h3>
            <p className="text-3xl font-bold text-blue-600">
              {assignmentCount}
            </p>
          </div>

          <div className="flex-1 bg-white p-6 rounded-xl text-center shadow-md">
            <h3 className="text-gray-600 mb-2">Completion Rate</h3>
            <p className="text-3xl font-bold text-blue-600">
              {kpis.completionRate}
            </p>
          </div>
        </section>

        {/* Client Database */}
        <section className="bg-white rounded-xl p-6 mb-10 shadow-md">
          <h2 className="text-2xl font-semibold mb-4">My Clients</h2>

          <input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-4 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left">Client Name</th>
                  <th className="p-3 text-left">Service Type</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Message</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredClients.map((assignment) => (
                  <tr
                    key={assignment.assignmentId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{assignment.name}</td>
                    <td className="p-3">{assignment.serviceType}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm text-white ${
                          assignment.assignmentStatus === "ACTIVE"
                            ? "bg-blue-600"
                            : assignment.assignmentStatus === "AWAITING_DETAILS"
                              ? "bg-yellow-400 text-black"
                              : "bg-red-500"
                        }`}
                      >
                        {assignment.assignmentStatus}
                      </span>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          navigate(
                            `/dashboard/ca/chat?conv_id=${assignment.assignmentId}&id=${assignment.clientId}&role=${assignment.role}&name=${encodeURIComponent(
                              assignment.name,
                            )}`,
                          )
                        }
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                      >
                        Chat
                      </button>
                    </td>

                    <td className="p-3">
                      <button
                        onClick={() =>
                          navigate(`/client/${assignment.clientId}`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                      >
                        View Profile
                      </button>

                      <button
                        onClick={() =>
                          setDocRequest({
                            assignmentId: assignment.assignmentId,
                            documentType: "",
                            requestedBy: professionalId,
                          })
                        }
                        className="ml-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md"
                      >
                        Request Doc
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
        {docRequest.assignmentId && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white p-6 rounded-xl w-[380px] shadow-xl">
              <h3 className="text-lg font-semibold mb-4">Request Document</h3>

              <select
                className="w-full border p-2 rounded-lg mb-4"
                value={docRequest.documentType}
                onChange={(e) =>
                  setDocRequest({
                    ...docRequest,
                    documentType: e.target.value,
                  })
                }
              >
                <option value="">Select Document</option>
                <option value="FORM_16">Form 16</option>
                <option value="AADHAAR">Aadhaar Card</option>
                <option value="PAN">PAN Card</option>
                <option value="BANK_STATEMENT">Bank Statement</option>
              </select>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDocRequest({ assignmentId: null })}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>

                <button
                  onClick={async () => {
                    await axios.post(
                      `${import.meta.env.VITE_API_URL}/documents/request`,
                      docRequest,
                    );
                    toast.success("Document requested");
                    setDocRequest({ assignmentId: null });
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Request
                </button>
              </div>
            </div>
          </div>
        )}

        {/* My Cases */}
        <section className="bg-white rounded-xl shadow-lg p-6 mt-10">
          <h2 className="text-2xl font-semibold mb-6 text-blue-800">
            My Cases
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left">Client</th>
                  <th className="p-3 text-left">Title</th>
                  <th className="p-3 text-left">Due Date</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Description</th>
                  <th className="p-3 text-center">Payment</th>
                </tr>
              </thead>

              <tbody>
                {cases.map((c) => (
                  <tr
                    key={c.assignmentId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{c.name}</td>
                    <td className="p-3 font-medium">{c.title}</td>
                    <td className="p-3">{c.dueDate || "N/A"}</td>

                    <td className="p-3 text-center">
                      <select
                        value={c.assignmentStatus}
                        onChange={(e) =>
                          handleStatusChange(c.assignmentId, e.target.value)
                        }
                        className="border rounded-lg px-3 py-1"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => setSelectedCase(c)}
                        className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded-md"
                      >
                        View
                      </button>
                    </td>

                    <td className="p-3 text-center">
                      <button
                        onClick={() => askPayment(c.assignmentId)}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 rounded-md"
                      >
                        Ask Payment
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Case Modal */}
        {selectedCase && (
          <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-[420px] p-6 relative">
              <h3 className="text-lg font-semibold text-blue-800 mb-3">
                Case Description
              </h3>

              <p className="text-gray-700 mb-4">
                {selectedCase.description || "No description provided"}
              </p>

              <button
                onClick={() => setSelectedCase(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
              >
                ✕
              </button>

              <div className="text-right">
                <button
                  onClick={() => setSelectedCase(null)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Document Management */}
        {/* <section className="text-center bg-white p-6 rounded-xl shadow-md mt-10">
          <h2 className="text-xl font-semibold mb-4">Document Management</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold">
            View Client Documents
          </button>
        </section> */}
      </div>

      {/* ================= Client Uploaded Documents ================= */}
      {/* <section className="bg-white rounded-xl shadow-lg p-6 mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-blue-800 ">
          Client Uploaded Documents
        </h2>

        {documents.length === 0 ? (
          <p className="text-gray-500 text-center">
            No documents uploaded by clients yet
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-left">Client</th>
                  <th className="p-3 text-left">Case</th>
                  <th className="p-3 text-left">Document Type</th>
                  <th className="p-3 text-left">Uploaded On</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {documents.map((doc) => (
                  <tr
                    key={doc.documentId}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-3">{doc.clientName}</td>
                    <td className="p-3">{doc.caseTitle}</td>
                    <td className="p-3 font-medium">
                      {doc.documentType.replace("_", " ")}
                    </td>
                    <td className="p-3">
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-center">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      */}

      <section className="mt-10 flex justify-center">
        <div className="bg-white w-full max-w-4xl rounded-xl shadow-md p-6 text-center">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Client Uploaded Documents
          </h2>

          {documents.length === 0 ? (
            <p className="text-gray-500">
              No documents uploaded by clients yet
            </p>
          ) : (
            <div className="space-y-4">
              {documents.map((doc) => (
                <div
                  key={doc.documentId}
                  className="flex items-center justify-between border p-3 rounded-lg"
                >
                  <div className="text-left">
                    <p className="font-semibold">{doc.clientName}</p>
                    <p className="text-sm text-gray-500">
                      {doc.caseTitle} • {doc.documentType}
                    </p>
                  </div>

                  <a
                    href={`${import.meta.env.VITE_API_URL}/${doc.fileUrl}`}
                    target="_blank"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                  >
                    View
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ========================================================== */}
    </>
  );
};

export default CADashboard;
