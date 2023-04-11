function ms_reset() {
    for (let i = 0; i < field_hei; i++) {
        for (let j = 0; j < field_wid; j++) {
            nums[i][j] = 0;
            flags[i][j] = 0;
            opened[i][j] = 0;
            document.getElementById(write_id(i, j)).innerHTML = "";
            document.getElementById(write_id(i, j)).style.backgroundColor = "rgb(180, 180, 200)"
        }
    }
    started = 0;
    num_opened = 0;
    flag_num = 0;
    document.getElementById('flags').innerHTML = mine_num;
    // let tmp = time;
    timer(0);
    // document.getElementById("timer").innerHTML =
    //     String(Math.floor(tmp/100) % 10) + String(Math.floor(tmp/10) % 10) + String(Math.floor(tmp) % 10);

}

function ms_click(s) {
    if (ms_flagged) {
        ms_flag(s);
        return;
    }
    let i0 = Number(s[0])*10 + Number(s[1]);
    let j0 = Number(s[2])*10 + Number(s[3]);
    if (started == 1) {
        if (flags[i0][j0] == 0) {
            open(i0, j0);
            //alert(num_opened); alert(field_hei * field_wid - mine_num);
            if (num_opened == field_hei * field_wid - mine_num) {
                win();
            }
        }
    } else if (started == 0) {
        time = 0;
        timer(1);
        start(i0, j0);
    }
}

function open(i0, j0) {
    if (i0 < 0 || i0 >= field_hei || j0 < 0 || j0 >= field_wid) {
        return;
    }
    if (opened[i0][j0] > 0) {
        return;
    }
    if (nums[i0][j0] == -1) {
        lose(i0, j0);
    } else {
        // if (nums[i0][j0] == 0) {
        num_opened++;
        opened[i0][j0] = 1;
        if (flags[i0][j0] == 1) {
            flag_num--;
            flags[i0][j0] == 0;
            document.getElementById(write_id(i0, j0)).innerHTML = "";
        }
        document.getElementById('flags').innerHTML = mine_num - flag_num;
        document.getElementById(write_id(i0, j0)).style.backgroundColor = "rgb(200, 200, 200)";
        if (nums[i0][j0] == 0) {
            for (let di = -1; di <= 1; di++) {
                for (let dj = -1; dj <= 1; dj++) {
                    if (di != 0 || dj != 0) {
                        open(i0 + di, j0 + dj);
                    }
                }
            }
        } else if (nums[i0][j0] > 0) {
            document.getElementById(write_id(i0, j0)).innerHTML = nums[i0][j0];
            let col = "";
            if (nums[i0][j0] == 1) {
                col = "blue";
            } else if (nums[i0][j0] == 2) {
                col = "green";
            } else if (nums[i0][j0] == 3) {
                col = "red";
            } else if (nums[i0][j0] == 4) {
                col = "darkblue";
            } else if (nums[i0][j0] == 5) {
                col = "darkred";
            } else if (nums[i0][j0] == 6) {
                col = "cyan";
            } else if (nums[i0][j0] == 7) {
                col = "black";
            } else if (nums[i0][j0] == 8) {
                col = "black";
            }
            document.getElementById(write_id(i0, j0)).style.color = col;
        }
    }
}

function ms_flag(s) {
    if (started != 1) {
        return false;
    }
    let i0 = Number(s[0])*10 + Number(s[1]);
    let j0 = Number(s[2])*10 + Number(s[3]);
    // alert(i0 * 100 + j0);
    if (opened[i0][j0] == 1) {
        return false;
    } else if (flags[i0][j0] == 0) {
    //else if (flags[i0][j0] == 0 && flag_num < mine_num) {
        flags[i0][j0] = 1;
        flag_num++;
        document.getElementById(write_id(i0, j0)).innerHTML =
            '<img src="./flag.gif" alt="F" style="vertical-align: middle">'
        // let res = 0;
        // for (let i = 0; i < field_hei; i++) {
        //     for (let j = 0; j < field_wid; j++) {
        //         if (flags[i][j] == 1 && nums[i][j] == -1) {
        //             res++;
        //         }
        //     }
        // }
        // if (mine_num == res) {
        //     win();
        // }
    } else if (flags[i0][j0] == 1) {
        flags[i0][j0] = 0;
        flag_num--;
        document.getElementById(write_id(i0, j0)).innerHTML = "";
    }
    document.getElementById("flags").innerHTML = mine_num - flag_num;
    return false;
}

function win() {
    let tmp = time;
    timer(0);
    document.getElementById("timer").innerHTML =
        String(Math.floor(tmp/100) % 10) + String(Math.floor(tmp/10) % 10) + String(Math.floor(tmp) % 10);

    for (let i = 0; i < field_hei; i++) {
        for (let j = 0; j < field_wid; j++) {
            if (nums[i][j] == -1) {
                p = document.getElementById(write_id(i, j));
                p.style.backgroundColor = "rgb(150, 255, 150)";
                p.innerHTML = '<img src="./flag.gif" alt="F" style="vertical-align: middle">'
            } else {
                open(i, j);
            }
        }
    }
    started = 2;
}

