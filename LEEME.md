# Mi Planner Digital — versión app (PWA)

## Qué es
Una versión instalable del planner para celular. A diferencia del PDF, acá tocás y tipeás en vez de escribir a mano, y todo se guarda solo en el celular (no hace falta internet para usarlo, salvo para el Asistente).

## Cómo instalarlo en tu celular

Como es una "web app", primero necesita estar alojada en algún lugar con HTTPS — no podés instalarla abriendo el archivo directo desde el celular. La forma más simple, ya que la conocés de Huerta Siglo XXI, es **GitHub Pages**:

1. Subí esta carpeta completa (`index.html`, `manifest.json`, `service-worker.js`, la carpeta `icons/`) a un repositorio de GitHub, igual que hiciste con `leosclaudia.github.io`.
2. Activá GitHub Pages para ese repo (Settings → Pages).
3. Abrí la URL resultante desde el celular (Chrome en Android o Safari en iPhone).
4. Tocá el menú del navegador → **"Agregar a pantalla de inicio"** (o "Instalar app" si aparece directo). Va a quedar como un ícono más, se abre a pantalla completa, sin barra del navegador.

## Sobre el Asistente

Para que funcione, necesita una API key de Gemini (mismo servicio que ya usás en las apps de la huerta). Se pide la primera vez que tocás el ícono de engranaje en la sección Asistente, y se guarda solo en el localStorage de tu celular — no queda expuesta en el código público del repo (a diferencia del problema que tuviste antes con la key hardcodeada en Huerta).

Conseguís una gratis en aistudio.google.com/apikey.

## Qué le falta si querés seguir personalizándolo
- Secciones específicas adicionales (más allá de las que ya están)
- Respaldo automático fuera de Firebase (por ejemplo, exportar a un archivo)

## Notificaciones (recordatorios de Turnos)
Ya están, con una limitación importante para que la tengas clara: son **notificaciones locales**, no push reales.
- Andan mientras la app está instalada/abierta (o en segundo plano, según el sistema operativo).
- **No** van a sonar si el celular estuvo días sin abrir la app — para eso hace falta un servidor propio que dispare la notificación (push real), que es un paso más grande.
- En Turnos, tocá la campanita "Avisarme" en cada turno que quieras que te recuerde, y activá los recordatorios del dispositivo con el botón de arriba la primera vez.
- En iPhone, esto solo funciona si instalaste la app a la pantalla de inicio (no en Safari normal), y necesitás iOS 16.4 o más nuevo.

## Sincronizar entre dispositivos
Funciona de verdad, usando Firebase (gratis) — no pasa por ningún servidor nuestro:

1. Andá a **console.firebase.google.com**, creá un proyecto nuevo (es gratis).
2. Adentro del proyecto, andá a **Build → Firestore Database → Create database** (modo "producción" o "test", cualquiera sirve para empezar).
3. En **Configuración del proyecto (ícono de engranaje) → tus apps → Add app → Web (`</>`)**, registrá una app. Te va a mostrar un bloque de código con `const firebaseConfig = {...}` — copiá justo ese objeto `{...}`.
4. En el planner, andá a **Más → Sincronizar**, pegá esa config, inventá un código (por ejemplo `mi-planner-2026`), y tocá Conectar.
5. Repetí el paso 4 en tu otra tablet/celular, con el mismo código. A partir de ahí, lo que cambies en un dispositivo aparece en el otro en unos segundos.

**Importante sobre seguridad**: por defecto, Firestore en modo "test" queda abierto a cualquiera que tenga tu config — para uso personal entre tus propios dispositivos está bien, pero si en algún momento lo vas a compartir con clientes, conviene configurar reglas de seguridad en Firestore (te puedo ayudar con eso llegado el momento).

## Pizarra de diseño
Nueva sección en Más → Pizarra. Es un lienzo libre para armar composiciones con imágenes, stickers y texto, con las mismas herramientas de mover/redimensionar/copiar que viste en los ejemplos de PlannerLovers:
- **Imagen**: subís una foto del dispositivo (se comprime automáticamente antes de guardarse, para no ocupar demasiado espacio).
- **Sticker**: un set de emojis temáticos (huerta, casa, etc.).
- **Texto**: cuadros de texto editables (tocás una vez para seleccionar, otra vez para escribir).
- Con el elemento seleccionado aparecen las esquinas para redimensionar, y abajo Duplicar, Adelante/Atrás (capas) y Eliminar.

