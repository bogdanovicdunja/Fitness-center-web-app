//************* provera uloge preko id-a na backendu *************
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/korisnikClan/"+idKorisnika,   //korisnik controller trazi ulogu tog korisnika
        dataType: "json",
        contentType: "application/json",

        success: function (res){
            console.log(res);
        },

        error: function (){
            alert("Nemate pristup ovoj stranici, niste clan!");
            window.location.href = "http://localhost:63342/webProjekat/static/index.html?_ijt=k78nv9sb3e1cdo9qe6tb337tvp";
        }
    });
});

//************* PRIKAZ PRIJAVLJENIH TRENINGA NEKOG KORISNIKA *************
$(document).ready(function () {
    let korisnickoIme =  document.cookie.split("&")[1].split("=")[1]    //izvlacim korisnicko ime

    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/prijavaTreninga/korisnik/"+korisnickoIme,   //lepim ga na ovu putanju
        dataType: "json",

        success: function (res) {
            console.log("SUCCESS:\n", res);

            $("#treninziTabela").append("<tbody>");
            for (i = 0; i < res.length; i++) {                      // prolazim kroz listu svih PRIJAVLJENIH TRENINGA korisnika
                let row = "<tr>";
                row += "<td>" + res[i].termin.trening.naziv + "</td>";             // ubacujem podatke u polja
                row += "<td>" + res[i].termin.trening.tipTreninga + "</td>";
                row += "<td>" + res[i].termin.trening.opis + "</td>";
                row += "<td>" + res[i].termin.trening.trajanje + "</td>";
                row += "<td>" + res[i].termin.vremeTermina + "</td>";
                row += "<td>" + res[i].termin.cena + "</td>";
                row += "<td> <form id='otkazivanje' method='post'> <input type='hidden' value='" + res[i].id +  " '> <input type='submit' value='Otkazivanje'></form> </td>";
                row += "<td> <form id='odradjen' method='post'> <input type='hidden' value='" + res[i].id +  " '> <input type='submit' value='Odradjen'></form> </td>";

                //skriveni ID PRIJAVE
                row += "</tr>";
                $('#treninziTabela').append(row);
            }
            $("#treninziTabela").append("</tbody>");
        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});

//********* OTKAZIVANJE TRENINGA **********
$(document).on("submit", "#otkazivanje", function (event) {
    event.preventDefault();

    // preuzimamo vrednost te prijave sto je skriveni id od gore nakon klika na submit dugme Otkazivanje
    var id = $(this).find('input:hidden').val();

        // ajax poziv
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/prijavaTreninga/"+id,

            success: function (res) {
                console.log(res);
                alert("Uspešno otkazan trening!");
                location.reload();      //refresh stranice nakon OTKAZIVANJA, nestaje iz tabele
            },
            error: function (data) {
                alert("Neuspešno otkazan trening.");
                console.log(data);
            }
        });
});

//*********** KORISNIK BIRA DA LI JE ODRADIO TRENING ***************
$(document).on("submit", "#odradjen", function (event) {
    event.preventDefault();

    // preuzimamo vrednost te prijave sto je skriveni id od gore nakon klika na submit dugme Otkazivanje
    var id = $(this).find('input:hidden').val();

    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/prijavaTreninga/odradi/"+id,

        success: function (res) {
            console.log(res);
            alert("Uspešno promenjen status treninga!");
            location.reload();      //refresh stranice nakon OTKAZIVANJA, nestaje iz tabele
        },
        error: function (data) {
            alert("Neuspešno promenjen status.");
            console.log(data);
        }
    });
});