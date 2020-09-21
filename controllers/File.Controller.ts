export default class FileController {
    static upload(req, res) {
        res.send({message: `файл "${req.file.originalname}" благополучно загружен`})
        console.log(req.file.originalname)
    }

    static download(req, res) {
        const { fileName } = req.params;
        console.log(fileName)
        res.download(`./upload/${fileName}`)
    }
}
