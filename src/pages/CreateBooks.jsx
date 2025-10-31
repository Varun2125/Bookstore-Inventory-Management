import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/books`, { title, author, publishYear, quantity });
      enqueueSnackbar("Book added successfully!", { variant: "success" });
      navigate("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to add book", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0] flex flex-col p-4">
      <BackButton />
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-[#fffaf7] border border-[#e6dbd0] shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-semibold text-[#7a5c58] mb-6 text-center">Add New Book</h1>

          {loading ? (
            <Spinner />
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Book Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-[#e6dbd0] focus:ring-2 focus:ring-[#d7bfae] rounded-lg px-4 py-2 mb-4"
              />
              <input
                type="text"
                placeholder="Author Name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
                className="w-full border border-[#e6dbd0] focus:ring-2 focus:ring-[#d7bfae] rounded-lg px-4 py-2 mb-4"
              />
              <input
                type="number"
                placeholder="Publish Year"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                required
                className="w-full border border-[#e6dbd0] focus:ring-2 focus:ring-[#d7bfae] rounded-lg px-4 py-2 mb-4"
              />
              <input
                type="number"
                placeholder="Quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
                className="w-full border border-[#e6dbd0] focus:ring-2 focus:ring-[#d7bfae] rounded-lg px-4 py-2 mb-6"
              />
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-[#d7bfae] hover:bg-[#c5a995] text-[#4b3a36] py-2 rounded-lg transition"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex-1 bg-white border border-[#e6dbd0] hover:bg-[#fffaf7] text-[#7a5c58] py-2 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
