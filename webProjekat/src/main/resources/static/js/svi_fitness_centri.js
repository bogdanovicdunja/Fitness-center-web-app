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

//************* PRIKAZ SVIH FITNESS CENTARA *************
$(document).ready(function () {
    // ajax poziv
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/fitness-centar",
            dataType: "json",

            success: function (res) {
                console.log("SUCCESS:\n", res);

                $("#fitnessCentriTabela").append("<tbody>");
                for (i = 0; i < res.length; i++) {
                    let row = "<tr>";
                    row += "<td>" + res[i].naziv + "</td>";
                    row += "<td>" + res[i].adresa + "</td>";
                    row += "<td>" + res[i].brojTelefona + "</td>";
                    row += "<td>" + res[i].eMail + "</td>";
                    row += "<td> <form id='izmena' method='post'> <input type='hidden' value='" + res[i].id + " '> <input type='submit' value='Izmeni'></form> </td>";
                    row += "<td> <form id='brisanje' method='post'> <input type='hidden' value='" + res[i].id + " '> <input type='submit' value='Obrisi'></form> </td>";

                    row += "</tr>";
                    $('#fitnessCentriTabela').append(row);
                }
                $("#fitnessCentriTabela").append("</tbody>");
            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });
});

//************* FITNESS CENTAR IZMENI *******************
$(document).on("submit", "#izmena", function (event) {
    event.preventDefault();

    var id = $(this).find('input:hidden').val();  // preuzimamo vrednost tog FC-a sto je skriveni id od gore nakon klika na submit dugme Izmeni
    window.localStorage.setItem('idFitness', id);  //SACUVAMO ga kao idFitness
    window.location.href = 'fitness_centar_izmeni.html';  //preusmerenje na tu stranicu


});

//************* BRISANJE FITNESS CENTRA **************
$(document).on("submit", "#brisanje", function (event) {
    event.preventDefault();

    // preuzimamo vrednost te prijave sto je skriveni id od gore nakon klika na submit dugme Obrisi
    var id = $(this).find('input:hidden').val();

    // ajax poziv
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/fitness-centar/"+id,

        success: function (res) {
            console.log(res);
            alert("Uspešno obrisan fitness centar!");
            location.reload();      //refresh stranice nakon BRISANJA, nestaje iz tabele
        },
        error: function (data) {
            alert("Greška prilikom brisanja fitness centra.");
            console.log(data);
        }
    });
});
