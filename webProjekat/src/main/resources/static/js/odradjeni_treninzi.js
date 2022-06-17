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

//************* PRIKAZ ODRADJENIH TRENINGA *************
$(document).ready(function () {
    // ajax poziv
    let korisnickoIme =  document.cookie.split("&")[1].split("=")[1]

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/prijavaTreningaOdradjeni/korisnik/"+korisnickoIme,
        dataType: "json",

        success: function (res) {   //res je lista odradjenih treninga na osnovu termina, za korisnika sa tim korImenom
            console.log("SUCCESS:\n", res);

            $("#treninziTabela").append("<tbody>");
            for (i = 0; i < res.length; i++) {                              // prolazim kroz listu
                let row = "<tr>";                                           // kreiram red za tabelu
                row += "<td>" + res[i].termin.trening.naziv + "</td>";             // ubacujem podatke jednog treninga u polja
                row += "<td>" + res[i].termin.trening.tipTreninga + "</td>";
                row += "<td>" + res[i].termin.trening.opis + "</td>";
                row += "<td>" + res[i].termin.trening.trajanje + "</td>";
                row += "<td>" + res[i].termin.vremeTermina + "</td>";
                row += "<td>" + res[i].termin.cena + "</td>";
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