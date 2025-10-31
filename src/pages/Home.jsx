import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";
import { useSnackbar } from "notistack";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  // default behavior: if no viewMode saved, use 'table'
  const initialView = localStorage.getItem("viewMode");
  const [showType, setShowType] = useState(initialView ? initialView : "table");

  const { enqueueSnackbar } = useSnackbar();
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    // if nothing in localStorage, set default 'table'
    if (!localStorage.getItem("viewMode")) localStorage.setItem("viewMode", "table");

    const fetchBooks = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${API_URL}/books`);
        // If your backend wraps data in { data: [...] } or returns array directly adjust:
        // if res.data.data exists use res.data.data else use res.data
        const data = res.data.data ?? res.data;
        setBooks(data);
      } catch (err) {
        console.error(err);
        enqueueSnackbar("Failed to load books", { variant: "error" });
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [API_URL]);

  const handleViewChange = (type) => {
    setShowType(type);
    localStorage.setItem("viewMode", type);
  };

  return (
    <div className="p-6 min-h-screen bg-[#f9f5f0]">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl text-[#7a5c58] font-semibold">Books List</h1>
          <span className="text-sm text-gray-500">({books.length})</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleViewChange("table")}
            className={`px-3 py-1 rounded-md transition ${
              showType === "table"
                ? "bg-[#d7bfae] text-[#4b3a36]"
                : "bg-white border border-[#e6dbd0] text-[#7a5c58] hover:bg-[#fffaf7]"
            }`}
          >
            Table
          </button>

          <button
            onClick={() => handleViewChange("card")}
            className={`px-3 py-1 rounded-md transition ${
              showType === "card"
                ? "bg-[#d7bfae] text-[#4b3a36]"
                : "bg-white border border-[#e6dbd0] text-[#7a5c58] hover:bg-[#fffaf7]"
            }`}
          >
            Card
          </button>

          <Link
            to="/books/create"
            className="ml-4 flex items-center gap-2 bg-[#d7bfae] hover:bg-[#c5a995] text-[#4b3a36] px-4 py-2 rounded-lg"
          >
            <MdOutlineAddBox size={20} />
            Add Book
          </Link>
        </div>
      </div>

      {loading ? (
        <Spinner />
      ) : showType === "table" ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
