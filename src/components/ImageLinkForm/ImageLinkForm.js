import React from "react";
import { useState, useRef } from "react";
import "./ImageLinkForm.css";
import { useDropzone } from "react-dropzone";
import S3 from "react-aws-s3";
import { Audio } from "react-loader-spinner";

const ImageLinkForm = ({ onInputChange, onPictureSumbit }) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("avail");
  const inputRef = useRef(null);

  // the configuration information is fetched from the .env file
  const config = {
    bucketName: "choosepiecedemo1",
    region: "eu-west-2",
    accessKeyId: "AKIAWCXN2RX3DSYSY4VD",
    secretAccessKey: "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",
  };
  const handleClick = () => {
    // 👇️ open file input box on click of other element
    inputRef.current.click();
  };

  const uploadFile = async (file) => {
    const ReactS3Client = new S3(config);
    // the name of the file uploaded is used to upload it to S3

    console.log("loading");
    await ReactS3Client.uploadFile(file, file.name)
      .then((data) => console.log(data.location), setStatus("loading"))
      .catch((err) => console.error(err));

    await setStatus("avail");
    await console.log("avail");
    await setFile(null);
  };

  const uploadFileThroughMedaitor = async (file) => {
    let formData = new FormData();
    formData.append("file", file);
    formData.append("name", file.name);
    fetch(
      "http://Choosepiecemediatorv1-env.eba-r7ua3mxd.eu-west-2.elasticbeanstalk.com/v1/api/upload",
      {
        method: "post",
        headers: { "Content-Type": "video/mp4" },
        body: formData,
        mode: "no-cors",
      }
    );
  };

  const uploadHelloTomer = async () => {
    fetch(
      "http://choosepiecemediatorv1-env.eba-r7ua3mxd.eu-west-2.elasticbeanstalk.com/v1/api/hello/tomerbbb",
      {
        method: "get",

        headers: {
          "Content-Type": "text/plain",
          "Content-Length": "0",
        },
        mode: "no-cors",
      }
    )
      .catch((error) => console.log("error"))
      .then((response) => console.log(response))
      .then((response) => console.log(response));

    //  console.log("loading");
    //   await ReactS3Client.uploadFile(file, file.name)
    //    .then((data) => console.log(data.location), setStatus("loading"))
    //    .catch((err) => console.error(err));

    await setStatus("avail");
    await console.log("avail");
    await setFile(null);
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    setFile(fileObj);
    console.log(fileObj.name);
    console.log("fileObj is", fileObj);

    // 👇️ reset file input
    event.target.value = null;

    // 👇️ is now empty
    console.log(event.target.files);

    // 👇️ can still access file object here
    console.log(fileObj);
    console.log(fileObj.name);
  };
  //tomer.bod@gmail.com
  //tomer.bod
  //Tomer6!!
  //luffy5656!
  console.log(status === "loading");
  console.log({ status });
  return (
    <div>
      <p className="f3"></p>
      <div className="center">
        <div className=" pa3 br3 shadow-5 center">
          <input
            className="f4 pa2 w-70 center"
            ref={inputRef}
            type="file"
            onChange={handleFileChange}
          />
          {file ? file.name : null}
          <button
            onClick={() => {
              uploadFileThroughMedaitor(file);
            }}
          >
            Upload to S3
          </button>
        </div>
      </div>
      <div className="center">
        {status === "loading" ? (
          <Audio
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
          />
        ) : null}
      </div>
    </div>
  );
};

export default ImageLinkForm;
