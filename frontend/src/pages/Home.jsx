import axios from "axios";
import { useEffect, useState } from "react";
import PropertyCard from "../componets/PropertyCard";
import PropertyForm from "../componets/PropertyForm";
import PropertyModal from "../componets/PropertyModal";
import { propertyTypeOptions } from "../utils";

const Home = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [modalMode, setModalMode] = useState("view");
  const [showModal, setShowModal] = useState(false);

  const fetchProperties = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/properties");
      setProperties(res.data);
    } catch (err) {
      console.error("Error fetching properties:", err);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleView = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/properties/${id}`);
      setSelected(res.data);
      setModalMode("view");
      setShowModal(true);
    } catch (err) {
      console.error("Error fetching property:", err);
    }
  };

  const handleAddClick = () => {
    setSelected(null);
    setModalMode("form");
    setShowModal(true);
  };

  const handleAddProperty = async (formData) => {
    try {
      const res = await axios.post("http://localhost:5000/api/properties", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProperties([...properties, res.data]);
      setShowModal(false);

    } catch (error) {
      console.error("Error adding property:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelected(null);
  };

  const filtered = properties.filter((p) =>
    (p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())) &&
    (!filter || p.type === filter)
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-center">🏠 Property Listings</h1>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex gap-2 flex-1">
          <input
            placeholder="Search by name/location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 border rounded w-full"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            {propertyTypeOptions.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleAddClick}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          ➕ Add Property
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((p) => (
          <PropertyCard key={p._id} property={p} onView={() => handleView(p._id)} />
        ))}
      </div>

      {showModal && (
        <PropertyModal
          mode={modalMode}
          property={selected}
          onClose={handleCloseModal}
          onFormSubmit={modalMode === "form" ? handleAddProperty : undefined}
        />
      )}
    </div>
  );
};

export default Home;
