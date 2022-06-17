//************* provera uloge preko id-a na backendu *************
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/korisnikAdmin/"+idKorisnika,   //korisnik controller trazi ulogu tog korisnika
        dataType: "json",
        contentType: "application/json",

        success: function (res){
            console.log(res);
        },

        error: function (){
            alert("Nemate pristup ovoj stranici, niste administrator!");
            window.location.href = "http://localhost:63342/webProjekat/static/index.html?_ijt=k78nv9sb3e1cdo9qe6tb337tvp";
        }
    });
});


//************* PRIKAZ SVIH TRENERA *************
$(document).ready(function () {
        // ajax poziv
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/treneri",
            dataType: "json",

            success: function (res) {
                console.log("SUCCESS:\n", res);

                $("#treneriTabela").append("<tbody>");
                for (i = 0; i < res.length; i++) {
                    let row = "<tr>";
                    row += "<td>" + res[i].korisnickoIme + "</td>";
                    row += "<td>" + res[i].ime + "</td>";
                    row += "<td>" + res[i].prezime + "</td>";
                    row += "<td> <form id='brisanje' method='post'> <input type='hidden' value='" + res[i].id + " '> <input type='submit' value='Obrisi'></form> </td>";

                    row += "</tr>";
                    $('#treneriTabela').append(row);
                }
                $("#treneriTabela").append("</tbody>");
            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });
});


//************* BRISANJE TRENERA **************
$(document).on("submit", "#brisanje", function (event) {
    event.preventDefault();

    // preuzimamo vrednost tog korisnika, sto je skriveni id od gore nakon klika na submit dugme Obrisi
    var id = $(this).find('input:hidden').val();

    // ajax poziv
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/treneri/"+id,

        success: function (res) {
            console.log(res);
            alert("Uspešno obrisan trener!");
            location.reload();      //refresh stranice nakon BRISANJA, nestaje iz tabele
        },
        error: function (data) {
            alert("Greška prilikom brisanja trenera.");
            console.log(data);
        }
    });
});