**Importante**: la Pizarra queda *fuera* de la sincronización entre dispositivos (Firebase). Las imágenes ocupan bastante espacio y Firestore tiene un límite de 1MB por documento — si la mezclara con el resto de los datos sincronizados, una pizarra cargada de fotos podría romper la sincronización de todo el planner. Por ahora la Pizarra vive solo en el dispositivo donde la armás.

## Cambios de esta vuelta
- **Tipografía**: los títulos y la portada ahora usan Lora (serif) en vez de Poppins — más suave. Los campos de texto siguen en Inter para que se lean bien al escribir.
- **Lápiz en la Pizarra**: dibujo libre a mano alzada, con 6 colores, control de grosor y borrador. Es una sola capa "aplanada" (como una hoja de papel) — no se pueden mover trazos individuales después de dibujados, a diferencia de las imágenes/stickers/texto que sí son elementos movibles. Si más adelante querés poder editar trazos individuales, es una reconstrucción bastante más grande (herramientas de selección tipo lazo), avisame si llegás a necesitarlo.
- **Copiar / Cortar / Pegar**: ahora están los tres, en vez de solo "Duplicar". "Pegar" aparece arriba (al lado de Imagen/Sticker/Texto) en cuanto cortás o copiás algo. Ojo: el portapapeles vive solo mientras la app está abierta — si recargás la página antes de pegar, se pierde.
- **Acceso directo a la Pizarra**: agregué un link "Abrir la Pizarra de diseño" arriba de Inicio y de Notas, para que esté más a mano. Decidí no duplicar el canvas completo en cada pantalla (Semana, Hábitos, Finanzas, etc.) porque hubiera significado reconstruir toda la lógica de selección/arrastre ocho veces, con mucho más riesgo de bugs y sin necesariamente sumar valor real — una sola Pizarra bien hecha rinde más que ocho a medias. Si después de usarla preferís que cada pantalla tenga su propio lienzo, es un paso que se puede dar, pero es un proyecto en sí mismo.

## Notas ahora es un lienzo completo
Dejé de ser un simple cuadro de texto: cuando abrís Notas, la pantalla entera es un lienzo igual al de Pizarra — escribís, agregás stickers, imágenes, dibujás a mano y usás cortar/copiar/pegar directo ahí, sin ir a ningún otro lado. Son dos lienzos independientes (Notas y Pizarra no comparten contenido), pensados para usos distintos: Notas para ideas sueltas del día a día, Pizarra para una composición más armada.

Si el resultado te convence, el mismo motor ya está armado para reusarse — el siguiente paso natural sería convertir de a una las demás cajas (por ejemplo el cuadro de "Ideas, recursos y notas" de cada Proyecto, o el de cada Turno) en el mismo tipo de lienzo. Cada una que sumemos hay que probarla a mano igual que hice con esta, así que prefiero ir de a una en vez de todas juntas para no arriesgar que algo se rompa sin que lo notemos.

## Por qué no veías los cambios anteriores
Dos causas típicas:
1. **No se re-subió el archivo nuevo** al lugar donde lo tenés publicado (GitHub Pages u otro). Bajar el zip a tu computadora no actualiza una página ya online — hay que reemplazar los archivos ahí.
2. **El service worker cachea agresivamente**. Le cambié la estrategia: ahora el HTML siempre se pide primero a internet (y solo usa la copia guardada si no hay conexión), así que la próxima vez que subas una versión nueva debería verse sin tener que borrar caché a mano. Si igual no se ve, un refresh fuerte (mantené apretado el botón de recargar del navegador, o borrá datos del sitio) lo resuelve seguro.

## Convertir escritura a mano en texto
Nuevo botón "Convertir a texto" dentro del modo Lápiz (en Notas y en Pizarra). Así funciona:
- Escribís a mano con el dedo o el lápiz óptico.
- Tocás "Convertir a texto".
- Le mandamos ese dibujo a Gemini (con tu misma API key del Asistente) pidiéndole que transcriba lo escrito.
- Aparece como un cuadro de texto nuevo en el lienzo, editable, al lado de tu dibujo original (que se mantiene, por si la lectura no salió perfecta y querés reintentar).

