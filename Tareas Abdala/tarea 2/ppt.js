const http = require('http')
const fs = require('fs')

const mime = {
  'html': 'text/html',
  'css': 'text/css',
  'jpg': 'image/jpg',
  'ico': 'image/x-icon',
  'mp3': 'audio/mpeg3',
  'mp4': 'video/mp4'
}

const servidor = http.createServer((pedido, respuesta) => {
  const url = new URL('http://localhost:7777' + pedido.url)
  let camino = 'public' + url.pathname
  if (camino == 'public/')
    camino = 'public/index.html'
  encaminar(pedido, respuesta, camino)
})

servidor.listen(7777)


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
        <h3>${verifyRow(formulario.get('ppt'))}</h3>
        <br>
        <a href="index.html">Retornar</a>
        </div>
     </body></html>`
    respuesta.end(pagina)
  })
}
//server

function verifyRow(p1){
const ju=[
    'Piedra',
    'Papel',
    'Tijera'
]
let r=Math.floor(Math.random() * 3);
let p2= ju[r];
let win= false;
let k;
switch(p1){
  case "p":{
      k="Piedra";
      break
  }
  case "a":{
    k="Papel";
    break
  }
  case "t":{
    k="Tijera";
    break
  }
}
if(k=="Piedra" && p2=="Tijera"){
    win=true;
}
if(k=="Papel" && p2=="Piedra"){
  win=true;  
}
if(k=="Tijera" && p2=="Papel"){
  win=true;
}
if(k==p2){
  return "Elegiste: "+k+"<br>El servidor eligio: "+p2+"<br>Empate"
}
else{
  if(win=true){
    return "Elegiste: "+k+"<br>El servidor eligio: "+p2+"<br>Ganaste!!!"
}
  if(win=false){
  return "Elegiste: "+k+"<br>El servidor eligio: "+p2+"<br>Perdiste :("
}
}
}