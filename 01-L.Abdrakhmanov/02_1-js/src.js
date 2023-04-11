function is_prime_1(n) {
    if (n <= 1) {
        return false;
    }
    if (n % 1 != 0) {
        return false;
    }
    for (let i = 2; i * i <= n; i++) {
        if (n % i == 0) {
            return false
        }
    }
    return true
}

function ans_1(n) {
    if (is_prime_1(n)) {
        document.getElementById("result_1").innerHTML = "The number " + n + " IS prime.";
    } else {
        document.getElementById("result_1").innerHTML = "The number " + n + " IS NOT prime.";
    }
}
