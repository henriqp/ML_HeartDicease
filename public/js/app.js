function onClickRealizarDiagnostico() {
    const dataToPredict = [
        parseInt($('#age').val()),
        parseInt($('#sex').val()),
        parseInt($('#cp').val()),
        parseInt($('#trestbps').val()),
        parseInt($('#chol').val()),
        parseInt($('#fbs').val()) || 0,
        parseInt($('#restecg').val()),
        parseInt($('#thalach').val()),
        parseInt($('#exange').val()) || 0,
        parseFloat($('#oldpeak').val()),
        parseInt($('#slope').val()),
        parseInt($('#ca').val()),
        parseInt($('#thal').val())
    ];

    predict(dataToPredict);
}

function predict(data) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/predict');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}