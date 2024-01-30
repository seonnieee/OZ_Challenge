// https://dog.ceo/api/breeds/image/random/42 -- 견종 사진을 숫자만큼 랜덤 반환
// https://dog.ceo/api/breeds/list/all -- 견종 전체 정보(키 값으로 되어있음)

const apiRandomDogs = "https://dog.ceo/api/breeds/image/random/42"
const apiAllBreeds = "https://dog.ceo/api/breeds/list/all"
const request1 = new XMLHttpRequest();
const request2 = new XMLHttpRequest();

const header = document.getElementById('header');
const main = document.getElementById('main');
const breedsInput = document.getElementById('filter_text');
const filterBtn = document.getElementById('filter_button');
const filterSelect = document.getElementById('filter_select');
const reloadBtn = document.getElementById('reload_button');
const moreBtn = document.getElementById('more');
const toTheTopBtn = document.getElementById('toTheTop');

const currentDogs = [];

// 견종 이미지 정보 추가하는 함수
function displayDogItem(dogItem) {
    const dogImgDiv = document.createElement('div');
    dogImgDiv.classList.add("flex_item")
    dogImgDiv.innerHTML = `<img src=${dogItem}>`
    main.appendChild(dogImgDiv);
}

// 첫 로딩 때 보여주는 함수
function windowLoad() {
    request1.open("get", apiRandomDogs);
    request1.addEventListener("load", function () {
        const response = JSON.parse(request1.response)
        // 강아지 이미지 추가
        response.message.forEach(function (dogItem) {
            currentDogs.push(dogItem)
            displayDogItem(dogItem);
        });
    })
    request1.send();

    // 셀렉트 견종 정보 뿌리기
    request2.open("get", apiAllBreeds);
    request2.addEventListener("load", function () {
        const responseBreeds = JSON.parse(request2.response);
        console.log(responseBreeds);
        // 키 값을 사용
        Object.keys(responseBreeds.message).forEach(function (dogBreed) {
            const breedOption = document.createElement('option');
            breedOption.textContent = dogBreed;
            breedOption.value = dogBreed;
            filterSelect.appendChild(breedOption);
        })
    })
    request2.send();
}

window.addEventListener("load", windowLoad);

// 인풋 밸류 필터링 버튼 이벤트
function inputFilter() {
    main.innerHTML = "";
    let filteredDogs = currentDogs.filter(function (dogItem) {
        return dogItem.indexOf(breedsInput.value) !== -1
    })

    filteredDogs.forEach(function (dogItem) {
        displayDogItem(dogItem);
    })
};

filterBtn.addEventListener("click", inputFilter)

// 셀렉트 옵션 필터 이벤트
function selectFilter() {
    main.innerHTML = "";
    let filteredDogs = currentDogs.filter(function (dogItem) {
        return dogItem.indexOf(filterSelect.value) !== -1
    })

    filteredDogs.forEach(function (dogItem) {
        displayDogItem(dogItem);
    })
};

filterSelect.addEventListener("change", selectFilter)

// 강아지 사진 추가
function addDogItem() {
    request1.open("get", apiRandomDogs);
    request1.addEventListener("load", function () {
        const response = JSON.parse(request1.response);
        response.message.forEach(function (dogItem) {
            currentDogs.push(dogItem);
            displayDogs(dogItem);
        })
    })
    request1.send();
}

moreBtn.addEventListener("click", addDogItem);

// 최상단으로 이동 버튼 이벤트
function toTheTop() {
    // scrollTo : 주어진 위치로 스크롤을 이동
    window.scrollTo({ top: 0 })
}

toTheTopBtn.addEventListener("click", toTheTop);

// 리셋버튼
function reloadDogItem(){
    window.location.reload();
    request1.open("get", apiRandomDogs);
    request1.addEventListener("load", function () {
        const response = JSON.parse(request1.response);
        response.message.forEach(function (dogItem) {
            displayDogs(dogItem);
        })
    })
    request1.send();
}

reloadBtn.addEventListener("click", reloadDogItem);