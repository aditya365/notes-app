const fs = require('fs');
const fileName = "sample.txt";

// append file using string
fs.appendFile(fileName, "hello", (err) => {
    if (err) {
        console.log(err.message);
    }
});

//append file using buffer
const buffer = Buffer.from("\nhi");
fs.appendFile(fileName, buffer, (err) => {
    if (err) {
        console.log(err.message);
    }
});


//append file using file descriptor which comes from fs.open
fs.open(fileName, 'a', (err, fd) => {
    if (err) throw err;
    try {
        fs.appendFile(fd, "\nwelcome", (err) => {
            if (err) throw err;
        });
    } catch (err) {
        console.log(err.message);
    }
});


// chmod - updates file permission
fs.chmod(fileName, 0o775, (err) => {
    if (err) console.log(err.message);
});

// close file
fs.open(fileName, (err, fd) => {
    if (err) throw err;
    fs.close(fd, (err) => { });
});

// copy file
fs.copyFile(fileName, "sample-duplicate.txt", (err) => {
    if (err) throw err;
});

// createReadStream
const reader = fs.createReadStream(fileName);
reader.on('data', (chunk) => {
});


// createWriteStream
const writer = fs.createWriteStream('sample-duplicate1.txt');
writer.write('chunk 1');
writer.write('chunk 2');

//const reader1 = fs.createReadStream('sample.txt').pipe(writer);

// truncating file after n bytes
fs.open('sample.txt','r+', (err, fd) => {
    if (err) throw err;
    fs.ftruncate(fd, 9, (err) => { 
        if(err) console.log(err.message);
    })
});

// create directory
fs.mkdir('test-dir/1/2/3', {recursive:true},(err)=>{
    if(err) console.log(err.message);
})

fs.mkdtemp('foo',(err, directory)=>{
    if(err) console.log(err.message);
    console.log(directory);
})


var bufferForRead = new Buffer.alloc(1234);
fs.open('sample.txt','r+',(err, fd)=>{
    fs.read(fd,bufferForRead,0,bufferForRead.length, 0,(err, bytesRead, buffer)=>{
        console.log(buffer.toString(), bytesRead);
    });
})

fs.opendir('test-dir/1',(err,dir)=>{

});


//list files in a directory
fs.readdir('/aditya/angular/e-com',{withFileTypes:true}, (err,files)=>{
     files.forEach(f=>{
        console.log(f.isDirectory()?"directory":"file", f.name);
     }) 
})


fs.readFile('sample.txt',(err,data)=>{
    console.log(data.toString());
});

fs.rename('sample-duplicate1.txt', 'test-dir/1/2/hello.txt',(err)=>{
    if(err) console.log(err.message)
})

//recursively remove directories
fs.rmdir('test-dir', { recursive: true }, (err) => {
    if (err) console.log(err.message);
})

fs.rm('foo6unrlE', { recursive: true }, (err) => {
    if (err) console.log(err.message);
})


fs.stat('sample1.txt', (err, stats) => {
    if (err) console.log('file or directory does not exist');
    console.log(stats);
})

fs.truncate('sample-duplicate.txt', (err) => {
    if (err) console.log(err.message);
})

fs.open('sample.txt', 'r+', (err, fd) => {
    var writeBuffer = Buffer.from("hellooooooooooooo");
    fs.write(fd, writeBuffer, 0, writeBuffer.length, 0, (err, bytesWritten, buffer) => {
        console.log(bytesWritten, buffer.toString())
    })
})


fs.writeFile('sample-4.txt', "my name os hellooooooooooo", (err) => {})
