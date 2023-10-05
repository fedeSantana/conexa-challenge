## Deployado

Puedes ver el proyecto deployado en: https://conexa-challenge-three.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Comentarios

Decidí cambiar la UX de la página que proponian porque no se podía adoptar la concentración de información que tenían para Mobile, algo que me parece fundamental hoy en día, así que dividí en dos pantallas el ejercicio, una de selección y una de resultados.

![image](https://github.com/fedeSantana/conexa-challenge/assets/54949334/3452f58c-0600-4496-b3d7-5def36ab7cf5)

![image](https://github.com/fedeSantana/conexa-challenge/assets/54949334/3690f844-819f-4b37-96e4-9d885a2091a8)

![image](https://github.com/fedeSantana/conexa-challenge/assets/54949334/9a5bd90a-b08d-463b-a943-47ee5794ba99)

La UI del proyecto lámentablemente deja bastante que desear, pero dado el escaso tiempo + gripe + otras responsabilidades no logré darle el refinamiento que quería, tenía algunas ideas barajadas en una Figma que no lleve a cabo pero mejorarían la experiencia en mobile.

[Link al figma con las ideas](https://www.figma.com/file/YuJWsLitWnMvelJsRYfn2x/Untitled?type=design&node-id=0%3A1&mode=design&t=ooGCHO9YDj9NOqpi-1)

Además incorporé features para deseleccionar personaje y también una muy importante es que, al clickear un personaje, podes ver y seleccionar sólo otros personajes que tengan episodios en común con este.

![image](https://github.com/fedeSantana/conexa-challenge/assets/54949334/47e716e4-88d5-413b-b7d1-8ee1c44c270b)

Y hice una vista mobile que aunque deja que desear, es usable:

![image](https://github.com/fedeSantana/conexa-challenge/assets/54949334/01bb7f90-a5e8-4203-bc23-f1b169846b1b)

## Qué mejoraría

- La UI en general de todo el proyecto
- La pestaña de Loading pensaba ponerle un Skeleton, pero requería más tiempo que no tenía y decidí dejar un "loading" para mejorar luego.
- Si clickeas dos veces muy rápidamente un personaje, podes añadir al mismo personaje dos veces.
- ¿Qué pasa si escoges un personaje muy raro y no tenes ningún otro personaje en esa página para seleccionar? Queda raro. En mobile la UX ahí es bastante fea. Para arreglar esto debería ser un continuo y no un paginado, donde puedas ir a la izquierda o derecha infinitamente buscando personajes. Por otro lado, una vez seleccionado un personaje se deberían quitar los que no tienen posibilidad de ser seleccionados, de esta forma la UX mejoraría mucho, el problema es que para eso tengo que hacer un fetch que dependa de si encontró en la página o no personajes habilitados y se complicaba mucho la lógica del fetch para el tiempo disponible.
  
## Detalles lindos

- Si cerras y abris la pestaña, te guarda el estado porque usé cookies
- Hice un test de Cypress que revisa el flujo del proyecto

## Criterios de evaluación

1. **Funcionalidad**: ¿La aplicación cumple con todo lo requerido?

Creería que cumple con todo lo requerido.

2. **Code Quality**: ¿El código se encuentra bien estructurado, limpio y es escalable? 

Podría ser mejor, al hacer proyectos tan chicos hacer una estructura demasiado limpia y escalable te hace sentir que estás usando una escopeta para matar una mosca, pero entiendo que es importante evaluar esto en los candidatos. El código esta relativamente prolijo, comentado con jsdocs y componetizado, pero algunas cosas podrían emprolijarse más con más tiempo.

3. **UI/UX**: ¿El frontend es intuitivo y visualmente posee una buena UX? 

Creo que la UX propuesta vs la UX dada tiene varias mejoras que destaque anteriormente, pero podría mejorar más. También puse un texto aclarando qué hay que hacer (clickear en los personajes para ver en qué episodios salen ambos personajes).

4. **Creatividad**: ¿Hay algún componente, feature o cuestión que destaque por sobre la consigna? 

Creo que hubieron varios puntos creativos de resolución, por ejemplo no permitir seleccionar personajes que no intersectan en ningún episodio.

5. **Testing**: ¿Todos los test unitarios del frontend están desarrollados para realmente probar la funcionalidad?

Podría haber hecho test unitarios, hice sólo un test e2e de cypress por comodidad y rapidez. Sí está desarollado para probar funcionalidad, pero podría testearse bastante más a fondo esta app. Sí sometí a muchas pruebas manuales el sitio y les pase a mis amigos la página deployada para que me digan si encontraban algo raro o no se entendía el funcionamiento.

## Tiempo total aproximado

7h de desarollo.
#
