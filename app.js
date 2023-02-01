#!/usr/bin/env node

import fs from 'fs'
import  readline  from 'readline';
import path from 'path';
import inquirer from 'inquirer';
import colors from 'colors';


const isFile = fileName => {
  return fs.lstatSync(fileName).isFile();
}

const currentDirectory = process.cwd();

const list = fs.readdirSync(currentDirectory)




inquirer
  .prompt([
    {
    name: 'fileName',
    type: 'list',
    message: 'Choose file: ',
    choices: list
    },
    {
      name: "findString",
      type: "input",
      message: "Enter something for search"
    }
  ])
  .then((answer) => {
    console.log(answer.fileName);
    console.log(`Search by request: ${answer.findString}`);
    
   

   let filePath = null
   if (isFile(answer.fileName)) {
      filePath = path.join(currentDirectory, answer.fileName);
      processLineByLine();
    } else {
      console.log('Папка')
    }

   
    
    async function processLineByLine() {
      const readStream = fs.createReadStream(filePath, 'utf-8');

      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });
  
      for await (const line of rl) {
        if (line.includes(answer.findString)) {
          
            console.log(line.replace(answer.findString, colors.bgYellow(answer.findString))+ "\n");
          } else {
            console.log(line + "\n");
          }
        }
  
    }
    

  })


