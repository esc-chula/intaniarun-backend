const excluded = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 33, 44, 55, 66, 69, 77, 88, 99, 112,
    168, 222, 333, 444, 555, 666, 777, 888, 999, 1111, 1999, 2222, 2500, 2501,
    2502, 2503, 2504, 2505, 2506, 2507, 2508, 2509, 2510, 2511, 2512, 2513,
    2514, 2515, 2516, 2517, 2518, 2519, 2520, 2521, 2522, 2523, 2524, 2525,
    2526, 2527, 2528, 2529, 2530, 2531, 2532, 2533, 2534, 2535, 2536, 2537,
    2538, 2539, 2540, 2541, 2542, 2543, 2544, 2545, 2546, 2547, 2548, 2549,
    2550, 2551, 2552, 2553, 2554, 2555, 2556, 2557, 2558, 2559, 2560, 2561,
    2562, 2563, 2564, 2565, 2566, 2999, 3333, 3999, 4444, 4999, 5000,
];

export const nextRunnerNo = (current: number) => {
    let newNo = current + 1;
    while (excluded.includes(newNo)) {
        newNo += 1;
    }
    return newNo;
};

// VIP
// 1-1000

// นิสิต
// 1001-3000

// นิสิตเก่า
// 3001 - 6000

// ประชาคมจุฬาฯ
// 6001 - 7000

// ประชาชนทั่วไป
// 7001 - 8000

// สปอนเซอร์ + PACER (รอสรุปจำนวน)
// 9001 - 9999

export const nextRunnerNoV2 = (current: number, counterPackageType: string) => {
    switch (counterPackageType) {
        case "VIP":
            return String(current + 1)
        case "STUDENT":
            return String(current + 1 + 1000)
        case "ACQUAINTANCE_ALUMNI":
            return String(current + 1 + 3000)
        case "CHULA":
            return String(current + 1 + 6000)
        case "PUBLIC":
            return String(current + 1 + 7000)
        case "EXTRA":
            return String(current + 1 + 9000)
        default:
            return String(current + 1 + 99000)
    }
};