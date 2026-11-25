# Paul Escobar — Carpintería y muebles a medida

Sitio estático listo para publicar en GitHub Pages. Está hecho con HTML, CSS y JavaScript sin framework ni rastreadores.

## Publicar en GitHub Pages

1. Suba estos archivos a la rama `main` del repositorio.
2. En GitHub, abra **Settings > Pages**.
3. En **Build and deployment**, elija **Deploy from a branch**.
4. Seleccione la rama `main` y la carpeta `/(root)`; guarde los cambios.
5. Cuando GitHub muestre la URL publicada, completá las dos etiquetas de imagen social (`og:image` y `twitter:image`) de `index.html` con la URL absoluta de `assets/img/hero-1600.webp`.

El archivo `.nojekyll` evita que GitHub Pages omita carpetas o archivos estáticos.

## Fotos de trabajos

1. Copie las fotos originales a `fotos_originales/`.
2. Instale la única dependencia del optimizador: `npm install`.
3. Ejecute `npm run images`.
4. Suba también los cambios generados en `assets/img/`.

El optimizador corrige la orientación EXIF, elimina los metadatos al convertir a WebP y crea versiones de 640 y 1600 píxeles. Además, escoge automáticamente la foto horizontal más conveniente para el hero y genera `assets/img/gallery.json`. Al quitar fotos, vuelva a correr el mismo comando para regenerar la galería.

Si `fotos_originales/` está vacía, el optimizador deja la galería sin imágenes y el sitio muestra un estado neutro. No se usan imágenes de terceros ni enlaces directos a Facebook.

## Cambiar textos y enlaces

- Los textos del sitio están en `index.html`.
- Los colores y el diseño están en `assets/css/styles.css`.
- El teléfono y los enlaces de WhatsApp/Facebook están en `index.html`; busque `595985530588` o `paulescobar99` para cambiarlos.
- La interacción de galería está en `assets/js/main.js`.

## Dominio propio

En **Settings > Pages**, escriba el dominio en **Custom domain** y guárdelo. Luego configure en el proveedor del dominio el registro DNS que GitHub indique. Active **Enforce HTTPS** cuando esté disponible. Consulte la documentación de GitHub Pages si el dominio es un subdominio o si necesita los valores DNS exactos.

## Pendientes antes de publicar

- Reemplazar las URLs relativas de `og:image` y `twitter:image` por la URL absoluta final de GitHub Pages.
- <!-- TODO: Si se desea, revisar y personalizar los textos alternativos de cada foto en `assets/img/gallery.json` después de ejecutar el optimizador. -->
