// import { eachWeekOfInterval, isWithinInterval, parseISO, addDays, startOfWeek, endOfWeek, getWeek } from 'date-fns';
const { eachWeekOfInterval, isWithinInterval, parseISO, addDays, startOfWeek, endOfWeek, getWeek } = require('date-fns');

// Suponiendo que tus registros tienen una estructura como esta:
const registros = [
  { id: 1, fecha: '2024-01-01', dato: 'a' },
  { id: 2, fecha: '2024-02-05', dato: 'b' },
  { id: 3, fecha: '2024-06-08', dato: 'c' },
  // más registros...
];

// Define el intervalo total (del 1 de enero al 31 de diciembre)
const inicio = parseISO('2024-01-01');
const fin = parseISO('2024-12-31');

// Obtén los intervalos de semanas dentro del intervalo total
const semanas = eachWeekOfInterval({ start: inicio, end: fin });

// Función para obtener los registros dentro de un intervalo de una semana
const obtenerRegistrosDeSemana = (semanaInicio) => {
  const semanaFin = addDays(semanaInicio, 6); // fin de la semana (6 días después del inicio)
  return registros.filter(registro =>
    isWithinInterval(parseISO(registro.fecha), { start: semanaInicio, end: semanaFin })
  );
};

// Obtener la semana actual
const fechaActual = parseISO("2024-01-01");
const semanaActualInicio = startOfWeek(fechaActual);
const semanaActualFin = endOfWeek(fechaActual);

// Filtrar los registros de la semana actual
const registrosSemanaActual = registros.filter(registro =>
  isWithinInterval(parseISO(registro.fecha), { start: semanaActualInicio, end: semanaActualFin })
);

// Obtener el número de la semana actual
const numeroSemanaActual = getWeek(fechaActual);

console.log('Número de la semana actual:', numeroSemanaActual);
console.log('Registros de la semana actual:', registrosSemanaActual);

// Itera sobre los intervalos de semanas y obtén los registros correspondientes
const registrosPorSemana = semanas.map(semanaInicio => {
  const semanaFin = addDays(semanaInicio, 6); // fin de la semana (6 días después del inicio)
  const numeroSemana = getWeek(semanaInicio); // obtener el número de la semana

  return {
    semanaInicio,
    semanaFin,
    numeroSemana,
    registros: obtenerRegistrosDeSemana(semanaInicio),
  };
});

// console.log(registrosPorSemana);