function start(i0, j0) {
    started = 1;
    let ii = 0;
    let stopper = 0;
    while (ii < mine_num) {
        stopper++;
        if (stopper > 1000000) {
            alert("ERROR: TOO MANY MINES");
            started = -1;
            break;
        }
        let i = Math.floor(field_hei * Math.random());
        let j = Math.floor(field_wid * Math.random());
        let di = Math.abs(i0 - i);
        let dj = Math.abs(j0 - j);
        if (di + dj < radius_free) {
            continue;
        } else if (nums[i][j] == -1) {
            continue;
        } else {
            nums[i][j] = -1;
            // alert(ii);
            // alert(String(i) + String(j));
            //document.getElementById(String(i) + String(j)).innerHTML = 100;
            
            nums[i][j] = -1;
            for (let i_n = i-1; i_n <= i + 1; i_n++) {
                for (let j_n = j-1; j_n <= j + 1; j_n++) {
                    if (i_n < 0 || j_n < 0 || i_n >= field_hei || j_n >= field_wid) {
                        
                    } else if (nums[i_n][j_n] != -1) {
                        nums[i_n][j_n]++;
                    }
                }
            }
        }
        ii++
    }
     
    // for (let i = 0; i < field_hei; i++) {
    //     for (let j = 0; j < field_wid; j++) {
    //         if (nums[i][j] !== 100 && nums[i][j] != 0) {
    //             document.getElementById(String(i) + String(j)).innerHTML = nums[i][j];
    //         }
    //     }
    // }
     
    open(i0, j0);
    if (num_opened == field_hei * field_wid - mine_num) {
        win();
    }
}

function timer(state) {
    if (state == 1 && time >= 0) {
        
        document.getElementById("timer").innerHTML =
        String(Math.floor(time/100) % 10) + String(Math.floor(time/10) % 10) + String(Math.floor(time) % 10);
        time += 0.1;

        setTimeout(timer, 100, 1);
    } else if (state == 0) {
        time = -1000;
        setTimeout(document.getElementById("timer").innerHTML = "000", 150, 1);
    }
}

function lose(i0, j0) {
    let tmp = time;
    timer(0);
    document.getElementById("timer").innerHTML =
        String(Math.floor(tmp/100) % 10) + String(Math.floor(tmp/10) % 10) + String(Math.floor(tmp) % 10);

    started = -1;
    for (let i = 0; i < field_hei; i++) {
        for (let j = 0; j < field_wid; j++) {
            if (nums[i][j] == -1) {
                let p = document.getElementById(write_id(i, j));
                p.style.backgroundColor = "rgb(170, 30, 10)";
                //"rgb(175, 0, 0)"
                if (flags[i][j] != 1) {
                    p.innerHTML = '<img src="./mine.gif" alt="M" style="vertical-align: middle;">';
                }
            }
        }
    }
    document.getElementById(write_id(i0, j0)).style.backgroundColor = "rgb(70, 70, 70)"
}

function write_id(i, j) {
    return String(Math.floor(i / 10)) + String(i % 10) + String(Math.floor(j / 10)) + String(j % 10);
}

function change_vars(wid, hei, mines) {
    field_wid = Number(wid);
    field_hei = Number(hei);
    mine_num = Number(mines);
    draw_field();
}

function make_flagged() {
    if (ms_flagged) {
        ms_flagged = false;
        document.getElementById("flagger").innerHTML =
        '<img src="./mine.gif" alt="M" style="vertical-align: middle">';
    } else if (!ms_flagged) {
        ms_flagged = true;
        document.getElementById("flagger").innerHTML =
        '<img src="./flag.gif" alt="F" style="vertical-align: middle">';
    }
}

// var i = Math.floor(10 * Math.random())
// var j = Math.floor(10 * Math.random())
// id = (String)(i) + (String)(j)
// document.getElementById(id).innerHTML = "0"

////////////////////



////////////////////
// <img src="./flag.gif" alt="F" style="vertical-align: middle">
////////////////////

for (let define_vars = 0; define_vars == 0; define_vars = 1) {
    var mine_num = 12;
    var radius_free = 3;
    var field_wid = 9;
    var field_hei = 10;

    var started = 0;
    var tobe_opened
    var num_opened = 0;
    var time = 0;
    var flag_num = 0;

    var ms_flagged = false;
}

for (let define_arrays = 0; define_arrays == 0; define_arrays = 1) {
    // var mines = []
    // for (let i = 0; i < field_hei; i++) {
    //     mines.push([]);
    //     for (let j = 0; j < field_wid; j++) {
    //         mines[i].push(0);
    //     }
    // }

    var nums = []
    for (let i = 0; i < 100; i++) {
        nums.push([]);
        for (let j = 0; j < 100; j++) {
            nums[i].push(0);
        }
    }

    var flags = []
    for (let i = 0; i < 100; i++) {
        flags.push([]);
        for (let j = 0; j < 100; j++) {
            flags[i].push(0);
        }
    }

    var opened = []
    for (let i = 0; i < 100; i++) {
        opened.push([]);
        for (let j = 0; j < 100; j++) {
            opened[i].push(0);
        }
    }
}

//////////////////////////////
function draw_field() {
    let ans = ""
    for (let i = 0; i < field_hei; i++) {
        ans += "<tr>\n"
        for (let j = 0; j < field_wid; j++) {
            ans += '    <td id = "'
                + String(Math.floor(i / 10)) + String(i % 10) +
                String(Math.floor(j / 10)) + String(j % 10) +
            '" onclick = "ms_click(' +
            "'" + String(Math.floor(i / 10)) + String(i % 10) +
            String(Math.floor(j / 10)) + String(j % 10) + "'" +
            ')" oncontextmenu = "return ms_flag(' +
            "'" + String(Math.floor(i / 10)) + String(i % 10) +
            String(Math.floor(j / 10)) + String(j % 10) + "'" +
            ')"></td>\n';
        }
        ans += "</tr>\n"
    }
    //console.log(ans);
    document.getElementById("field").innerHTML = ans;
    ms_reset();
}

draw_field();