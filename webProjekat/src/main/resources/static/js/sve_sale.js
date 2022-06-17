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

//************* PRIKAZ SVIH SALA *************
$(document).ready(function () {
        // ajax poziv
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/sala",
            dataType: "json",

            success: function (res) {
                console.log("SUCCESS:\n", res);

                $("#saleTabela").append("<tbody>");
                for (i = 0; i < res.length; i++) {
                    let row = "<tr>";
                    row += "<td>" + res[i].kapacitet + "</td>";
                    row += "<td>" + res[i].oznakaSale + "</td>";
                    row += "<td>" + res[i].fitnessCentar.naziv + "</td>";
                    row += "<td> <form id='izmena' method='post'> <input type='hidden' value='" + res[i].id + " '> <input type='submit' value='Izmeni'></form> </td>";
                    row += "<td> <form id='brisanje' method='post'> <input type='hidden' value='" + res[i].id + " '> <input type='submit' value='Obrisi'></form> </td>";

                    row += "</tr>";
                    $('#saleTabela').append(row);
                }
                $("#saleTabela").append("</tbody>");
            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });
});

//************* SALA IZMENI *******************
$(document).on("submit", "#izmena", function (event) {
    event.preventDefault();

    var id = $(this).find('input:hidden').val();  // preuzimamo vrednost te sale sto je skriveni id od gore nakon klika na submit dugme Izmeni
    window.localStorage.setItem('idSala', id);  //SACUVAMO id Sale
    window.location.href = 'sala_izmeni.html';  //preusmerenje na tu stranicu


});

//************* BRISANJE SALE **************
$(document).on("submit", "#brisanje", function (event) {
    event.preventDefault();

    // preuzimamo vrednost te sale sto je skriveni id od gore nakon klika na submit dugme Obrisi
    var id = $(this).find('input:hidden').val();

    // ajax poziv
    $.ajax({
        type: "DELETE",
        url: "http://localhost:8080/sala/"+id,

        success: function (res) {
            console.log(res);
            alert("Uspešno obrisana sala!");
            location.reload();      //refresh stranice nakon BRISANJA, nestaje iz tabele
        },
        error: function (data) {
            alert("Greška prilikom brisanja sale.");
            console.log(data);
        }
    });
});