
$(document).ready(function () {
    //opcije da trener izabere fitness centar pri registraciji
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


//*********** ZA PRIJAVU ************
$(document).on("submit", "#prijava", function (event) {     //"#prijava" jer je u html-u id forme: id="prijava"
    event.preventDefault();                                   // sprecava automatsko slanje zahteva da bismo pokupili podatke iz forme

    var korisnickoIme = $("#korisnickoIme").val();  // preuzimamo vrednosti iz forme po id-u, zato je #
    var lozinka = $("#lozinka").val();


    // kreiramo objekat
    // nazivi svih atributa moraju se poklapati sa nazivima na backend-u
    var prijava= {
        korisnickoIme,
        lozinka
    }
    console.log(prijava);

    // ajax poziv
    $.ajax({
        type: "POST",                                         // HTTP metoda je POST
        url: "http://localhost:8080/prijava",                 // URL na koji se salju podaci
        dataType: "json",                                     // tip povratne vrednosti
        contentType: "application/json",                      // tip podataka koje saljemo
        data: JSON.stringify(prijava),                        // u body-ju saljemo novu prijavu(JSON.stringify() pretvara JavaScript objekat u JSON)

        success: function (res) {                             // ova f-ja se izvrsava posle uspesnog zahteva
            console.log(res);
            localStorage.setItem("id", res.id);             //****za back end ********#######
            document.cookie = "uloga="+res["uloga"];	//****************** LEPI ULOGU prijavljenog *********************
            document.cookie += "&korisnickoIme="+res["korisnickoIme"];
            window.location.href = "http://localhost:63342/webProjekat/static/index.html";	//kad se prijavim vodi me na meni*********************
        },
        error: function (data) {            // ova f-ja se izvrsava posle neuspesnog zahteva
            alert("Neuspesna prijava.");
            console.log(data);
        }
    });
});


//************** ZA CLANA ****************
// Kreiranje novog clana
$(document).on("submit", "#registracijaClan", function (event) {
    event.preventDefault();

    var korisnickoIme = $("#korisnickoIme").val();
    var lozinka = $("#lozinka").val();
    var ime = $("#ime").val();
    var prezime = $("#prezime").val();
    var kontaktTelefon = $("#kontaktTelefon").val();
    var eMail = $("#eMail").val();
    var datumRodjenja = $("#datumRodjenja").val();


    // kreiramo objekat Clan
    var clan = {
        korisnickoIme,
        lozinka,
        ime,
        prezime,
        kontaktTelefon,
        eMail,
        datumRodjenja
    }
    console.log(clan);

    // ajax poziv
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/registracija-clan",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(clan),

        success: function (res) {
            console.log(res);
            alert("Clan " + res.id + " je uspesno kreiran!");
        },
        error: function (data) {
            alert("Greska! Niste se registrovali.");
            console.log(data);
        }
    });
});


//************** ZA TRENERA ****************
// Kreiranje novog trenera
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

    var id = $("#fitnessCentarId").val();

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
        url: "http://localhost:8080/registracija-trener",
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

