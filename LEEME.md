# Mi Planner Digital

App instalable (PWA) para organizar días, hábitos, notas, comidas, turnos, compras, finanzas, proyectos y objetivos.

Funciona sin internet. Los datos se guardan en el dispositivo y, si activás la sincronización, también en la nube.

- **En línea:** https://leosclaudia.github.io/mi-planner-digital/
- **Repositorio:** GitHub, rama `main`, publicado con GitHub Pages

---

## Las 5 pestañas

| Pestaña | Para qué |
|---|---|
| **Inicio** | El día de hoy: notas, prioridades y recordatorios |
| **Notas** | Fichas sueltas con título y fecha, reordenables |
| **Semana** | Un recuadro por día, con fecha real |
| **Hábitos** | Seguimiento mes por mes |
| **Más** | Buscar, Comidas, Turnos, Compras, Finanzas, Proyectos, Objetivos, Sincronizar y copia de seguridad |

---

## Cómo se usa cada cosa

### Semana
Cada día tiene su fecha real, así que lo que escribís no se pisa nunca.

- **7, 14 o 30 días**: los botones de arriba cambian cuántos días ves de una. La elección queda guardada en ese dispositivo.
- **Flechas ‹ ›**: saltan del tamaño del período que estés viendo.
- **📅**: abre el calendario del sistema para ir directo a cualquier fecha.
- **↪** (dentro de un día abierto): mueve la nota entera a otra fecha. Si el día destino ya tenía algo, lo agrega abajo en vez de pisarlo.

### Notas
Cada nota es una ficha con su título, su fecha y su contenido.

- **Nota nueva** arriba de todo.
- Se reordenan **arrastrándolas** (en la PC) o con las **flechitas ⬅️ ➡️** (en el celular).
- La **✕** elimina, pidiendo confirmación.

### Escribir dentro de los recuadros
Todos los recuadros (días, notas, comidas, turnos) aceptan lo mismo: texto con formato, imágenes, stickers y dibujo a mano.

- Las imágenes entran como **miniatura** para que no estiren la tarjeta. Tocándolas aparece el panel: **🔍 Ver grande**, **↔️ Tamaño**, **⬅️ ⏺️ ➡️** para alinearla, **📄 Al lado** para que el texto la rodee, **⬆️⬇️** para moverla de lugar, **✂️ Cortar** y eliminar.
- **Para mover o redimensionar**: tocá la imagen y aparece un marco con cuatro manijas en las esquinas. Desde el **centro** la arrastrás a donde quieras; desde la **esquina de abajo a la derecha** la agrandás o achicás sin deformarla. Funciona con el mouse, el dedo y el lápiz óptico, y no puede salirse del recuadro.
- También están los botones **➕ ➖** para ir de a poco, y **↔️ Original** que la devuelve al tamaño de miniatura.
- Por defecto las imágenes quedan centradas. Con los botones de alineación se pegan a un costado, y con **Al lado** el texto se acomoda a su derecha o izquierda (tocalo dos veces para cambiar de lado).
- **Para mover una imagen de un lado a otro**: tocala → **✂️ Cortar** → andá al otro recuadro → tocá adentro → **📋 Pegar acá**.
- **Convertir a texto** pasa lo que escribiste a mano a texto tipeado.
- Se guarda solo mientras escribís. Cuando algo se graba aparece un **✓ Guardado** abajo.

### Hábitos
Van **por mes**: las flechas ‹ › cambian de mes y el día de hoy queda con borde marcado.

El número en el círculo es la **prioridad**. Se cambia con las flechas ⬆️⬇️ o arrastrando la tarjeta.

### Turnos
Se ordenan solos: primero el más próximo, y los que ya pasaron se van al final atenuados.

La campanita **Avisarme** activa el recordatorio de ese turno.

No hace falta reordenarlos a mano: el orden lo da la fecha.

