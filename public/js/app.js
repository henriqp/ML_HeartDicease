function onClickRealizarDiagnostico() {
    const $formulario = $('#formulario')[0];

    if (!$formulario.checkValidity()) {
        $formulario.reportValidity();
        $('#modalDiag').modal('hide');
        return;
    }

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


    $('#modalDiag').modal('show');
    $('#loading').show();

    predict(dataToPredict);
}

function predict(data) {
    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/predict');

    xhr.onload = onPredict;

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));
}

function onPredict(response) {
    const resultado = JSON.parse(response.currentTarget.responseText)[0];

    $('#loading').hide();

    if (resultado) {
        $('#predictTrue').show();
        $('#textPredictTrue').text('A predição indicou a possível presença de doença cardíaca.');
    } else {
        $('#predictFalse').show();
        $('#textPredictFalse').text('A predição indicou ausência de doença cardíaca.');
    }
}

function onClickFinalizar() {
    const $formulario = $('#formulario')[0];

    $formulario.reset();
    $('#predictTrue').hide();
    $('#predictFalse').hide();
}