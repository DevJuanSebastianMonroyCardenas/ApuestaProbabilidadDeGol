document.getElementById('bettingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    let possessionLocal = parseFloat(document.getElementById('possessionLocal').value);
    let shotsLocal = parseInt(document.getElementById('shotsLocal').value);
    let shotsOnTargetLocal = parseInt(document.getElementById('shotsOnTargetLocal').value);
    let cornersLocal = parseInt(document.getElementById('cornersLocal').value);
    let attacksLocal = parseInt(document.getElementById('attacksLocal').value);
    let dangerousAttacksLocal = parseInt(document.getElementById('dangerousAttacksLocal').value);

    let possessionVisitante = parseFloat(document.getElementById('possessionVisitante').value);
    let shotsVisitante = parseInt(document.getElementById('shotsVisitante').value);
    let shotsOnTargetVisitante = parseInt(document.getElementById('shotsOnTargetVisitante').value);
    let cornersVisitante = parseInt(document.getElementById('cornersVisitante').value);
    let attacksVisitante = parseInt(document.getElementById('attacksVisitante').value);
    let dangerousAttacksVisitante = parseInt(document.getElementById('dangerousAttacksVisitante').value);

    let minute = parseInt(document.getElementById('minute').value);
    let odds = parseFloat(document.getElementById('odds').value);
    let scoreLocal = parseInt(document.getElementById('scoreLocal').value);
    let scoreVisitante = parseInt(document.getElementById('scoreVisitante').value);

    // Calcular la probabilidad implícita de la casa de apuestas
    let impliedProbability = (1 / odds) * 100;

    // Calcular la probabilidad para el equipo local
    let probabilityLocal = 0.2 * (possessionLocal / 100) +
                           0.2 * (shotsLocal / 30) +
                           0.25 * (shotsOnTargetLocal / 10) +
                           0.15 * (cornersLocal / 10) +
                           0.1 * (attacksLocal / 150) +
                           0.3 * (dangerousAttacksLocal / 60);

    // Calcular la probabilidad para el equipo visitante
    let probabilityVisitante = 0.2 * (possessionVisitante / 100) +
                               0.2 * (shotsVisitante / 30) +
                               0.25 * (shotsOnTargetVisitante / 10) +
                               0.15 * (cornersVisitante / 10) +
                               0.1 * (attacksVisitante / 150) +
                               0.3 * (dangerousAttacksVisitante / 60);

    // Ajustar las probabilidades basadas en el minuto del juego
    if (minute >= 65 && minute <= 75) {
        probabilityLocal += 0.1; // Incrementar probabilidad por fase crítica del partido
        probabilityVisitante += 0.1; // Incrementar probabilidad por fase crítica del partido
    }

    probabilityLocal = probabilityLocal * 100; // Convertir a porcentaje
    probabilityVisitante = probabilityVisitante * 100; // Convertir a porcentaje

    // Comparar nuestra probabilidad con la probabilidad implícita
    let recommendationLocal = probabilityLocal > impliedProbability ? "Vale la pena apostar por el gol del equipo local" : "Mejor busca otro partido para el gol del equipo local";
    let recommendationVisitante = probabilityVisitante > impliedProbability ? "Vale la pena apostar por el gol del equipo visitante" : "Mejor busca otro partido para el gol del equipo visitante";

    // Mostrar el resultado
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Probabilidad de otro gol del equipo local (nuestra estimación): ${probabilityLocal.toFixed(2)}%</p>
        <p>Probabilidad implícita de la casa de apuestas: ${impliedProbability.toFixed(2)}%</p>
        <p>Recomendación: ${recommendationLocal}</p>
        <br>
        <p>Probabilidad de otro gol del equipo visitante (nuestra estimación): ${probabilityVisitante.toFixed(2)}%</p>
        <p>Probabilidad implícita de la casa de apuestas: ${impliedProbability.toFixed(2)}%</p>
        <p>Recomendación: ${recommendationVisitante}</p>
    `;
});