**Aclaración honesta**: esto no es un motor de reconocimiento de escritura dedicado (como el que usa un iPad con Apple Pencil) — es una IA de propósito general (Gemini) leyendo una imagen. Funciona bastante bien con letra clara, pero no es infalible con letra muy cursiva o apurada. Necesita conexión a internet y tu API key de Gemini configurada (la misma del Asistente).

## Corregido en esta vuelta
- Saqué el link "Abrir la Pizarra de diseño" que había quedado en Inicio — no debía estar ahí, generaba confusión.
- Bug: el modal para pegar la API key quedaba tapado (no se podía tocar "Guardar") si se abría estando en modo Lápiz, porque el lienzo de dibujo tenía más prioridad visual. Corregido.

## Ahora sí: el lápiz en cada caja (no en un solo lugar)
Le di la vuelta que faltaba. Ya no existe "Pizarra" como página separada — cada caja del planner tiene su propio ícono de lápiz (✏️) en la esquina, y al tocarlo se abre a pantalla completa el mismo lienzo (escribir, sticker, imagen, cortar/copiar/pegar, dibujar a mano, convertir a texto) pero guardado por separado para esa caja.

Cajas que ya tienen su lápiz:
- Inicio: Hoy, Prioridades, Recordatorios
- Semana: cada día (el lápiz no interfiere con el toggle de abrir/cerrar el día)
- Finanzas: Ingresos, Gastos, Ahorro/Meta, Movimientos, Para Recordar
- Proyectos: Objetivo/Resultado, Próximos Pasos, Ideas/Recursos/Notas — de cada proyecto
- Objetivos: las 4 categorías (Personal, Trabajo, Bienestar, Dinero)
- Compras: la lista completa
- Comidas: cada día
- Turnos: cada turno
- **Notas**: ahora es una tarjeta "Tocá para abrir tu lienzo" — al tocarla se abre el mismo sistema, a pantalla completa

No se lo puse a Hábitos (es una grilla de marcar días, no un espacio de notas) — si igual lo querés ahí, avisame.

Cada caja guarda su contenido de forma completamente independiente — dibujar en "Hoy" no toca lo de "Prioridades".

## Bug corregido en esta vuelta
El código tenía una condición duplicada para Notas que hacía que, aunque yo hubiese armado la tarjeta nueva "Tocá para abrir tu lienzo", en la pantalla real siguiera apareciendo el lienzo directo sin esa tarjeta. Ya está resuelto — lo detecté probando el flujo a mano, no alcanzaba con mirar el código.

## Corregido: ya no abre en un lugar aparte
Antes, tocar el lápiz abría una pantalla completa tapando todo (un "modal"). Ahora la caja se transforma en el lienzo **en el mismo lugar donde está**, empujando el resto del contenido hacia abajo — podés seguir scrolleando arriba o abajo con total normalidad, sin que te saque de donde estabas. También saqué la cuadrícula de puntos del fondo del lienzo.

Esto tocó bastante código, así que probé a mano, con capturas, cada una de las pantallas: Inicio, Semana (respetando el acordeón de abrir/cerrar día que ya existía), Finanzas, Proyectos, Objetivos, Compras, Comidas, Turnos y Notas.

En el camino until until encontré y corregí:
- Ingresos/Gastos y los tres cuadros de cada Proyecto están en dos columnas — al expandir uno, el lienzo quedaba angosto e inútil. Ahora, cuando se expande, esa caja pasa a ocupar el ancho completo y la de al lado se acomoda debajo.
- Un bug de copy-paste en el código que había duplicado la función de Comidas y rompía toda la app — ya resuelto.

## Corregido: "Convertir a texto" no leía nada aunque se veía clarito
La hoja de dibujo tenía fondo transparente — la IA recibía la tinta "flotando en el aire" sin una hoja blanca de referencia, y muchas veces no lograba leerla aunque para nosotros se viera perfecto. Ahora el lienzo siempre manda una hoja blanca de verdad de fondo antes de la tinta. También dejé un mensaje más específico si Google bloquea la imagen por algún motivo (en vez del genérico "no pude leer nada").

Si te sigue sin funcionar después de este cambio, avisame — puede que necesitemos ver qué te está respondiendo Gemini exactamente (quedó un log en la consola del navegador para ese caso, F12 → Console).

