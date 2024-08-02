document.getElementById('bettingForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Obtener los valores del formulario
    let xgLocal = parseFloat(document.getElementById('xgLocal').value);
    let xgVisitante = parseFloat(document.getElementById('xgVisitante').value);
    let possession = parseFloat(document.getElementById('possession').value);
    let shots = parseInt(document.getElementById('shots').value);
    let shotsOnTarget = parseInt(document.getElementById('shotsOnTarget').value);
    let corners = parseInt(document.getElementById('corners').value);
    let attacks = parseInt(document.getElementById('attacks').value);
    let dangerousAttacks = parseInt(document.getElementById('dangerousAttacks').value);
    let minute = parseInt(document.getElementById('minute').value);
    let odds = parseFloat(document.getElementById('odds').value);

    // Calcular la probabilidad implícita de la casa de apuestas
    let impliedProbability = (1 / odds) * 100;

    // Ajustar los pesos para cada métrica basada en la importancia
    let ourProbability = 0.25 * ((xgLocal + xgVisitante) / 2 / 3) +
                         0.15 * (possession / 100) +
                         0.15 * (shots / 30) +
                         0.2 * (shotsOnTarget / 10) +
                         0.1 * (corners / 10) +
                         0.15 * (attacks / 150) +
                         0.2 * (dangerousAttacks / 60);

    // Ajustar la probabilidad basada en el minuto del juego
    if (minute >= 65 && minute <= 75) {
        ourProbability += 0.1; // Incrementar probabilidad por fase crítica del partido
    }

    ourProbability = ourProbability * 100; // Convertir a porcentaje

    // Comparar nuestra probabilidad con la probabilidad implícita
    let recommendation = ourProbability > impliedProbability ? "Vale la pena apostar" : "Mejor busca otro partido";

    // Mostrar el resultado
    let resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <p>Probabilidad de otro gol (nuestra estimación): ${ourProbability.toFixed(2)}%</p>
        <p>Probabilidad implícita de la casa de apuestas: ${impliedProbability.toFixed(2)}%</p>
        <p>${recommendation}</p>
    `;
});
