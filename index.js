import fs from 'fs'
import  readline  from 'readline';

//ip для поиска
const ipSearch = ['89.123.1.41', '34.48.240.111']


// функция для построчного анализ файла 
async function processLineByLine() {
    // содаём поток для чтения
    const readStream = fs.createReadStream('./access_tmp.log', 'utf-8');
    // создаём потоки для записи
    const writeStream1 = fs.createWriteStream(`${ipSearch[0]}`);
    const writeStream2 = fs.createWriteStream(`${ipSearch[1]}`);
    //организуем построчное чтение файлового потока
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });
    
    //проверяем каждую строку потока на наличие нужных ip
    for await (const line of rl) {
        if (line.includes(ipSearch[0])) {
            //запись в файл
            writeStream1.write(line + "\n");
          }
        
          if (line.includes(ipSearch[1])) {
            writeStream2.write(line + "\n");
        }
    }
}
  // запуск функции
  processLineByLine()