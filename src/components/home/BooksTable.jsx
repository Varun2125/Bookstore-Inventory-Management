import React from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

const BooksTable = ({ books }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-[#e6dbd0] bg-[#fffaf7] rounded-xl shadow-sm">
        <thead className="bg-[#d7bfae] text-[#7a5c58]">
          <tr>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Author</th>
            <th className="py-3 px-4 text-left">Year</th>
            <th className="py-3 px-4 text-left">Quantity</th>
            <th className="py-3 px-4 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books && books.length > 0 ? (
            books.map((book) => (
              <tr
                key={book._id}
                className="border-t border-[#e6dbd0] hover:bg-[#f9f5f0] transition"
              >
                <td className="py-3 px-4 text-[#4b3a36]">{book.title}</td>
                <td className="py-3 px-4 text-[#4b3a36]">{book.author}</td>
                <td className="py-3 px-4 text-[#4b3a36]">{book.publishYear}</td>
                <td className="py-3 px-4 text-[#4b3a36]">
                  {book.quantity ?? 0}
                </td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center gap-3 text-lg">
                    <Link to={`/books/details/${book._id}`}>
                      <FaEye className="text-[#7a5c58] hover:text-[#4b3a36]" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <FaEdit className="text-green-600 hover:text-green-800" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <FaTrash className="text-red-500 hover:text-red-700" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="5"
                className="text-center py-6 text-gray-500 italic"
              >
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
