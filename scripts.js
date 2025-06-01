let array = [];

const descripciones = {
  Burbuja:
    "Este algoritmo obtiene su nombre de la forma con la que suben por la lista los elementos durante los intercambios, como si fueran pequeñas «burbujas». Revisa cada elemento de la lista que va a ser ordenada con el siguiente, intercambiándolos de posición si están en el orden equivocado. eficiente para grandes cantidades de datos.",
  Seleccion:
    "Basado en la comparación. Ordena una matriz seleccionando repetidamente el elemento más pequeño (o más grande) de la parte no ordenada e intercambiándolo con el primer elemento no ordenado. Este proceso continúa hasta que toda la matriz esté ordenada.",
  Insercion:
    "Es una manera muy natural de ordenar para un ser humano y puede usarse fácilmente para ordenar un mazo de cartas. Suponemos que la primera carta ya está ordenada, así que seleccionamos una carta sin ordenar. Si la carta sin ordenar es mayor que la carta en mano, se coloca a la derecha; de lo contrario, a la izquierda. De la misma manera, se toman las demás cartas sin ordenar y se colocan en su lugar correspondiente.",
  Merge:
    "Algoritmo de ordenamiento que utiliza la estrategia dividir y vencer. Divide el conjunto de datos en mitades más pequeñas, las ordena y luego las fusiona de nuevo en una sola lista ordenada. Es eficiente y estable.",
  Quick:
    "El proceso comienza eligiendo un elemento como pivote y reordenando el arreglo de manera que todos los elementos menores que el pivote estén a su izquierda y todos los elementos mayores estén a su derecha. Luego, el algoritmo se aplica recursivamente a cada subarreglo generado. ",
};

const gifsAlgoritmo = {
  Burbuja: "Images/Burbuja-ejemplo.gif",
  Seleccion: "Images/Seleccion-ejemplo.gif",
  Insercion: "Images/Insercion-ejemplo.gif",
  Merge: "Images/Mezcla-ejemplo.gif",
  Quick: "Images/Rapido-ejemplo.gif",
};

function generarArray() {
  const tamaño = document.getElementById("tamaño").value;
  array = [];
  for (let i = 0; i < tamaño; i++) {
    array.push(Math.floor(Math.random() * 400) + 10);
  }
  mostrarArray(array);
}

