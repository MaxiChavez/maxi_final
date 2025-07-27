import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
  try {
    const snapshot = await getDocs(productsCollection);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (id) => {
  try {
    const docRef = doc(productsCollection, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (newProduct) => {
  try {
    const docRef = await addDoc(productsCollection, newProduct);
    return { id: docRef.id, ...newProduct };
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (id, updatedProductData) => {
  try {
    const docRef = doc(productsCollection, id);
    await setDoc(docRef, updatedProductData, { merge: true });
    return { id, ...updatedProductData };
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const deleteProduct = async (id) => {
  try {
    const docRef = doc(productsCollection, id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// import { db } from "./firebase.js";
// import {
//   collection,
//   getDocs,
//   doc,
//   getDoc,
//   addDoc,
//   updateDoc,
//   deleteDoc,
// } from "firebase/firestore";

// // Obtener todos los productos
// export const getAllProducts = async () => {
//   const productosRef = collection(db, "productos");
//   const snapshot = await getDocs(productosRef);

//   const productos = snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return productos;
// };

// //
// export const getProductById = async (id) => {
//   const docRef = doc(db, "productos", id);
//   const docSnap = await getDoc(docRef);
//   return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
// };

// export const createProduct = async (newProduct) => {
//   const productosRef = collection(db, "productos");
//   const docRef = await addDoc(productosRef, newProduct);
//   return { id: docRef.id, ...newProduct };
// };

// export const updateProduct = async (id, data) => {
//   const docRef = doc(db, "productos", id);
//   await updateDoc(docRef, data);
//   return { id, ...data };
// };

// export const deleteProduct = async (id) => {
//   const docRef = doc(db, "productos", id);
//   await deleteDoc(docRef);
//   return true;
// };
