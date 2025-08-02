import PropertyForm from "./PropertyForm";

const PropertyModal = ({ mode = "view", onClose, onFormSubmit, property }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-3xl relative overflow-y-auto max-h-[90vh] shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>

        {mode === "form" ? (
          <div>
            <h2 className="text-2xl font-bold mb-4">Add New Property</h2>
            <PropertyForm onFormSubmit={onFormSubmit} />
          </div>
        ) : (
          property && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <img
                  src={
                    property.image?.startsWith("/uploads/")
                      ? `http://localhost:5000${property.image}`
                      : "https://placehold.co/400x200"
                  }
                  alt="Property"
                  className="w-full h-60 object-cover rounded"
                />

                <div className="space-y-2">
                  <h2 className="text-2xl font-bold">{property.name}</h2>
                  <p className="text-gray-700">📍 Location: {property.location}</p>
                  <p className="text-gray-700">🏷️ Type: {property.type}</p>
                  <p className="text-gray-700">💰 Price: ₹{property.price}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mt-4">📝 Description</h3>
                <p className="text-gray-700">{property.description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default PropertyModal;