## Colores libres y más stickers
- En el modo Lápiz, además de los 6 colores rápidos ahora hay una ruedita de color (al final de la fila) que abre el selector de color nativo del celular — cualquier color, no solo los predefinidos.
- Los stickers pasaron de 16 a 46, con más variedad (trabajo, comida, casa, huerta, clima).
- Abajo del todo en el selector de stickers hay un campo "Pegá cualquier emoji" — usá el teclado de emojis de tu celular (el mismo que usás en WhatsApp) para agregar CUALQUIER emoji que exista, no solo los que dejé precargados.

## Sobre las imágenes que no aparecen
No lo pude reproducir en mis pruebas (probé con fotos grandes, tipo cámara de celular, y funcionó bien). Necesito que me cuentes qué pasa exactamente cuando tocás "Imagen": ¿se abre el selector de fotos del celular? ¿elegís una y no pasa nada? ¿aparece algún error? Con ese dato puedo seguir buscando.

## Sobre "Convertir a texto" que sigue sin funcionar
El modelo de IA que usamos (gemini-2.5-flash) sigue activo, no es un modelo viejo roto. Le agregué manejo del error real que devuelve Google — la próxima vez que falle, en vez del mensaje genérico "no pude leer nada", debería decir el motivo real (o quedar registrado en la consola del navegador, F12 → Console, buscá donde dice "Gemini"). Si vuelve a fallar, pasame ese mensaje de error y lo resolvemos con el dato concreto en vez de seguir probando a ciegas.

## Encontrado el motivo real de "Convertir a texto" (y del Asistente)
Gracias al mensaje de error que ahora se mostraba, quedó clarísimo: el modelo que usábamos (gemini-2.5-flash) **ya no está disponible para claves nuevas** — Google lo cerró para altas nuevas aunque siga funcionando para cuentas viejas, por eso en mis pruebas anteriores parecía normal. Actualicé toda la app (Asistente y Convertir a texto) al modelo vigente: **gemini-3.7-flash**. Con esto debería funcionar ya con tu misma API key, sin tener que generar una nueva.

## Bug corregido: el texto se pegaba con el cartel de "Escribí algo"
Cuando agregabas un cuadro de Texto y escribías directo (sin antes seleccionar/borrar el "Escribí algo"), lo que tipeabas se insertaba en el medio del cartel en vez de reemplazarlo — por eso salía algo como "Eschholaalgo". Ahora, apenas se crea un cuadro de texto nuevo, el cartel queda todo seleccionado, así que el primer toque de teclado lo reemplaza limpio.

## Ideas traídas de otra app que revisamos
Miramos juntos el código de otro planner (React/Lovable) para sacar ideas — no copiamos código (es un stack totalmente distinto), pero sí dos conceptos:

1. **Sombra suave en las tarjetas**: un detalle chico pero se nota — las cajas ahora quedan un poco "levantadas" del fondo en vez de planas.
2. **"Volcar pendientes" en el Asistente**: pestaña nueva al lado de "Chat". Pegás una lista desordenada de cosas que tenés en la cabeza (mezcladas, sin separar) y la IA la corta en ítems sueltos, sugiriendo si cada uno va a Prioridades de hoy o a la lista de Compras. Podés cambiar el destino, editar el texto o sacar algún ítem antes de guardar todo de una — mejor que lo que vimos en esa app porque usa IA real (Gemini) en vez de solo buscar palabras clave.

Quedó afuera, a propósito, la idea de "secciones personalizadas" que tenía esa app (crear tus propias categorías con ícono y color propios, tipo Notion). Es un cambio de arquitectura mucho más grande — nuestras pantallas (Finanzas, Turnos, etc.) tienen campos específicos cada una, no son genéricas. Si en algún momento te interesa poder crear tus propias secciones desde cero, es un proyecto aparte, más grande, y lo podemos charlar.

## Bug corregido: el texto no se podía mover
Era exactamente lo que describiste: una vez creado el texto (a mano o escrito), tocarlo para moverlo se interpretaba siempre como "quiero escribir ahí", así que nunca arrancaba el arrastre. Ahora seleccionar y editar son dos acciones separadas:
- Tocás el texto → lo seleccionás (podés moverlo y redimensionarlo, igual que un sticker o imagen).
- Tocás el botón "Editar" (al lado de Copiar/Cortar) → ahí sí podés escribir, y aparece la barra de formato.

