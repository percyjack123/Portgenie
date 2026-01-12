import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth } from "../firebase";

const storage = getStorage();

export const uploadFile = async (file, folder = "uploads") => {
  if (!file) return null;

  const user = auth.currentUser;
  if (!user) throw new Error("User not authenticated");

  const fileRef = ref(
    storage,
    `${folder}/${user.uid}/${Date.now()}-${file.name}`
  );

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url; // 🔑 STORE THIS URL
};
