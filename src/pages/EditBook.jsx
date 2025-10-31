// EditBook.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [book, setBook] = useState({
    title: "",
    author: "",
    publishYear: "",
    quantity: 1,
  });
  const [loading, setLoading] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/books/${id}`);
        // backend might return { data: book } or book object directly
        const data = res.data.data ?? res.data;
        setBook(data);
      } catch (error) {
        console.error(error);
        enqueueSnackbar("Failed to load book", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`${API_URL}/books/${id}`, book);
      enqueueSnackbar("Book updated successfully!", { variant: "success" });
      navigate(`/books/details/${id}`);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to update book", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f5f0] flex flex-col p-4">
      <BackButton />
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-[#fffaf7] border border-[#e6dbd0] shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-semibold text-[#7a5c58] mb-6 text-center">Edit Book</h1>

          {loading ? (
            <Spinner />
          ) : (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Title"
                value={book.title}
                onChange={(e) => setBook({ ...book, title: e.target.value })}
                required
                className="w-full border border-[#e6dbd0] focus:ring-2 focus:ring-[#d7bfae] rounded-lg px-4 py-2 mb-4"
              />
              <input
                type="text"
                placeholder="Author"
                value={book.author}
                onChange={(e) => setBook({ ...book, author: e.target.value })}
                required
                className="w-full border border-[#e6dbd0] focus:ring-2 focus:ring-[#d7bfae] rounded-lg px-4 py-2 mb-4"
              />
              <input
                type="number"
                placeholder="Publish Year"
                value={book.publishYear}
                onChange={(e) => setBook({ ...book, publishYear: e.target.value })}
                required
                className="w-full border border-[#e6dbd0] focus:ring-2 focus:ring-[#d7bfae] rounded-lg px-4 py-2 mb-4"
              />
              <input
                type="number"
                placeholder="Quantity"
                min="1"
                value={book.quantity}
                onChange={(e) => setBook({ ...book, quantity: Number(e.target.value) })}
                required
                className="w-full border border-[#e6dbd0] focus:ring-2 focus:ring-[#d7bfae] rounded-lg px-4 py-2 mb-6"
              />
              <div className="flex gap-3">
                <button type="submit" className="flex-1 bg-[#d7bfae] hover:bg-[#c5a995] text-[#4b3a36] py-2 rounded-lg transition">
                  Update
                </button>
                <button type="button" onClick={() => navigate(`/books/details/${id}`)} className="flex-1 bg-white border border-[#e6dbd0] hover:bg-[#fffaf7] text-[#7a5c58] py-2 rounded-lg transition">
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

export default EditBook;