## Formato de texto nuevo
Al tocar "Editar" en un cuadro de texto, aparece una barra con:
- **B** / *I* / <u>S</u> — negrita, cursiva, subrayado
- A- / A+ — tamaño de letra
- Alinear a la izquierda / centro / derecha
- Colores de texto

Es más simple que lo que viste en la otra app (no hay resaltador de fondo tipo marcador, ni elegir tipografía distinta) pero cubre lo esencial. Se guarda todo — lo probé cerrando la caja y volviendo a abrirla, el formato se mantiene.

## Aclaración importante: el lienzo y el texto son dos cosas separadas
Esto explica la confusión de "escribo en el lienzo, cierro la caja, y no lo veo": el texto/campo normal (por ejemplo el textarea de "Recordatorios") y lo que dibujás/escribís en el lápiz son **dos datos distintos**, guardados aparte. No se pierde nada — pero antes, al cerrar la caja, no había ninguna señal de que hubiera algo ahí.

Ahora, si una caja tiene contenido en su lienzo, al cerrarla aparece una vista previa chiquita ("EN EL LIENZO") mostrando en miniatura lo que hay ahí, arriba del campo de texto normal. Tocando esa vista previa se vuelve a abrir el lienzo completo. Lo agregué en Inicio, Semana, Finanzas, Proyectos, Objetivos, Compras, Comidas y Turnos.

## Un solo lienzo por pantalla (no uno por caja)
Tenías razón — Inicio tenía 3 lienzos separados (Hoy, Prioridades, Recordatorios), cada uno con su propio contenido aislado. Ahora es **uno solo compartido** por toda la pantalla: no importa desde qué caja lo abras (Hoy, Prioridades o Recordatorios), es el mismo lienzo con el mismo contenido. Lo mismo en Finanzas, Semana, Proyectos, Objetivos, Compras, Comidas y Turnos — cada pantalla tiene un único lienzo compartido entre todas sus cajas.

En el camino encontré y corregí un bug serio que introdujo este mismo cambio: al compartir la clave, abrir un lienzo desde cualquier caja los abría *a todos* al mismo tiempo (5 copias superpuestas en Finanzas, por ejemplo), duplicando cualquier cosa que agregaras. Ya está resuelto — ahora solo se abre uno a la vez, aunque el dato de fondo sea compartido.

**Importante**: los lienzos que ya tenías guardados por separado en cada caja (de versiones anteriores) no se combinan solos en uno — quedan huérfanos. Dado que estás todavía probando la app, no debería ser gran problema, pero si tenías algo importante dibujado en alguna caja específica, avisame antes de seguir probando.

## "Convertir a texto" ya no necesita API key
Miré la nueva versión que mandaste de la otra app y encontré algo que vale la pena traer directo: en vez de mandarle la imagen a Gemini (que ya nos rompió dos veces por temas de modelos y claves), ahora usa **Tesseract.js** — un lector de escritura que corre enteramente en el navegador, gratis, sin cuenta ni clave de nada. Además, antes de leerla, la imagen pasa por un procesado que mejora mucho la lectura: se recorta justo al garabato (sin espacio de sobra), se convierte a blanco y negro puro (sin grises que confundan), y se agranda 3 veces.

**Aclaración honesta**: no pude probarlo en vivo desde mi entorno (no tengo salida a internet hacia el servidor donde vive Tesseract), así que verifiqué que el manejo de errores funciona bien (si no carga, avisa en vez de romperse), pero no vi una lectura real funcionando. La primera vez que lo uses en tu celular puede tardar unos segundos en cargar el lector (después queda más rápido). Probalo y contame cómo te fue.

## Corregido: el cuadro duplicado
Tenías razón otra vez — cuando el lienzo ya tenía contenido, igual se seguía mostrando el campo de texto normal vacío debajo, dando la sensación de "dos lugares para escribir". Ahora es así:
- Si el lienzo **no tiene nada todavía**, ves el campo simple de siempre (para escribir rápido con el teclado).
- En cuanto el lienzo **tiene algo** (texto, sticker, imagen o dibujo), el campo simple desaparece — solo queda la vista previa del lienzo. Un solo lugar, no dos.

