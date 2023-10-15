import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [imgUrl, setImgUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSaveBook = () => {
    const data = {
      title,
      author,
      publishYear,
      imgUrl
    };
    setLoading(true);
    axios
      .post("http://localhost:5555/books", data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Created successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        // alert('An error happened. Please Chack console');
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <div>
        {/* <!-- Image gallery --> */}
        <div class="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
         
          {loading ? <Spinner /> : ""}

          <div className="flex flex-col  border-2 border-sky-400 rounded-xl w-[900px] p-4 mx-auto">
          <h1 className="text-3xl ml-8 m-3">Create Book</h1>
            <div className=" columns-2 mx-4 mt-1">
              <div className="">
                <div className="my-4">
                  <label className="text-xl mr-4 text-gray-500">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border-2 border-gray-500 px-4 py-2 w-full"
                  />
                </div>
                <div className="my-4">
                  <label className="text-xl mr-4 text-gray-500">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="border-2 border-gray-500 px-4 py-2  w-full "
                  />
                </div>
                <div className="my-4">
                  <label className="text-xl mr-4 text-gray-500">
                    Publish Year
                  </label>
                  <input
                    type="number"
                    value={publishYear}
                    onChange={(e) => setPublishYear(e.target.value)}
                    className="border-2 border-gray-500 px-4 py-2  w-full "
                  />
                </div>
                <div className="my-4">
                  <label className="text-xl mr-4 text-gray-500">
                    imgUrl
                  </label>
                  <input
                    type="text"
                    value={imgUrl}
                    onChange={(e) => setImgUrl(e.target.value)}
                    className="border-2 border-gray-500 px-4 py-2  w-full "
                  />
                </div>
                <button className="px-6 py-3 rounded-md bg-lime-500 m-8" onClick={handleSaveBook}>
                   Save 
                </button>
              </div>

              <div class="aspect-h-2 aspect-w-1  hidden overflow-hidden rounded-lg sm:block">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                  alt="Two each of gray, white, and black shirts laying flat."
                  class="h-full w-full object-cover object-center"
                />
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
