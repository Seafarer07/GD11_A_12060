import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Table, Button, Modal, Form } from "react-bootstrap";
import { FaPlus, FaEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "sonner";

const DashboardPage = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [employees, setEmployees] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editEmployee, setEditEmployee] = useState({
        id: null,
        name: "",
        position: "",
        salary: "",
        jobDescription: "",
    });

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    const formatDate = (date) => {
        const options = {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric",
        };
        return new Date(date).toLocaleDateString("id-ID", options);
    };

    const handleSaveEmployee = () => {
        if (editEmployee.id) {
            // Edit employee
            setEmployees(employees.map(emp => 
                emp.id === editEmployee.id ? editEmployee : emp
            ));
            toast.success(`Berhasil Edit Data ${editEmployee.name} !`);
        } else {
            // Add new employee
            setEmployees([ 
                ...employees, 
                {
                    id: Date.now(),
                    name: editEmployee.name,
                    position: editEmployee.position,
                    salary: editEmployee.salary,
                    jobDescription: editEmployee.jobDescription,
                }
            ]);
            toast.success(`Berhasil Tambah Data ${editEmployee.name} !`); 
        }
        setShowModal(false);
        setEditEmployee({
            id: null,
            name: "",
            position: "",
            salary: "",
            jobDescription: "",
        });
    };

    const handleEditEmployee = (employee) => {
        setEditEmployee(employee);
        setShowModal(true);
    };

    const handleDeleteEmployee = (id) => {
        const deletedEmployee = employees.find(emp => emp.id === id);
        setEmployees(employees.filter(emp => emp.id !== id));
        toast.success(`Berhasil Hapus Data ${deletedEmployee.name} !`);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setEditEmployee({
            id: null,
            name: "",
            position: "",
            salary: "",
            jobDescription: "",
        });
    };

    return (
        <Container className="mt-5">
            <h1 className="mb-3 border-bottom fw-bold">Dashboard</h1>
            <Row className="mb-4">
                <Col md={10}>
                    <Card className="h-100 justify-content-center">
                        <Card.Body>
                            <h4>Selamat datang,</h4>
                            <h1 className="fw-bold display-6 mb-3">{user?.username}</h1>
                            <p className="mb-4">Kamu sudah login sejak:</p>
                            <p className="fw-bold lead mb-0">{formatDate(user?.loginAt)}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={2}>
                    <Card>
                        <Card.Body>
                            <p>Bukti sedang ngantor:</p>
                            <img
                                src="https://via.placeholder.com/150"
                                className="img-fluid rounded"
                                alt="Tidak Ada Gambar"
                            />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row className="mt-4">
                <Col md={12}>
                    <div className="mb-3">
                        <h1 className="mb-3 fw-bold">Daftar Karyawan</h1>
                    </div>

                    <p>Saat ini terdapat <strong>{employees.length}</strong> karyawan</p>

                    <div className="d-flex justify-content-start mt-3 mb-3">
                        <Button variant="success" onClick={() => setShowModal(true)}>
                            <FaPlus /> Tambah Karyawan
                        </Button>
                    </div>

                    <Table responsive striped bordered hover>
                        <thead style={{ backgroundColor: "#A7C7E7" }}>
                            <tr>
                                <th className="text-center" style={{backgroundColor: "#A7C7E7", border: 'none' }}>No</th>
                                <th className="text-center" style={{backgroundColor: "#A7C7E7", border: 'none' }}>Jabatan</th>
                                <th className="text-center" style={{backgroundColor: "#A7C7E7", border: 'none' }}>Nama</th>
                                <th className="text-center" style={{backgroundColor: "#A7C7E7", border: 'none' }}>Gaji</th>
                                <th className="text-center" style={{backgroundColor: "#A7C7E7", border: 'none' }}>Jobdesk</th>
                                <th className="text-center" style={{backgroundColor: "#A7C7E7", border: 'none' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.length > 0 ? (
                                employees.map((employee, index) => (
                                    <tr key={employee.id}>
                                        <td className="text-center" style={{ border: 'none' }}>{index + 1}</td>
                                        <td className="text-center" style={{ border: 'none' }}>{employee.position}</td>
                                        <td className="text-center" style={{ border: 'none' }}>{employee.name}</td>
                                        <td className="text-center" style={{ border: 'none' }}>Rp {employee.salary}</td>
                                        <td className="text-center" style={{ border: 'none' }}>{employee.jobDescription}</td>
                                        <td className="text-center" style={{ border: 'none' }}>
                                            <Button
                                                variant="danger"
                                                onClick={() => handleDeleteEmployee(employee.id)}
                                                size="sm"
                                                className="me-2"
                                            >
                                                <FaTrashAlt /> Hapus
                                            </Button>
                                            <Button
                                                variant="primary"
                                                className="me-2"
                                                onClick={() => handleEditEmployee(employee)}
                                                size="sm"
                                            >
                                                <FaEdit /> Edit
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">Tidak ada data karyawan</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{editEmployee.id ? "Edit Karyawan" : "Tambah Karyawan"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formName">
                            <Form.Label>Nama Karyawan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nama Karyawan"
                                value={editEmployee.name}
                                onChange={(e) =>
                                    setEditEmployee({ ...editEmployee, name: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="formPosition">
                            <Form.Label>Jabatan Karyawan</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Pilih Jabatan"
                                value={editEmployee.position}
                                onChange={(e) =>
                                    setEditEmployee({ ...editEmployee, position: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="formSalary">
                            <Form.Label>Gaji</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Gaji"
                                value={editEmployee.salary}
                                onChange={(e) =>
                                    setEditEmployee({ ...editEmployee, salary: e.target.value })
                                }
                            />
                        </Form.Group>

                        <Form.Group controlId="formJobDescription">
                            <Form.Label>Jobdesk Karyawan</Form.Label>
                            <Form.Control
                                as="textarea"
                                placeholder="Jobdesk Karyawan"
                                value={editEmployee.jobDescription}
                                onChange={(e) =>
                                    setEditEmployee({ ...editEmployee, jobDescription: e.target.value })
                                }
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalClose}>
                        Batal
                    </Button>
                    <Button variant="primary" onClick={handleSaveEmployee}>
                        Simpan
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default DashboardPage;
