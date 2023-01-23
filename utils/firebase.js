import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getDownloadURL, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7bsp2NwvWLpvyNYMfs4i-7ycBiQk3H7g",
  authDomain: "contest-4f331.firebaseapp.com",
  projectId: "contest-4f331",
  storageBucket: "contest-4f331.appspot.com",
  messagingSenderId: "356288107580",
  appId: "1:356288107580:web:6d0e472a1fe07a63e79f39",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const getDownloadImageURL = async (path) => {
  const fileref = ref(storage, path);
  const url = await getDownloadURL(fileref);
  return url;
};
