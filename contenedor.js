const fs = require('fs')

class Contenedor {
    constructor(nombreArchivo) {
        this.nombreArchivo = nombreArchivo;
        this.id = 1;
    }


    async getFileContent() {
        try {
            const contenido = await fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8')
            return JSON.parse(contenido);

        } catch (error) {
            console.log(error)
        }
    }


    // Recibe objeto, le agrega id, lo agrega al archivo y devuelve id
    async save(newObject) {
        let contenido = await this.getFileContent()
        let maxId = 0;
        if (contenido.length === 0) {
            newObject.id = 1;
        } else {
            contenido.forEach(element => {
                if (element.id > maxId) {
                    maxId = element.id;
                }
            });
            newObject.id = maxId + 1;
        }

        contenido.push(newObject);
        fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(contenido))
            .then(() => {

            })
        return newObject.id
    }

    // recibe id, devuelve objecto si existe id sino null
    async getById(id) {
        let contenido = await this.getFileContent()
        const result = contenido.find((objeto) => {
            return id === objeto.id;
        })
        return result || null;
    }

    // elimina el objeto del archivo con el id buscado
    async deleteById(id) {
        let contenido = await this.getFileContent()
        let auxArray = contenido.filter((objeto) => {
            return !(objeto.id === id);
        })
        fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify(auxArray))
            .then(() => {
                fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then((content) => console.log(content, "linea65 deleteby"))
            })
    }

    async getAll() {
        let contenido = await this.getFileContent()
        return contenido;
    }

    async deleteAll() {
        fs.promises.writeFile(`./${this.nombreArchivo}`, JSON.stringify([]))
            .then(() => {
                fs.promises.readFile(`./${this.nombreArchivo}`, 'utf-8').then((content) => console.log(content, "linea65 deleteby"))
            })
    }
}

const test = new Contenedor("hola.txt");

test.getFileContent().then(asfd => console.log(asfd))

// test.save({ title: 'hola' }).then(() => {
//     test.getFileContent().then(asfd => console.log(asfd))
// })


// console.log('check existing object')
test.getById(5).then(objeto => console.log(objeto))
// test.getById(1).then(objeto => console.log(objeto))

test.deleteById(3).then(() => {
    console.log(test.getAll())
})



