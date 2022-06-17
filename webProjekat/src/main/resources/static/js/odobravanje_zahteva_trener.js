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

//****** forma za odobravanje zahteva, sa skrivenim id-em ******
$(document).ready(function () {
        // ajax poziv
        $.ajax({
            type: "GET",
            url: "http://localhost:8080/neaktivni-treneri",
            dataType: "json",

            success: function (res) {
                console.log("SUCCESS:\n", res);
                for (i = 0; i < res.length; i++) {
                    let row = "<tr>";                                         // pocinjem kreiranje reda za tabelu
                    row += "<td>" + res[i].ime + "</td>";
                    row += "<td>" + res[i].prezime + "</td>";

                    let forma = "<form> <input id='idKorisnika' type='hidden' value='" + res[i].id + "'> Prihvati<input type='radio' name='zahtev' value='PRIHVATI' required>   Odbij<input type='radio' name='zahtev' value='ODBIJ' required> <input type='submit' value='Potvrdi'>  </form>"
                    row += "<td>" + forma + "</td>";
                    row += "</tr>";                                        // zavrsavam kreiranje reda
                    $('#neaktivniKorisniciTabela').append(row);           // ubacujem kreirani red u tabelu ciji je id = neaktivniKorisniciTabela
                }
            },
            error: function (res) {
                console.log("ERROR:\n", res);
            }
        });
});


//kupimo taj skriveni id korisnika i lepimo ga na localhost:8080/odobravanje-zahteva, u controlleru se vidi da uzimamo korisnika sa tim id-em i postavljamo mu status na aktivan, tj. odobravamo mu zahtev
$(document).on("submit", "form", function (event) {
    event.preventDefault();

    // preuzimamo vrednost tog korisnika koga smo cekirali i otsili na potvrdi/skriveni id od gore
    var id = $(this).find('input:hidden').val();

    var status = $("input:radio[name=zahtev]:checked").val()     //value cekiranog je ili PRIHVATI ili ODBIJ
    if(status == "PRIHVATI") {

        // ajax poziv
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/odobravanje-zahteva/" + id,

            success: function (res) {
                console.log(res);
                alert("Korisniku " + id + " je uspesno odobren zahtev!");
                location.reload();      //refresh stranice nakon odobravanja, nestaje iz tabele, jer mu je aktivan sad true
            },
            error: function (data) {
                alert("Neodobren zahtev.");
                console.log(data);
            }
        });
    }
});
