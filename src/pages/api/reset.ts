import path from 'path';
import { promises as fs } from 'fs';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    //Find the absolute path of the json directory
    const resetDirectory = path.join(process.cwd(), 'reset.json');
    const jsonDirectory = path.join(process.cwd(), 'data.json');
    // const filePath = path.join(process.cwd(), 'data.json');
    // const jsonData = await fsPromises.readFile(filePath);
    //Read the json data file data.json
    const resetContents = await fs.readFile(resetDirectory, 'utf8');

    //Return the content of the data file in json format

    if (req.method == 'GET') {

        const objectData = JSON.parse(resetContents)
        const updatedData = JSON.stringify(objectData);


        try {
            console.log(updatedData);
            await fs.writeFile(jsonDirectory, updatedData);
            
            res.status(200).json("sukses");

        } catch (error) {
            console.log(error);
            
            res.status(500).json((error));
        }

    }


}