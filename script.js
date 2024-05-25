function region_data(index){
    info_div.innerHTML = "Województwo: <span style='color:" + map_colors[index] + "'>" + region_names[index] + "</span><br/>";
    if (current_map == 0){
        info_div.innerHTML += "Gęstość zaludnienia: " + region_numbers[current_map][index] + " osób/km²";
    }
    if (current_map == 1){
        info_div.innerHTML += "Ludność: " + region_numbers[current_map][index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " osób";
    }
    if (current_map == 2){
        info_div.innerHTML += "Stężenie PM10: " + region_numbers[current_map][index] + " µg/m³";
    }
    if (current_map == 3){
        info_div.innerHTML += "Powierzchnia: " + region_numbers[current_map][index].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "km²";
    }
    if (current_map == 4){
        info_div.innerHTML += "Najniższy punkt: " + region_heights[index][0] + "m n.p.m.<br/>";
        info_div.innerHTML += "Najwyższy punkt: " + region_heights[index][1] + "m n.p.m.<br/>";
        info_div.innerHTML += "Średnia wysokość: " + region_numbers[current_map][index] + "m n.p.m.";
        return;
    }
}

function change_map(index){
    maps[current_map].style.color = "white";
    current_map = index;
    info_div.innerHTML = "Najedź kursorem na województwo aby<br/><span class='blue'>dowiedzieć się więcej</span>";
    reload_map();
}

function map_numbers_to_colors(numbers) {
    const min = Math.min(...numbers);
    const max = Math.max(...numbers);
    
    const colorMap = {};
    numbers.forEach(number => {
        const ratio = (number - min) / (max - min);
        
        const r = Math.round(255 * ratio);
        const g = Math.round(255 * (1 - ratio));
        const b = 0;
        
        const colorHex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        colorMap[number] = colorHex;
    });

    const colors = numbers.map(number => colorMap[number]);  
    return colors;
}

function reload_map(){
    map_colors = map_numbers_to_colors(region_numbers[current_map]);
    maps[current_map].style.color = "rgb(55, 185, 230)";
    main_info.innerHTML = poland_numbers[current_map];
    for (var i = 0; i < 16; i++){
        regions[i].style.fill = map_colors[i];
    }
}

var current_map = 0;
const regions = document.querySelectorAll("#map path");
const info_div = document.getElementById("map_info");
const main_info = document.getElementById("main_info");
const region_names = [
    "Podkarpackie", //0
    "Małopolskie", //1
    "Śląskie", //2
    "Opolskie", //3
    "Dolnośląskie", //4
    "Świętokrzyskie", //5
    "Lubelskie", //6
    "Łódzkie", //7
    "Mazowieckie", //8
    "Wielkopolskie", //9
    "Lubuskie", //10
    "Kujawsko Pomorskie", //11
    "Podlaskie", //12
    "Zachodnio Pomorskie", //13
    "Warmińsko Mazurskie", //14
    "Pomorskie" //15
]

const poland_numbers = [
    "Średnia gęstość zaludnienia w Polsce (2022r.): 122 osób/km²",
    "Ludności Polski (2023r.): 37.766.000 osób",
    "Średni poziom PM10 (pyły większe niż 10μm) w Polsce (2022r.): 27 µg/m³",
    "Powierzchnia Polski (2023r.): 312.720km²",
    "Najniższy punkt w Polsce: 2.2m p.p.m. (Marzęcino)<br/>Najwyższy punkt w Polsce: 2499 m n.p.m. (Rysy)<br/>Średnia wysokość Polski: 173 m n.p.m."
];

const region_numbers = [
    [119, 226, 366, 70, 145, 129, 79, 134, 153, 170, 79, 115, 57, 82, 57, 128],
    [2079000, 3429000, 4346000, 942000, 2888000, 1178000, 2024000, 2378000, 5510000, 3493000, 980000, 2007000, 1143000, 1640000, 1366000, 2358000],
    [33, 32, 31, 30, 27, 28, 34, 29, 25, 23, 26, 24, 23, 21, 22, 20],
    [17845, 15183, 12334, 9411, 19946, 11709, 25122, 18219, 35559, 29826, 13987, 17971, 20187, 22907, 24174, 18336],
    [350, 550, 406, 175, 450, 260, 175, 175, 125, 150, 125, 125, 125, 50, 70, 75]
];

const maps = document.getElementsByClassName("map_look");
map_colors = [];
reload_map();
for (var i = 0; i < 5; i++){
    maps[i].addEventListener("click", change_map.bind(this, i), false);
}

for (var i = 0; i < 16; i++){
    regions[i].addEventListener("mouseover", region_data.bind(this, i), false);
}

const region_heights = [
    //min, max
    [170, 1346],
    [210, 2499],
    [174, 1543],
    [100, 894],
    [70, 1603],
    [128, 612],
    [130, 227],
    [100, 400],
    [60, 408],
    [29, 284],
    [30, 227],
    [5, 189],
    [100, 298],
    [0, 245],
    [-1,8, 312],
    [-2.2, 329]
];