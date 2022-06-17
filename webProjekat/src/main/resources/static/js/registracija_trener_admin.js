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

$(document).ready(function () {
    //u koji fitness centar ga registrujemo
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/fitness-centar",
            dataType: "json",

            success: function (res) {
                console.log("SUCCESS:\n", res);
                for (i = 0; i < res.length; i++) {
                    let option = "<option value='" + res[i].id +  "'>";
                    option += res[i].naziv;
                    option += "</option>";
                    $('#fitnessCentarId').append(option);
                }
            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });
});


//*******Kreiranje novog trenera
$(document).on("submit", "#registracijaTrener", function (event) {
    event.preventDefault();

    // preuzimamo vrednosti iz forme
    var korisnickoIme = $("#korisnickoIme").val();
    var lozinka = $("#lozinka").val();
    var ime = $("#ime").val();
    var prezime = $("#prezime").val();
    var kontaktTelefon = $("#kontaktTelefon").val();
    var eMail = $("#eMail").val();
    var datumRodjenja = $("#datumRodjenja").val();

    var id = $("#fitnessCentarId").val();   //kupimo ID fc-a koji gore izaberemo iz opcija

    var fitnessCentar = {id}

    // kreiramo objekat Trenera
    var trener = {
        korisnickoIme,
        lozinka,
        ime,
        prezime,
        kontaktTelefon,
        eMail,
        datumRodjenja,
        fitnessCentar
    }
    console.log(trener);

    // ajax poziv
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/registracija-trener-admin",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(trener),

        success: function (res) {
            console.log(res);
            alert("Trener " + res.id + " je uspesno kreiran!");
        },
        error: function (data) {
            alert("Greska! Vas zahtev nije poslat.");
            console.log(data);
        }
    });
});


//************* KOLACICI *****************
function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

