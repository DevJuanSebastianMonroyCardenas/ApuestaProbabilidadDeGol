// Escucha el evento de envío del formulario
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que el formulario se envíe de forma tradicional

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

    // Calcular la probabilidad implícita basada en las cuotas
    let impliedProbability = (1 / odds) * 100;

    // Calcular la probabilidad para el equipo local
    let probabilityLocal = 0.2 * (possessionLocal / 100) +
                           0.2 * (shotsLocal / 30) +
                           0.25 * (shotsOnTargetLocal / 10) +
                           0.15 * (cornersLocal / 10) +
                           0.1 * (attacksLocal / 150) +
                           0.3 * (dangerousAttacksLocal / 80);

    // Calcular la probabilidad para el equipo visitante
    let probabilityVisitante = 0.2 * (possessionVisitante / 100) +
                               0.2 * (shotsVisitante / 30) +
                               0.25 * (shotsOnTargetVisitante / 10) +
                               0.15 * (cornersVisitante / 10) +
                               0.1 * (attacksVisitante / 150) +
                               0.3 * (dangerousAttacksVisitante / 80);

    // Ajustar las probabilidades según el marcador
    if (scoreLocal > scoreVisitante) {
        probabilityLocal += 0.1; // Aumenta la probabilidad del equipo local
    } else if (scoreVisitante > scoreLocal) {
        probabilityVisitante += 0.1; // Aumenta la probabilidad del equipo visitante
    }

    // Ajustar las probabilidades según el minuto del juego
    if (minute > 60) {
        probabilityLocal += 0.1;
        probabilityVisitante += 0.1;
    }

    // Calcular la probabilidad final de que haya otro gol
    let finalProbability = (probabilityLocal + probabilityVisitante) / 2;

    // Generar la recomendación de apuesta
    let recommendation;
    if (finalProbability > impliedProbability) {
        recommendation = "Apuesta recomendada";
    } else {
        recommendation = "No apostar";
    }

    // Mostrar el resultado
    document.getElementById('result').innerHTML = `
        <h2>Resultado de Probabilidad</h2>
        <p>Probabilidad implícita: ${impliedProbability.toFixed(2)}%</p>
        <p>Probabilidad de gol (equipo local): ${probabilityLocal.toFixed(2)}%</p>
        <p>Probabilidad de gol (equipo visitante): ${probabilityVisitante.toFixed(2)}%</p>
        <p>Probabilidad final de otro gol: ${finalProbability.toFixed(2)}%</p>
        <h3>${recommendation}</h3>
    `;
});
