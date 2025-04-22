# Juego de las Amazonas

## Descripción General

El Juego de las Amazonas es una implementación digital del juego de mesa estratégico donde los jugadores mueven piezas "amazonas" y disparan flechas para controlar el territorio del tablero. Esta versión está desarrollada con React, TypeScript y Tailwind CSS.

## Características

- Tablero de juego interactivo de 10x10
- Sistema de turnos para dos jugadores
- Selección y movimiento de piezas con resaltado visual
- Disparos de flechas que bloquean casillas
- Temporizador de 5 minutos por jugador
- Historial de movimientos
- Interfaz responsiva y moderna
- Detección automática de fin de juego

## Reglas del Juego

1. **Configuración Inicial**: 
   - Cada jugador comienza con 4 amazonas
   - Jugador 1 (Negro): posiciones [0,3], [0,6], [3,0], [3,9]
   - Jugador 2 (Blanco): posiciones [6,0], [6,9], [9,3], [9,6]

2. **Movimiento**: 
   - Las amazonas se mueven como la reina en ajedrez (horizontal, vertical y diagonal)
   - No pueden saltar sobre otras piezas o flechas

3. **Fases del Turno**:
   - Seleccionar una amazona
   - Mover la amazona a una posición válida
   - Disparar una flecha que bloquea una casilla

4. **Objetivo**:
   - Gana el jugador que deja a su oponente sin movimientos válidos

## Requisitos Técnicos

- Node.js 16.0 o superior
- npm 7.0 o superior

## Tecnologías Utilizadas

- React 18.3
- Vite 5.4
- Tailwind CSS 3.4
- JavaScript
- Lucide React (para iconos)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/ZenenContreras/GameOfAmazonas.git
cd GameOfAmazonas
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre el navegador en `http://localhost:5173`

## Estructura del Proyecto

```
GameOfAmazonas/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Board.jsx         # Tablero de juego
│   │   ├── GameInfo.jsx      # Panel de información del juego
│   │   ├── Square.jsx        # Casilla individual del tablero
│   │   └── Timer.jsx         # Componente de temporizador
│   ├── utils/
│   │   └── gameLogic.js      # Lógica del juego
│   ├── App.jsx               # Componente principal
│   ├── index.css             # Estilos globales
│   └── main.jsx              # Punto de entrada
├── public/                   # Archivos estáticos
└── package.json              # Dependencias y scripts
```

## Flujo del Juego

1. **Inicio**: El juego comienza con el Jugador 1 (piezas negras)
2. **Selección de Pieza**: El jugador selecciona una de sus amazonas
3. **Movimiento**: Se muestran los movimientos válidos y el jugador selecciona dónde mover
4. **Disparo de Flecha**: Después de mover, el jugador debe disparar una flecha
5. **Cambio de Turno**: El turno pasa al siguiente jugador
6. **Victoria**: El juego termina cuando un jugador no puede mover ninguna de sus piezas

## Desarrollo

### Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo
- `npm run build`: Construye la aplicación para producción
- `npm run preview`: Vista previa de la versión de producción
- `npm run lint`: Ejecuta el linter en el código

### Personalización

- Modificar [`tailwind.config.js`](tailwind.config.js) para cambiar la paleta de colores
- Ajustar [`src/utils/gameLogic.js`](src/utils/gameLogic.js) para cambiar las reglas del juego
- Modificar [`src/components/Square.jsx`](src/components/Square.jsx) para cambiar la apariencia de las piezas

## Licencia

MIT

---

Desarrollado con ❤️ utilizando React y Tailwind CSS.
