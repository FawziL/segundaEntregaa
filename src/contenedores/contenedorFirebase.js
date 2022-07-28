import admin from "firebase-admin";
import config from "../config.js";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase),
});

const db = admin.firestore();

export class ContenedorFirebase {
  constructor(collectionName){
      this.collectionName = collectionName;
      this.collection = db.collection(collectionName);
  }
  async getAll(){
      try {
          const snapshot  = await this.collection.get();
          const data = []
          snapshot.forEach(doc => {
              let obj = {}
              obj = doc.data();
              obj._id = doc.id
              data.push(obj)
          });
          return {data};
      } catch (error) {
          console.log(`error in getting ${this.collectionName}: ${error}`);
          return {error: {message: `error in getting ${this.collectionName}`, status: 500}};
      }
  }
  async getById(id){
      try {
          const doc = await this.collection.doc(id).get();
          const data = doc.data();
          data._id = id;
          if (data) return {data};
          return {error: {message: `no ${this.collectionName} with ID: ${id}`, status: 404}};
      } catch (error) {
          console.log(`error in getting ${this.collectionName}: ${error}`);
          return {error: {message: `error in getting ${this.collectionName}`, status: 500}};
      }
  }
  async add(data){
      try {
          data.timestamp = Date.now();
          const res = await this.collection.add(data);
          return {_id: res.id}
      } catch (error) {
          console.log(`error in adding ${this.collectionName}: ${error}`);
          return {error: {message: `error in adding ${this.collectionName}`, status: 500}};
      }
  }
  async updateOne(id, NewDataObj){
      try {
          const doc = this.collection.doc(id);
          await doc.update(NewDataObj);
      } catch (error) {
          console.log(`error in updating ${this.collectionName}: ${error}`);
          return {error: {message: `error in updating ${this.collectionName}`, status: 500}};
      }
  }
  async deleteById(id){
      try {
          const doc = this.collection.doc(id);
          await doc.delete();
      } catch (error) {
          console.log(`error in deleting ${this.collectionName}: ${error}`);
          return {error: {message: `error in deleting ${this.collectionName}`, status: 500}};
      }
  }
}