//***** PRIKAZ SVIH TERMINA SA NJIHOVIM ATRIBUTIMA *****
$(document).ready(function () {
    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/termini",
        dataType: "json",

        success: function (res) {
            console.log("SUCCESS:\n", res);

            $("#idTermin").append("<tbody>");
            for (i = 0; i < res.length; i++) {                      // prolazim kroz listu svih termina
                let row = "<tr>";                                   // kreiram red za tabelu
                row += "<td>" + res[i].brojPrijavljenihClanova + "</td>";             // ubacujem podatke jednog termina u polja
                row += "<td>" + res[i].vremeTermina + "</td>";
                row += "<td>" + res[i].cena + "</td>";
                row += "</tr>";                                     // zavrsavam kreiranje reda
                $('#idTermin').append(row);                   // ubacujemo kreirani red u tabelu ciji je id = idTermin
            }
            $("#idTermin").append("</tbody>");
        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});

//********** SORTIRANJA PO CENI I VREMENU TERMINA ************
$(document).on('click', '#cenaASC', function(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/termini/cenaASC",
        dataType: "json",
        success: function(response){
            console.log("SUCCESS:\n", response);
            $('#idTermin').find('tbody').children( 'tr:not(:first)').remove();
            for(let termin of response){
                let row = "<tr>";

                row += "<td>" + termin.brojPrijavljenihClanova + "</td>";
                row += "<td>" + termin.vremeTermina + "</td>";
                row += "<td>" + termin.cena + "</td>";

                row += "</tr>";
                $('#idTermin').append(row);
            }
        },
        error: function(response){
            console.log("ERROR: \n", response);
        }
    });
});

$(document).on('click', '#cenaDESC', function(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/termini/cenaDESC",
        dataType: "json",
        success: function(response){
            console.log("SUCCESS:\n", response);
            $('#idTermin').find('tbody').children( 'tr:not(:first)').remove();
            for(let termin of response){
                let row = "<tr>";

                row += "<td>" + termin.brojPrijavljenihClanova + "</td>";
                row += "<td>" + termin.vremeTermina + "</td>";
                row += "<td>" + termin.cena + "</td>";

                row += "</tr>";
                $('#idTermin').append(row);
            }
        },
        error: function(response){
            console.log("ERROR: \n", response);
        }
    });
});

$(document).on('click', '#vremeASC', function(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/termini/vremeASC",
        dataType: "json",
        success: function(response){
            console.log("SUCCESS:\n", response);
            $('#idTermin').find('tbody').children( 'tr:not(:first)').remove();
            for(let termin of response){
                let row = "<tr>";

                row += "<td>" + termin.brojPrijavljenihClanova + "</td>";
                row += "<td>" + termin.vremeTermina + "</td>";
                row += "<td>" + termin.cena + "</td>";

                row += "</tr>";
                $('#idTermin').append(row);
            }
        },
        error: function(response){
            console.log("ERROR: \n", response);
        }
    });
});

$(document).on('click', '#vremeDESC', function(){
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/termini/vremeDESC",
        dataType: "json",
        success: function(response){
            console.log("SUCCESS:\n", response);
            $('#idTermin').find('tbody').children( 'tr:not(:first)').remove();
            for(let termin of response){
                let row = "<tr>";

                row += "<td>" + termin.brojPrijavljenihClanova + "</td>";
                row += "<td>" + termin.vremeTermina + "</td>";
                row += "<td>" + termin.cena + "</td>";

                row += "</tr>";
                $('#idTermin').append(row);
            }
        },
        error: function(response){
            console.log("ERROR: \n", response);
        }
    });
});