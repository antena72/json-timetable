$(document).ready(function () {
  let data;
  let horario = new Array();
  let output, dia, actividad, i, j, link, horarioTabla;

  //eventos
  animacionBotones('botManana','result');
  animacionBotones('botTarde','resultTarde');

//cambios en botones y toggle
function animacionBotones(boton, campoMuestra){
  $('#'+boton).click( function(e){
    e.preventDefault();
    $('#'+campoMuestra).slideToggle('slow');
    $(this).children().toggleClass('fa-chevron-down fa-chevron-up');
    $(this).toggleClass('txtGrisOscuro txtVerdeActivo');
    
  });
}

//ajax
  $.ajax({
    url : 'assets/js/agenda.json',
    type : 'GET',
    dataType : 'json',
    success : function(data) {
      //ordena los regisros por hora
    console.log(data);
    const dateFromStr = (str) => new Date("1970/01/01 " + str);
    data.sort((a, b) => dateFromStr(a.hora) - dateFromStr(b.hora));
    let hora = data[0].hora;
    horario.push(hora);
    let dia;
    //toma todas las posibles horas
    $.each(data, function (key, val) {
      if (hora != val.hora) {
        hora = val.hora;
        horario.push(hora);
      }
    });
    //pone renglones de horas
    poneHoras(horario);

    $.each(data, function (key, val) {
      for (let i = 0; i < horario.length; i++) {
        dia = val.dia;
        tipo = val.tipo;
        actividad = val.actividad;
        instructor = val.instructor;
        otro = val.otro;
        link = val.link;
        if (val.hora == horario[i]) {
          poneActivadad(
            dia,           "lunes",
            i,
            tipo,
            actividad,
            instructor,
            otro,
            link
          );
          poneActivadad(
            dia,           "martes",
            i,
            tipo,
            actividad,
            instructor,
            otro,
            link
          );
          poneActivadad(
            dia,           "miercoles",
            i,
            tipo,
            actividad,
            instructor,
            otro,
            link
          );
          poneActivadad(
            dia,           "jueves",
            i,
            tipo,
            actividad,
            instructor,
            otro,
            link
          );
          poneActivadad(
            dia,           "viernes",
            i,
            tipo,
            actividad,
            instructor,
            otro,
            link
          );
          poneActivadad(
            dia,           "sabado",
            i,
            tipo,
            actividad,
            instructor,
            otro,
            link
          );
          poneActivadad(
            dia,           "domingo",
            i,
            tipo,
            actividad,
            instructor,
            otro,
            link
          );
        }
      }
    });
    },

    // código a ejecutar si la petición falla;
    // son pasados como argumentos a la función
    // el objeto de la petición en crudo y código de estatus de la petición
    error : function(xhr, status, error) {
        //alert('Disculpe, existió un problema Status: '+ status + ' error: '+ error);
    },

    // código a ejecutar sin importar si la petición falló o no
    complete : function(xhr, status) {
        //alert('Petición realizada');
    }
});

  //funciones
  function poneActivadad(
    diaJSon,
    diaTabla,
    i,
    tipo,
    actividad,
    instructor,
    otro,
    link
  ) {
    if (diaJSon == diaTabla) {
      $("#" + diaTabla + "_" + i).append(
        '<a href="' +
          link +
          '"><div class="fondo fondo'+tipo+'"><h4>' +
          actividad +
          "</h4><p>" +
          instructor +
          "</p></div></a>"
      );
      if (otro != "") {
        $("#" + diaTabla + "_" + i + " .fondo").append("<p>" + otro + "</p>");
      }
    }
  }

  function poneHoras(horario) {
    for (let j = 0; j < horario.length; j++) {
      test(horario[j], j);
    }
  }

  function hora(horario, j, turno) {
    if (turno == "manana") {
      $("#result").append(
        '<tr id="hora_' +
          j +
          '"><td class="horas">' +
          horario[j] +
          '</td><td class="actividad" id="lunes_' +
          j +
          '"></td><td class="actividad" id="martes_' +
          j +
          '"></td><td class="actividad" id="miercoles_' +
          j +
          '"></td><td class="actividad" id="jueves_' +
          j +
          '"></td><td class="actividad" id="viernes_' +
          j +
          '"></td><td class="actividad" id="sabado_' +
          j +
          '"></td><td class="actividad" id="domingo_' +
          j +
          '"></td></tr>'
      );
    } else {
      $("#resultTarde").append(
        '<tr id="hora_' +
          j +
          '"><td class="horas">' +
          horario[j] +
          '</td><td class="actividad" id="lunes_' +
          j +
          '"></td><td class="actividad" id="martes_' +
          j +
          '"></td><td class="actividad" id="miercoles_' +
          j +
          '"></td><td class="actividad" id="jueves_' +
          j +
          '"></td><td class="actividad" id="viernes_' +
          j +
          '"></td><td class="actividad" id="sabado_' +
          j +
          '"></td><td class="actividad" id="domingo_' +
          j +
          '"></td></tr>'
      );
    }
  }

  function test(start_time, j) {
    let dt = new Date();
    //convert both time into timestamp
    var stt = new Date(
      dt.getMonth() +
        1 +
        "/" +
        dt.getDate() +
        "/" +
        dt.getFullYear() +
        " " +
        start_time
    );

    stt = stt.getHours() + stt.getMinutes();

    if (stt < "14") {
      hora(horario, j, "manana");
    } else {
      hora(horario, j, "tarde");
    }
  }
});
