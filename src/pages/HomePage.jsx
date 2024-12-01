import { Container, Row, Col } from "react-bootstrap";
import ImageCarousel from "../components/ImageCarousel";
import imgFeaturette1 from "../assets/images/featurette1.jpg";
import imgFeaturette2 from "../assets/images/featurette2.jpg";
import imgFeaturette3 from "../assets/images/featurette3.jpeg";
import imgFeaturette4 from "../assets/images/featurette4.jpeg";
import imgBakery1 from "../assets/images/bakery1.jpeg";
import imgBakery2 from "../assets/images/bakery2.jpeg";
import imgBakery3 from "../assets/images/bakery3.jpeg";

const images = [
  {
    img: imgBakery1,
    title: "First slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
  },
  {
    img: imgBakery2,
    title: "Second slide label",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    img: imgBakery3,
    title: "Third slide label",
    description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
  },
];

const sections = [
  {
    id: 1,
    title: "Bakery pertama dan satu-satunya yang fiksional.",
    content: [
      "Diciptakan oleh [Chef EL], Mahasiswa Universitas Atma Jaya Yogyakarta dari program studi Informatika.",
      "Nomor Pokok Mahasiswa: [220712060]."
    ],
    imgSrc: imgFeaturette1,
    imgAlt: "Gambar featurette1",
    imgPosition: "right"
  },
  {
    id: 2,
    title: "Roti dengan Rasa yang Memikat Hati",
    content: [
      "Setiap gigitan roti kami dipanggang dengan resep rahasia yang sudah turun-temurun. Roti kami membawa kenangan masa kecil yang tak terlupakan.",
      "Cobalah Roti Pandan Keju, favorit pelanggan yang pasti membuat Anda ingin tambah lagi!"
    ],
    imgSrc: imgFeaturette2,
    imgAlt: "Gambar featurette2",
    imgPosition: "left"
  },
  {
    id: 3,
    title: "Kue Spesial untuk Momen Tak Terlupakan",
    content: [
      "Kami menawarkan berbagai macam kue spesial yang pastinya pas untuk hari spesial anda. Setiap kue dibuat dengan penuh perasaan, bahan berkualitas dan tentu dihiasi dengan desain unik.",
      "Jika Anda membutuhkan kue yang disesuaikan dengan tema acara, kami siap membantu mewujudkannya!"
    ],
    imgSrc: imgFeaturette3,
    imgAlt: "Gambar featurette3",
    imgPosition: "right"
  },
  {
    id: 4,
    title: "Pesan dan Antar, Nikmati Roti Tanpa Ribet",
    content: [
      "Kami menyediakan layanan antar roti dan kue segar langsung ke rumah Anda. Tidak perlu keluar rumah, kami pastikan roti tetap segar sampai di tangan Anda.",
      "Pesan roti favorit Anda sekarang juga, dan nikmati kenyamanan layanan antar cepat kami!"
    ],
    imgSrc: imgFeaturette4,
    imgAlt: "Gambar featurette4",
    imgPosition: "left"
  },
];

const HomePage = () => {
  return (
    <>
      <ImageCarousel images={images} />
      <Container className="mt-5">
        {sections.map((section) => (
          <Row className="mt-5" key={section.id}>
            {section.imgPosition === "right" ? (
              <>
                <Col md={7}>
                  <h2 className="fw-normal">{section.title}</h2>
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="lead">{paragraph}</p>
                  ))}
                </Col>
                <Col md={5}>
                  <img
                    src={section.imgSrc}
                    className="img-fluid mx-auto rounded shadow"
                    role="img"
                    aria-label={section.imgAlt}
                    style={{ objectFit: "cover", height: "300px", width: "500px" }}
                  />
                </Col>
              </>
            ) : (
              <>
                <Col md={5}>
                  <img
                    src={section.imgSrc}
                    className="img-fluid mx-auto rounded shadow"
                    role="img"
                    aria-label={section.imgAlt}
                    style={{ objectFit: "cover", height: "300px", width: "500px" }}  />
                </Col>
                <Col md={7}>
                  <h2 className="fw-normal">{section.title}</h2>
                  {section.content.map((paragraph, idx) => (
                    <p key={idx} className="lead">{paragraph}</p>
                  ))}
                </Col>
              </>
            )}
          </Row>
        ))}
        <hr className="mt-5 mb-5" />
      </Container>
    </>
  );
};

export default HomePage;
