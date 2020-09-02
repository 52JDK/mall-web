function dataConvert(input) {
    var d = new Date(input);
    var year = d.getFullYear();
    var month = d.getMonth() < 9 ? "0" + (d.getMonth() + 1) : "" + (d.getMonth() + 1);
    var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
    var hour = d.getHours() < 10 ? "0" + d.getHours() : "" + d.getHours();
    var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : "" + d.getMinutes();
    var seconds = d.getSeconds() < 10 ? "0" + d.getSeconds() : "" + d.getSeconds();
    return (year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds);
}
