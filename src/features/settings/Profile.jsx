import { useDispatch, useSelector } from "react-redux";
import Label from "../../components/Label";
import Input from "../../components/Input";
import SubmitButton from "../../components/SubmitButton";
import ProfileImageUploader from "../../components/ProfileImageUploader";
import defaultProfile from "../../assets/defaultProfile.jpg";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  updateUser,
  updateProfileImage,
  getProfileData,
  editProfileData,
  deleteImage,
} from "../../store/settingsSlice";
import { LocationEdit, Mails } from "lucide-react";
import { useEffect, useState } from "react";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.settings.user);
  const status = useSelector((state) => state.settings.status);
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    const profileFields = ["fullName", "bio", "image", "verified"];
    if (profileFields.includes(id)) {
      dispatch(updateUser({ profile: { [id]: value } }));
    } else {
      dispatch(updateUser({ [id]: value }));
    }
  };

  const handleImageChange = (file) => {
    setImageFile(file);
    const url = file ? URL.createObjectURL(file) : user.profile.image;
    dispatch(updateProfileImage({ url }));
  };

  const handleImageDelete = () => {
    setImageFile(null);
    dispatch(updateProfileImage({ url: defaultProfile }));

    const formData = new FormData();
    formData.append("user.profile.image", defaultProfile);

    dispatch(deleteImage(formData));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("first_name", user.first_name);
    formData.append("last_name", user.last_name);
    formData.append("email", user.email);
    formData.append("profile.full_name", user.profile.full_name);
    formData.append("profile.bio", user.profile.bio);
    formData.append("profile.verified", user.profile.verified);

    if (imageFile) {
      formData.append("profile.image", imageFile);
    }

    dispatch(editProfileData(formData));
  };

  useEffect(() => {
    dispatch(getProfileData());
  }, [dispatch]);

  if (status.getProfile === "loading") {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-8 h-8 md:w-12 md:h-12 text-blue-600" />
      </div>
    );
  }

  if (status.editProfile === "succeeded") {
    return (
      <Alert variant="default | destructive">
        <Terminal />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* profile picture */}
        <div className="grid gap-3 md:grid-cols-3">
          <p className="md:mb-20 col-span-1 font-medium">Profile picture</p>
          <ProfileImageUploader
            imageUrl={user.profile.image}
            onImageChange={handleImageChange}
            onImageDelete={handleImageDelete}
          />
        </div>

        {/* Name */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="name" label="Name:" />
          <div className="flex gap-2 md:gap-8 flex-1 col-span-2">
            <Input
              id="first_name"
              value={user.first_name}
              onChange={handleChange}
            />
            <Input
              id="last_name"
              value={user.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Username */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="username" label="Username:" />
          <Input id="username" value={user.username} onChange={handleChange} />
        </div>

        {/* Email */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="email" label="Email Address:" />
          <Input
            id="email"
            type="email"
            value={user.email}
            onChange={handleChange}
            icon={Mails}
          />
        </div>

        {/* Job Title */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="jobTitle" label="Job Title:" />
          <Input id="jobTitle" value={user.jobTitle} onChange={handleChange} />
        </div>

        {/* Country */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="country" label="Country:" />
          <Input
            id="country"
            value={user.country}
            onChange={handleChange}
            icon={LocationEdit}
          />
        </div>

        {/* Bio */}
        <div className="grid gap-3 md:grid-cols-3">
          <Label id="bio" label="Bio:" />
          <textarea
            id="bio"
            value={user.profile.bio}
            onChange={handleChange}
            className="w-full mt-2 p-4 border resize-none border-gray-200 rounded h-24 outline-none bg-white col-span-2"
            placeholder="Write about yourself"
          ></textarea>
        </div>

        {/* Submit */}
        <SubmitButton isLoading={status.editProfile === "loading"}>
          Save changes
        </SubmitButton>
      </form>
    </div>
  );
};

export default Profile;
