const container = document.querySelector(".container");
const seats = document.querySelectorAll(".seat");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const movie = document.getElementById("movie")

getFromLocalStorage()
calculateInfo()

container.addEventListener("click", function (e) {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("reserved")) {
        e.target.classList.toggle("selected");
        calculateInfo()
    }
})

movie.addEventListener("change", function () {
    calculateInfo()
})


function calculateInfo() {
    const selectedSeats = container.querySelectorAll(".seat.selected")
    let selectedSeatCount = selectedSeats.length
    let selectedSeatIndexs;
    const seatsArr = []
    const selectedSeatsArr = []

    selectedSeats.forEach(function (seat) {
        selectedSeatsArr.push(seat)
    })

    seats.forEach(function (seat) {
        seatsArr.push(seat)
    })

    selectedSeatIndexs = selectedSeatsArr.map(function (seat) {
        return seatsArr.indexOf(seat)
    })

    console.log(selectedSeatIndexs)

    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * movie.value;

    saveToLocalStorage(selectedSeatIndexs);
}

function getFromLocalStorage() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach(function (seat, i) {
            if (selectedSeats.indexOf(i) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovieIndex = JSON.parse(localStorage.getItem("selectedMovieIndex"))

    if (selectedMovieIndex != null) {
        movie.selectedIndex = selectedMovieIndex
    }

}

function saveToLocalStorage(indexs) {
    localStorage.setItem("selectedSeats", JSON.stringify(indexs))
    localStorage.setItem("selectedMovieIndex", JSON.stringify(movie.selectedIndex))
}