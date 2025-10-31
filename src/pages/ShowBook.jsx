// ShowBook.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useSnackbar } from "notistack";

const ShowBook = () => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_URL}/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(() => {
        enqueueSnackbar("Error fetching book", { variant: "error" });
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Spinner />;
  if (!book) return null;

  return (
    <div className="min-h-screen bg-[#f9f5f0] p-4">
      <BackButton />
      <div className="max-w-lg mx-auto bg-[#fffaf7] border border-[#e6dbd0] rounded-2xl shadow-lg p-8 mt-8">
        <h1 className="text-3xl font-semibold text-[#7a5c58] mb-4">
          {book.title}
        </h1>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Author:</span> {book.author}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Publish Year:</span> {book.publishYear}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-medium">Quantity:</span> {book.quantity}
        </p>

        <div className="mt-6 flex justify-between">
          <button
            onClick={() => navigate(`/books/edit/${book._id}`)}
            className="bg-[#d7bfae] hover:bg-[#c5a995] text-[#4b3a36] px-5 py-2 rounded-lg transition"
          >
            Edit
          </button>
          <button
            onClick={() => navigate(`/books/delete/${book._id}`)}
            className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-lg transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShowBook;
