import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleDeleteBook = async () => {
    setLoading(true);
    try {
      await axios.delete(`${API_URL}/books/${id}`);
      enqueueSnackbar("Book deleted successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      enqueueSnackbar("Error deleting book", { variant: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col p-4 bg-milk-bg">
      <BackButton />
      <div className="flex-grow flex items-center justify-center">
        <div className="app-card p-8 w-full max-w-md text-center">
          <h1 className="text-2xl font-semibold text-milk-accent mb-3">
            Delete Book
          </h1>
          <p className="text-milk-text mb-6">
            Are you sure you want to permanently remove this book?
          </p>

          {loading ? (
            <Spinner />
          ) : (
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDeleteBook}
                className="bg-[#e8b4b8] hover:bg-[#e29ca2] text-[#4b3a36] font-medium px-6 py-2 rounded-lg transition"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-white border border-milk-border hover:bg-milk-card text-milk-accent font-medium px-6 py-2 rounded-lg transition"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
