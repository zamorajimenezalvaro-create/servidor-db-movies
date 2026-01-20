const str = `Hola mundo`
const n = 123

console.log(str, typeof str)
console.log(n, typeof n)

const str1: string = `Hola mundo`
const n1: number = 123
const b1: boolean = true

function suma(a: number, b: number): number {
    return a + b
}

console.log(suma(1, 2)), typeof suma(1, 2)

function saludo(nombre: string, edad: number, favorita: string){
    return `Hola soy ${nombre}, tengo ${edad} y mi cosa favorita es ${favorita}`
}

type generoTipo = `Masculino` | `Femenino` | `Otro`

function generarUsuario() {
    const nombre: string = `user` + Math.floor(Math.random() * 999)
    const genero: generoTipo = `Masculino`
    return {nombre, genero}
}