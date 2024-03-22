import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import Input from "../uı/Input";
import axios from "axios";
import { toast } from "react-toastify";
function CreatePost({ session_user, session }) {
  //! states
  const [isBrowser, setIsBrowser] = useState(false);
  const [model, setModel] = useState(" ");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState();
  const [postTitle,setPostTitle] = useState();
  //! states

  const handleFileChange = (changeEvent) => {
    const reader = new FileReader(); // fileReader nesnesı dosyanın ıcerıgını okumak ıcın kullanılır.

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result); // yuklenen dosyanın ıcerıgını temsıl eder base64 formatında bır verıdır.
      setFile(changeEvent.target.files[0]);
    };

    //!Yüklenen dosyanın ıcerıgını base64 formatında vır verı olarak dondurduk.
    reader.readAsDataURL(changeEvent.target.files[0]);
  };

  // ssr da calısmayı onlemek ıcın
  useEffect(() => {
    if (typeof window !== "undefined") {
      import("froala-editor/js/plugins/image.min.js");
      import("froala-editor/js/plugins/char_counter.min.js");
      import("froala-editor/js/plugins/file.min.js");
      import("froala-editor/js/plugins/draggable.min.js");
      import("froala-editor/js/plugins/emoticons.min.js");
      import("froala-editor/js/plugins/font_size.min.js");
      import("froala-editor/js/plugins/colors.min.js");
      import("froala-editor/js/plugins/file.min.js");
      import("froala-editor/js/plugins/font_family.min.js");

      setIsBrowser(true);
    }
  }, []);

  const handleModelChange = (e) => {
    setModel(e);
  };

  // kapak fotografı...

  // random unıq ıd (math rondom 0 ile 1 arasında ondalık deger uretır.)
  const generateRandomNum = () => {
    var randomNumber = Math.floor(100000 + Math.random() * 900000);
    return randomNumber;
  };

  const contentInfo = {
    post_id: generateRandomNum(),
    user_id: session_user.user_id,
    user_name: session_user.user_name,
    user_surname: session_user.user_surname,
    user_email: session_user.user_email,
    post_content: model,
    user_img: session_user.user_img,
    post_category: category,
    post_tags: tags,
    post_status: true,
    post_shortdesc: shortDesc,
    post_title:postTitle
  };

  // submit function

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (session) {
      // img
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "ecblog");

      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dh1medzkb/image/upload`,
        data
      );

      const uploadImg = response.data.url;
      const createdPost = { ...contentInfo, cover_img: uploadImg };

      await axios
        .post(`${process.env.NEXT_PUBLIC_url}/content`, createdPost)
        .then((res) => {
          if (res.status === 200) {
            toast.success("Post created successfully.");
          } else {
            toast.error("Something went wrong.");
          }
        })
        .catch((error) => {
          console.error("Error creating post:", error);
          toast.error("Something went wrong.");
        });
    }
  };

  // froala toolbar confıg
  const config = {
    placeholderText: "Start writing your content.",
    saveInterval: 5000,
    events: {
      "charCounter.exceeded": function () {
        alert("You have reached the maximum number of characters.");
      },
    },
    moreRich: {
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikeThrough",
        "subscript",
        "superscript",
        "fontFamily",
        "fontSize",
        "textColor",
        "backgroundColor",
      ],
      buttonsVisible: 3,
    },
    toolbarButtons: {
      moreText: {
        buttons: [
          "bold",
          "italic",
          "underline",
          "strikeThrough",
          "subscript",
          "superscript",
          "fontFamily",
          "fontSize",
          "textColor",
          "backgroundColor",
        ],
        buttonsVisible: 3,
      },
      moreParagraph: {
        buttons: [
          "alignLeft",
          "alignCenter",
          "formatOLSimple",
          "alignRight",
          "alignJustify",
          "formatOL",
          "formatUL",
          "paragraphFormat",
          "paragraphStyle",
        ],
        buttonsVisible: 3,
      },
      moreRich: {
        buttons: [
          "insertLink",
          "insertImage",
          "insertVideo",
          "insertTable",
          "emoticons",
          "fontAwesome",
          "specialCharacters",
          "embedly",
        ],
        buttonsVisible: 3,
      },
      moreMisc: {
        buttons: [
          "undo",
          "redo",
          "fullscreen",
          "print",
          "getPDF",
          "spellChecker",
          "selectAll",
          "html",
        ],
        align: "right",
        buttonsVisible: 2,
      },
    },
    draggable: true,
    heightMin: 200,
    charCounterCount: true,
    charCounterMax: 3000,
  };

  // sayfa yuklendıkten sonra text edıtor gelecek ssr da yuklemeyı iptal ettık.
  const FroalaEditorComponent = dynamic(() => import("react-froala-wysiwyg"), {
    ssr: false,
    loading: () => <p>Yükleniyor...</p>,
  });

  const FroalaEditorView = dynamic(
    () => import("react-froala-wysiwyg/FroalaEditorView"),
    {
      ssr: false,
      loading: () => <p>Yükleniyor...</p>,
    }
  );

  return (
    <div className="xl:w-3/4 w-full h-full p-4">
      <span className="font-semibold text-[30px]">Create Content</span>
      <form className="w-full h-full mt-5 flex flex-col gap-y-5">
        {isBrowser && (
          <FroalaEditorComponent
            onModelChange={handleModelChange}
            id="eg-dark-theme"
            config={config}
            model={model}
          />
        )}

        <div className=" flex justify-between pr-4 ">
          <div>
          <Input
              prop="w-[400px]"
              placeholder="Title"
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <Input
              prop="w-[400px] mt-2"
              placeholder="Tags"
              onChange={(e) => setTags(e.target.value)}
            />
            <Input
              prop="w-[600px] mt-2"
              placeholder="Short Description"
              onChange={(e) => setShortDesc(e.target.value)}
            />
            <select
              className="w-[400px] h-14 border-primary  border outline-none mt-3"
              name=""
              id=""
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="sport">Sport</option>
              <option value="science">Science</option>
              <option value="tegnology">Teknology</option>
              <option value="Movie">Movie</option>
              <option value="Software">Software</option>
            </select>
          </div>
          {/* img */}
          <label className="flex items-center gap-x-10 " >
            <span className="text-[20px] font-semibold">Cover İmage</span>
            <div className="flex  gap-2 items-center justify-center">
            <input
              onChange={(e) => handleFileChange(e)}
              type="file"
              className="hidden"
            />
            <button className="btn pointer-events-none mt-3">
              Select Image
            </button>
            {imageSrc && (
              <div>
                {/*eslint-disable-next-line @next/next/no-img-element*/}
                <img src={imageSrc} alt="" className="w-12 h-12 rounded-full" />
              </div>
            )}
            </div>
           
          </label>
          
        </div>
        <button onClick={handleSubmit} className="btn block mt-5">
            {" "}
            SUBMİT
          </button>
      </form>
    </div>
  );
}

export default CreatePost;
