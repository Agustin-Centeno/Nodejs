const http = require('http')
const fs = require('fs')

const mime = {
  'html': 'text/html',
  'css': 'text/css'
}

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:9000' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
})

servidor.listen(9000)

function encaminar(pedido, respuesta, camino) {
  console.log(camino)
  switch (camino) {
    case 'public/getaccion': {
      recuperar(pedido, respuesta)
      break
    }
    default: {
      fs.stat(camino, error => {
        if (!error) {
          fs.readFile(camino, (error, contenido) => {
            if (error) {
              respuesta.writeHead(500, { 'Content-Type': 'text/plain' })
              respuesta.write('Error interno')
              respuesta.end()
            } else {
              const vec = camino.split('.')
              const extension = vec[vec.length - 1]
              const mimearchivo = mime[extension]
              respuesta.writeHead(200, { 'Content-Type': mimearchivo })
              respuesta.write(contenido)
              respuesta.end()
            }
          })
        } else {
          respuesta.writeHead(404, { 'Content-Type': 'text/html' })
          respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>')
          respuesta.end()
        }
      })
    }
  }
}
console.log('Servidor web iniciado')

function recuperar(pedido, respuesta) {
  let info = ''
  pedido.on('data', datosparciales => {
    info += datosparciales
  })
  pedido.on('end', () => {
    const formulario = new URLSearchParams(info)
    console.log(formulario)
    respuesta.writeHead(200, { 'Content-Type': 'text/html' })
    const pagina =
      `<!doctype html>
      <html>
      <head></head>
      <body>
      <div align="center">   
        <h2>El valor del texto es:</h2><br>
        <h3>${TextValor(formulario.get('par').toLowerCase())}</h3>
        <br>
        <a href="index.html">Retornar</a>
        </div>
     </body></html>`
    respuesta.end(pagina)
  })
}
//server

function TextValor(tex) {
    let c=0;
    for (let i = 0; i <= tex.length; i++) {
        switch (tex[i]) {
            case 'a':
                c=c+1;
                break;
            case 'e':
                c=c+1;
                break;
            case 'o':
                c=c+2;
                break;
            case 's':
                c=c+2;
                break;
            case 'd':
                c=c+3;
                break;
            case 'i':
                c=c+3;
                break;
            case 'r':
                c=c+3;
                break;
            case 'n':
                c=c+3;
                break;
            case 'c':
                c=c+4;
                break;
            case 'l':
                c=c+4;
                break;
            case 't':
                c=c+4;
                break;
            case 'u':
                c=c+4;
                break;
            case 'm':
                c=c+5;
                break;
            case 'p':
                c=c+5;
                break;
            case 'b':
                c=c+6;
                break;
            case 'f':
                c=c+6;
                break;
            case 'g':
                c=c+6;
                break;
            case 'h':
                c=c+6;
                break;
            case 'j':
                c=c+6;
                break;
            case 'q':
                c=c+6;
                break;
            case 'v':
                c=c+6;
                break;
            case 'x':
                c=c+6;
                break;
            case 'y':
                c=c+6;
                break;
            case 'z':
                c=c+6;
                break;
            case 'k':
                c=c+7;
                break;
            case 'w':
                c=c+7;
                break;
            default:
                break;
        }
    }
    return c;
}