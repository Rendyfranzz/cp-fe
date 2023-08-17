import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
  //Find the absolute path of the json directory
  const jsonDirectory = path.join(process.cwd(), 'data.json');
  // const filePath = path.join(process.cwd(), 'data.json');
  // const jsonData = await fsPromises.readFile(filePath);
  //Read the json data file data.json
  const fileContents = await fs.readFile(jsonDirectory, 'utf8');
  //Return the content of the data file in json format

  if(req.method == 'GET'){
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(JSON.parse(fileContents));
  }
  if(req.method == 'POST'){
    try {
      const objectData = JSON.parse(fileContents)

      const newData = {
        id:Date.now(),
        endpoint: req.body.name.split(" ").join(""),
        ...req.body
      }
      objectData.db.push(newData)
      console.log(objectData);
      const updatedData = JSON.stringify(objectData);
      await fs.writeFile(jsonDirectory, updatedData);

      res.status(200).json("success")
      
    } catch (error) {
      console.log(error);
      res.status(500)
      
    }
  }

  
  
}