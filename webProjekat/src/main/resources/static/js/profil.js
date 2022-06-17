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


//************* PRIKAZ ATRIBUTA KORISNIKA NA PROFILU *************
$(document).ready(function () {
    var idKorisnika = localStorage.getItem("id");

    // ajax poziv
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/jedankorisnik/"+idKorisnika,   //korisnik controller trazi tog korisnika
        dataType: "json",

        success: function (res) {   //vraca tog korisnika
            console.log("SUCCESS:\n", res);

            $("#korisnickoIme").html(res["korisnickoIme"]); //izvlaci vrednosti atributa tog vracenog korisnika
            $("#ime").html(res["ime"]);
            $("#prezime").html(res["prezime"]);
            $("#kontaktTelefon").html(res["kontaktTelefon"]);
            $("#eMail").html(res["eMail"]);
            $("#datumRodjenja").html(res["datumRodjenja"]);

        },
        error: function (res) {
            console.log("ERROR:\n", res);
        }
    });
});
