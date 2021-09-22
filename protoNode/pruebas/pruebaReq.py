import requests
import json
import urllib.parse
import pandas as pd

#url = "http://localhost:3000/ApiDb/usuarios/registrar"

def peticion(tipo,url,encabezado,datos):
	print(urllib.parse.urlencode(datos))
	response = requests.request(tipo, url, headers=encabezado, data = datos)

	if('{' in response.text):
		print(json.dumps(json.loads(response.text), sort_keys=True, indent=4))
	else:
		print(response.text)

	input()

headers = {
  'Content-Type': 'application/json'
}

body={
	'edad':20,
	'nombre':'DAVID'
}

login={
	'email':'sadewsad2',
	'password':'DAVID'
}

datos={
	'names':'Cristian',
	'lastNames':'david',
	'address':'dsadsa',
	'email':'sadews32ad2',
	'password':'dqwewqew'
}

consulta={
	'nombre':'Cristian'
}

articulo={
  "_id": {
    "$oid": "5ea9a9cb8887a932a4f918d3"
  },
  "descripciones": [
    {
      "nombre": "Empuñadura de goma suave proporciona una mayor comodidad en el trabajo"
    },
    {
      "nombre": "Diseño compacto y ergonomico"
    },
    {
      "nombre": "solo pesa 3,4 kg con bateria"
    }
  ],
  "imagenes": [
    "https://cdn.totalcode.com/easy/product-zoom/es/taladro-percutor-3~8%22-tm505-0_2800-rpm-500w-x120v-2.jpg",
    "https://agroazulsmiguelhnos.com/wp-content/uploads/2019/04/120-27.png"
  ],
  "nombre": "talsadadroooo",
  "categoria": "ferreteria",
  "cantidad": "200",
  "marca": "black & decker",
  "color": "naranja",
  "precio": "100000",
  "valoracion": "1",
  "compras": "1000",
  "__v": 0
}



articuloU={
	"criterio":{"_id":"5f1b937a49d55c2528b0d742"},
	"datoNuevo":{
	  "descripciones": [
		{
		  "nombre": "Empuñadura de goma suave proporciona una mayor comodidad en el trabajo"
		},
		{
		  "nombre": "Diseño compacto y ergonomico"
		},
		{
		  "nombre": "solo pesa 3,4 kg con bateria"
		}
	  ],

	  "nombre": "taladro",
	  "categoria": "ferreteria",
	  "cantidad": "200",
	  "marca": "black & decker",
	  "color": "naranja",
	  "precio": "100000",
	  "valoracion": "1",
	  "compras": "1000",
	  "__v": 0
	}
}

#peticion('POST',"http://localhost:2020/insertar",headers,body)
#peticion('POST',"http://localhost:3000/ApiDb/usuarios/login",headers,login)
#peticion('POST',"http://localhost:3000/ApiDb/usuarios/registrar",headers,datos)
#peticion('POST',"http://localhost:3000/ApiDb/usuarios/query",headers,consulta)

#peticion('POST',"http://localhost:3000/ApiDb/articulos",headers,articulo)

criterio={'_id':'5f1b937a49d55c2528b0d742'}

y = json.dumps(articuloU) 
print(y)

peticion('GET',"http://localhost:3000/ApiDb/articulos/",headers,criterio)
#peticion('PUT',"http://localhost:3000/ApiDb/articulos/5f1b937a49d55c2528b0d742",headers,articuloU)
#peticion('DELETE',"http://localhost:3000/ApiDb/articulos/5f1b89ad7fb5351bcc34904c",headers,articuloU)
	

