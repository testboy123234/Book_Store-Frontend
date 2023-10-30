import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import axios from "axios";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateBookc = () => {
  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    publishYear: "",
    imgUrl: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [imgPerc, setImgPerc] = useState(0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = async (file) => {
    try {
      const storage = getStorage(app);
      const folder = "images/";
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, folder + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImgPerc(Math.round(progress));
        },
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setBookData((prevData) => ({
            ...prevData,
            imgUrl: downloadURL,
          }));
          submitForm();
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:5555/books", bookData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setLoading(false);
      enqueueSnackbar("Book Created successfully", { variant: "success" });
      navigate("/");
    } catch (error) {
      setLoading(false);
      enqueueSnackbar("Error", { variant: "error" });
      console.error(error);
    }
  };

  /////

  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef();

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };

      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setImagePreview(null);
    }
  };

  const handleClear = () => {
    fileInputRef.current.value = ""; // Clear the file input
    setSelectedFile(null);
    setImagePreview(null);
  };

  return (
    <div className="p-4">
      <BackButton />
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
        {loading ? <Spinner /> : ""}
        <div className="flex flex-col  border-2 border-sky-400 rounded-xl w-[900px] p-4 mx-auto">
          <h1 className="text-3xl ml-8 m-3">Create Book</h1>
          <div className=" columns-2 mx-4 mt-1">
            <div className="">
              <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Title</label>
                <input
                  type="text"
                  name="title"
                  value={bookData.title}
                  onChange={handleInputChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">Author</label>
                <input
                  type="text"
                  name="author"
                  value={bookData.author}
                  onChange={handleInputChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
              <div className="my-4">
                <label className="text-xl mr-4 text-gray-500">
                  Publish Year
                </label>
                <input
                  type="number"
                  name="publishYear"
                  value={bookData.publishYear}
                  onChange={handleInputChange}
                  className="border-2 border-gray-500 px-4 py-2 w-full"
                />
              </div>
            </div>
            <br />
            <div className="upload">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleFileUpload(e.target.img.files[0]);
                }}
              >
                <div className="aspect-h-4 aspect-w-1  hidden overflow-hidden rounded-lg sm:block">
                  {selectedFile && (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{ maxWidth: "100%", maxHeight :"100%" }}
                      />
                      <br />
                      <button onClick={handleClear}>Clear</button>
                    </div>
                  )}
                </div>
                <br />

                <div>
                  <label htmlFor="img">Image:</label>{" "}
                  {imgPerc > 0 && "Uploading: " + imgPerc + "%"}
                  <br />
                  <input
                    type="file"
                    accept="image/*"
                    id="img"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>

                <br />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-md bg-lime-500 m-8"
                >
                  Upload
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBookc;
