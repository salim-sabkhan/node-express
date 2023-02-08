import { client } from "./index.js";
import bcrypt from "bcrypt";



export async function getAllMovies(request) {
  return await client.db("test").collection("movies").find(request.query).toArray();
}
export async function getMovieById(id) {
  return await client.db("test").collection("movies").findOne({ id: id });
}
export async function deleteMovieById(id) {
  return await client.db("test").collection("movies").deleteOne({ id: id });
}
export async function addMovies(newMovies) {
  return await client.db("test").collection("movies").insertMany(newMovies);
}
export async function updateMovieById(id, updateMovie) {
  return await client.db("test").collection("movies").updateOne({id:id}, {$set : updateMovie})
}

export async function genPassword(password)
{
  const salt = await bcrypt.genSalt(10);   //bcrypt.gen(no.of.rounds)
  console.log(salt);
  const hashPassword = await bcrypt.hash(password, salt);
  return hashPassword
}

export async function createUser(username, hashedPassword) {
  return await client.db("test").collection("users").insertOne({username : username, password : hashedPassword})
}

export async function getUserByName(username) {
  return await client.db("test").collection("users").findOne({username : username})
}

//  console.log(genPassword("Password@123"));