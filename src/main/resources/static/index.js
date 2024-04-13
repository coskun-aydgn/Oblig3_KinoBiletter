$(function(){
    hentFilmer();
});

function hentFilmer() {
    $.get( "/hentfilmer", function( filmer ) {
        formaterFilmer(filmer);

    });
}

function formaterFilmer(filmer){
    let ut = "<select id='valgtCategori' onchange='finnFilmNavn()'>";
    let forrigeCategori = "";
    ut+="<option>Velg Categori</option>";
    for (const film of filmer){
        if(film.categori !== forrigeCategori){
            ut+="<option>"+film.categori+"</option>";
        }
        forrigeCategori = film.categori;
    }
    ut+="</select>";
    $("#filmerCategori").html(ut);

}

function finnFilmNavn(){
    const valgtCategori = $("#valgtCategori").val();
    $.get( "/hentfilmer", function( filmer ) {
        formaterFilmNavn(filmer,valgtCategori);
        console.log("Secilen Kategori : "+ valgtCategori)
    });
}
function formaterFilmNavn(filmer,valgtCategori){
    let ut = "<select id='valgtFilmNavn'>";
    for(const film of filmer ){
        console.log("film kategori : "+valgtCategori)
        console.log(film)
        if(film.categori === valgtCategori){
            ut+="<option>"+film.filmNavn+"</option>";
        }
    }
    ut+="</select>";
    $("#filmNvn").html(ut);
    console.log(ut)
}
function validateogSubmit() {
    const filmnavn=$("#valgtFilmNavn").val();
    const antall=$("#antall").val();
    const fornavn=$("#fornavn").val();
    const etternavn=$("#etternavn").val();
    const telefonnr=$("#tlfnr").val();
    const email=$("#email").val();

    if(filmnavn === null || antall === "" || fornavn === "" || etternavn === "" || telefonnr === "" || email === ""){
        $("#feilMeldingAntall").text('"Må skriv noe inn i antall"');
        $("#feilMeldingfornavn").text('"Må skriv noe inn i fornavn"');
        $("#feilMeldingetternavn").text('"Må skriv noe inn i etternavn"');
        $("#feilMeldingtlfnr").text('"Må skriv noe inn i telefonnr"');
        $("#feilMeldingemail").text('"Må skriv noe inn i telefonnr"');
        console.log("empty control is OK");
        return;
    }
    if ( antall<=0) {
        alert("Skriv gyldig tall for billetter.")
        return;
    }
    const stringRgl=/^[a-zA-åÅøØæÆ]+$/;
    if(!stringRgl.test(fornavn)){
        alert("Skriv inn et gyldig fornavn.");
        return;
    }
    if(!stringRgl.test(etternavn)){
        alert("Skriv inn et gyldig etternavn.");
        return;
    }
    const tlfnRgl = /^[0-9]{8}$/;
    if (!tlfnRgl.test(telefonnr)) {
        alert("Skriv inn et gyldig telefonnummer.");
        return;
    }

    // kontrol av email formatt
    const emailRgl = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRgl.test(email)) {
        alert("Skriv inn et gyldig epost adresse.");
        return;
    }
    const bilet={
        filmNavn:filmnavn,
        antall:antall,
        fornavn:fornavn,
        etternavn:etternavn,
        telefonNr:telefonnr,
        email:email
    }
    $.post("/lagreBilet", bilet,function (){})
    let biletList={}
    $.get("/hentBiletter", function (data){
        biletList=data;

        window.location.href="/biletTabel.html";
    })

}
