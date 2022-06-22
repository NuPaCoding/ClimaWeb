(function(){

    var actualizarHora = function() {
        var fecha = new Date(),
            horas = fecha.getHours(),
            ampm,
            minutos = fecha.getMinutes(),
            segundos = fecha.getSeconds(),
            diaSemana = fecha.getDay(),
            dia =fecha.getDate(),
            mes = fecha.getMonth(),
            year = fecha.getFullYear();

        var pHoras = document.getElementById('horas'),
            pAMPM = document.getElementById('ampm'),
            pMinutos = document.getElementById('minutos'),
            pSegundos = document.getElementById('segundos'),
            pDiaSemana = document.getElementById('diaSemana'),
            pDia = document.getElementById('dia'),
            pMes = document.getElementById('mes'),
            pYear = document.getElementById('year');

        var semana = ['Domingo','Lunes','Martes','Miercoles','Jueves','Viernes','Sabado'];
        pDiaSemana.textContent = semana[diaSemana];

        pDia.textContent = dia;

        var meses = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
        pMes.textContent = meses[mes]

        pYear.textContent = year;

        if (horas >= 12) {
            horas = horas - 12;
            ampm = 'PM'
        } else {    
                ampm = 'AM';
        };

        if (horas == 0) {
            horas = 12;
        };

        if (horas < 10){
            horas = '0'+ horas;
        }

        pHoras.textContent = horas;
        pAMPM.textContent = ampm;

        if (minutos < 10) {
            minutos = '0'+ minutos;
        };

        pMinutos.textContent = minutos;

        if (segundos < 10){
            segundos = '0'+ segundos;
        }

        pSegundos.textContent = segundos;
        
    };

    actualizarHora();
    let intervalo = setInterval(actualizarHora, 1000)

}())

window.addEventListener('load', ()=>{

    let lon
    let lat

    let temperaturaValor = document.getElementById('temperatura-valor')
    let temperaturaDescripcion = document.getElementById('temperatura-descripcion')

    let ubicacion = document.getElementById('ubicacion')
    let iconoAnimado = document.getElementById('icono-animado')

    let vientoVelocidad = document.getElementById('viento-velocidad')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(posicion=>{
            // console.log(posicion.coords.latitude)
            // console.log(posicion.coords.longitude)

            lon = posicion.coords.longitude
            lat = posicion.coords.latitude
            
            // ubicacion actual
            const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=es&appid=1d7959f11e88f29bb26f3726a29a7ae5`

            // console.log(url)
            fetch(url)
                .then( response => { return response.json()})
                .then  ( data => {

                    let temp = Math.round(data.main.temp)
                    temperaturaValor.textContent = `${temp} °C`

                    let desc = data.weather[0].description
                    temperaturaDescripcion.textContent = desc.toUpperCase()

                    ubicacion.textContent = data.name

                    vientoVelocidad.textContent= Math.round(`${data.wind.speed}`*3.6) + " km/h"
                    // console.log(data)

                    console.log(data.weather[0].main)
                    switch (data.weather[0].main){
                        case 'Thunderstorm':
                      iconoAnimado.src='animated/thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='animated/rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='animated/rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='animated/snowy-6.svg'
                        console.log('NIEVE');
                      break;                        
                    case 'Clear':
                        iconoAnimado.src = 'animated/day.svg'
                        console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='animated/weather.svg'
                        console.log('ATMOSFERA');
                        break;  
                    case 'Clouds':
                        iconoAnimado.src='animated/cloudy-day-1.svg'
                        console.log('NUBES');
                        break;  
                    default:
                      iconoAnimado.src='animated/cloudy-day-1.svg'
                      console.log('por defecto');
                    }

                })
                .catch ( error => {
                    console.log(error)
                })
        })
    }
})