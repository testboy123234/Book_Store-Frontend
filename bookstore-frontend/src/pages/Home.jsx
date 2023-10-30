import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://books-store-api.vercel.app/api/v1/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div class="min-h-screen">
      
      <header class="bg-gray-600 shadow  ">
        <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
          <div className="columns-2">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
              {" "}
              Books List
            </h1>
            <div className="flex justify-center items-center gap-x-4">
              <button
                className="bg-gray-500  hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                onClick={() => setShowType("table")}
              >
                Table
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                onClick={() => setShowType("card")}
              >
                Card
              </button>
              <div className="flex justify-between items-center">
              <Link to="/books/create">
                <MdOutlineAddBox className="text-sky-800 text-4xl" />
              </Link>
            </div>
              <div className="flex justify-between items-center bg-red-800">
              <Link to="/books/createc">
                <MdOutlineAddBox className="text-sky-800 text-4xl" />
              </Link>
            </div>
            </div>
          </div>
        </div>
      </header>
      <main >
        <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          {/* <!-- Your content --> */}
          <div className="p-4 ">
         
            {loading ? (
              <Spinner />
            ) : showType === "table" ? (
              <BooksTable books={books} />
            ) : (
              <BooksCard books={books} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
