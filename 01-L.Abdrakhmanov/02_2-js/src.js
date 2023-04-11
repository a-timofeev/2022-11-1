function ans_2(a, b, c) {
	let d = b*b-4*a*c;
	if (a*a + b*b + c*c == 0) {
		document.getElementById("result_2").innerHTML =
		"LITERALLY EVERYTHING (0 == 0)";
		return;
	}
	if (a == 0) {
		if (b == 0) {
			document.getElementById("result_2").innerHTML =
			"No answers";
		}
		document.getElementById("result_2").innerHTML =
		"{" + -c/b + "}";
		return;
	}
	if (d < 0) {
		document.getElementById("result_2").innerHTML =
		"No answers";
	} else if (d == 0) {
		document.getElementById("result_2").innerHTML =
		"{" + -b/2/a + "}";
	} else if (d > 0) {
		if (a > 0) {
			document.getElementById("result_2").innerHTML =
			"{" + (-b-Math.sqrt(d))/2/a + "; " + (-b+Math.sqrt(d))/2/a + "}";
		} else if (a < 0) {
			document.getElementById("result_2").innerHTML =
			"{" + (-b+Math.sqrt(d))/2/a + "; " + (-b-Math.sqrt(d))/2/a + "}";
		}
	}
}
