const PropertyCard = ({ property, onView }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4 flex items-center justify-between">
      <h3 className="text-base font-semibold text-gray-800">{property.name}</h3>
      <button
        onClick={onView}
        className="text-sm px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
      >
        View
      </button>
    </div>
  );
};

export default PropertyCard;
