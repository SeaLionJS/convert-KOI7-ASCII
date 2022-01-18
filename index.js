import fs from 'fs'
import path from 'path'
import setts from './settings.js'
import algorithms from './modules/algorithms.js'

const __dirname = path.dirname(process.argv[1]);

const fromFile = setts.from;
const toFile = setts.to;
const algorithm = setts.algorithm;

const readFile = (filename)=>{
    return new Promise((res, rej)=>{
        let pathOfFile = path.join(__dirname + '/user_files/' + filename);

        fs.readFile(pathOfFile, "utf8", 
        (error,data)=>{
            console.log("\nЧтение файла...");
            if(error) rej("Ошибка чтения, проверьте путь к файлу");
            res(data);  
        });
    })
};

const convertFile = (data)=>{
    return new Promise((res)=>{
        console.log("Конвертация файла...")
        const arr = data.split("");

        let result = arr.reduce((previous, current)=>`${previous}${algorithms[algorithm](current)}`)
        console.log(result);
        console.log("Окончание конвертации...")
        res(result)
    })
}

const saveFile = (filename, data)=>{
    if(filename == undefined){
        console.log("Путь к файлу не указан, содержимое не сохранено!");
        return;
    }
    console.log("Сохранение файла...")
    return new Promise((res, rej)=>{
        let pathOfFile = path.join(__dirname + '/user_files/' + filename);
        fs.writeFile(pathOfFile, data, (error)=>{
             if(error) rej("Ошибка записи, возможно файл используется, также проверьте путь к файлу!");
        });
        res();
    })
}

//////////////////////////////////////////////////////////////////////////

readFile(fromFile)
.then((data)=>convertFile(data))
.then((data)=>saveFile(toFile,data))
.then(()=>console.log("Конвертация успешно выполнена!\n"))
.catch((err)=>console.log(err))
