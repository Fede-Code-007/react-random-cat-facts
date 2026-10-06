
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173/';
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com/cat/says/';

test('app shows random fact and image', async ({ page }) => {
  
  // Navegamos a la URL local de la aplicación
  await page.goto(LOCALHOST_URL);

  //Obtenemos los elementos del DOM que contienen el texto y la imagen
  const text = await page.getByRole('paragraph');
  const image = await page.getByRole('img');

  //Obtenemos el contenido del texto y el src de la imagen
  const textContent = await text.textContent();
  const imageSrc = await image.getAttribute('src');

  //Nos aseguramos de que el contenido del texto no esté vacío y que la URL de la imagen comience con el prefijo esperado
  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(CAT_PREFIX_IMAGE_URL)).toBeTruthy()

});
