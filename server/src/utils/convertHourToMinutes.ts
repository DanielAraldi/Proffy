// Convertendo a string das horas para minutos usando split para separar dos dois pontos (:) e map para converter
export default function convertHourToMinutes(time: string) {
    // Retorna um array com duas posições que são hour e minutes
    const [hour, minutes] = time.split(':').map(Number);
    const timeInMinutes = (hour * 60) + minutes;

    return timeInMinutes;
}