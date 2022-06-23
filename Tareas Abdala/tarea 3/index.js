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
        <h2>Los numeros son:</h2><br>
        <h3>${EsPrimo(formulario.get('min'), formulario.get('max'))}</h3>
        <br>
        <a href="index.html">Retornar</a>
        </div>
     </body></html>`
    respuesta.end(pagina)
  })
}
//server

function EsPrimo(Min,Max){
    let mos = "";
    let g=0;
    let res=0; 
    let tod=0;
    let prim=false;
    let pri=false; 

    for (let a = Min; a <= Max; a++) {
     g=a;
     prim=false;
     pri=false; 
    
    prim = filtro(a);
    if (prim==true) {
      tod=0;
        do {
            res=g%10;
            g=g/10;
            g=Math.trunc(g);
            tod=tod+res;
        } while (g!=0);
        pri= filtro(tod);
    }

    if (pri==true) {
        mos += a;
        mos+= "-";
      }
    } // primer for
    return mos
}
function filtro(numero){
    if (numero == 0 || numero == 1 || numero == 4) return false;
	for (let x = 2; x < numero / 2; x++) {
		if (numero % x == 0) return false;
	}
	return true;
}