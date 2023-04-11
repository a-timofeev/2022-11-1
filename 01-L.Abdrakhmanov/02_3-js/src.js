function ans_3(x, y) {
	let res = ""
    for (let i = 0; i <= x; i++) {
        res += "<tr>\n"
        for (let j = 0; j <= y; j++) {
			if (i + j == 0) {
				a = "";
				res += '    <td style="width:40px; height: 40px; margin: 0; text-align: center; font-size:14px;' +
				'border-style:solid; border-top-width: 0; border-left-width: 0; font-size: 20px; font-weight: bold;">'
				+ a + '</td>\n';
			} else if (i == 0) {
				a = j;
				res += '    <td style="width:40px; height: 40px; margin: 0; text-align: center; font-size:14px;' +
				'border-style:solid; border-top-width: 0; border-left-width: 0; font-size: 20px; font-weight: 999;">'
				+ a + '</td>\n';
			} else if (j == 0) {
				a = i;
				res += '    <td style="width:40px; height: 40px; margin: 0; text-align: center; font-size:14px;' +
				'border-style:solid; border-top-width: 0; border-left-width: 0; font-size: 20px; font-weight: 999;">'
				+ a + '</td>\n';
			} else {
				a = i*j;
				res += '    <td style="width:40px; height: 40px; margin: 0; text-align: center; font-size:14px;' +
				'border-width: 1px; border-style:solid; border-top-width: 0; border-left-width: 0; font-size: 20px; font-weight: 500;">'
				+ a + '</td>\n';
			}
        }
        res += "</tr>\n";
    }
	//console.log(res);
    document.getElementById("table_3").innerHTML = res;
}

ans_3(10, 10)
