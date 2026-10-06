# React Random Cat Facts

Aplicación web desarrollada con **React.js** como proyecto de práctica para afianzar conocimientos sobre componentes, hooks, custom hooks, consumo de APIs y testing End-to-End.

El proyecto fue inicializado desde cero utilizando **Vite con Vanilla JavaScript**, incorporando posteriormente React y configurando manualmente el entorno de desarrollo.

La aplicación obtiene un dato aleatorio sobre gatos desde una API y utiliza la primera palabra del dato obtenido para generar una imagen personalizada mediante una segunda API.

---

## Características

* Obtención de datos aleatorios sobre gatos.
* Consumo de APIs externas mediante `fetch`.
* Generación de imágenes a partir del contenido del dato obtenido.
* Uso de `useState` y `useEffect`.
* Creación de Custom Hooks.
* Separación de la lógica de acceso a las APIs.
* Actualización del contenido mediante un botón.
* Pruebas End-to-End utilizando Playwright.
* Linting mediante StandardJS.
* Configuración manual de React sobre Vite.

---

## Tecnologías utilizadas

* React 19
* React DOM
* Vite
* JavaScript
* Fetch API
* Playwright
* StandardJS
* npm

---

## APIs utilizadas

### Cat Facts API

Se utiliza para obtener un dato aleatorio sobre gatos.

```text
https://catfact.ninja/fact
```

Ejemplo de respuesta:

```json
{
  "fact": "Cats have five toes on their front paws.",
  "length": 44
}
```

### Cataas

Se utiliza la primera palabra del dato obtenido para generar una imagen de un gato.

```text
https://cataas.com/cat/says/{firstWord}
```

Por ejemplo, si el dato obtenido es:

```text
Cats have five toes on their front paws.
```

La aplicación obtiene la primera palabra:

```text
Cats
```

Y genera una URL similar a:

```text
https://cataas.com/cat/says/Cats
```

---

## Estructura del proyecto

```text
react-random-cat-facts/
│
├── public/
│
├── src/
│   ├── hooks/
│   │   ├── useCatsFact.js
│   │   └── useCatsImage.js
│   │
│   ├── logic/
│   │   ├── facts.js
│   │   └── image.js
│   │
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── tests/
│   └── example.spec.js
│
├── index.html
├── vite.config.js
├── playwright.config.cjs
├── package.json
└── README.md
```

---

## Configuración del proyecto

A diferencia de un proyecto creado directamente con el template de React de Vite, este proyecto fue inicializado utilizando Vanilla JavaScript:

```bash
npm create vite@latest
```

Luego se incorporaron manualmente las dependencias necesarias para utilizar React:

```bash
npm install @vitejs/plugin-react -E
npm install react react-dom -E
```

La configuración de Vite utiliza el plugin oficial de React:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()]
})
```

Esto permite utilizar JSX y las características propias de React dentro del proyecto.

---

## Custom Hooks

La lógica relacionada con la obtención de datos y la generación de imágenes fue separada mediante Custom Hooks.

### useCatsFact

`useCatsFact` se encarga de obtener y almacenar el dato aleatorio sobre gatos.

```js
const { fact, getNewFact } = useCatsFact()
```

El hook utiliza `useState` para almacenar el dato y `useEffect` para realizar una petición inicial cuando el componente se monta.

La función `getNewFact` permite realizar una nueva petición cuando el usuario presiona el botón correspondiente.

---

### useCatsImage

`useCatsImage` se encarga de generar la URL de la imagen a partir del dato obtenido.

```js
const { imageUrl } = useCatsImage({ fact })
```

Cuando cambia `fact`, el hook obtiene la primera palabra y genera la URL correspondiente mediante la función `getImgUrl`.

---

## Separación de responsabilidades

La lógica de comunicación con las APIs se encuentra separada de los componentes y hooks.

### facts.js

Contiene la función encargada de consultar la API de Cat Facts:

```js
const FACTS_RANDOM_OF_CATS_API = 'https://catfact.ninja/fact'

export async function getRandomFact() {
    const res = await fetch(FACTS_RANDOM_OF_CATS_API)
    const data = await res.json()
    const { fact } = data

    return fact
}
```

### image.js

Contiene la función encargada de obtener la primera palabra del dato y generar la URL de la imagen:

```js
const IMAGE_OF_CATS_API = 'https://cataas.com/cat/says/'

export const getImgUrl = (fact) => {
    const firstWord = fact.split(' ')[0]

    return `${IMAGE_OF_CATS_API}${firstWord}`
}
```

De esta manera, cada parte de la aplicación tiene una responsabilidad específica.

---

## Testing End-to-End

El proyecto incorpora pruebas End-to-End utilizando **Playwright**.

El objetivo de la prueba es comprobar que la aplicación cargue correctamente y que presente los elementos principales esperados.

El test verifica que:

1. La aplicación cargue correctamente.
2. Se muestre un dato sobre gatos.
3. Se muestre una imagen.
4. La imagen utilice una URL correspondiente a Cataas.

### Test utilizado

```js
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/'

test('app shows random fact and image', async ({ page }) => {
    await page.goto(LOCALHOST_URL)

    const text = await page.getByRole('paragraph')
    const image = await page.getByRole('img')

    const textContent = await text.textContent()
    const imageSrc = await image.getAttribute('src')

    await expect(textContent?.length).toBeGreaterThan(0)
    await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()
})
```

### Ejecutar los tests

Primero se debe iniciar la aplicación:

```bash
npm run dev
```

Luego, en otra terminal:

```bash
npm run test
```

También es posible ejecutar Playwright utilizando su interfaz:

```bash
npm run test:ui
```

---

## Instalación y ejecución

Clonar el repositorio:

```bash
git clone https://github.com/Fede-Code-007/react-random-cat-facts.git
```

Ingresar al proyecto:

```bash
cd react-random-cat-facts
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación estará disponible normalmente en:

```text
http://localhost:5173/
```

---

## Scripts disponibles

| Comando           | Descripción                                     |
| ----------------- | ----------------------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo de Vite        |
| `npm run build`   | Genera la versión de producción                 |
| `npm run preview` | Previsualiza la versión de producción           |
| `npm run test`    | Ejecuta las pruebas de Playwright               |
| `npm run test:ui` | Ejecuta Playwright mediante su interfaz gráfica |

---

## Linting

El proyecto utiliza **StandardJS** como herramienta de linting para mantener un estilo de código consistente.

La configuración se encuentra definida en `package.json`:

```json
"eslintConfig": {
    "extends": "./node_modules/standard/eslintrc.json"
}
```

---

## Conceptos practicados

Este proyecto fue desarrollado con el objetivo de reforzar los siguientes conceptos:

* Componentes funcionales.
* JSX.
* `useState`.
* `useEffect`.
* Custom Hooks.
* Consumo de APIs.
* Fetch API.
* Manejo de respuestas JSON.
* Separación de responsabilidades.
* Organización del código por funcionalidades.
* Manejo de eventos.
* Testing End-to-End.
* Configuración de React con Vite.
* Linting con StandardJS.
* npm y gestión de dependencias.

---

## Objetivo del proyecto

Este proyecto forma parte de mi proceso de aprendizaje de **React.js**, con el objetivo de profundizar en el desarrollo de aplicaciones utilizando hooks, consumo de APIs y una estructura de código organizada.

Además, se incorporó **Playwright** como primera aproximación al testing automatizado, verificando el comportamiento general de la aplicación desde la perspectiva del usuario.

El proyecto también permitió practicar la configuración manual de React sobre Vite, la separación de lógica mediante Custom Hooks y la organización del código en diferentes módulos.

