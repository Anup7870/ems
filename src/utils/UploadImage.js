// upload image in cloudanary

export const uploadImage = async (file) => {
   const formData = new FormData();
   formData.append("file", file);
   formData.append("upload_preset", "eventManagement");
   formData.append("cloud_name", "ddvd9ress");

   try {
      if (!file) {
         reject("Image is required");
      }
      const res = await fetch(
         "https://api.cloudinary.com/v1_1/ddvd9ress/image/upload",
         {
            method: "POST",
            body: formData,
         }
      );
      const data = await res.json();
      return data.url;
   } catch (error) {
      console.log(error);
   }
};
