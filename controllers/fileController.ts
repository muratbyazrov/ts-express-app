export default class fileController {
    static upload(req, res) {
        console.log(req.file)
        console.log('Загружено');
    }

    static download(req, res) {
        const { fileName } = req.params;
        console.log(fileName)
        res.download(`./upload/${fileName}`)
    }
}
