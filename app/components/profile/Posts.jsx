import * as React from "react";
import { DataGrid,GridActionsCellItem } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
import { toast } from "react-toastify";


function Posts({ posts }) {
console.log(posts)
  // delete function
// const TrashButton = ({ post_id }) => {
//   const handleDelete = async () => {
//     // Burada silme işlemi gerçekleştirilebilir
//     if (confirm("Are you sure you want to delete?") == true) {
//       try {
//         const res = await axios.delete(
//           `${process.env.NEXT_PUBLIC_url}/content`,
//           { post_id: post_id }
//         );
//         window.location.reload();
//         toast.success("Post deleted successfully.");
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   };

//   return (
//     <IconButton onClick={handleDelete}>
//       <DeleteIcon />
//     </IconButton>
//   );
// };

const handleDeleteClick = async (post_id) => {
  console.log(post_id)
 
    const confirmation = window.confirm(`Delete user with ${post_id} ? `);
    if (confirmation) {
      try {
        const res = await axios.delete(`${process.env.NEXT_PUBLIC_url}content/${post_id}`);
        if (res.status === 200) {
          toast.success("Person successfully deleted");
        }
      } catch (err) {
        console.log(err);
        toast.error("An error occurred while deleting the person");
      }
    }
  
};




  const columns = [
    { field: "userid", headerName: "User Id", width: 70 },
    { field: "postid", headerName: "Post Id", width: 70 },
    { field: "userEmail", headerName: "User Email", width: 200 },
    { field: "content", headerName: "Content", width: 130 },
    {
      field: "category",
      headerName: "Category",
      type: "number",
      width: 200,
    },
    {
      field: "tags",
      headerName: "Tags",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteClick(row.postid)}
          color="inherit"
        />
      ]
    }
  ];


  // table rows
  const rows = posts.map((item, index) => ({
    id: index,
    postid: item.post_id,
    userid: item.user_id,
    category: item.post_category,
    tags: item.post_tags,
    userEmail: item.user_email,
    content: item.post_content,
  }));

  return (
    <div className="w-full h-auto p-4">
      <span className="font-semibold text-[30px]">Gönderiler</span>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[5, 10]}
          // checkboxSelection
        />
      </div>
    </div>
  );
}

export default Posts;
