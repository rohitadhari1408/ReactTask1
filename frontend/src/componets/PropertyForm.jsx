import { useState } from "react";
import { propertyTypeOptions } from "../utils";

const PropertyForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    location: "",
    description: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];
      setFormData({ ...formData, image: file });

      // Preview image
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result);
        };
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof onFormSubmit !== "function") {
      console.error("❌ `onFormSubmit` prop must be a function");
      return;
    }

    const form = new FormData();
    for (let key in formData) {
      if (formData[key]) form.append(key, formData[key]);
    }

    onFormSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <select
  name="type"
  value={formData.type}
  onChange={handleChange}
  required
  className="w-full border p-2 rounded"
>
  <option value="">Select Property Type</option>
  {propertyTypeOptions.map((option) => (
    <option key={option.value} value={option.value}>
      {option.label}
    </option>
  ))}
</select>

      <div>
        <label className="block text-sm font-medium">Price</label>
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Location</label>
        <input
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="w-full border p-2 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Image</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 rounded w-full max-h-64 object-cover"
          />
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default PropertyForm;
