import React from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

const BookSingleCard = ({ book }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-lg transition">
      <h2 className="text-xl font-semibold text-[#2d4356]">{book.title}</h2>
      <p className="text-gray-600 mt-1">By {book.author}</p>
      <p className="text-gray-500 text-sm">Year: {book.publishYear}</p>

      <div className="mt-3">
        <span className="text-sm bg-[#9ad0c2] text-[#2d4356] px-3 py-1 rounded-full">
          Quantity: {book.quantity}
        </span>
      </div>

      <div className="flex justify-end gap-3 text-lg mt-4">
        <Link to={`/books/details/${book._id}`}>
          <FaEye className="text-[#2d4356] hover:text-[#1e293b]" />
        </Link>
        <Link to={`/books/edit/${book._id}`}>
          <FaEdit className="text-green-600 hover:text-green-800" />
        </Link>
        <Link to={`/books/delete/${book._id}`}>
          <FaTrash className="text-red-500 hover:text-red-700" />
        </Link>
      </div>
    </div>
  );
};

export default BookSingleCard;
