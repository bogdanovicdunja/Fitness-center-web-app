//************* PRIKAZ SVIH TRENINGA KOJE IMAMO *************
$(document).ready(function () {
    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/termini",
        dataType: "json",

        success: function (res) {
            console.log("SUCCESS:\n", res);

            $("#treninziTabela").append("<tbody>");
            for (i = 0; i < res.length; i++) {                              // prolazim kroz listu svih treninga
                let row = "<tr>";                                           // kreiram red za tabelu
                row += "<td>" + res[i].trening.naziv + "</td>";             // ubacujem podatke jednog treninga u polja
                row += "<td>" + res[i].trening.tipTreninga + "</td>";
                row += "<td>" + res[i].trening.opis + "</td>";
                row += "<td>" + res[i].trening.trajanje + "</td>";
                row += "<td>" + res[i].vremeTermina + "</td>";
                row += "<td>" + res[i].cena + "</td>";
                row += "<td> <form id='preusmerenje' method='post'> <input type='hidden' value='" + res[i].id +  " '> <input type='submit' value='Prijava'></form> </td>";
                //SKRIVENI ID TERMINA koji korisnik bira


                row += "</tr>";                                     // zavrsavam kreiranje reda
                $('#treninziTabela').append(row);                   // ubacujemo kreirani red u tabelu ciji je id = treninziTabela
            }
            $("#treninziTabela").append("</tbody>");
        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});

//******* KORISNIK IZABRAO KOJI CE TERMIN TRENINGA/PRIJAVA TRENINGA ********
$(document).on("submit", "#preusmerenje", function (event) {
    event.preventDefault();

    // preuzimamo vrednost tog termina sto je skriveni id od gore nakon klika na submit dugme Prijava
    var id = $(this).find('input:hidden').val();
    window.localStorage.setItem('idTermin', id);    //SACUVAMO ga kao idTermina
    window.location.href = 'termin_profil.html';    //preusmerenje na tu str. nakon klika na dugme Prijava


});

//************* KOMBINOVANA PRETRAGU ****************
$(document).on("submit", "#pretraziOdabrano", function (event) {    //id forme koju filtriram
    event.preventDefault();

    //ono sto korisnik unese/odabere, izvlacimo te vrednosti
    var tip = $("#tip").val();
    var minCena =  $("#minCena").val();
    var maxCena = $("#maxCena").val();
    var naziv = $("#naziv").val();
    var opis = $("#opis").val();
    var minVreme = $("#minVreme").val();
    var maxVreme = $("#maxVreme").val();





    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/terminiPretraga/?tip="+tip + "&minCena="+ minCena + "&maxCena=" + maxCena + "&naziv=" + naziv + "&opis="+opis+"&minVreme="+minVreme+"&maxVreme="+maxVreme,
        //lepim na tu putanju odredjene parametre, idem na kontroler

        success: function (res) {
            $("#treninziTabela").find("tr:gt(0)").remove();         //************BRISE SVE REDOVE OSIM ZAGLAVLJA****************
            console.log(res);
            $("#treninziTabela").append("<tbody>");

            for (i = 0; i < res.length; i++) {                      // prolazim kroz listu treninga koji odgovaraju odabiru
                let row = "<tr>";                                   // kreiram red za tabelu
                row += "<td>" + res[i].trening.naziv + "</td>";             // ubacujem podatke jednog treninga u polja
                row += "<td>" + res[i].trening.tipTreninga + "</td>";
                row += "<td>" + res[i].trening.opis + "</td>";
                row += "<td>" + res[i].trening.trajanje + "</td>";
                /*row += "<td>" + res[i].vremeTermina + "</td>";
                row += "<td>" + res[i].cena + "</td>";

                 */
                row += "</tr>";                                     // zavrsavam kreiranje reda
                $('#treninziTabela').append(row);                   // ubacujem kreirani red u tabelu čiji je id = treninziTabela
            }
            $("#treninziTabela").append("</tbody>");

        },
        error: function (data) {
            console.log(data);
        }
    });
});



//**************** (izvor: stackoverflow) FILTRIRANJE TRENINGA *******************
function myFunctionN() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("treninziTabela");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function myFunction() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputTip");
    filter = input.value.toUpperCase();
    table = document.getElementById("treninziTabela");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function myFunctionO() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInputOpis");
    filter = input.value.toUpperCase();
    table = document.getElementById("treninziTabela");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[2];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function myFunctionC() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("poCeni");
    filter = input.value.toUpperCase();
    table = document.getElementById("treninziTabela");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[5];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

function myFunctionV() {
    // Declare variables
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("poVremenuTermina");
    filter = input.value.toUpperCase();
    table = document.getElementById("treninziTabela");
    tr = table.getElementsByTagName("tr");

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[4];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}