## Cambio de tipografía
Al tocar "Editar" en un texto, ahora aparece también una fila de 6 tipografías (cada botón "Aa" se ve con su propia letra) — Inter, Lora, Georgia, Courier, Comic Sans, Trebuchet. No es "todas las fuentes de tu dispositivo" como en la otra app (esa función depende de un permiso especial del navegador que no anda en todos los celulares) — elegí un puñado curado que se ve bien.

## Sincronizar entre PC, tablet y celular — ya lo tenés
Esto ya está armado desde hace unas vueltas, en **Más → Sincronizar**. Usa Firebase (gratis, con tu cuenta de Google) — la idea es:
1. Creás un proyecto en console.firebase.google.com (una sola vez).
2. En el planner, en cada dispositivo (PC, tablet, celu), entrás a Más → Sincronizar, pegás la misma configuración y el mismo código en los tres.
3. A partir de ahí, lo que escribas en cualquiera de los tres aparece en los otros dos en unos segundos.

Los pasos detallados con capturas de dónde sacar la configuración de Firebase están más arriba en este mismo archivo, en la sección "Sincronizar entre dispositivos". Si te trabás en algún paso puntual, decime cuál y seguimos desde ahí.

**Importante**: la Pizarra/lienzo con imágenes NO se sincroniza (ya lo expliqué antes — Firestore tiene límite de tamaño y las fotos pesan). Todo lo demás (Prioridades, Finanzas, Turnos, Objetivos, etc.) sí.

## Reconstruido: ahora es como tu otra app (una sola caja, tocás y escribís)
Vi las 6 capturas que mandaste y entendí que era un sistema totalmente distinto al que armamos: no elementos sueltos que hay que seleccionar y mover, sino **una sola caja de texto normal** donde tocás y escribís directo, con una barra fija arriba que aplica formato a lo que tengas seleccionado.

Lo reconstruí así para **Inicio (Hoy y Recordatorios) y Notas**:
- Tocás dentro de la caja y escribís directo, como cualquier campo de texto.
- Arriba, una barra siempre visible: **B / I / S** (negrita, cursiva, subrayado), **Aa** (fuente y tamaño), imagen, stickers (con buscador y campo para pegar cualquier emoji), **paleta** (color de texto + resaltador, con "todos los colores" también), **lápiz** (escribir a mano encima de la misma caja, con grosor, color, deshacer/rehacer, y "Convertir lo escrito a texto"), y **"..."** (Cortar caja / Copiar caja / Pegar / Vaciar).
- Abajo de la barra, "Editando: [nombre de la caja]" te dice dónde vas a aplicar el formato — igual que en tu otra app.
- Seleccionás una palabra y le cambiás el color sin afectar el resto — como un Word.

Probé cada pieza a mano: escribir directo, negrita+selección, color aplicado a texto seleccionado (confirmé que no se pierde la selección al tocar los botones), cambio de fuente, dibujar con el lápiz sobre la caja, insertar sticker, y el panel de Cortar/Copiar/Pegar/Vaciar. Todo guarda y persiste después de recargar.

**Qué quedó afuera por ahora**: "Prioridades" (en Inicio) sigue siendo una lista de tareas con casilleros — no la convertí porque tildar cosas es genuinamente útil ahí y se pierde si la paso a texto libre. El resto de las pantallas (Semana, Finanzas, Proyectos, Objetivos, Compras, Comidas, Turnos) **todavía usan el sistema anterior** (el de elementos sueltos que se arrastran) — no las toqué en esta vuelta para no arriesgar romper algo que ya andaba bien, dado lo grande que fue este cambio. Si te gusta cómo quedó Inicio/Notas, decime y sigo convirtiendo el resto una por una con el mismo patrón.

## Bug corregido: Hoy/Recordatorios/Notas no sincronizaban
Cuando armé el sistema nuevo de texto enriquecido (Hoy, Recordatorios, Notas), ese contenido quedó guardado en un lugar separado que la sincronización con Firebase no revisaba — por eso "Prioridades" sincronizaba bien pero lo que escribías en las otras tres cajas no viajaba entre dispositivos. Ya está corregido: ahora todo el contenido de texto (sin las imágenes/dibujos, que siguen igual que antes, solo en el dispositivo) se sincroniza correctamente.

Si ya habías conectado varios dispositivos antes de este arreglo, no hace falta reconectar nada — simplemente la próxima vez que escribas algo en Hoy/Recordatorios/Notas, ya va a viajar solo.
