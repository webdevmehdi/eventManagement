import axios from "axios";
import { createBrowserHistory } from "history";
import { reject } from "lodash-es";
import { useState } from "react";
import { Cookies, useCookies } from "react-cookie";
import Cookie from "js-cookie";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { axiosPrivate } from "./axios/axios";
let simulateErrors = false;
//const [cookie , setCookie] = useCookies(["JWT"]);
/* const CSRF_TOKEN = document.cookie.match(new RegExp(`XSRF-TOKEN=([^;]+)`))[1];
const instance = axios.create({
  headers: { "X-XSRF-TOKEN": CSRF_TOKEN },
});
export const AXIOS = instance; */

export function getHashValues(hash) {
  return Object.values(hash); // needs modern browser
}

export const history = createBrowserHistory();

export function hashById(array) {
  let hash = {};

  for (let item of array) {
    hash[item.id] = item;
  }

  return hash;
}

export function excludeById(array, id) {
  console.log(array.filter((item) => item.id !== id));
  const updatedArray = array.filter((item) => item.id !== id)
  return updatedArray;
}

export function getUsers() {
  const endpoint = "http://localhost:8081/users";
  let data = axios.get(endpoint).then((response) => resolve(response.data));
  console.log(data);
  return data;
}



export async function login(email, password) {
  let loginObject = {
    email: email,
    password: password,
  };
  console.log(loginObject);
  const user = await axiosPrivate.post(`/api/auth/signIn`, {
    email: email,
    password: password,
  });
  console.log(user)
  return user;
}
export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  return {};
}

//response/* .then(handleResponse) */.then((response) => {

// let user = response.data;
/*     console.log(response);
 */ // store user details and jwt token in local storage to keep user logged in between page refreshes
// localStorage.setItem("user", JSON.stringify(user));

/*  }); */

//  Random number from interval
//const randomIntFromInterval = (min, max) =>
//Math.floor(Math.random() * (max - min + 1) + min);
//insert element without mutation into
//const insert = (arr, index, newItem) => [
//...arr.slice(0, index), // first half of array
//newItem, // new item
//  ...arr.slice(index), // rest of array
//];

/* const items = ["S", "L", "C", "E"];

const result = insert(items, 2, "I");

console.log(result); */ // ["S", "L", "I", "C", "E"]
// error handling without
/* const getData = async (url) => {
  try {
    const data = await fetch(url);
    return data;
  } catch (error) { */
// Handle error
/*   }
}; */
