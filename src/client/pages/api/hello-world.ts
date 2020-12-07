import { NextApiHandler } from "next";

const helloWorld: NextApiHandler = (req, res) => {
    const { author } = req.query;
    res.status(200).send('Hello World');
    
};

export default helloWorld;