Los turnos que ya pasaron no se muestran, para no estorbar. Arriba aparece un aviso con cuántos hay; tocándolo se despliegan, y ahí podés borrarlos todos juntos si ya no los necesitás.

### Objetivos
Vienen cuatro categorías (personal, trabajo, bienestar, dinero), pero podés **agregar las tuyas** con el botón de abajo, ponerles el nombre que quieras, reordenarlas y eliminar las que no uses.

### Compras y Proyectos
Los ítems se reordenan con las flechas **⬆️⬇️**. Cuando hay cosas tildadas aparece un botón **🧹 Borrar los tildados** que las saca todas de una, en vez de ir una por una. Lo mismo para los pasos de cada proyecto.

### Buscar
En **Más → 🔎 Buscar en todo el planner**. Busca en días, comidas, turnos, notas, prioridades, compras, hábitos y objetivos. No distingue mayúsculas ni tildes: "agroecologia" encuentra "Agroecología". Tocando un resultado te lleva justo ahí.

### Imprimir
El ícono de impresora arriba imprime esa pantalla. Dentro de cada día hay otro para imprimir solo ese día. Desde **Más** se imprime el planner completo. Sirve también para guardar en PDF.

---

## Copia de seguridad

**Más → Bajar copia (.json)** guarda todo tu planner en un archivo. **Restaurar desde archivo** lo devuelve.

Conviene bajar una copia cada tanto. Es tu seguro real: no depende ni de la nube ni del navegador.

---

## Sincronizar entre dispositivos

Usa Firebase (gratis). Los datos van directo de tu dispositivo a tu propio proyecto de Firebase.

**Configuración actual:** proyecto `mi-planner-digital-83cb1`, plan Spark.

Para conectar un dispositivo nuevo: **Más → Sincronizar**, pegar la configuración de Firebase y el código de sincronización, y tocar Conectar.

**Botón "Subir todo a la nube"**: manda todo lo que hay en ese dispositivo. Se usa al cambiar de código de sincronización, o cuando querés forzar una subida completa.

### Seguridad
Las reglas de Firestore están cerradas: solo se puede leer y escribir el planner del código configurado, y no tienen fecha de vencimiento. Las reglas no son públicas, así que nadie puede ver cuál es el código desde afuera.

El repositorio es público (GitHub Pages gratis lo requiere), pero **no hay ninguna clave dentro del código**. La configuración de Firebase se carga desde la app y queda guardada en el navegador.

Si alguna vez cambiás el código de sincronización, hay que actualizarlo también en las reglas de Firestore.

---

## Publicar cambios

1. Reemplazar `index.html` en GitHub y hacer commit.
2. Esperar un par de minutos a que GitHub Pages publique.
3. **Subir el número de versión en `service-worker.js`** (`planner-v4` → `planner-v5`). Sin esto, los dispositivos pueden seguir mostrando la versión anterior.

---

## Límites que conviene tener claros

- **Notificaciones de Turnos**: son locales, no push reales. Avisan mientras la app está instalada o abierta, pero no van a sonar si el celular estuvo días sin abrirla. En iPhone hace falta tenerla instalada en la pantalla de inicio, con iOS 16.4 o más nuevo.
- **Tamaño de las imágenes**: se comprimen solas a 900px al insertarlas. Firestore acepta hasta 1MB por día o por nota, así que no conviene meter decenas de fotos en un mismo recuadro.
- **Espacio del navegador**: ronda los 5MB por dispositivo. Si se llenara, la app avisa con un cartel en vez de fallar en silencio.
- **La app arranca vacía en cada dirección web nueva**: los datos del navegador están atados al dominio. Por eso se usa la sincronización para traerlos.

---

## Estructura de archivos

```
index.html          toda la app (pantallas, estilos y lógica)
manifest.json       datos para instalarla como app
service-worker.js   funcionamiento sin internet y control de versión
icons/              íconos de la app
```
