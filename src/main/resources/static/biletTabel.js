$(function (){
    hentBiletter();
});
function hentBiletter() {
    $.get("/hentBiletter", function (biletter){
        formatBiletter(biletter);
        console.log(biletter)
    });
}
function formatBiletter(biletter){
    console.log(biletter)
    let ut="<table class='table table-hover' ><thead><tr>" +
        "<th>Film Navn</th>" +
        "<th>Antall</th>" +
        "<th>Fornavn</th>" +
        "<th>Etternavn</th>" +
        "<th>TelefonNr</th>" +
        "<th>Email</th>" +
        "</tr></thead><tbody>" ;
    for (let bilet of biletter){
        ut+="<tr><td>"+bilet.filmNavn+"</td>"+
            "<td>"+bilet.antall+"</td>" +
            "<td>"+bilet.fornavn+"</td>"+
            "<td>"+bilet.etternavn+"</td>"+
            "<td>"+bilet.telefonNr+"</td>"+
            "<td>"+bilet.email+"</td></tr>";

    }
    ut+="</tbody></table>";
    $("#filmTable").html(ut)
}
function slettBilletter() {
    $.get("/slettBiletter",function () {hentBiletter()});
}
function registrerBilett() {
    window.location.href="/index.html"
}