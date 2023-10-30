import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";


const CreateBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const [img, setImg] = useState(undefined);
  const [imgPerc, setImgPerc] = useState(0);
  const [inputs, setInputs] = useState({});

  useEffect(() => {
    img && uploadFile(img, "imgUrl");
  }, [img]);

  const uploadFile = (file, fileType) => {
    const storage = getStorage(app);
    const folder = fileType === "imgUrl" ? "images/" : "videos/";
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, folder + fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        fileType === "imgUrl"
          ? setImgPerc(Math.round(progress))
          : setVideoPerc(Math.round(progress));
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log(error);
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log(error);
            break;
          case "storage/canceled":
            // User canceled the upload
            break;
          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("DownloadURL - ", downloadURL);

          setInputs((prev) => {
            return {
              ...prev,
              title,
              author,
              publishYear,

              imgUrl: downloadURL,
            };
          });
        });
      }
    );
  };


  // const handleSaveBook = () => {
  //   const data = {
  //     title,
  //     author,
  //     publishYear,
  //     imgUrl: downloadURL
  //   };
  //   setLoading(true);
  //   axios
  //     .post("http://localhost:5555/books", inputs)
  //     .then(() => {
  //       setLoading(false);
  //       enqueueSnackbar("Book Created successfully", { variant: "success" });
  //       navigate("/");
  //     })
  //     .catch((error) => {
  //       setLoading(false);
  //       // alert('An error happened. Please Chack console');
  //       enqueueSnackbar("Error", { variant: "error" });
  //       console.log(error);
  //     });
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`https://books-store-api.vercel.app/api/v1/books`, inputs);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
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
                {/* <button className="px-6 py-3 rounded-md bg-lime-500 m-8" onClick={handleSaveBook}>
                   Save 
                </button> */}
              </div>

              {/* <div class="aspect-h-2 aspect-w-1  hidden overflow-hidden rounded-lg sm:block">
                <img
                  src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
                  alt="Two each of gray, white, and black shirts laying flat."
                  class="h-full w-full object-cover object-center"
                />
              </div> */}
<br />
<div className="upload">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="img">Image:</label>{" "}
          {imgPerc > 0 && "Uploading: " + imgPerc + "%"}
          <br />
          <input
            type="file"
            accept="image/*"
            id="img"
            onChange={(e) => setImg((prev) => e.target.files[0])}
          />
        </div>
        <br />
        <button type="submit" className="px-6 py-3 rounded-md bg-lime-500 m-8">Upload</button>
      </form>
    </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateBooks;
