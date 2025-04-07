document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío normal del formulario
    console.log("Evento submit capturado."); // Verifica que el listener se active

    const nombreEstudiante = document.getElementById('nombreEstudianteQuiz').value.trim();
    if (!nombreEstudiante) {
        alert("¡Por favor, ingresa tu nombre completo para continuar!");
        return;
    }
    console.log("Nombre estudiante:", nombreEstudiante);

    // --- Definición de Respuestas Correctas (SOLO Q1 a Q10) ---
    const respuestasCorrectas = {
        q1: 'c',
        q2: 'b',
        q3: 'c',
        q4: 'b',
        q5: 'c',
        q6: 'falso',
        q7: 'falso',
        q8: 'verdadero',
        q9: 'falso',
        q10: 'verdadero'
        // Se eliminaron las claves q11 a q20
    };

    let puntaje = 0;
    // --- Total de preguntas y valor se ajustan automáticamente ---
    const totalPreguntas = Object.keys(respuestasCorrectas).length; // Ahora será 10
    const valorPorPregunta = 10.0 / totalPreguntas; // Cada pregunta vale 1 punto (10 / 10 = 1)
    console.log(`Evaluando ${totalPreguntas} preguntas. Valor por pregunta: ${valorPorPregunta}`);

    // --- Evaluar Respuestas (SOLO Q1 a Q10) ---
    let todasRespondidas = true;
    console.log("--- Iniciando verificación de respuestas (Q1-Q10) ---");

    // El bucle ahora itera solo hasta el nuevo totalPreguntas (10)
    for (let i = 1; i <= totalPreguntas; i++) {
        const preguntaId = 'q' + i;
        // Solo necesitamos buscar radios, ya que q1-q10 son de ese tipo
        const radios = document.getElementsByName(preguntaId);
        let respuestaUsuario = null;

        console.log(`Verificando pregunta: ${preguntaId}`);

        if (radios && radios.length > 0) { // Si es Selección Múltiple o V/F
            // console.log(`  Tipo: Radio Buttons. Encontrados: ${radios.length}`);
            let checkedFound = false;
            for (const radio of radios) {
                // console.log(`    Radio valor '${radio.value}' - ¿Marcado?: ${radio.checked}`);
                if (radio.checked) {
                    respuestaUsuario = radio.value;
                    checkedFound = true;
                    // console.log(`    ¡SELECCIÓN ENCONTRADA! Valor: ${respuestaUsuario}`);
                    break;
                }
            }
             if (!checkedFound) {
                 console.warn(`    Ningún radio button marcado para ${preguntaId}`);
                 respuestaUsuario = null; // Marcar como no respondido
             }
        } else {
            // Esto no debería pasar para q1-q10 si el HTML está correcto
            console.error(`  ¡ERROR! No se encontró elemento input radio para ${preguntaId}`);
            respuestaUsuario = null;
        }

         // Verificar si se respondió
         if (respuestaUsuario === null) {
             console.error("Pregunta marcada como NO respondida:", preguntaId);
             todasRespondidas = false;
         } else {
            // Comparar respuesta si fue respondida
            if (respuestaUsuario === respuestasCorrectas[preguntaId]) {
                puntaje += valorPorPregunta; // Suma 1 punto si es correcta
            }
         }
    }

    console.log("--- Verificación de respuestas terminada ---");
    console.log("¿Todas respondidas?:", todasRespondidas);

    // Si no todas fueron respondidas (entre la 1 y la 10), mostrar alerta y detener
    if (!todasRespondidas) {
        alert(`¡Ups! Parece que olvidaste responder una o más preguntas (entre la 1 y la 10). Por favor, completa esa parte.`);
        console.log("Ejecución detenida por preguntas (1-10) sin responder.");
        return;
    }

    // --- Calcular Nota Final (basada en 10 preguntas) ---
    const notaFinal = puntaje;
    const aciertos = Math.round(puntaje / valorPorPregunta); // Calcula aciertos (sobre 10)
    console.log(`Calculando nota: Aciertos=${aciertos}, Puntaje=${puntaje}, Nota=${notaFinal}`);

    // --- Mostrar Resultados ---
    const resultadoDiv = document.getElementById('resultadoQuiz');
    resultadoDiv.innerHTML = `
        <h2>Tus Resultados <span class="emoji-section">🎉</span></h2>
        <p><strong>Estudiante:</strong> ${nombreEstudiante}</p>
        <p><strong>Aciertos (Parte 1 y 2):</strong> <span class="score-correct">${aciertos}</span> de ${totalPreguntas}</p>
        <p class="final-grade"><strong>Nota Final:</strong> ${notaFinal.toFixed(1)} / 10.0</p>
        <hr>
        <p><small>¡Buen trabajo! No olvides tomar captura y enviarla a Google Classroom.</small> ✨</p>
    `;
    resultadoDiv.style.display = 'block'; // Mostrar el div de resultados
    console.log("Resultados mostrados en la página.");

    // Opcional: Desplazar la vista a los resultados
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
});

console.log("Script de quiz (versión 10 preguntas) cargado y listener añadido."); // Mensaje al cargar el script
