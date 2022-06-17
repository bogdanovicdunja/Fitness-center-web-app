//************* provera uloge preko id-a na backendu *************
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/korisnikTrener/"+idKorisnika,   //korisnik controller trazi ulogu tog korisnika
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


//************* PRIKAZ PROSECNE OCENE *************
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/prosecnaocena/"+idKorisnika,   //korisnik controller trazi tog korisnika
        dataType: "json",

        success: function (res) {   //vraca DTO
            console.log("SUCCESS:\n", res);

            $("#ocena").html(res["ocena"]); //izvacim ocenu odatle

        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});
