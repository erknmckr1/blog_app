import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import Input from "../uı/Input";
import axios from "axios";
import { toast } from "react-toastify";
function CreatePost({ session_user, session }) {
  const [isBrowser, setIsBrowser] = useState(false);
  const [model, setModel] = useState(" ");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  console.log(session_user);
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

  const contentInfo = {
    user_id: session_user.user_id,
    user_name: session_user.user_name,
    user_surname: session_user.user_surname,
    post_content: model,
    user_img: session_user.user_img,
    post_category: category,
    post_tags: tags,
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (session) {
      axios.post(
        `${process.env.NEXT_PUBLIC_url}/content`,
        contentInfo
      ).then(res => {
        if (res.status === 200) {
          toast.success("Post created successfully.");
        } else {
          toast.error("Something went wrong.");
        }
      }).catch(error => {
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
    charCounterMax: 300,
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

        <div className=" ">
          <Input
            prop="w-[400px]"
            placeholder="Tags"
            onChange={(e) => setTags(e.target.value)}
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
          <button onClick={handleSubmit} className="btn block mt-5">
            {" "}
            SUBMİT
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreatePost;
