

// Referencias al contenedor y elementos del carrusel
const carruselContenedor = document.getElementById('carrusel-contenedor');
const carruselItems = document.querySelectorAll('.carruselElement');
const totalItems = carruselItems.length;

let currentIndex = 0; // Índice del primer elemento visible
let itemsToShow = 3; // Número inicial de elementos visibles

// Calcula el ancho total del elemento (incluyendo márgenes)
function getItemWidthWithMargin() {
  const item = carruselItems[0]; // Tomamos un elemento como referencia
  const itemStyles = window.getComputedStyle(item); // Obtenemos los estilos computados
  const itemWidth = item.getBoundingClientRect().width; // Ancho del elemento
  const marginLeft = parseFloat(itemStyles.marginLeft); // Margen izquierdo
  const marginRight = parseFloat(itemStyles.marginRight); // Margen derecho
  return itemWidth + marginLeft + marginRight; // Suma del ancho y los márgenes
}

// Ajusta el número de elementos visibles según el tamaño de pantalla
function updateItemsToShow() {
  const screenWidth = window.innerWidth; // Ancho de la ventana
  if (screenWidth <= 768) {
    itemsToShow = 1; // Móvil
  } else if (screenWidth <= 1024) {
    itemsToShow = 2; // Tablet
  } else {
    itemsToShow = 3; // Escritorio
  }

  // Recalcula la posición actual al cambiar el tamaño de pantalla
  const itemTotalWidth = getItemWidthWithMargin();
  carruselContenedor.style.transform = `translateX(-${currentIndex * itemTotalWidth}px)`;
}

// Función para mover el carrusel
function moveCarousel(direction) {
  const itemTotalWidth = getItemWidthWithMargin(); // Ancho dinámico con márgenes
  const maxIndex = totalItems - itemsToShow; // Índice máximo al que se puede llegar

  // Actualiza el índice actual y lo limita dentro del rango
  currentIndex += direction;
  currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));

  // Desplaza el carrusel
  carruselContenedor.style.transform = `translateX(-${currentIndex * itemTotalWidth}px)`;
}

// Escucha los clics en los botones
document.getElementById('prev').addEventListener('click', () => moveCarousel(-1));
document.getElementById('next').addEventListener('click', () => moveCarousel(1));

// Detecta cambios en el tamaño de la ventana y ajusta el número de elementos visibles
window.addEventListener('resize', updateItemsToShow);

// Inicialización al cargar la página
updateItemsToShow();
