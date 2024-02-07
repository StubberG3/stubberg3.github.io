'use strict';
const videoIds = [];
document.addEventListener('DOMContentLoaded', function () {
    function addVideo () {
        let videoId = document.getElementById('embed_code').value;
        if (videoId) {
            videoIds.push(videoId);
            $('#gallery').append(
                `<div class="col s12 m6">
                <iframe src="https://www.youtube.com/embed/${videoId}">
                </iframe>
                </div>
                `
            );
        }
    }
    function insertSample (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        let $sampleCode = $(e.target);
        let sampleCode = $sampleCode.data('code');
        $('#embed_code').val(sampleCode);
    }
    // add video on submit
    document.getElementById('submit').addEventListener('click', addVideo);
    // insert sample code into input
    let elements = document.getElementsByClassName('sample_code');
    Array.from(elements).forEach(function (element) {
        element.addEventListener('click', insertSample);
    });
});