function mostrarArray(arr, colores = []) {
  const container = document.getElementById("array-container");
  container.innerHTML = "";
  const containerWidth = container.clientWidth || window.innerWidth;
  const barWidth = Math.max((containerWidth - arr.length * 2) / arr.length, 2); // 2px de margen
  arr.forEach((valor, idx) => {
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${valor}px`;
    bar.style.width = `${barWidth}px`;
    bar.style.backgroundColor = colores[idx] || "#fff";
    bar.style.margin = "0 1px";
    container.appendChild(bar);
  });
}

document.getElementById("tamaño").addEventListener("input", function () {
  document.getElementById("valor-tamaño").textContent = this.value;
  generarArray();
});

document.getElementById("algoritmo").addEventListener("change", function () {
  const seleccion = this.value;
  const descripcionDiv = document.getElementById("descripcion-algoritmo");
  descripcionDiv.textContent = descripciones[seleccion] || "";

  // Elimina cualquier imagen previa
  const imgExistente = document.getElementById("gif-algoritmo");
  if (imgExistente) imgExistente.remove();

  // Si hay un gif para el algoritmo seleccionado, lo agrega
  if (gifsAlgoritmo[seleccion]) {
    const img = document.createElement("img");
    img.src = gifsAlgoritmo[seleccion];
    img.alt = `Ejemplo ${seleccion}`;
    img.id = "gif-algoritmo";
    img.style.display = "block";
    img.style.margin = "10px auto 0 auto";
    img.style.maxWidth = "100%";
    img.style.textAlign = "center";
    descripcionDiv.after(img);
  }
});

// Mostrar la imagen si el algoritmo inicial es alguno con GIF al cargar
const seleccionInicial = document.getElementById("algoritmo").value;
const descripcionDiv = document.getElementById("descripcion-algoritmo");
descripcionDiv.textContent = descripciones[seleccionInicial] || "";
const imgExistente = document.getElementById("gif-algoritmo");
if (imgExistente) imgExistente.remove();
if (gifsAlgoritmo[seleccionInicial]) {
  const img = document.createElement("img");
  img.src = gifsAlgoritmo[seleccionInicial];
  img.alt = `Ejemplo ${seleccionInicial}`;
  img.id = "gif-algoritmo";
  img.style.display = "block";
  img.style.margin = "10px auto 0 auto";
  img.style.maxWidth = "100%";
  img.style.textAlign = "center";
  descripcionDiv.after(img);
}

document.getElementById("descripcion-algoritmo").textContent =
  descripciones[document.getElementById("algoritmo").value];

document.getElementById("velocidad").addEventListener("input", function () {
  document.getElementById("valor-velocidad").textContent = this.value;
});

// Ajusta el tamaño del arreglo si la ventana cambia de tamaño
window.addEventListener("resize", () => mostrarArray(array));

async function ordenar() {
  const algoritmo = document.getElementById("algoritmo").value;
  const velocidad = 600 / document.getElementById("velocidad").value;

  if (algoritmo === "Burbuja") {
    await burbujaAnimado(array, velocidad);
  } else if (algoritmo === "Seleccion") {
    await seleccionAnimado(array, velocidad);
  } else if (algoritmo === "Insercion") {
    await insercionAnimado(array, velocidad);
  } else if (algoritmo === "Merge") {
    array = await mergeSortAnimado(array, velocidad);
    mostrarArray(array);
  } else if (algoritmo === "Quick") {
    await quickSortAnimado(array, 0, array.length - 1, velocidad);
    mostrarArray(array);
  }
}

async function burbujaAnimado(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Colorea de rojo los ya ordenados al final
      const colores = arr.map((_, idx) =>
        idx >= n - i
          ? "#e74c3c"
          : idx === j || idx === j + 1
          ? "#f39c12"
          : "#fff"
      );
      mostrarArray(arr, colores);
      const velocidad = 600 / document.getElementById("velocidad").value;
      await sleep(velocidad);
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  // Al terminar, todos en rojo
  mostrarArray(
    arr,
    arr.map(() => "#e74c3c")
  );
}

async function seleccionAnimado(arr) {
  let n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      const colores = arr.map((_, idx) =>
        idx < i
          ? "#e74c3c"
          : idx === min
          ? "#f1c40f"
          : idx === j
          ? "#3498db"
          : "#fff"
      );
      mostrarArray(arr, colores);
      const velocidad = 600 / document.getElementById("velocidad").value;
      await sleep(velocidad);
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
    // Colorea de rojo los ya ordenados
    const colores = arr.map((_, idx) => (idx <= i ? "#e74c3c" : "#fff"));
    mostrarArray(arr, colores);
    const velocidad = 600 / document.getElementById("velocidad").value;
    await sleep(velocidad);
  }
  mostrarArray(
    arr,
    arr.map(() => "#e74c3c")
  );
}

async function insercionAnimado(arr) {
  let n = arr.length;
  for (let i = 1; i < n; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      // Colorea de rojo los ya ordenados a la izquierda de i
      const colores = arr.map((_, idx) =>
        idx < i ? "#e74c3c" : idx === j || idx === j + 1 ? "#27ae60" : "#fff"
      );
      mostrarArray(arr, colores);
      const velocidad = 600 / document.getElementById("velocidad").value;
      await sleep(velocidad);
      j--;
    }
    arr[j + 1] = key;
  }
  mostrarArray(
    arr,
    arr.map(() => "#e74c3c")
  );
}

async function mergeSortAnimado(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = await mergeSortAnimado(arr.slice(0, mid));
  const right = await mergeSortAnimado(arr.slice(mid));
  const merged = await mergeAnimado(left, right);
  mostrarArray(merged);
  const velocidad = 600 / document.getElementById("velocidad").value;
  await sleep(velocidad);
  return merged;
}

async function mergeAnimado(left, right) {
  let result = [],
    i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    const velocidad = 600 / document.getElementById("velocidad").value;
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
    mostrarArray(result.concat(left.slice(i)).concat(right.slice(j)));
    await sleep(velocidad);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

async function quickSortAnimado(arr, left, right) {
  if (left < right) {
    const pivotIndex = await partitionAnimado(arr, left, right);
    await quickSortAnimado(arr, left, pivotIndex - 1);
    await quickSortAnimado(arr, pivotIndex + 1, right);
  }
}

async function partitionAnimado(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    mostrarArray(
      arr,
      arr.map((_, idx) => (idx === j || idx === right ? "#8e44ad" : undefined))
    );
    const velocidad = 600 / document.getElementById("velocidad").value;
    await sleep(velocidad);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  mostrarArray(arr);
  const velocidad = 600 / document.getElementById("velocidad").value;
  await sleep(velocidad);
  return i + 1;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Generar arreglo inicial al cargar
window.onload = generarArray;

async function ordenar() {
  const algoritmo = document.getElementById("algoritmo").value;
  if (algoritmo === "Burbuja") {
    await burbujaAnimado(array);
  } else if (algoritmo === "Seleccion") {
    await seleccionAnimado(array);
  } else if (algoritmo === "Insercion") {
    await insercionAnimado(array);
  } else if (algoritmo === "Merge") {
    array = await mergeSortAnimado(array);
    mostrarArray(array);
  } else if (algoritmo === "Quick") {
    await quickSortAnimado(array, 0, array.length - 1);
    mostrarArray(array);
  }
}
async function mergeSortAnimado(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = await mergeSortAnimado(arr.slice(0, mid));
  const right = await mergeSortAnimado(arr.slice(mid));
  const merged = await mergeAnimado(left, right);
  mostrarArray(merged);
  const velocidad = 600 / document.getElementById("velocidad").value;
  await sleep(velocidad);
  return merged;
}

async function mergeAnimado(left, right) {
  let result = [],
    i = 0,
    j = 0;
  while (i < left.length && j < right.length) {
    const velocidad = 600 / document.getElementById("velocidad").value;
    result.push(left[i] < right[j] ? left[i++] : right[j++]);
    mostrarArray(result.concat(left.slice(i)).concat(right.slice(j)));
    await sleep(velocidad);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}

async function quickSortAnimado(arr, left, right) {
  if (left < right) {
    const pivotIndex = await partitionAnimado(arr, left, right);
    await quickSortAnimado(arr, left, pivotIndex - 1);
    await quickSortAnimado(arr, pivotIndex + 1, right);
  }
}

async function partitionAnimado(arr, left, right) {
  const pivot = arr[right];
  let i = left - 1;
  for (let j = left; j < right; j++) {
    mostrarArray(
      arr,
      arr.map((_, idx) => (idx === j || idx === right ? "#8e44ad" : undefined))
    );
    const velocidad = 600 / document.getElementById("velocidad").value;
    await sleep(velocidad);
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[right]] = [arr[right], arr[i + 1]];
  mostrarArray(arr);
  const velocidad = 600 / document.getElementById("velocidad").value;
  await sleep(velocidad);
  return i + 1;
}
