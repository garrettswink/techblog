
const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  
  // Update the post
  const updatePostFormHandler = async (event) => {
    event.preventDefault();
  
    const title = document.querySelector("#title-update-post").value.trim();
    const content = document
      .querySelector("#content-update-post")
      .value.trim();
  
    if (title && content) {
      const response = await fetch(`/api/posts/${post_id}`, {
        method: "PUT",
        body: JSON.stringify({ title, content }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        document.location.replace("/dashboard");
      } else {
        alert("Failed to update the post.");
      }
    }
  };
  

  
  // Event listeners
  const updatePostButton = document.querySelector("#update-post");
  
  if (updatePostButton) {
    updatePostButton.addEventListener("click", updatePostFormHandler);
  }
  
