import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const { ruleid } = query;
    const jsonDirectory = path.join(process.cwd(), 'data.json');
    // const filePath = path.join(process.cwd(), 'data.json');
    // const jsonData = await fsPromises.readFile(filePath);
    //Read the json data file data.json
    const fileContents = await fs.readFile(jsonDirectory, 'utf8');
    const json = JSON.parse(fileContents)

    if(req.method == 'GET'){
        try {
            const result = json.db.filter((data: any) => {
                return (
                    data.id == ruleid
                )
            })
        
            res.status(200).json(result)
        } catch (error) {
            res.status(500).json(error)
        }
    }
   

    if (req.method == 'DELETE') {
        try {
            const objectData = JSON.parse(fileContents)
            const result = objectData.db.filter((data: any) => {
                return (
                    data.id != ruleid
                )
            })

            console.log(result);

            // const deletedData = JSON.stringify(result);
            // await fs.writeFile(jsonDirectory, deletedData);

            res.status(200).json('terhapus')

        } catch (error) {
            res.status(500).json(error)
        }
    }

    if (req.method == 'PATCH') {
        try {
            const objectData = JSON.parse(fileContents)
            const result = objectData.db.filter((data: any) => {
                return (
                    data.id == ruleid
                )
            })
            const action = req.body.action
            delete req.body.action
            
            const newRule = {
                id : Date.now(),
                conditions: [req.body],
                action : action

            }
    
            
            result[0].rules = [...result[0].rules,newRule]
            // console.log(result[0]);
            

            res.status(200).json(result[0])
            
            

        } catch (error) {
            res.status(500).json(error)

        }
    }




}