document.getElementById('quizForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío normal del formulario

    const nombreEstudiante = document.getElementById('nombreEstudianteQuiz').value.trim();
    if (!nombreEstudiante) {
        alert("¡Por favor, ingresa tu nombre completo para continuar!");
        return;
    }

    // --- Definición de Respuestas Correctas ---
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
        q10: 'verdadero',
        q11: 'b', // Detecta colisión física
        q12: 'c', // Emisión/recepción ondas sonoras alta frecuencia
        q13: 'b', // Clasificar objetos por color
        q14: 'c', // Velocidad angular / orientación
        q15: 'b', // Navegar siguiendo marca
        q16: 'c', // Arduino
        q17: 'b', // Requiere ser presionado
        q18: 'b', // Sensor de Color (LEGO)
        q19: 'c', // Sensor seguidor de línea (IR - Makeblock)
        q20: 'b'  // Valores discretos (Digital)
    };

    let puntaje = 0;
    const totalPreguntas = Object.keys(respuestasCorrectas).length; // 20 preguntas
    const valorPorPregunta = 0.5; // Para que el total sea 10 (20 * 0.5 = 10)

    // --- Evaluar Respuestas ---
    let todasRespondidas = true; // Flag para verificar si todo está respondido
    for (let i = 1; i <= totalPreguntas; i++) {
        const preguntaId = 'q' + i;
        const radios = document.getElementsByName(preguntaId);
        const select = document.getElementById(preguntaId); // Para preguntas de relación
        let respuestaUsuario = null;

        if (radios.length > 0) { // Si es Selección Múltiple o V/F
             for (const radio of radios) {
                if (radio.checked) {
                    respuestaUsuario = radio.value;
                    break;
                }
            }
        } else if (select) { // Si es de Relación (Select)
            respuestaUsuario = select.value;
             // Para selects, la opción por defecto "" indica no respondido
             if (respuestaUsuario === "") {
                 respuestaUsuario = null; // Marcar como no respondido
             }
        }

         // Verificar si se respondió
         if (respuestaUsuario === null) {
             todasRespondidas = false;
             // Opcional: Podrías marcar visualmente la pregunta no respondida aquí
             // document.getElementById(preguntaId).closest('.question').style.border = '2px solid red'; // Ejemplo
         } else {
            // Comparar respuesta si fue respondida
            if (respuestaUsuario === respuestasCorrectas[preguntaId]) {
                puntaje += valorPorPregunta;
            }
             // Opcional: Resetear borde si previamente marcado
             // if (select) document.getElementById(preguntaId).closest('.question').style.border = '1px solid #fce4ec';
             // else if (radios.length > 0) radios[0].closest('.question').style.border = '1px solid #fce4ec';
         }
    }

    // Si no todas fueron respondidas, mostrar alerta y detener
    if (!todasRespondidas) {
        alert(`¡Ups! Parece que olvidaste responder una o más preguntas. Por favor, completa todo el quiz.`);
        return;
    }


    // --- Calcular Nota Final ---
    const notaFinal = puntaje;
    const aciertos = Math.round(puntaje / valorPorPregunta); // Calcular aciertos

    // --- Mostrar Resultados ---
    const resultadoDiv = document.getElementById('resultadoQuiz');
    resultadoDiv.innerHTML = `
        <h2>Tus Resultados <span class="emoji-section">🎉</span></h2>
        <p><strong>Estudiante:</strong> ${nombreEstudiante}</p>
        <p><strong>Aciertos:</strong> <span class="score-correct">${aciertos}</span> de ${totalPreguntas}</p>
        <p class="final-grade"><strong>Nota Final:</strong> ${notaFinal.toFixed(1)} / 10.0</p>
        <hr>
        <p><small>¡Buen trabajo! No olvides tomar captura y enviarla a Google Classroom.</small> ✨</p>
    `;
    resultadoDiv.style.display = 'block'; // Mostrar el div de resultados

    // Opcional: Desplazar la vista a los resultados
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
});
